var TodayDate = new Date();
var ToDate = "";
var FromDate = "";
var ToDateDrugUtilized = "";
var FromDateDrugUtilized = "";
var NoDataAvailableMessage = "No Data Available";

function GetFormatedDate(formatedDate) {
    var dd = formatedDate.getDate();
    var mm = formatedDate.getMonth() + 1; //January is 0!

    var yyyy = formatedDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    formatedDate = mm + '/' + dd + '/' + yyyy;
    return formatedDate;
}

$(document).ready(function () {
    ToDate = GetFormatedDate(TodayDate);
    FromDate = GetFormatedDate(new Date(new Date().setDate(TodayDate.getDate() - 7)));
    ToDateDrugUtilized = GetFormatedDate(TodayDate);
    FromDateDrugUtilized = GetFormatedDate(new Date(new Date().setMonth(TodayDate.getMonth() - 1)));
    $('#FromDateDrugUtilized').val(FromDateDrugUtilized);
    $('#ToDateDrugUtilized').val(ToDateDrugUtilized);
    $('#FromDate').val(FromDate);
    $('#ToDate').val(ToDate);

    //=======================================================================================
    //Rx Process Region
    //=======================================================================================
    var chartObject = new chartClass('', '', '', false);

    $(".clsRxProcessedIcon").click(function () {
        if (!ValidateRxProcessedSearchCriteria()) {
            return false;
        }
        $('#RxProcessedGraphView,#graph-rx-processed').addClass('active');
        $('#RxProcessedReportView,#Report-rx-processed').removeClass('active');

        chartObject.type = $(this).attr('value');
        if (chartObject.type === "pie") {
            chartObject.enabled = true;
        }
        else {
            chartObject.enabled = false;
        }
        GetRxProcessedDetails(chartObject.type, chartObject.enabled);
    });
    $('#RxProcessedReportView').click(function () {
        $('.clsRxProcessedIcon').removeClass('active');
    });
    $('#RxProcessedGraphView').click(function () {
        $('#RxProcessedColIcon').click();
    });
    //=======================================================================================
    //Process Queue Region
    //=======================================================================================
    var processQueuechartObject = new processQueueChartClass('', '', '', false);

    $(".clsProcessQueueIcon").click(function () {
        $('#ProcessQueueGraphView,#graph-process-queues').addClass('active');
        $('#ProcessQueueReportView,#Report-process-queues').removeClass('active');
        processQueuechartObject.type = $(this).attr('value');
        if (processQueuechartObject.type === "pie") {
            processQueuechartObject.enabled = true;
        }
        else {
            processQueuechartObject.enabled = false;
        }
        GetProcessQueueDetails(processQueuechartObject.type, processQueuechartObject.enabled);
    });
    $('#ProcessQueueReportView').click(function () {
        $('.clsProcessQueueIcon').removeClass('active');
    });
    $('#ProcessQueueGraphView').click(function () {
        $('#processQueuePieId').click();
    });
    //=======================================================================================
    //Drug Utilization Region
    //=======================================================================================
    var ProductchartObject = new productSummaryChartClass('', '', '', false);

    $(".clsDrugUtilization").click(function () {
        if (!ValidateDrugUtilizedSearchCriteria()) {
            return false;
        }
        $('#DrugUtilizationGraphView,#graph-drug-util').addClass('active');
        $('#DrugUtilizationReportView,#Report-drug-util').removeClass('active');
        ProductchartObject.type = $(this).attr('value');
        if (ProductchartObject.type === "pie") {
            ProductchartObject.enabled = true;
        }
        else {
            ProductchartObject.enabled = false;
        }
        GetDrugUtilizationDetails(ProductchartObject.type, ProductchartObject.enabled);
    });
    $('#DrugUtilizationReportView').click(function () {
        $('.clsDrugUtilization').removeClass('active');
    });
    $('#DrugUtilizationGraphView').click(function () {
        $('#drugUtilizedBarId').click();
    });
    //=======================================================================================
    //Low Inventory Report Region
    //=======================================================================================
    var lowInventorychartObject = new lowInventorychartClass('', '', '', false);

    $(".clsLowInventory").click(function () {
        $('#LowInventoryGraphView,#graph-inventory-report').addClass('active');
        $('#LowInventoryReportView,#Report-inventory-report').removeClass('active');
        lowInventorychartObject.type = $(this).attr('value');
        if (lowInventorychartObject.type === "pie") {
            lowInventorychartObject.enabled = true;
        }
        else {
            lowInventorychartObject.enabled = false;
        }
        lowInventorychartObject.text = "";
        //lowInventorychartObject.CreateDynamicChart();
        GetLowInventoryDetails(lowInventorychartObject.type, lowInventorychartObject.enabled);
    });
    $('#LowInventoryReportView').click(function () {
        $('.clsLowInventory').removeClass('active');
    });
    $('#LowInventoryGraphView').click(function () {
        $('#lowInventoryColId').click();
    });
    //=======================================================================================
   
    $(window).on('load', function () {        
        setTimeout(function () {
            $(".loader").show();
            GetRxProcessedDetails('column', false);
        }, 500);

        setTimeout(function () {
            GetLowInventoryDetails('column', false);
        }, 1000);

        setTimeout(function () {
            GetProcessQueueDetails('pie', true);
        }, 1500);


        setTimeout(function () {
            GetDrugUtilizationDetails('bar', false);
            $(".loader").hide();
        }, 2000);
    });    
});
//=======================================================================================
//=======================================================================================
//Rx Process Report Region
function ValidateRxProcessedSearchCriteria() {
    var isValidSearch = 0;
    var FromDateRx = $('#FromDate').val();
    var ToDateRx = $('#ToDate').val();
    if (FromDateRx === "") {
        $('#FromDate').addClass('input-validation-error');
        isValidSearch++;
    }
    else {
        $('#FromDate').removeClass('input-validation-error');
    }
    if (ToDateRx === "" || new Date(ToDateRx) > TodayDate) {
        $('#ToDate').addClass('input-validation-error');
        isValidSearch++;
    }
    else {
        $('#ToDate').removeClass('input-validation-error');
    }
    if (isValidSearch > 0) return false;
    return true;
}
function OnFilterRxDetails() {

    if (!ValidateRxProcessedSearchCriteria()) {
        return false;
    }

    FromDate = $('#FromDate').val();
    ToDate = $('#ToDate').val();
    if ($.datepicker.parseDate('mm/dd/yy', ToDate) < $.datepicker.parseDate('mm/dd/yy', FromDate)) {
        alert('From-Date is greater than the To-Date');
        return false;
    }
    var graphType = $('#RxProcessedBody .chartType li a.active').attr('value');
    var islegend = false;
    if (graphType === "pie") {
        islegend = true;
    }
    GetRxProcessedDetails(graphType, islegend);
}
function GetRxProcessedDetails(graphType, islegend) {
    $('#RxProcessedBody #container').html('');
    $('#RxProcessedBody #RxProcessedReportBody').html('');
    var chartObject = new chartClass(graphType, "Time Interval", "Rx Processed", islegend);
    chartObject.GetProcessChartData(function (status) {
        if (status) {
            chartObject.CreateDynamicChart();
        }
    });
}

