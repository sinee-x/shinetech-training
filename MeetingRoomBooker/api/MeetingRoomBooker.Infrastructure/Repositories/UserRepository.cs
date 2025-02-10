using MeetingRoomBooker.Domain.Entities;
using MeetingRoomBooker.Domain.Repositories;
using MeetingRoomBooker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace MeetingRoomBooker.Infrastructure.Repositories
{
    public class UserRepository(ApplicationDbContext context, IDbConnection dbConnection) : IUserRepository
    {
        public async Task<User> CreateUserAsync(User user)
        {
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUserAsync(int id)
        {
            context.Users.Remove(new User { Id = id });
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            context.Entry(user).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetByRefreshTokenAsync(string refreshToken)
        {
            return await context.Users
                .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
        }
    }
}
