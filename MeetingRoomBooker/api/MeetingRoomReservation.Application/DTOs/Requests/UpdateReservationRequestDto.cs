using System.ComponentModel.DataAnnotations;

namespace MeetingRoomBooker.Application.DTOs.Requests
{
    public class UpdateReservationRequestDto
    {
        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        [Required(ErrorMessage = "RoomId is required")]
        public int RoomId { get; set; }
        public string RoomName { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
