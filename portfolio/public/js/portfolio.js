$(document).ready(function () {
    $(".column-double-center").addClass("col-md-12");
    $(".column-center").addClass("col-md-6");

    $(".column-thumbnail-center").addClass("col-md-3 text-center");


    function offsetResize() {
        var navTopHeight = $('.c-columnNavTop').height();//todo fix small bug:in small screen sizes navHeight changes after scroll at 3px
        $("#id_containerMain").css('padding-top', navTopHeight);
        $(".c-anchorOffset").css('top', -(navTopHeight - 30));
        //console.log(-navTopHeight);
    }

    offsetResize();
    $(window).resize(function () {
        offsetResize();
    });

});

