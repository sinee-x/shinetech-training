using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomBooker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingRoomController(IMeetingRoomService meetingRoomService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var meetingRooms = await meetingRoomService.GetAllMeetingRoomsAsync();
            return Ok(meetingRooms);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var meetingRoom = await meetingRoomService.GetMeetingRoomByIdAsync(id);
            if (meetingRoom == null)
            {
                return NotFound();
            }

            return Ok(meetingRoom);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateMeetingRoomRequestDto request)
        {
            var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
            var meetingRoom = await meetingRoomService.CreateMeetingRoomAsync(userId, request);
            return CreatedAtAction(nameof(Get), meetingRoom);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateMeetingRoomRequestDto request)
        {
            var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
            var meetingRoom = await meetingRoomService.UpdateMeetingRoomAsync(id, request, userId);
            if (meetingRoom == null)
            {
                return NotFound();
            }

            return Ok(meetingRoom);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await meetingRoomService.DeleteMeetingRoomAsync(id);
            return Ok();
        }
    }
}
