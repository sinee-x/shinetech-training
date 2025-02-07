using MeetingRoomBooker.Application.Common.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MeetingRoomBooker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : ControllerBase
    {
        protected ActionResult<ApiResponse<T>> OkResponse<T>(T data, string message = "Success")
        {
            var response = ApiResponse<T>.Ok(data, message);
            return StatusCode((int)response.StatusCode, response);
        }

        protected ActionResult<ApiResponse<T>> CreatedResponse<T>(T data, string message = "Created successfully")
        {
            var response = ApiResponse<T>.Created(data, message);
            return StatusCode((int)response.StatusCode, response);
        }

        protected ActionResult<ApiResponse<T>> BadRequestResponse<T>(params string[] messages)
        {
            var combinedMessage = string.Join(" ", messages);

            var response = ApiResponse<T>.BadRequest(combinedMessage);
            return StatusCode((int)response.StatusCode, response);
        }

        protected ActionResult<ApiResponse<T>> BadRequestResponse<T>(ModelStateDictionary modelState)
        {
            var errors = string.Join("; ", modelState.Values
                .SelectMany(x => x.Errors)
                .Select(x => x.ErrorMessage));
            return BadRequestResponse<T>(errors);
        }

        protected ActionResult<ApiResponse<T>> NotFoundResponse<T>(string message = "Resource not found")
        {
            var response = ApiResponse<T>.NotFound(message);
            return StatusCode((int)response.StatusCode, response);
        }

        protected ActionResult<ApiResponse<T>> UnauthorizedResponse<T>(string message = "Unauthorized access")
        {
            var response = ApiResponse<T>.Unauthorized(message);
            return StatusCode((int)response.StatusCode, response);
        }

        protected ActionResult<ApiResponse<T>> InternalErrorResponse<T>(string message = "An internal server error occurred")
        {
            var response = ApiResponse<T>.InternalError(message);
            return StatusCode((int)response.StatusCode, response);
        }
    }
}
