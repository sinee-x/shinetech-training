using MeetingRoomBooker.Domain.Common;

namespace MeetingRoomBooker.Domain.Entities
{
    public class ReservationRecord : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; } = null;
        public string UserName { get; set; } = string.Empty;
        public int RoomId { get; set; }
        public MeetingRoom MeetingRoom { get; set; } = null;
        public string RoomName { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; }
        public string Subject { get; set; }
    }
}
