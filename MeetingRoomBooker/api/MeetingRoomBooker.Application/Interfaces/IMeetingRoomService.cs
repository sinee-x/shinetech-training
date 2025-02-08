using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;

namespace MeetingRoomBooker.Application.Interfaces
{
    public interface IMeetingRoomService
    {
        Task<MeetingRoomDto> CreateMeetingRoomAsync(int userId, CreateMeetingRoomRequestDto request);
        Task DeleteMeetingRoomAsync(int id);
        Task<IEnumerable<MeetingRoomDto>> GetAllMeetingRoomsAsync();
        Task<MeetingRoomDto?> GetMeetingRoomByIdAsync(int id);
        Task<MeetingRoomDto> UpdateMeetingRoomAsync(int id, UpdateMeetingRoomRequestDto request, int userId);
    }
}
