var Colouring = {
    "sheet": "",
    "sheetObject": document.createElement('style'),
    "ColorJson": {},

    "ColourSheet": function () {

        Colouring.ColorJson = jQuery.parseJSON($('#colorRx').text());
        $.each(Colouring.ColorJson, function () {
            Colouring.sheet = Colouring.sheet + '.' + this.cssName + this.cssAttrubute + '\n';
            Colouring.sheet = Colouring.sheet + '.' + this.cssName + ' a ' + this.cssAttrubute + '\n';
        });

        Colouring.sheetObject.innerHTML = Colouring.sheet;
        document.body.appendChild(Colouring.sheetObject);
    },

    "ColouringDetails": function () {
        var tooltip = '';
        var cssName = '';

        $.each(Colouring.ColorJson, function () {
            tooltip = this.tooltip;
            cssName = this.cssName;
            $('.' + this.cssName).each(function (index, value) {
                $(value).attr({ 'data-tooltip': tooltip, 'class': 'custom-tooltip ' + cssName });
            });

        });
    }
};
