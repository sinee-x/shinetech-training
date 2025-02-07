﻿using MeetingRoomBooker.Application.Common.Models; // 确保引用 ApiResponse  
using MeetingRoomBooker.Application.DTOs;
using MeetingRoomBooker.Application.DTOs.Requests;
using MeetingRoomBooker.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomBooker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ApiControllerBase
    {
        private readonly IReservationService reservationService;

        public ReservationController(IReservationService reservationService)
        {
            this.reservationService = reservationService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReservationDto>>>> Get()
        {
            try
            {
                var reservations = await reservationService.GetAllReservationsAsync();
                return OkResponse(reservations);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<IEnumerable<ReservationDto>>(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<ReservationDto>>> Get(int id)
        {
            try
            {
                var reservation = await reservationService.GetReservationByIdAsync(id);
                if (reservation == null)
                {
                    return NotFoundResponse<ReservationDto>($"Reservation with ID {id} not found.");
                }

                return OkResponse(reservation);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<ReservationDto>(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<ReservationDto>>> Post([FromBody] CreateReservationRequestDto request)
        {
            try
            {
                var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
                var reservation = await reservationService.CreateReservationAsync(userId, request);
                return CreatedResponse(reservation);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<ReservationDto>("An error occurred while creating the reservation.", ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<ReservationDto>>> Put(int id, [FromBody] UpdateReservationRequestDto request)
        {
            try
            {
                var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
                var reservation = await reservationService.UpdateReservationAsync(id, request, userId);
                if (reservation == null)
                {
                    return NotFoundResponse<ReservationDto>($"Reservation with ID {id} not found.");
                }

                return OkResponse(reservation);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<ReservationDto>("An error occurred while updating the reservation.", ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            try
            {
                await reservationService.DeleteReservationAsync(id);
                return OkResponse(true);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<bool>("An error occurred while deleting the reservation.", ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReservationDto>>>> GetReservationsByUserId(int userId)
        {
            try
            {
                var reservations = await reservationService.GetReservationsByUserIdAsync(userId);
                return OkResponse<IEnumerable<ReservationDto>>(reservations);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<IEnumerable<ReservationDto>>(ex.Message);
            }
        }

        [HttpGet("meetingroom/{meetingRoomId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReservationDto>>>> GetReservationsByMeetingRoomId(int meetingRoomId)
        {
            try
            {
                var reservations = await reservationService.GetReservationsByMeetingRoomIdAsync(meetingRoomId);
                return OkResponse(reservations);
            }
            catch (Exception ex)
            {
                return BadRequestResponse<IEnumerable<ReservationDto>>(ex.Message);
            }
        }
    }
}