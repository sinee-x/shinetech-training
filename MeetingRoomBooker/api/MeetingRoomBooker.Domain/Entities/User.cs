using MeetingRoomBooker.Domain.Common;
using MeetingRoomBooker.Domain.Enums;

namespace MeetingRoomBooker.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public UserRole Role { get; set; }
    }
}
