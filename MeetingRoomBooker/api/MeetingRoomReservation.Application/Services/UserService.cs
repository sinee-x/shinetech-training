using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;

namespace MeetingRoomBooker.Application.Services
{
    public class UserService : IUserService
    {
        public Task<UserDto> CreateUserAsync(CreateUserRequestDto user)
        {
            throw new NotImplementedException();
        }

        public Task DeleteUserAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<UserDto?> GetUserByIdAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<UserDto> UpdateUserAsync(int id, UpdateUserRequestDto user)
        {
            throw new NotImplementedException();
        }
    }
}
