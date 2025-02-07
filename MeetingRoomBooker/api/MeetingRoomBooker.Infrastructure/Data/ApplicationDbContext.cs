using MeetingRoomBooker.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MeetingRoomBooker.Infrastructure.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<MeetingRoom> MeetingRooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User 
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<User>()
                .Property(u => u.PasswordHash)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .IsRequired();

            // MeetingRoom 
            modelBuilder.Entity<MeetingRoom>()
                .HasKey(m => m.Id);

            modelBuilder.Entity<MeetingRoom>()
                .Property(m => m.RoomName)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<MeetingRoom>()
                .Property(m => m.Status)
                .HasDefaultValue("Available");

            modelBuilder.Entity<MeetingRoom>()
                .Property(m => m.AvailableTime)
                .HasMaxLength(255);

            modelBuilder.Entity<MeetingRoom>()
                .Property(m => m.Notes)
                .HasColumnType("TEXT");

            // Reservation 
            modelBuilder.Entity<Reservation>()
                .HasKey(r => r.Id);

            modelBuilder.Entity<Reservation>()
                .Property(r => r.UserId)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.RoomId)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.StartTime)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.EndTime)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.Status)
                .HasDefaultValue("InProgress");

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.MeetingRoom)
                .WithMany()
                .HasForeignKey(r => r.RoomId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}