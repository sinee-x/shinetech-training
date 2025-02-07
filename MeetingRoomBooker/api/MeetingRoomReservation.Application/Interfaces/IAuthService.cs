using MeetingRoomBooker.Application.DTOs;

namespace MeetingRoomBooker.Application.Interfaces
{
    public interface IAuthService
    {
        Task<bool> VerifyPasswordAsync(string email, string password);
        Task<bool> ChangePasswordAsync(string email, string currentPassword, string newPassword);
        Task<bool> ResetPasswordAsync(string email, string newPassword);
        Task<bool> LogoutAsync(string email);

        Task<AuthResultDto> LoginAsync(string email, string requestPassword);
        Task<AuthResultDto> RefreshTokenAsync(string requestRefreshToken);
        Task<bool> CheckAuthStatusAsync(string token);
    }
}
