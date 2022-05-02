using Bhakti.Models.Common;
using System;

namespace Bhakti.Models.Account
{
    public class Users:Base<int>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ResetPasswordCode { get; set; }
        public DateTime? ResetPasswordCodeExpireTime { get; set; }
        public string Otp { get; set; }
        public DateTime? OtpexpireTime { get; set; }
        public int? RegistrationId { get; set; }
        public int? UserTypeId { get; set; }
    }
}
