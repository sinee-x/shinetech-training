using MeetingRoomBooker.Domain.Entities;

namespace MeetingRoomBooker.Domain.Repositories
{
    public interface IMeetingRoomRepository
    {
        Task<IEnumerable<MeetingRoom>> GetAllMeetingRoomsAsync();
        Task<MeetingRoom?> GetMeetingRoomByIdAsync(int id);
        Task<MeetingRoom?> GetMeetingRoomsByRoomNameAsync(string roomName);
        Task<MeetingRoom> CreateMeetingRoomAsync(MeetingRoom meetingRoom);
        Task<MeetingRoom> UpdateMeetingRoomAsync(int id, MeetingRoom meetingRoom);
        Task DeleteMeetingRoomAsync(int id);

    }
}
