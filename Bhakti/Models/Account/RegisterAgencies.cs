using Bhakti.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace Bhakti.Models.Account
{
    public class RegisterAgencies : Base<int>
    {
        public string UserName { get; set; }
        [Required(ErrorMessage = "AgencyName is required")] 
        public string AgencyName { get; set; }
        [Required(ErrorMessage = "EmailId is required")] 
        public string EmailId { get; set; }
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
