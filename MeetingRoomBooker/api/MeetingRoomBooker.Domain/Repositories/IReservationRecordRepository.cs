using MeetingRoomBooker.Domain.Entities;

namespace MeetingRoomBooker.Domain.Repositories
{
    public interface IReservationRecordRepository
    {
        Task<IEnumerable<ReservationRecord>> GetAllReservationsAsync();
        Task<ReservationRecord?> GetReservationByIdAsync(int id);
        Task<IEnumerable<ReservationRecord>> GetReservationsByUserIdAsync(int userId);
        Task<IEnumerable<ReservationRecord>> GetReservationsByMeetingRoomIdAsync(int meetingRoomId);
    }
}
