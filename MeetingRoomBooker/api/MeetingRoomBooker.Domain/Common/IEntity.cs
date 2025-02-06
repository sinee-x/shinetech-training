namespace MeetingRoomBooker.Domain.Common
{
    public interface IEntity
    {
        int Id { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime? LastModifiedAt { get; set; }
        int CreatedBy { get; set; }
        int? LastModifiedBy { get; set; }
    }
}
