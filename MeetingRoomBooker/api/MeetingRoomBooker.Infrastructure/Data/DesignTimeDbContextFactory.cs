using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MeetingRoomBooker.Infrastructure.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            // Get the API project directory
            var apiProjectPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "MeetingRoomBooker.API");

            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(apiProjectPath)
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();

            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            builder.UseMySql(connectionString,
                ServerVersion.AutoDetect(connectionString),
                b => b.MigrationsAssembly("MeetingRoomBooker.Infrastructure"));

            return new ApplicationDbContext(builder.Options);
        }
    }
}
