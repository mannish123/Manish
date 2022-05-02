using Bhakti.Models.Common;
using System;

namespace Bhakti.Models.Event
{
    public class EventBookedSearch: PagingSorting
    {
        public int Id { get; set; }
        public bool? IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public int? EventId { get; set; }
        public string EventName { get; set; }
        public int? NumberOfSperitualRequired { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public decimal? TaxCost { get; set; }
        public decimal? TravelCost { get; set; }
        public decimal? OtherlCost { get; set; }
        public decimal? TotalCost { get; set; }
        public int? UserId { get; set; }
    }
}
