using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;
using MeetingRoomBooker.Domain.Entities;
using MeetingRoomBooker.Domain.Repositories;

namespace MeetingRoomBooker.Application.Services
{
    public class ReservationService(IReservationRepository reservationRepository) : IReservationService
    {
        public async Task<ReservationDto> CreateReservationAsync(int userId, CreateReservationRequestDto request)
        {
            var room = await reservationRepository.GetReservationsByMeetingRoomIdAsync(request.RoomId);

            if (room.Any(r => r.StartTime <= request.EndTime && r.EndTime >= request.StartTime))
            {
                throw new Exception("Room is already booked for this time slot.");
            }

            var reservation = new Reservation
            {
                UserId = request.UserId,
                RoomId = request.RoomId,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Status = request.Status,
                Subject = request.Subject,
                CreatedAt = DateTime.Now,
                LastModifiedAt = DateTime.Now
            };
            reservation.SetCreated(userId);

            await reservationRepository.CreateReservationAsync(reservation);

            return MapToDto(reservation);
        }

        public async Task DeleteReservationAsync(int id)
        {
            await reservationRepository.DeleteReservationAsync(id);
        }

        public async Task<IEnumerable<ReservationDto>> GetAllReservationsAsync()
        {
            var reservations = await reservationRepository.GetAllReservationsAsync();
            return reservations.Select(MapToDto);
        }

        public async Task<ReservationDto?> GetReservationByIdAsync(int id)
        {
            var reservation = await reservationRepository.GetReservationByIdAsync(id);
            return reservation != null ? MapToDto(reservation) : null;
        }

        public async Task<IEnumerable<ReservationDto>> GetReservationsByMeetingRoomIdAsync(int meetingRoomId)
        {
            var reservations = await reservationRepository.GetReservationsByMeetingRoomIdAsync(meetingRoomId);
            return reservations.Select(MapToDto);
        }

        public async Task<IEnumerable<ReservationDto>> GetReservationsByUserIdAsync(int userId)
        {
            var reservations = await reservationRepository.GetReservationsByUserIdAsync(userId);
            return reservations.Select(MapToDto);
        }

        public async Task<ReservationDto> UpdateReservationAsync(int id, UpdateReservationRequestDto request, int userId)
        {
            var room = await reservationRepository.GetReservationsByMeetingRoomIdAsync(request.RoomId);

            if (room.Any(r => r.StartTime <= request.EndTime && r.EndTime >= request.StartTime))
            {
                throw new Exception("Room is already booked for this time slot.");
            }

            var reservation = await reservationRepository.GetReservationByIdAsync(id) ?? throw new Exception("Reservation not found");

            reservation.UserId = request.UserId;
            reservation.RoomId = request.RoomId;
            reservation.StartTime = request.StartTime;
            reservation.EndTime = request.EndTime;
            reservation.Status = request.Status;
            reservation.Subject = request.Subject;

            reservation.SetModified(userId);

            await reservationRepository.UpdateReservationAsync(reservation);
            return MapToDto(reservation);
        }

        private ReservationDto MapToDto(Reservation reservation)
        {
            return new ReservationDto
            {
                Id = reservation.Id,
                UserId = reservation.UserId,
                RoomId = reservation.RoomId,
                StartTime = reservation.StartTime,
                EndTime = reservation.EndTime,
                Status = reservation.Status,
                Subject = reservation.Subject,
                CreatedAt = reservation.CreatedAt,
                LastModifiedAt = reservation.LastModifiedAt
            };

        }

    }
}
