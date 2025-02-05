namespace MeetingRoomBooker.Domain.Common
{
    public class BaseEntity : IEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastModifiedAt { get; set; }
        public int CreatedBy { get; set; }
        public int? LastModifiedBy { get; set; }
        public bool IsDeleted { get; set; }
    }
}
