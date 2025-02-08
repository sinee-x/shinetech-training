namespace MeetingRoomBooker.Application.DTOs
{
    public class MeetingRoomDto
    {
        public int Id { get; set; }
        public string RoomName { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; }
        public string RoomType { get; set; }
        public string AvailableTime { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastModifiedAt { get; set; }
    }
}
