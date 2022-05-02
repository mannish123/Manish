using Bhakti.Models.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace Bhakti.Models.Event
{
    //[Serializable]
    public class EventsBooked : Base<int>
    {
        public bool IsApproved { get; set; }
        public int ApprovedBy { get; set; }
        public string ApprovedByName { get; set; }
        public DateTime ApprovedDate { get; set; }
        public int EventId { get; set; }
        [Required]
        public int EventTypeId { get; set; }
        public string EventTypeName { get; set; }
        [Required]
        public string EventName { get; set; }
        [Required]
        public int NumberOfSperitualRequired { get; set; }
        [Required]
        public DateTime FromDate { get; set; }
        [Required]
        public DateTime ToDate { get; set; }
        public decimal TaxCost { get; set; }
        public decimal TravelCost { get; set; }
        public decimal OtherCost { get; set; }
        public decimal TotalCost { get; set; }

    }
}
