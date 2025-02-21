namespace MeetingRoomBooker.Application.DTOs
{
    public class ReservationRecordDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; }
        public string Subject { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastModifiedAt { get; set; }
    }
}
