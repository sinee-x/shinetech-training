using System.ComponentModel.DataAnnotations;

namespace MeetingRoomBooker.Application.DTOs.Requests
{
    public class CreateReservationRequestDto
    {
        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }
        [Required(ErrorMessage = "RoomId is required")]
        public int RoomId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; } = string.Empty;
        public int CreatedBy { get; set; }
    }
}