var chartClass = function (type, xAxisText, yAxisText, enabled) {
    var jsonData = new Array();
    jsonXaxisData = new Array();
    jsonYaxisData = new Array();

    this.type = type, this.text = '', this.xAxisText = xAxisText, this.yAxisText = yAxisText; this.enabled = enabled;
    var rxData = '';
    var rxDayName = '';
    var RxProcessedReport = '';
    this.GetProcessChartData = function (callback) {
        $.getJSON("/Home/GetRxProcessedDetails?FromDate=" + FromDate + "&ToDate=" + ToDate, function (RxData) {
            if (RxData !== "") {
                var data = JSON.parse(RxData);
                var jsonxDataTemp = new Array();
                var jsonyDataTemp = new Array();
                for (i = 0; i < data.length; i++) {

                    jsonData.push([data[i].TimeInterval, data[i].RxCount]);

                    jsonxDataTemp.push(data[i].TimeInterval);
                    jsonyDataTemp.push(data[i].RxCount);
                    RxProcessedReport += '<tr><td>' + data[i].TimeInterval + '</td><td>' + data[i].RxCount + '</td></tr>';
                }
                rxData = jsonyDataTemp.map(function (val) { return parseInt(val) }).join(',');
                rxDayName = jsonxDataTemp.map(function (val) { return String(val) }).join(',');
                jsonXaxisData.push(rxDayName);
                jsonYaxisData.push(rxData);
            }
            else {
                RxProcessedReport += '<tr><td colspan="2" align="center">' + NoDataAvailableMessage + '</td><td>';
            }
            $('#RxProcessedReportBody').html('').append(RxProcessedReport);           
            callback(true);
        });
    };
    this.CreateDynamicChart = function () {
        if (jsonData.length) {
            $('#RxProcessedBody .chartType,#RxProcessedBody .chartToggle').removeClass('disabled');
            $('#container').removeClass('noData');
            if ($('#container').length > 0) {
                Highcharts.chart('container', {
                    chart: {
                        type: this.type,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        styledMode: false
                    },
                    title: {
                        text: ''
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        },
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.1f}'
                            },
                            pointWidth: 20,
                            point: {
                                events: {
                                }
                            },
                            showInLegend: false
                        },
                    },
                    xAxis: {
                        type: 'category',
                        title: {
                            text: this.xAxisText,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                            },
                            rotation: 0
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: this.yAxisText,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                            }
                        }
                    },
                    legend: {
                        itemStyle: {
                            color: '#000000',
                            fontSize: '12px',
                            fontFamily: 'Open Sans, Verdana, sans-serif',
                            fontWeight: 'initial',
                            cursor: "default"
                        },
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        borderWidth: 0,
                        padding: 5,
                        itemMarginTop: 5,
                        itemMarginBottom: 5,
                        width: '30%'
                    },
                    exporting: {
                        enabled: false
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size: 11px">{point.key}</span><br/>',
                        pointFormat: 'Rx Processed: <b>{point.y:.1f} </b>',
                        style: {
                            fontSize: '11px',
                            fontFamily: 'Open Sans, Verdana, sans-serif',
                        }
                    },
                    series: [{
                        name: '',
                        colorByPoint: true,
                        data: jsonData
                    }]
                });
            }
        }
        else {
            $('#container').html('').text(NoDataAvailableMessage).addClass('noData');
            $('#RxProcessedBody .chartType,#RxProcessedBody .chartToggle').addClass('disabled');
        }
    };
};
//Rx Process Report Region Ends
//=======================================================================================
//=======================================================================================
//Process Queue Report Region
function GetProcessQueueDetails(graphType, islegend) {
    var processQueuechartObject = new processQueueChartClass(graphType, "Process Queue Stages", "Total Rx", islegend);
    processQueuechartObject.GetProcessChartData(function (status) {
        if (status) {
            processQueuechartObject.CreateDynamicChart();
        }
    });
}
var processQueueChartClass = function (type, xAxisText, yAxisText, enabled) {
    var jsonData = "";
    this.type = type, this.text = '', this.xAxisText = xAxisText, this.yAxisText = yAxisText; this.enabled = enabled;
    var ProcessQueueReport = '';
    this.GetProcessChartData = function (callback) {
        $.getJSON("/Home/GetProcessQueueDetails", function (RxData) {
            if (RxData !== "") {
                jsonData = JSON.parse(RxData);
                var data = JSON.parse(RxData);
                if (data.ProcessQueueDetails !== null) {
                    for (i = 0; i < data.length; i++) {
                        ProcessQueueReport += '<tr><td>' + data[i].name + '</td><td>' + data[i].y + '</td></tr>';
                    }
                }
            }
            else {
                ProcessQueueReport += '<tr><td colspan="2" align="center">' + NoDataAvailableMessage + '</td><td>';
            }
            $('#ProcessQueueReport tbody').html('').append(ProcessQueueReport);
            callback(true);
        });
    };

    this.CreateDynamicChart = function () {
        if (jsonData.length) {
            $('#ProcessQueueBody .chartType,#ProcessQueueBody .chartToggle').removeClass('disabled');
            $('#ProcessQueuecontainer').removeClass('noData');
            if ($('#ProcessQueuecontainer').length > 0) {
                Highcharts.chart('ProcessQueuecontainer', {
                    chart: {
                        type: this.type,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        styledMode: false
                    },
                    title: {
                        text: ''
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: false,
                            sliced: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        },
                        series: {
                            borderWidth: 0,
                            cursor: 'pointer',
                            sliced: true,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.1f}'
                            },
                            pointWidth: 15,
                            point: {
                                events: {
                                    click: function () {
                                        //alert(this.options.key);
                                        var url = "/ProcessQueue/ProcessQueueStages/Create?SearchType=" + this.options.key;
                                        window.open(url, "_blank");
                                    }
                                }
                            },
                            showInLegend: false
                        },
                    },
                    xAxis: {
                        type: 'category',
                        title: {
                            text: this.xAxisText,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                            },
                            rotation: 0
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: this.yAxisText,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                            }
                        }
                    },
                    legend: {
                        itemStyle: {
                            color: '#000000',
                            fontSize: '12px',
                            fontFamily: 'Open Sans, Verdana, sans-serif',
                            fontWeight: 'initial',
                            cursor: "default"
                        },
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        borderWidth: 0,
                        padding: 5,
                        itemMarginTop: 5,
                        itemMarginBottom: 5,
                        width: '30%'
                    },
                    exporting: {
                        enabled: false
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size: 11px">{point.key}</span><br/>',
                        pointFormat: 'Total Rx: <b>{point.y:.1f} </b>',
                        style: {
                            fontSize: '11px',
                            fontFamily: 'Open Sans, Verdana, sans-serif',
                        }
                    },
                    series: [{
                        name: '',
                        colorByPoint: true,
                        data: jsonData
                    }]
                });
            }
        }
        else {
            $('#ProcessQueuecontainer').html('').text(NoDataAvailableMessage).addClass('noData');
            $('#ProcessQueueBody .chartType,#ProcessQueueBody .chartToggle').addClass('disabled');
        }
    };
};
//Process Queue Report Region Ends
//=======================================================================================
//=======================================================================================
//Drug Utilization Report Region
function ValidateDrugUtilizedSearchCriteria() {
    var isValidSearch = 0;
    var FromDateDrugUtilized = $('#FromDateDrugUtilized').val();
    var ToDateDrugUtilized = $('#ToDateDrugUtilized').val();
    if (FromDateDrugUtilized === "") {
        $('#FromDateDrugUtilized').addClass('input-validation-error');
        isValidSearch++;
    }
    else {
        $('#FromDateDrugUtilized').removeClass('input-validation-error');
    }
    if (ToDateDrugUtilized === "" || new Date(ToDateDrugUtilized) > TodayDate) {
        $('#ToDateDrugUtilized').addClass('input-validation-error');
        isValidSearch++;
    }
    else {
        $('#ToDateDrugUtilized').removeClass('input-validation-error');
    }
    if (isValidSearch > 0) return false;
    return true;
}
function OnFilterDrugUtilizationDetails() {
    if (!ValidateDrugUtilizedSearchCriteria()) {
        return false;
    }
    FromDateDrugUtilized = $('#FromDateDrugUtilized').val();
    ToDateDrugUtilized = $('#ToDateDrugUtilized').val();
    var graphType = $('#DrugUtilizationBody .chartType li a.active').attr('value');
    var islegend = false;
    if (graphType === "pie") {
        islegend = true;
    }
    GetDrugUtilizationDetails(graphType, islegend);
}
function GetDrugUtilizationDetails(graphType, islegend) {
    $('#DrugUtilizationBody #ProductSummarycontainer').html('');
    $('#DrugUtilizationBody #DrugUtilizationReportBody').html('');
    var ProductchartObject = new productSummaryChartClass(graphType, "Product", "Quantity Used", islegend);

    ProductchartObject.GetProcessChartData(function (status) {
        if (status) {
            ProductchartObject.CreateDynamicChart();
        }
    });
}
var productSummaryChartClass = function (type, xAxisText, yAxisText, enabled) {
    var jsonData = "";
    var barWidth = 15;
    this.type = type, this.text = '', this.xAxisText = xAxisText, this.yAxisText = yAxisText; this.enabled = enabled;
    var DrugUtilization = '';
    this.GetProcessChartData = function (callback) {
        $.getJSON("/Home/GetDrugUtilizationDetails?From=" + FromDateDrugUtilized + "&To=" + ToDateDrugUtilized + "&scheduleId=" + $('#ScheduleDrugId').val(), function (RxData) {
            if (RxData !== "") {
                jsonData = JSON.parse(RxData);
                var data = JSON.parse(RxData);

                for (i = 0; i < data.length; i++) {
                    DrugUtilization += '<tr><td>' + data[i].name + '</td><td>' + data[i].y + '</td></tr>';
                }
                barWidth = jsonData.length < 5 ? 25 : 15;
            }
            else {
                DrugUtilization += '<tr><td colspan="2" align="center">' + NoDataAvailableMessage + '</td><td>';
            }
            $('#DrugUtilizationReportBody').html('').append(DrugUtilization);
            callback(true);
        });
    };

    this.CreateDynamicChart = function () {
        if (jsonData.length) {
            $('#DrugUtilizationBody .chartType,#DrugUtilizationBody .chartToggle').removeClass('disabled');
            $('#ProductSummarycontainer').removeClass('noData');
            if ($('#ProductSummarycontainer').length > 0) {
                Highcharts.chart('ProductSummarycontainer', {
                    chart: {
                        type: this.type,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        styledMode: false
                    },
                    title: {
                        text: ''
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: false,
                            sliced: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        },
                        series: {
                            borderWidth: 0,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.1f}'
                            },
                            pointWidth: barWidth,
                            point: {
                                events: {
                                    click: function () {
                                        //alert(this.options.key);
                                        var url = "/Product/ProductBasicInformation/Create?ProductId=" + this.options.key;
                                        window.open(url, "_blank");
                                    }
                                }
                            },
                            showInLegend: false
                        },
                    },
                    xAxis: {
                        type: 'category',
                        title: {
                            text: this.xAxisText,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                            },
                            rotation: 0
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: this.yAxisText,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                            }
                        }
                    },
                    legend: {
                        itemStyle: {
                            color: '#000000',
                            fontSize: '12px',
                            fontFamily: 'Open Sans, Verdana, sans-serif',
                            fontWeight: 'initial',
                            cursor: "default"
                        },
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        borderWidth: 0,
                        padding: 5,
                        itemMarginTop: 5,
                        itemMarginBottom: 5,
                        width: '30%'
                    },
                    exporting: {
                        enabled: false
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size: 11px">{point.key}</span><br/>',
                        pointFormat: 'Quantity Used: <b>{point.y:.1f} </b>',
                        style: {
                            fontSize: '11px',
                            fontFamily: 'Open Sans, Verdana, sans-serif',
                        }
                    },
                    series: [{
                        name: '',
                        colorByPoint: true,
                        data: jsonData
                    }]
                });
            }
        }
        else {
            $('#ProductSummarycontainer').html('').append(NoDataAvailableMessage).addClass('noData');
            $('#DrugUtilizationBody .chartType,#DrugUtilizationBody .chartToggle').addClass('disabled');
        }
    };
};
//Drug Utilization Report Region Ends
//=======================================================================================
//=======================================================================================
//Inventory tracking Report Region
function OnFilterLowInventoryDetails() {
    var graphType = $('#LowInventoryBody .chartType li a.active').attr('value');
    var islegend = false;
    if (graphType === "pie") {
        islegend = true;
    }
    GetLowInventoryDetails(graphType, islegend);
}
function GetLowInventoryDetails(graphType, islegend) {
    $('#LowInventoryBody #LowInventoryContainer').html('');
    $('#LowInventoryBody #LowInventoryReportBody').html('');
    var lowinventoryObject = new lowInventorychartClass(graphType, "Product", "Quantity Left", islegend);

    lowinventoryObject.GetProcessChartData(function (status) {        
        if (status) {
            lowinventoryObject.CreateDynamicChart();
        }
    });
}
var lowInventorychartClass = function (type, xAxisText, yAxisText, enabled) {  
    var jsonData = "";
    var barWidth = 15;
    this.type = type, this.text = '', this.xAxisText = xAxisText, this.yAxisText = yAxisText; this.enabled = enabled;
    var LowInventory = '';

    this.GetProcessChartData = function (callback) {
        $.getJSON("/Home/GetInventoryReport?inventoryId=" + $('#inventoryId').val() + "&scheduleid=" + $('#inventoryScheduleId').val(), function (RxData) {               
            if (RxData !== "") {
                jsonData = JSON.parse(RxData);
                var data = JSON.parse(RxData);
                for (i = 0; i < data.length; i++) {
                    LowInventory += '<tr><td>' + data[i].name + '</td><td>' + data[i].y + '</td></tr>';
                }
                barWidth = jsonData.length < 5 ? 25 : 15;
            }
            else {
                LowInventory += '<tr><td colspan="2" align="center">' + NoDataAvailableMessage + '</td><td>';
            }
            $('#LowInventoryReportBody').html('').append(LowInventory);
            callback(true);
        });              
    };

    this.CreateDynamicChart = function () {
        if (jsonData.length) {
            $('#LowInventoryBody .chartType,#LowInventoryBody .chartToggle').removeClass('disabled');
            $('#LowInventoryContainer').removeClass('noData');
            if ($('#LowInventoryContainer').length > 0) {
                Highcharts.chart('LowInventoryContainer', {
                    chart: {
                        type: this.type,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        styledMode: false
                    },
                    title: {
                        text: ''
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        },
                        series: {
                            borderWidth: 0,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.1f}'
                            },
                            pointWidth: barWidth,
                            point: {
                                events: {
                                    click: function () {
                                        //alert(this.options.key);
                                        var url = "/Inventory/ProductVendorInventory/ProductVendor?productId=" + this.options.key;
                                        window.open(url, "_blank");
                                    }
                                }
                            },
                            showInLegend: false
                        },
                    },
                    xAxis: {
                        type: 'category',
                        title: {
                            text: this.xAxisText,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                            },
                            rotation: 0
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: this.yAxisText,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Open Sans, Verdana, sans-serif',
                            }
                        }
                    },
                    legend: {
                        itemStyle: {
                            color: '#000000',
                            fontSize: '12px',
                            fontFamily: 'Open Sans, Verdana, sans-serif',
                            fontWeight: 'initial',
                            cursor: "default"
                        },
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        borderWidth: 0,
                        padding: 5,
                        itemMarginTop: 5,
                        itemMarginBottom: 5,
                        width: '30%'
                    },
                    exporting: {
                        enabled: false
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size: 11px">{point.key}</span><br/>',
                        pointFormat: 'Quantity Left: <b>{point.y:.1f} </b>',
                        style: {
                            fontSize: '11px',
                            fontFamily: 'Open Sans, Verdana, sans-serif',
                        }
                    },
                    series: [{
                        name: '',
                        colorByPoint: true,
                        data: jsonData
                    }]
                });
            }
        }
        else {
            $('#LowInventoryContainer').html('').text(NoDataAvailableMessage).addClass('noData');
            $('#LowInventoryBody .chartType,#LowInventoryBody .chartToggle').addClass('disabled');
        }
    };
};
//Inventory tracking Report Region Ends
//=======================================================================================




