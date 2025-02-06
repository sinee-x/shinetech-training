using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;
using MeetingRoomBooker.Domain.Entities;
using MeetingRoomBooker.Domain.Repositories;

namespace MeetingRoomBooker.Application.Services
{
    public class MeetingRoomService(IMeetingRoomRepository meetingRoomRepository) : IMeetingRoomService
    {
        public async Task<MeetingRoomDto> CreateMeetingRoomAsync(int id, CreateMeetingRoomRequestDto request)
        {
            var existingUser = await meetingRoomRepository.GetMeetingRoomsByRoomNameAsync(request.RoomName);
            if (existingUser != null)
            {
                throw new Exception("Room name already exists");
            }

            var meetingRoom = new MeetingRoom
            {
                RoomName = request.RoomName,
                Capacity = request.Capacity,
                Status = request.Status,
                RoomType = request.RoomType,
                AvailableTime = request.AvailableTime,
                Notes = request.Notes
            };
            meetingRoom.SetCreated(request.CreatedBy);

            await meetingRoomRepository.CreateMeetingRoomAsync(meetingRoom);

            return MapToDto(meetingRoom);
        }

        public async Task DeleteMeetingRoomAsync(int id)
        {
            await meetingRoomRepository.DeleteMeetingRoomAsync(id);
        }

        public async Task<IEnumerable<MeetingRoomDto>> GetAllMeetingRoomsAsync()
        {
            var rooms = await meetingRoomRepository.GetAllMeetingRoomsAsync();
            return rooms.Select(MapToDto);
        }

        public async Task<MeetingRoomDto?> GetMeetingRoomByIdAsync(int id)
        {
            var meetingRoom = await meetingRoomRepository.GetMeetingRoomByIdAsync(id);
            return meetingRoom != null ? MapToDto(meetingRoom) : null;
        }

        public async Task<MeetingRoomDto> UpdateMeetingRoomAsync(int id, UpdateMeetingRoomRequestDto request)
        {
            var meetingRoom = await meetingRoomRepository.GetMeetingRoomByIdAsync(id) ?? throw new Exception($"Meeting room with ID {id} not found");

            if (!string.IsNullOrEmpty(request.RoomName))
            {
                meetingRoom.RoomName = request.RoomName;
            }

            if (!string.IsNullOrEmpty(request.Status))
            {
                meetingRoom.Status = request.Status;
            }

            if (!string.IsNullOrEmpty(request.RoomType))
            {
                meetingRoom.RoomType = request.RoomType;
            }

            if (!string.IsNullOrEmpty(request.AvailableTime))
            {
                meetingRoom.AvailableTime = request.AvailableTime;
            }

            if (!string.IsNullOrEmpty(request.Notes))
            {
                meetingRoom.Notes = request.Notes;
            }

            meetingRoom.SetModified(request.LastModifiedBy);

            await meetingRoomRepository.UpdateMeetingRoomAsync(id, meetingRoom);

            return MapToDto(meetingRoom);
        }

        private MeetingRoomDto MapToDto(MeetingRoom meetingRoom)
        {
            return new MeetingRoomDto
            {
                RoomName = meetingRoom.RoomName,
                Capacity = meetingRoom.Capacity,
                Status = meetingRoom.Status,
                RoomType = meetingRoom.RoomType,
                AvailableTime = meetingRoom.AvailableTime,
                Notes = meetingRoom.Notes,
                CreatedAt = meetingRoom.CreatedAt,
                LastModifiedAt = meetingRoom.LastModifiedAt
            };
        }
    }
}
