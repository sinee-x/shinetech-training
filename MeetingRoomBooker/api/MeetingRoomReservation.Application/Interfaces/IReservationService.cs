using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;

namespace MeetingRoomBooker.Application.Interfaces
{
    public interface IReservationService
    {
        Task<ReservationDto> CreateReservationAsync(int id, CreateReservationRequestDto request);
        Task DeleteReservationAsync(int id);
        Task<IEnumerable<ReservationDto>> GetAllReservationsAsync();
        Task<ReservationDto?> GetReservationByIdAsync(int id);
        Task<IEnumerable<ReservationDto>> GetReservationsByMeetingRoomIdAsync(int meetingRoomId);
        Task<IEnumerable<ReservationDto>> GetReservationsByUserIdAsync(int userId);
        Task<ReservationDto> UpdateReservationAsync(int id, UpdateReservationRequestDto request);
    }
}
