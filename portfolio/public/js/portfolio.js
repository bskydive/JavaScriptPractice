$(document).ready(function () {
    $(".column-double-center").addClass("col-md-12");
    $(".column-center").addClass("col-md-6");

    $(".column-thumbnail-center").addClass("col-md-3 text-center");


    function offsetResize() {

        var navTopHeight = $('.c-columnNavTop').height();//todo fix small bug:in small screen sizes navHeight changes after scroll at 3px
        var windowWidth = $(window).width();

        if ( windowWidth >= 500) {

            $("#id_containerMain").css('padding-top', navTopHeight+50);
            $(".c-anchorOffset").css('top', -(navTopHeight - 30));
        } else {
            $("#id_containerMain").css('padding-top', 80);
            $(".c-anchorOffset").css('top', -20);
        }

        //console.log(navTopHeight);
    }

    offsetResize();
    $(window).resize(function () {
        offsetResize();
    });

});

