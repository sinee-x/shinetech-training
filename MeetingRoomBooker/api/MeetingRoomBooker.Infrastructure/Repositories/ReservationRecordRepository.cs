using Dapper;
using MeetingRoomBooker.Domain.Entities;
using MeetingRoomBooker.Domain.Repositories;
using System.Data;

namespace MeetingRoomBooker.Infrastructure.Repositories
{
    public class ReservationRecordRepository(IDbConnection dbConnection) : IReservationRecordRepository
    {
        public async Task<IEnumerable<ReservationRecord>> GetAllReservationsAsync()
        {
            const string sql = @"SELECT   
                                    r.Id,  
                                    u.Id as UserId,
                                    u.Username, 
                                    mr.Id as RoomId,
                                    mr.RoomName,  
                                    r.StartTime,  
                                    r.EndTime,  
                                    r.Status,  
                                    r.Subject  
                                FROM   
                                    Reservations r  
                                JOIN   
                                    Users u ON r.UserId = u.Id  
                                JOIN   
                                    MeetingRooms mr ON r.RoomId = mr.Id;";
            return await dbConnection.QueryAsync<ReservationRecord>(sql);
        }

        public async Task<ReservationRecord?> GetReservationByIdAsync(int id)
        {
            const string sql = @"SELECT   
                                    r.Id,  
                                    u.Id as UserId,
                                    u.Username, 
                                    mr.Id as RoomId,
                                    mr.RoomName,  
                                    r.StartTime,  
                                    r.EndTime,  
                                    r.Status,  
                                    r.Subject   
                                FROM   
                                    Reservations r  
                                JOIN   
                                    Users u ON r.UserId = u.Id  
                                JOIN   
                                    MeetingRooms mr ON r.RoomId = mr.Id;";
            return await dbConnection.QueryFirstOrDefaultAsync<ReservationRecord>(sql, new { Id = id });
        }

        public async Task<IEnumerable<ReservationRecord>> GetReservationsByMeetingRoomIdAsync(int meetingRoomId)
        {
            const string sql = @"SELECT   
                                    r.Id,  
                                    u.Id as UserId,
                                    u.Username, 
                                    mr.Id as RoomId,
                                    mr.RoomName,  
                                    r.StartTime,  
                                    r.EndTime,  
                                    r.Status,  
                                    r.Subject   
                                FROM   
                                    Reservations r  
                                JOIN   
                                    Users u ON r.UserId = u.Id  
                                JOIN   
                                    MeetingRooms mr ON r.RoomId = mr.Id;";
            return await dbConnection.QueryAsync<ReservationRecord>(sql, new { RoomId = meetingRoomId });
        }

        public async Task<IEnumerable<ReservationRecord>> GetReservationsByUserIdAsync(int userId)
        {
            const string sql = @"SELECT   
                                    r.Id,  
                                    u.Id as UserId,
                                    u.Username, 
                                    mr.Id as RoomId,
                                    mr.RoomName,  
                                    r.StartTime,  
                                    r.EndTime,  
                                    r.Status,  
                                    r.Subject   
                                FROM   
                                    Reservations r  
                                JOIN   
                                    Users u ON r.UserId = u.Id  
                                JOIN   
                                    MeetingRooms mr ON r.RoomId = mr.Id;";
            return await dbConnection.QueryAsync<ReservationRecord>(sql, new { UserId = userId });
        }

    }
}
