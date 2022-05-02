//Initial form value
var initialValue = '';
//Form value at page navigate away event
var userValue = '';
//Default navigate away message
var NAVIGATE_AWAY_MESSAGE = "You have unsaved changes, do you want to navigate?";
//Flag to track whether onbeforeunload event is fired already. Required for IE only
var onBeforeUnloadFired = false;
//Flag to disable onbeforeunload plugin 
var DISABLE_ONBEFOREUNLOAD_PLUGIN = false;
//Flag whether source Element class causing the firing of OnBeforeUnload event have "nonavigate" class
var IgnoreNavigateForEventSource = false;
var initialLoad = false;
var initialFormNo = 0;
var initalLoadtime;
var DelayTimeInSecond = 3000;
var forms = ['AddRx'];
var LoadTime = 3000;
var initialPopupValues = '';
var finalPopupValues = '';
var pupupinitialLoad = false;

//Read initial form values and attach the onbeforeunload event
$(document).ready(function () {    
    window.onbeforeunload = handleOnBeforeUnload;
    $('form').each(function (index, value) {
        var formId = $(this).attr('id');
        if (formId == 'AddRx') {
            LoadTime = 8000;
        }
    });
    setTimeout(function () {
        initialFormNo = GetNoOfForm();
        initialValue = GetFormValues();
        initalLoadtime = new Date();
        //GetUnSavedChangesMessage();
    }, LoadTime);
    //Detect whether the event source has "nonavigate" class specified
    //$("a,input,img").click(function() {
    //    IgnoreNavigateForEventSource = $(this).hasClass("nonavigate");
    //});  

    $('.UnSavedNavigation').click(function (event) {
        window.onbeforeunload = null;
        handleOnBeforeUnload(event, this, true, 'Click');       
    });  

    //$('.btnCancel').click(function (event) {
    //    window.onbeforeunload = null;
    //    handleOnBeforeUnload(event, this, true, 'Cancel');
    //}); 
    
    $('.modal').on('click', '.close', function (event) {
        window.onbeforeunload = null;
        ValidatePopupData(event, this);
        return false;
    });
    $('.modal').on('click', '.btn-secondary', function (event) { 
        if (this.innerText == "Close") {
            window.onbeforeunload = null;
            ValidatePopupData(event, this);
            return false;
        }
    });  
    $('.modal.fade').on("shown.bs.modal", function (e) {
        CollectPopupData();       
    });
    $('.UnSavedNavigationPopup').click(function (event) {
        CollectPopupData();
    });
    $('.linkBtn.save').click(function (e) {
        window.onbeforeunload = null;
    }); 
    
});

$(document).bind('keydown keyup', function (e) {
    var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (e)
        keycode = e.which;

    if (keycode == 116 || (e.ctrlKey && keycode == 116) || (e.ctrlKey && keycode == 82)) {
        window.onbeforeunload = null;
        handleOnBeforeUnload(e,null,true,'KeyPress');
    }
   
});
//Disables navigate away feature
function DisableNavigateAway() {
    DISABLE_ONBEFOREUNLOAD_PLUGIN = true;
}

//Sets navigate away message
function SetNavigateAwayMessage(message) {
    NAVIGATE_AWAY_MESSAGE = message;
}

//Do not show navigate away message for the specified element Id
function IgnoreNavigateAwayFor(elementId) {
    $("#" + elementId).addClass('nonavigate');
}

