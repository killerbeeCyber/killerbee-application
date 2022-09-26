using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace KillerBee
{
    public class KillerBeeContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<ConnexionLog> ConnexionLogs { get; set; }

        public KillerBeeContext(DbContextOptions<KillerBeeContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer();
        }
    }

    [Index(nameof(Username), IsUnique = true)]
    [Index(nameof(Email), IsUnique = true)]
    [Index(nameof(Phone), IsUnique = true)]
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [MaxLength(250)]
        public string? Username { get; set; }
        [Required]
        [MaxLength(320)]
        public string? Email { get; set; }
        [Required]
        [MaxLength(15)]
        public string? Phone { get; set; }
        [Required]
        [MaxLength(320)]
        public string? Address { get; set; }

        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }

        public ICollection<Roles>? Roles { get; set; }
    }

    public class Token
    {
        [Key]
        public int TokenId { get; set; }
        [Required]
        public string? TokenValue { get; set; }

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
    }

    public class Roles
    {
        [Key]
        public int RoleId { get; set; }
        [Required]
        public string? RoleName { get; set; }
    }

    public class ConnexionLog
    {
        [Key]
        public int ConnexionLogId { get; set; }

        [Required]
        public DateTime ConnexionDateTime { get; set; }

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}