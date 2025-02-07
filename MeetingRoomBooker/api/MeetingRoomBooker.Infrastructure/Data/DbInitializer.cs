using MeetingRoomBooker.Domain.Entities;
using MeetingRoomBooker.Domain.Enums;

namespace MeetingRoomBooker.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context)
        {
            await context.Database.EnsureCreatedAsync();

            await InitializeUsers(context);
            await InitializeMeetingRooms(context);
        }

        private static async Task InitializeUsers(ApplicationDbContext context)
        {
            if (context.Users.Count() > 0)
            {
                return;
            }
            var users = new List<User>
            {
                new() {
                    Username = "admin",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                    Role = UserRole.Admin,
                    CreatedBy = 1,
                    CreatedAt = DateTime.UtcNow,
                },
                new() {
                    Username = "user",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                    Role = UserRole.User,
                    CreatedBy = 1,
                    CreatedAt = DateTime.UtcNow,
                },
            };
            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }

        private static async Task InitializeMeetingRooms(ApplicationDbContext context)
        {
            if (context.MeetingRooms.Count() > 0)
            {
                return;
            }

            var meetingRooms = new List<MeetingRoom>
            {
                new() {
                    RoomName = "会议室A",
                    Capacity = 10,
                    Status = "Available",
                    RoomType = "小型会议室",
                    AvailableTime = "09:00-18:00",
                    Notes = "配备投影仪和白板",
                    CreatedBy = 1,
                    CreatedAt = DateTime.UtcNow,
                },
                new() {
                    RoomName = "会议室B",
                    Capacity = 20,
                    Status = "Available",
                    RoomType = "大型会议室",
                    AvailableTime = "09:00-18:00",
                    Notes = "配备投影仪和白板",
                    CreatedBy = 1,
                    CreatedAt = DateTime.UtcNow,
                },
            };
            await context.MeetingRooms.AddRangeAsync(meetingRooms);
            await context.SaveChangesAsync();
        }
    }
}