//Reads control values in the form
function GetFormValues() {
    var formValues = '';
        formValues = $('form').serialize();
        return formValues;
    
    //$.each($(':input').serializeArray(), function(i, field) {
    //    if (field.name != '__EVENTVALIDATION'
    //        && field.name != '__EVENTTARGET'
    //        && field.name != '__EVENTARGUMENT'
    //        && field.name != '__VIEWSTATE'
    //        && field.name != '__VIEWSTATEENCRYPTED') {            
    //        //var fieldType = $('#' + field.name).attr("type");
    //        //if (fieldType != undefined && fieldType != "hidden") {
    //           // debugger;
    //            var inputField = $('[name="' + field.name + '"]');
    //            var displayProperty = $(inputField).css("display");

    //            //Ignore the form element which have style property display="none"
    //            if (displayProperty != "none") {
    //                formValues = formValues + "-" + field.name + ":" + field.value;
    //            }
    //        //}
    //    }
    //});
    //$("select option:selected").each(function () {
    //    formValues = formValues + "-" + $(this).text();
    //});
    ////Read the check box element values as these are not returned by the form.serializeArray() Jquery method
    //$(':checkbox').each(function() {
    //    formValues = formValues + "-" + $(this).attr("checked");
    //});

    ////Read the check box element values as these are not returned by the form.serializeArray() Jquery method
    //$(':radio').each(function() {
    //    formValues = formValues + "-" + $(this).attr("checked");
    //});

    ////Read the check box element values as these are not returned by the form.serializeArray() Jquery method
    //$(':file').each(function() {
    //    formValues = formValues + "-" + $(this).val();
    //});
}

//Reset the onbeforeunload flag : Required for IE only as IE has a bug of firing the onbeforeunload
//event twice
function ResetOnBeforeUnloadFired() {
    onBeforeUnloadFired = false;
}

