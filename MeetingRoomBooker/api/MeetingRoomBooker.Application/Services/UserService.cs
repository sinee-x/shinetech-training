using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;
using MeetingRoomBooker.Domain.Entities;
using MeetingRoomBooker.Domain.Repositories;

namespace MeetingRoomBooker.Application.Services
{
    public class UserService(IUserRepository userRepository) : IUserService
    {
        public async Task<UserDto> CreateUserAsync(int userId, CreateUserRequestDto request)
        {
            var existingUser = await userRepository.GetUserByEmailAsync(request.Email);
            if (existingUser != null)
            {
                throw new Exception("Email already exists");
            }

            var user = new User
            {
                Email = request.Email,
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = request.Role,
            };

            user.SetCreated(userId);

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

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await userRepository.GetUserByIdAsync(id);
            return user != null ? MapToDto(user) : null;
        }

        public async Task<UserDto> UpdateUserAsync(int id, UpdateUserRequestDto request, int userId)
        {
            var user = await userRepository.GetUserByIdAsync(id) ?? throw new Exception($"User with ID {id} not found");

            if (!string.IsNullOrEmpty(request.Username))
            {
                user.Username = request.Username;
            }

            if (!string.IsNullOrEmpty(request.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            }

            if (request.Role.HasValue)
            {
                user.Role = request.Role.Value;
            }

            user.SetModified(userId);

            await userRepository.UpdateUserAsync(user);

            return MapToDto(user);
        }

        public static UserDto MapToDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Password = user.PasswordHash,
                Role = user.Role,
                CreatedAt = user.CreatedAt,
                LastModifiedAt = user.LastModifiedAt,
            };
        }
    }
}
