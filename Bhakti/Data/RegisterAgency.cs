using System;
using System.Collections.Generic;

namespace Bhakti.Data
{
    public partial class RegisterAgency
    {
        public int Id { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string AgencyName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNumber { get; set; }
    }
}
