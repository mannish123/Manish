using System;
using System.Collections.Generic;

namespace Bhakti.Data
{
    public partial class EventsBooked
    {
        public EventsBooked()
        {
            EventAddress = new HashSet<EventAddress>();
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
        public string EventName { get; set; }
        public int? NumberOfSperitualRequired { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public decimal? TaxCost { get; set; }
        public decimal? TravelCost { get; set; }
        public decimal? OtherCost { get; set; }
        public decimal? TotalCost { get; set; }
        public int? EventTypeId { get; set; }

        public virtual EventType EventType { get; set; }
        public virtual ICollection<EventAddress> EventAddress { get; set; }
    }
}
