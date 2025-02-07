using MeetingRoomBooker.Application.Interfaces;
using MeetingRoomBooker.Application.Services;
using MeetingRoomBooker.Domain.Repositories;
using MeetingRoomBooker.Infrastructure.Data;
using MeetingRoomBooker.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System.Data;

namespace MeetingRoomBooker.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Database context
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection"))
                )
            );

            // Dapper connection
            services.AddScoped<IDbConnection>(sp =>
                new MySqlConnection(configuration.GetConnectionString("DefaultConnection")));

            // Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IReservationRepository, ReservationRepository>();
            services.AddScoped<IMeetingRoomRepository, MeetingRoomRepository>();
            services.AddScoped<DapperContext, DapperContext>();

            // Application Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IReservationService, ReservationService>();
            services.AddScoped<IMeetingRoomService, MeetingRoomService>();

            return services;
        }
    }
}
