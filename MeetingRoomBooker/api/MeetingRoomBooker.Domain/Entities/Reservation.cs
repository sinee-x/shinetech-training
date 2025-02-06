using MeetingRoomBooker.Domain.Common;

namespace MeetingRoomBooker.Domain.Entities
{
    public class Reservation : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; } = null;
        public int RoomId { get; set; }
        public MeetingRoom MeetingRoom { get; set; } = null;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; }
    }
}
