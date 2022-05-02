using Bhakti.Models.Common;
using System;

namespace Bhakti.Models.Event
{
    public partial class EventAddress : Base<int>
    {
        
        public bool? IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public int? EventsBookedId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public int? StateId { get; set; }
        public string ZipCode { get; set; }
    }
}
