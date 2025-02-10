namespace MeetingRoomBooker.Application.DTOs
{
    public class AuthResultDto
    {
        public string Token { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime ExpiresIn { get; set; }
    }
}
