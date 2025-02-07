using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;

namespace MeetingRoomBooker.Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<UserDto> CreateUserAsync(int userId, CreateUserRequestDto request);
        Task<UserDto> UpdateUserAsync(int id, UpdateUserRequestDto request, int userId);
        Task DeleteUserAsync(int id);
    }
}