//OnBeforeUnload event handler
handleOnBeforeUnload = function (event, object, showCustom, type, url) {   
    //Do not show message if plugin is disabled 
    if (DISABLE_ONBEFOREUNLOAD_PLUGIN) return;
    //Execute function if the onbeforeunload not fired already : Required for IE only as IE has a bug of firing the onbeforeunload
    //event twice
    if (!onBeforeUnloadFired) {
        onBeforeUnloadFired = true;
        if (IgnoreNavigateForEventSource) {
            //Reset the flag
            IgnoreNavigateForEventSource = false;
            return;
        }

        //Reset the onBeforeUnloadFired flag after a few milliseconds. Meanwhile, display the navigate
        //away message if the initial form value is not same as current form value 

        //Resetting the onBeforeUnloadFired flag after a few milliseconds ensures that if the same event is fired
        //twice (In IE), the flag will be reset by this time and hence the same event handling codes will
        //not be executed
        window.setTimeout("ResetOnBeforeUnloadFired()", 10);
        var finalFormNo = GetNoOfForm();
        if (finalFormNo == initialFormNo) {
            userValue = GetFormValues();
        }
        else {
            for (var i = 0; i < initialFormNo; i++) {
                var _form = $('form')[i];
                userValue = userValue + $(_form).serialize();
            }
        }
        var currentLoadtime = new Date();
        var timediff = TimeDiff(initalLoadtime, currentLoadtime);
        //Display navigate away message if the initial form value and current form value is not the same
        if ((timediff && object) || showCustom) {
            var navfun = undefined;
            if (object) {
                navfun = $(object).attr("NavigateFunction");
            }
            if ((userValue.toLowerCase() != initialValue.toLowerCase()) && !initialLoad) {
                initialLoad = true;
                confirm(NAVIGATE_AWAY_MESSAGE).then(function (_result) {
                    if (_result) {
                        initialLoad = true;
                        showCustom = true;
                        if (type === "Cancel") {
                            location.href = window.location.href;
                        }
                        else if (type === 'KeyPress') {
                            location.href = window.location.href;
                        }
                        else if (type === 'Click') {
                            if (navfun === undefined) {
                                if (object) {
                                    location.href = $(object).attr('href');
                                }
                                else {
                                    location.href = window.location.href;
                                }
                            }
                            else {
                                eval(navfun);
                                // window[navfun]();
                            }
                        }
                        else if (type === 'MethodClick') {
                            if (url != "") {
                                window.location.href = url;
                            }
                            return true;
                        }
                        // event.target.click();
                    }
                    else {
                        initialLoad = false;
                        return false;
                    }
                });
                if (initialLoad && event != null) {
                //if (initialLoad) {
                    event.preventDefault();
                }
            }
            else {
                if (navfun) {
                    eval(navfun);
                    //window[navfun]();
                }
                else if (type === 'MethodClick') {
                    if (url != "") {
                        window.location.href = url;
                    }
                }
                return true;
            }
        }

        if (window.onbeforeunload != null) {
            if (userValue.toLowerCase() != initialValue.toLowerCase()) {
                if (typeof event == 'undefined') {
                    event = window.event;
                }
                if (event) {
                    event.returnValue = NAVIGATE_AWAY_MESSAGE;
                }
                return NAVIGATE_AWAY_MESSAGE;
            }
        }
    }
};
function TimeDiff(initalLoadtime, currentLoadtime) {
    var diff = currentLoadtime.getTime() - initalLoadtime.getTime();
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    if (ss < this.DelayTimeInSecond) {
        return false;
    }
    else {
        return true;
    }
}
function GetUnSavedChangesMessage() {
    $.ajax({
        type: "GET",
        url: "/Home/GetUnSavedChangesMessage",       
        success: function (data) {
            this.NAVIGATE_AWAY_MESSAGE = data;
        }
    });
}
function GetNoOfForm() {
    return $('form').length;
}
function CollectPopupData() {
    setTimeout(function () {       
        initialPopupValues = GetPopupData();
    }, 2000);
    return true;
}
function ValidatePopupData(_event, _obj) {
    if (IgnoreNavigateForEventSource) {
        IgnoreNavigateForEventSource = false;
        return;
    }
    finalPopupValues = GetPopupData();
    if ((initialPopupValues.toLowerCase() != finalPopupValues.toLowerCase())) {
        pupupinitialLoad = true;
        confirm(NAVIGATE_AWAY_MESSAGE).then(function (_result) {
            if (_result) {
                pupupinitialLoad = false;
                setTimeout(function () {
                    $('.modal.fade.active.in').modal('toggle');
                }, 300);
                return true;
            }
            else {
                return false;
            }
        });
        if (pupupinitialLoad) {
            if (_event != null) {
                _event.stopImmediatePropagation();
            }
        }
    }
    else {
        if ($(_obj).hasClass("CloseSOAPIntervention")) {
            $("#selectSOAPIntervention").modal('hide');
            $("#selectDispensedPatientModel").modal('show');
        }
    }
}
function GetPopupData() {
    var popupValues = ""; 
    var objModal = $('.modal-dialog').parent('.modal.fade.active.in');
    var _mdisplayProperty = $(objModal).css("display");
    if (_mdisplayProperty == 'block') {
        $(objModal).find('input[type=text]').each(function (idx, field) {
            var displayProperty = $(this).css("display");
            if (displayProperty != "none") {
                popupValues = popupValues + "-" + field.value;
            }
        });
        $(objModal).find('textarea').each(function (idx, field) {
            var displayProperty = $(this).css("display");
            if (displayProperty != "none") {
                popupValues = popupValues + "-" + field.value;
            }
        });
        
        $(objModal).find($('select option:selected')).each(function () {
            popupValues = popupValues + "-" + $(this).text();
        });
        //Read the check box element values as these are not returned by the form.serializeArray() Jquery method
        $(objModal).find($(':checkbox')).each(function () {
            popupValues = popupValues + "-" + $(this).prop("checked");
        });

        //Read the check box element values as these are not returned by the form.serializeArray() Jquery method
        $(objModal).find($(':radio')).each(function () {
            popupValues = popupValues + "-" + $(this).prop("checked");
        });

        //Read the check box element values as these are not returned by the form.serializeArray() Jquery method
        $(objModal).find($(':file')).each(function () {
            popupValues = popupValues + "-" + $(this).val();
        });
    }
    return popupValues;
}
function ValidateFormDataOnButtonClick(url) {   
    window.onbeforeunload = null;
    handleOnBeforeUnload(null, null, true, 'MethodClick', url); 
}