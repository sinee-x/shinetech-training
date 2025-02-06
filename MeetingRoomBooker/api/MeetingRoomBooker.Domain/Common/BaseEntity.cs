namespace MeetingRoomBooker.Domain.Common
{
    public abstract class BaseEntity : IEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastModifiedAt { get; set; }
        public int CreatedBy { get; set; }
        public int? LastModifiedBy { get; set; }

        public virtual void SetCreated(int createdById)
        {
            CreatedAt = DateTime.UtcNow;
            CreatedBy = createdById;
            SetModified(createdById);
        }

        public virtual void SetModified(int? modifiedById)
        {
            LastModifiedAt = DateTime.UtcNow;
            LastModifiedBy = modifiedById;
        }
    }
}
