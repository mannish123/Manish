using System;
using System.Collections.Generic;

namespace Bhakti.Data
{
    public partial class User
    {
        public User()
        {
            UserRole = new HashSet<UserRole>();
        }

        public int Id { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ResetPasswordCode { get; set; }
        public DateTime? ResetPasswordCodeExpireTime { get; set; }
        public string Otp { get; set; }
        public DateTime? OtpexpireTime { get; set; }
        public int? RegistrationId { get; set; }
        public int? UserTypeId { get; set; }

        public virtual UserType UserType { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
