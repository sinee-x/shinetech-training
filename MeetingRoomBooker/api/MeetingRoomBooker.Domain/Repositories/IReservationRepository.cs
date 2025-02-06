using MeetingRoomBooker.Domain.Entities;

namespace MeetingRoomBooker.Domain.Repositories
{
    public interface IReservationRepository
    {
        Task<Reservation> CreateReservationAsync(Reservation reservation);
        Task<Reservation> UpdateReservationAsync(Reservation reservation);
        Task DeleteReservationAsync(int id);
        Task<IEnumerable<Reservation>> GetAllReservationsAsync();
        Task<Reservation?> GetReservationByIdAsync(int id);
        Task<IEnumerable<Reservation>> GetReservationsByUserIdAsync(int userId);
        Task<IEnumerable<Reservation>> GetReservationsByMeetingRoomIdAsync(int meetingRoomId);
    }
}
