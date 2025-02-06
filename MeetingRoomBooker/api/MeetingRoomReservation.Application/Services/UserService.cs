using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;
using MeetingRoomBooker.Domain.Entities;
using MeetingRoomBooker.Domain.Repositories;

namespace MeetingRoomBooker.Application.Services
{
    public class UserService(IUserRepository userRepository) : IUserService
    {
        public async Task<UserDto> CreateUserAsync(int id, CreateUserRequestDto request)
        {
            var existingUser = await userRepository.GetUserByUsernameAsync(request.Username);
            if (existingUser != null)
            {
                throw new Exception("Username already exists");
            }

            var user = new User
            {
                Username = request.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = request.Role,
            };

            user.SetCreated(request.CreatedBy);

            await userRepository.CreateUserAsync(user);

            return MapToDto(user);
        }


        public Task DeleteUserAsync(int userId)
        {
            return userRepository.DeleteUserAsync(userId);
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await userRepository.GetAllUsersAsync();
            return users.Any() ? users.Select(MapToDto) : [];
        }

        public async Task<UserDto?> GetUserByIdAsync(int userId)
        {
            var user = await userRepository.GetUserByIdAsync(userId);
            return user != null ? MapToDto(user) : null;
        }

        public async Task<UserDto> UpdateUserAsync(int id, UpdateUserRequestDto request)
        {
            var user = await userRepository.GetUserByIdAsync(id) ?? throw new Exception($"User with ID {id} not found");

            if (!string.IsNullOrEmpty(request.Username))
            {
                user.Username = request.Username;
            }

            if (!string.IsNullOrEmpty(request.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
            }

            if (request.Role.HasValue)
            {
                user.Role = request.Role.Value;
            }

            user.SetModified(request.LastModifiedBy);

            await userRepository.UpdateUserAsync(user);

            return MapToDto(user);
        }

        private static UserDto MapToDto(User user)
        {
            return new UserDto
            {
                UserId = user.Id,
                Username = user.Username,
                Password = user.Password,
                Role = user.Role,
                CreatedAt = user.CreatedAt,
                LastModifiedAt = user.LastModifiedAt,
            };
        }
    }
}
