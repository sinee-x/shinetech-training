using MeetingRoomBooker.Application.Common.Models;
using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MeetingRoomBooker.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthService authService) : ApiControllerBase
    {
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<ApiResponse<AuthResultDto>>> Login([FromBody] LoginRequest request)
        {
            try
            {
                var result = await authService.LoginAsync(request.Email, request.Password);
                return OkResponse(result);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<AuthResultDto>(ex.Message);
            }
        }

        [HttpPost("verify-password")]
        public async Task<ActionResult<ApiResponse<bool>>> VerifyPassword([FromBody] VerifyPasswordRequest request)
        {
            var email = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;
            var isValid = await authService.VerifyPasswordAsync(email, request.Password);
            return OkResponse(isValid);
        }

        [HttpPut("change-password")]
        public async Task<ActionResult<ApiResponse<bool>>> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var email = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;
            var success = await authService.ChangePasswordAsync(email, request.CurrentPassword, request.NewPassword);
            if (!success)
            {
                return BadRequestResponse<bool>("Failed to change password");
            }
            return OkResponse(true);
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult<ApiResponse<bool>>> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var email = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;
            var success = await authService.ResetPasswordAsync(email, request.NewPassword);
            if (!success)
            {
                return BadRequestResponse<bool>("Invalid or expired reset token");
            }
            return OkResponse(true);
        }

        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public async Task<ActionResult<ApiResponse<AuthResultDto>>> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                var result = await authService.RefreshTokenAsync(request.RefreshToken);
                return OkResponse(result);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<AuthResultDto>(ex.Message);
            }
        }

        [HttpPost("logout")]
        public async Task<ActionResult<ApiResponse<bool>>> Logout()
        {
            var email = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;
            var success = await authService.LogoutAsync(email);
            if (!success)
            {
                return BadRequestResponse<bool>("Failed to logout");
            }
            return OkResponse(true);
        }

        [HttpGet("status")]
        public async Task<ActionResult<ApiResponse<bool>>> CheckAuthStatus()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var isValid = await authService.CheckAuthStatusAsync(token);
            return OkResponse(isValid);
        }
    }
}
