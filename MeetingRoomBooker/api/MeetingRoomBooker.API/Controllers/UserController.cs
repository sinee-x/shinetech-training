using MeetingRoomBooker.Application.Common.Models;
using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomBooker.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ApiControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<UserDto>>>> Get()
        {
            try
            {
                var users = await userService.GetAllUsersAsync();
                return OkResponse(users);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<IEnumerable<UserDto>>(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<UserDto>>> Get(int id)
        {
            try
            {
                var user = await userService.GetUserByIdAsync(id);
                if (user == null)
                {
                    return NotFoundResponse<UserDto>($"User with ID {id} not found.");
                }
                return OkResponse(user);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<UserDto>(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<UserDto>>> Post([FromBody] CreateUserRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequestResponse<UserDto>(ModelState);
                }

                var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
                var createdUser = await userService.CreateUserAsync(userId, request);
                return CreatedResponse(createdUser);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<UserDto>("An error occurred while creating the user.", ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<UserDto>>> Put(int id, [FromBody] UpdateUserRequestDto user)
        {
            try
            {
                var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
                var updatedUser = await userService.UpdateUserAsync(id, user, userId);
                if (updatedUser == null)
                {
                    return NotFoundResponse<UserDto>($"User with ID {id} not found.");
                }
                return OkResponse(updatedUser);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<UserDto>("An error occurred while updating the user.", ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            try
            {
                await userService.DeleteUserAsync(id);
                return OkResponse(true);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<bool>("An error occurred while deleting the user.", ex.Message);
            }
        }
    }
}