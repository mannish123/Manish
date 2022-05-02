using System;
using System.Collections.Generic;

namespace Bhakti.Data
{
    public partial class Events
    {
        public Events()
        {
            EventsBooked = new HashSet<EventsBooked>();
        }

        public int Id { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public int? EventTypeId { get; set; }

        public virtual EventType EventType { get; set; }
        public virtual ICollection<EventsBooked> EventsBooked { get; set; }
    }
}
