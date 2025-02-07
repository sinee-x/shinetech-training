using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomBooker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController(IReservationService reservationService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var reservations = await reservationService.GetAllReservationsAsync();
            return Ok(reservations);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var reservation = await reservationService.GetReservationByIdAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateReservationRequestDto request)
        {
            var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
            var reservation = await reservationService.CreateReservationAsync(userId, request);
            return CreatedAtAction(nameof(Get), reservation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateReservationRequestDto request)
        {
            var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
            var reservation = await reservationService.UpdateReservationAsync(id, request, userId);
            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await reservationService.DeleteReservationAsync(id);
            return NoContent();
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetReservationsByUserId(int userId)
        {
            var reservations = await reservationService.GetReservationsByUserIdAsync(userId);
            return Ok(reservations);
        }

        [HttpGet("meetingroom/{meetingRoomId}")]
        public async Task<IActionResult> GetReservationsByMeetingRoomId(int meetingRoomId)
        {
            var reservations = await reservationService.GetReservationsByMeetingRoomIdAsync(meetingRoomId);
            return Ok(reservations);
        }
    }
}
