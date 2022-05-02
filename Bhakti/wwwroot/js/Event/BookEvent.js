$(document).ready(function () {
    SearchBookedEvent();

});

function SearchBookedEvent() {
    var formData = $('#formSearchBookedEvent').serialize();
    $.ajax({
        type: "POST",
        url: "/Event/SearchBookedEvent",
        data: formData,
        cache: false,
        success: function (data) {
            $("#_PartialSearchResult").html(data);
            
        },
        error: function () {
            alert("failed to load data")
        }
    });
}
function BookAddUpdateEvent() {
    var formData = $('#EventsBookedModelPartialDetailsForm').serialize();
    $.ajax({
        type: "POST",
        url: "/Event/BookAddUpdateEvent",
        data: formData,
        cache: false,
        success: function (data) {
            alert(data.message)
        },
        error: function () {
            alert(data.message)

        }
    });
    return false;
}

function BookNewEvent(BookEventId) {
    $.ajax({
        type: "GET",
        url: "/Event/BookNewEvent?BookEventId=" + BookEventId,
        cache: false,
        success: function (response) {
            $("#_BookNewEventModelContent").html(response);
            $("#BookNewEventModel").modal('show');
            $("#BookNewEventModel").removeClass('fade');
        },
        error: function (errors) {
            alert("Failed to get details.");
            $('#BookNewEventModel').modal('hide');
        }
    });
}

function DeleteBookedEvent(BookEventId) {
    $.ajax({
        type: "GET",
        url: "/Event/DeleteBookedEvent?BookEventId=" + BookEventId,
        cache: false,
        success: function (response) {
            alert(response.message)
        },
        error: function (errors) {
            alert("Failed to delete.");
        }
    });
}


function ApproveBookedEvent(BookEventId) {
    $.ajax({
        type: "GET",
        url: "/Event/ApproveBookedEvent?BookEventId=" + BookEventId,
        cache: false,
        success: function (response) {
            alert(response.message)
        },
        error: function (errors) {
            alert("Failed to delete.");
        }
    });
}