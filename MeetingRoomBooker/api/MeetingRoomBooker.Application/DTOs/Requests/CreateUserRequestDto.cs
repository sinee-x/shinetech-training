﻿using MeetingRoomBooker.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace MeetingRoomBooker.Application.DTOs.Requests
{
    public class CreateUserRequestDto
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters")]
        public string Password { get; set; } = "123456";

        public UserRole Role { get; set; } = UserRole.User;
    }
}
