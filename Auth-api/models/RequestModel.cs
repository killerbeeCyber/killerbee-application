using System.ComponentModel.DataAnnotations;

namespace KillerBee
{
    public class LoginModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }

    public class RegisterModel
    {
        [Required(ErrorMessage = "User Name is required")]
        [MaxLength(250)]
        public string? Username { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [MaxLength(250)]
        public string? Password { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(320)]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Phone number is required")]
        [MaxLength(15)]
        public string? Phone { get; set; }
        [Required(ErrorMessage = "Address is required")]
        [MaxLength(320)]
        public string? Address { get; set; }
    }
}