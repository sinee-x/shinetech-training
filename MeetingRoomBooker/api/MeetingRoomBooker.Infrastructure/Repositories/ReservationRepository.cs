using MeetingRoomBooker.Domain.Entities;
using MeetingRoomBooker.Domain.Repositories;
using MeetingRoomBooker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace MeetingRoomBooker.Infrastructure.Repositories
{
    public class ReservationRepository(ApplicationDbContext context, IDbConnection dbConnection) : IReservationRepository
    {
        public async Task<Reservation> CreateReservationAsync(Reservation reservation)
        {
            context.Reservations.Add(reservation);
            await context.SaveChangesAsync();
            return reservation;
        }

        public async Task DeleteReservationAsync(int id)
        {
            context.Reservations.Remove(new Reservation { Id = id });
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Reservation>> GetAllReservationsAsync()
        {
            return await context.Reservations.ToListAsync();
        }

        public async Task<Reservation?> GetReservationByIdAsync(int id)
        {
            return await context.Reservations.FindAsync(id);
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByMeetingRoomIdAsync(int meetingRoomId)
        {
            return await context.Reservations.Where(r => r.RoomId == meetingRoomId).ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByUserIdAsync(int userId)
        {
            return await context.Reservations.Where(r => r.UserId == userId).ToListAsync();
        }

        public async Task<Reservation> UpdateReservationAsync(Reservation reservation)
        {
            context.Entry(reservation).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return reservation;
        }
    }
}
