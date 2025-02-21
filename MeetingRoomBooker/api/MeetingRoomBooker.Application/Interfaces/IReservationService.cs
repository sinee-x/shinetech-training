using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;

namespace MeetingRoomBooker.Application.Interfaces
{
    public interface IReservationService
    {
        Task<ReservationDto> CreateReservationAsync(int userId, CreateReservationRequestDto request);
        Task DeleteReservationAsync(int id);
        Task<IEnumerable<ReservationRecordDto>> GetAllReservationsAsync();
        Task<ReservationRecordDto?> GetReservationByIdAsync(int id);
        Task<IEnumerable<ReservationRecordDto>> GetReservationsByMeetingRoomIdAsync(int meetingRoomId);
        Task<IEnumerable<ReservationRecordDto>> GetReservationsByUserIdAsync(int userId);
        Task<ReservationDto> UpdateReservationAsync(int id, UpdateReservationRequestDto request, int userId);
    }
}
