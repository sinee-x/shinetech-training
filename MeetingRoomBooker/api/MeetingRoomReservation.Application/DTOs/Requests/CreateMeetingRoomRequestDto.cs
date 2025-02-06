using System.ComponentModel.DataAnnotations;

namespace MeetingRoomBooker.Application.DTOs.Requests
{
    public class CreateMeetingRoomRequestDto
    {
        [Required(ErrorMessage = "Room name is required")]
        public string RoomName { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; } = string.Empty;
        public string RoomType { get; set; } = string.Empty;
        public string AvailableTime { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public int CreatedBy { get; set; }
    }
}
