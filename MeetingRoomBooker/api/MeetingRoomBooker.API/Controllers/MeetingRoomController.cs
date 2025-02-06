using MeetingRoomBooker.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomBooker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingRoomController(IMeetingRoomService meetingRoomService) : ControllerBase
    {
    }
}
