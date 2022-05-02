using Bhakti.Models.Common;

namespace Bhakti.Models.Account
{
    public class UserRoles : Base<int>
    {
        public int? UserId { get; set; }
        public int? RoleId { get; set; }
    }
}
