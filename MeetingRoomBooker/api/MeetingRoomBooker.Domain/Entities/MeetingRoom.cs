using MeetingRoomBooker.Domain.Common;

namespace MeetingRoomBooker.Domain.Entities
{
    public class MeetingRoom : BaseEntity
    {
        public string RoomName { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; }
        public string RoomType { get; set; }
        public string AvailableTime { get; set; }
        public string Notes { get; set; }
    }
}
