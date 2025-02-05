using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;

namespace MeetingRoomBooker.Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int userId);
        Task<UserDto> CreateUserAsync(CreateUserRequestDto user);
        Task<UserDto> UpdateUserAsync(int id, UpdateUserRequestDto user);
        Task DeleteUserAsync(int userId);
    }
}
