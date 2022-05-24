using Bhakti.Helpers;
using Bhakti.Models.Enums;
using Bhakti.Models.Event;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bhakti.Controllers
{
    public class EventController : Controller
    {

        private int UserId = 1;// HttpContext.Session.TryGetValue("UserId");//read userid from sessions
        [HttpPost]
        public IActionResult SearchBookedEvent(EventBookedSearch eventBookedSearch)
        {
            List<EventsBooked> eventsBooked = new List<EventsBooked>();

            if (eventBookedSearch.PageIndex == 0)
                eventBookedSearch.PageIndex = 1;



            var skip = (eventBookedSearch.PageIndex - 1) * (int)eventBookedSearch.PageSize;
            using (var dbContext = new Data.BhaktiContext())
            {
                var eventBooked = dbContext.EventsBooked
                                .Join(
                                    dbContext.EventType,
                                    evntb => evntb.EventTypeId,
                                    evnt => evnt.Id,
                                    (evntb, evnt) => new {
                                        Id = evntb.Id,
                                        NumberOfSperitualRequired = evntb.NumberOfSperitualRequired,
                                        FromDate = evntb.FromDate,
                                        ToDate = evntb.ToDate,
                                        OtherCost = evntb.OtherCost,
                                        TaxCost = evntb.TaxCost,
                                        TotalCost = evntb.TotalCost,
                                        TravelCost = evntb.TravelCost,
                                        EventTypeId = evntb.EventTypeId,
                                        EventName = evntb.EventName,
                                        UpdatedBy = evntb.UpdatedBy,
                                        UpdatedDate = evntb.UpdatedDate,
                                        CreatedBy = evntb.CreatedBy,
                                        CreatedDate = evntb.CreatedDate,
                                        ApprovedBy = evntb.ApprovedBy,
                                        IsApproved = evntb.IsApproved,
                                        ApprovedDate = evntb.ApprovedDate,
                                        IsActive = evntb.IsActive,
                                        IsDeleted = evntb.IsDeleted,
                                        EventType=evntb.EventType,
                                    }
                                )
                                
                                //.Where(fullEntry => fullEntry.CreatedBy == UserId)
                                .Take(Convert.ToInt32(eventBookedSearch.PageSize));


                foreach (var item in eventBooked)
                {
                    eventsBooked.Add(new EventsBooked()
                    {
                        Id = item.Id,
                        CreatedBy = item.CreatedBy,
                        CreatedDate = Convert.ToDateTime(item.CreatedDate),
                        EventTypeId = Convert.ToInt32(item.EventTypeId),
                        EventName = item.EventName,
                        NumberOfSperitualRequired = Convert.ToInt32(item.NumberOfSperitualRequired),
                        IsApproved = Convert.ToBoolean(item.IsApproved),
                        ApprovedBy = Convert.ToInt32(item.ApprovedBy),
                        ApprovedDate = Convert.ToDateTime(item.ApprovedDate),
                        TaxCost = Convert.ToDecimal(item.TaxCost),
                        TotalCost = Convert.ToDecimal(item.TotalCost),
                        TravelCost = Convert.ToDecimal(item.TravelCost),
                        UpdatedBy = Convert.ToInt32(item.UpdatedBy),
                        UpdatedDate = Convert.ToDateTime(item.UpdatedDate),
                        ToDate = Convert.ToDateTime(item.ToDate),
                        FromDate = Convert.ToDateTime(item.FromDate),
                        OtherCost = Convert.ToDecimal(item.OtherCost),
                        TotalRecords = eventsBooked.Count(),
                        IsActive = Convert.ToBoolean(item.IsActive),
                        IsDeleted = Convert.ToBoolean(item.IsDeleted),
                        EventTypeName = item.EventType.Name
                    });
                }
            }



            return PartialView("~/Views/Shared/Event/EventsBookedResult.cshtml", eventsBooked);
        }

        public IActionResult GetEventsBooked(EventBookedSearch eventBookedSearch)
        {
            eventBookedSearch =new EventBookedSearch();
            return View("~/Views/Event/EventBookedSearch.cshtml", eventBookedSearch);
        }
        public async Task<IActionResult> BookNewEvent(int BookEventId)
        {
            EventsBooked response = new EventsBooked();
            try
            {
                using (var dbContext = new Data.BhaktiContext())
                {
                    ViewBag.EventType = dbContext.EventType.ToList();

                    var eventsBooked = dbContext.EventsBooked
                                .Join(
                                    dbContext.EventType,
                                    evntb => evntb.EventTypeId,
                                    evnt => evnt.Id,
                                    (evntb, evnt) => new {
                                        Id = evntb.Id,
                                        NumberOfSperitualRequired = evntb.NumberOfSperitualRequired,
                                        FromDate = evntb.FromDate,
                                        ToDate = evntb.ToDate,
                                        OtherCost = evntb.OtherCost,
                                        TaxCost = evntb.TaxCost,
                                        TotalCost = evntb.TotalCost,
                                        TravelCost = evntb.TravelCost,
                                        EventTypeId = evntb.EventTypeId,
                                        EventName = evntb.EventName,
                                        UpdatedBy = evntb.UpdatedBy,
                                        UpdatedDate = evntb.UpdatedDate,
                                        CreatedBy = evntb.CreatedBy,
                                        CreatedDate = evntb.CreatedDate,
                                        ApprovedBy = evntb.ApprovedBy,
                                        IsApproved = evntb.IsApproved,
                                        ApprovedDate = evntb.ApprovedDate,
                                        IsActive = evntb.IsActive,
                                        IsDeleted = evntb.IsDeleted,
                                        EventType = evntb.EventType,
                                    }
                                ).Where(fullEntry => fullEntry.Id == BookEventId).SingleOrDefault();

                    if (eventsBooked!=null && eventsBooked.Id>0) {
                        response.Id = eventsBooked.Id;
                        response.CreatedBy = eventsBooked.CreatedBy;
                        response.CreatedDate = Convert.ToDateTime(eventsBooked.CreatedDate);
                        response.EventTypeId = Convert.ToInt32(eventsBooked.EventTypeId);
                        response.EventName = eventsBooked.EventName;
                        response.EventTypeName = eventsBooked.EventType.Name;
                        response.NumberOfSperitualRequired = Convert.ToInt32(eventsBooked.NumberOfSperitualRequired);
                        response.IsApproved = Convert.ToBoolean(eventsBooked.IsApproved);
                        response.ApprovedBy = Convert.ToInt32(eventsBooked.ApprovedBy);
                        response.ApprovedDate = Convert.ToDateTime(eventsBooked.ApprovedDate);
                        response.TaxCost = Convert.ToDecimal(eventsBooked.TaxCost);
                        response.TotalCost = Convert.ToDecimal(eventsBooked.TotalCost);
                        response.TravelCost = Convert.ToDecimal(eventsBooked.TravelCost);
                        response.UpdatedBy = Convert.ToInt32(eventsBooked.UpdatedBy);
                        response.UpdatedDate = Convert.ToDateTime(eventsBooked.UpdatedDate);
                        response.ToDate = Convert.ToDateTime(eventsBooked.ToDate);
                        response.FromDate = Convert.ToDateTime(eventsBooked.FromDate);
                        response.OtherCost = Convert.ToDecimal(eventsBooked.OtherCost);
                        response.IsActive = Convert.ToBoolean(eventsBooked.IsActive);
                        response.IsDeleted = Convert.ToBoolean(eventsBooked.IsDeleted);
                        response.EventTypeName = eventsBooked.EventType.Name;
                    }


                }
            }
            catch (Exception ex)
            {

            }

            return PartialView("~/Views/Shared/Event/BookNewEvent.cshtml", response);
        }
        public async Task<IActionResult> DeleteBookedEvent(int BookEventId)
        {
            string message = Messages.AppSetting["FailedToSave"];

            try
            {
                using (var dbContext = new Data.BhaktiContext())
                {
                    var eventsBooked = dbContext.EventsBooked
                                    .Where(fullEntry => fullEntry.Id == BookEventId).SingleOrDefault();
                    eventsBooked.IsDeleted = true;
                    eventsBooked.IsActive = false;
                    eventsBooked.UpdatedDate= DateTime.Now;
                    eventsBooked.UpdatedBy = UserId;

                    dbContext.EventsBooked.Update(eventsBooked);
                    dbContext.SaveChanges();

                    message = Messages.AppSetting["SaveSuccessFul"];
                }
            }
            catch (Exception ex)
            {

            }


            return Json(new
            {
                message = message,
                id = BookEventId
            });
        }

        public async Task<IActionResult> ApproveBookedEvent(int BookEventId)
        {
            string message = Messages.AppSetting["FailedToSave"];

            try
            {
                using (var dbContext = new Data.BhaktiContext())
                {
                    var eventsBooked = dbContext.EventsBooked
                                    .Where(fullEntry => fullEntry.Id == BookEventId).SingleOrDefault();
                    eventsBooked.IsApproved = true;
                    eventsBooked.ApprovedDate = DateTime.Now;
                    eventsBooked.ApprovedBy = UserId;

                    dbContext.EventsBooked.Update(eventsBooked);
                    dbContext.SaveChanges();

                    message = Messages.AppSetting["SaveSuccessFul"];
                }
            }
            catch (Exception ex)
            {

            }


            return Json(new
            {
                message = message,
                id = BookEventId
            });
        }

        [HttpPost]
        public async Task<IActionResult> BookAddUpdateEvent(EventsBooked  eventsBooked, bool isApproved)
        {
            int eventBookedId = 0;
            string message = Messages.AppSetting["FailedToSave"];
            Bhakti.Data.EventsBooked response = new Bhakti.Data.EventsBooked();
            try
            {
                if (eventsBooked != null && eventsBooked.Id > 0)
                {
                    response.Id = eventsBooked.Id;
                    response.CreatedBy = eventsBooked.CreatedBy;
                    response.CreatedDate = Convert.ToDateTime(eventsBooked.CreatedDate);
                    
                    response.EventTypeId = eventsBooked.EventTypeId;
                    response.EventName = eventsBooked.EventName;
                    response.NumberOfSperitualRequired = eventsBooked.NumberOfSperitualRequired;
                    response.IsApproved = eventsBooked.IsApproved;
                    response.ApprovedBy = eventsBooked.ApprovedBy;
                    response.ApprovedDate = eventsBooked.ApprovedDate;
                    response.TaxCost = eventsBooked.TaxCost;
                    response.TotalCost = eventsBooked.TotalCost;
                    response.TravelCost = eventsBooked.TravelCost;
                    
                    response.ToDate = eventsBooked.ToDate;
                    response.FromDate = eventsBooked.FromDate;
                    response.OtherCost = eventsBooked.OtherCost;
                    response.IsActive = Convert.ToBoolean(eventsBooked.IsActive);
                    response.IsDeleted = Convert.ToBoolean(eventsBooked.IsDeleted);
                }
                using (var dbContext = new Data.BhaktiContext())
                {
                    using (var dbContextTransaction = dbContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (response.Id > 0)
                            {
                                response.UpdatedBy = UserId;
                                response.UpdatedDate = DateTime.Now;

                                dbContext.EventsBooked.Update(response);
                            }
                            else
                            {
                                response.CreatedBy = UserId;
                                response.CreatedDate = DateTime.Now;
                                dbContext.EventsBooked.Add(response);
                            }

                            dbContext.SaveChanges();
                            eventBookedId = response.Id;

                            dbContextTransaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            //Log, handle or absorbe I don't care ^_^
                        }
                    }
                }
               
            }
            catch (Exception ex)
            {

            }
            if (eventBookedId > 0)
            {
                message = Messages.AppSetting["SaveSuccessFul"];
            }
            else
            {
                message = Messages.AppSetting["FailedToSave"];
            }
            return Json(new
            {
                message = message,
                id= eventBookedId
            });
           
        }
    }
}
