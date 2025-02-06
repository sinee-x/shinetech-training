using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;

namespace MeetingRoomBooker.Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int userId);
        Task<UserDto> CreateUserAsync(int id, CreateUserRequestDto request);
        Task<UserDto> UpdateUserAsync(int id, UpdateUserRequestDto request);
        Task DeleteUserAsync(int userId);
    }
}
