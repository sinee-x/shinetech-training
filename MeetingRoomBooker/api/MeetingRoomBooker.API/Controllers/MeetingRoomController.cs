using MeetingRoomBooker.Application.Common.Models;
using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomBooker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingRoomController(IMeetingRoomService meetingRoomService) : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<MeetingRoomDto>>>> Get()
        {
            try
            {
                var meetingRooms = await meetingRoomService.GetAllMeetingRoomsAsync();
                return OkResponse(meetingRooms);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<IEnumerable<MeetingRoomDto>>(ex.Message);
            }

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<MeetingRoomDto>>> Get(int id)
        {
            try
            {
                var meetingRoom = await meetingRoomService.GetMeetingRoomByIdAsync(id);
                if (meetingRoom == null)
                {
                    return NotFoundResponse<MeetingRoomDto>($"User with ID {id} not found");
                }

                return OkResponse(meetingRoom);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<MeetingRoomDto>(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<MeetingRoomDto>>> Post([FromBody] CreateMeetingRoomRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequestResponse<MeetingRoomDto>(ModelState);
                }

                var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
                var meetingRoom = await meetingRoomService.CreateMeetingRoomAsync(userId, request);
                return CreatedResponse(meetingRoom);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<MeetingRoomDto>("An error occurred while creating the meeting room.", ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<MeetingRoomDto>>> Put(int id, [FromBody] UpdateMeetingRoomRequestDto request)
        {
            try
            {
                var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
                var meetingRoom = await meetingRoomService.UpdateMeetingRoomAsync(id, request, userId);
                if (meetingRoom == null)
                {
                    return NotFoundResponse<MeetingRoomDto>($"User with ID {id} not found");
                }

                return OkResponse(meetingRoom);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<MeetingRoomDto>("An error occurred while updating the meeting room.", ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            try
            {
                await meetingRoomService.DeleteMeetingRoomAsync(id);
                return OkResponse(true);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<bool>("An error occurred while deleting the meeting room.", ex.Message);
            }
        }
    }
}
