using System.Net;

namespace MeetingRoomBooker.Application.Common.Models
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
        public Dictionary<string, string[]> Errors { get; set; }
        public HttpStatusCode StatusCode { get; set; }

        public static ApiResponse<T> Ok(T data, string message = null)
        {
            return new ApiResponse<T>
            {
                Success = true,
                Message = message,
                Data = data,
                StatusCode = HttpStatusCode.OK
            };
        }

        public static ApiResponse<T> Created(T data, string message = "Resource created successfully")
        {
            return new ApiResponse<T>
            {
                Success = true,
                Message = message,
                Data = data,
                StatusCode = HttpStatusCode.Created
            };
        }

        public static ApiResponse<T> BadRequest(string message)
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        public static ApiResponse<T> NotFound(string message = "Resource not found")
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                StatusCode = HttpStatusCode.NotFound
            };
        }

        public static ApiResponse<T> Unauthorized(string message = "Unauthorized access")
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                StatusCode = HttpStatusCode.Unauthorized
            };
        }

        public static ApiResponse<T> InternalError(string message = "An internal server error occurred")
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                StatusCode = HttpStatusCode.InternalServerError
            };
        }
    }
}
