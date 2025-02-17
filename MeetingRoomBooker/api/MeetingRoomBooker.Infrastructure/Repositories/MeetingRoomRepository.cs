using MeetingRoomBooker.Domain.Entities;
using MeetingRoomBooker.Domain.Repositories;
using MeetingRoomBooker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace MeetingRoomBooker.Infrastructure.Repositories
{
    public class MeetingRoomRepository(ApplicationDbContext context, IDbConnection dbConnection) : IMeetingRoomRepository
    {
        public async Task<MeetingRoom> CreateMeetingRoomAsync(MeetingRoom meetingRoom)
        {
            context.MeetingRooms.Add(meetingRoom);
            await context.SaveChangesAsync();
            return meetingRoom;
        }

        public async Task DeleteMeetingRoomAsync(int id)
        {
            context.MeetingRooms.Remove(new MeetingRoom { Id = id });
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MeetingRoom>> GetAllMeetingRoomsAsync()
        {
            return await context.MeetingRooms.ToListAsync();
        }

        public async Task<MeetingRoom?> GetMeetingRoomByIdAsync(int id)
        {
            return await context.MeetingRooms.FindAsync(id);
        }

        public async Task<MeetingRoom?> GetMeetingRoomsByRoomNameAsync(string roomName)
        {
            return await context.MeetingRooms.FirstOrDefaultAsync(m => m.RoomName == roomName);
        }

        public async Task<MeetingRoom> UpdateMeetingRoomAsync(int id, MeetingRoom meetingRoom)
        {
            context.Entry(meetingRoom).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return meetingRoom;
        }
    }
}
