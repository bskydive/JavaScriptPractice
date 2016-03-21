$(document).ready(function () {
    $(".column-double-center").addClass("col-md-12");
    $(".column-center").addClass("col-md-6");

    $(".column-thumbnail-center").addClass("col-md-3 text-center");


    function offsetResize() {

        var navTopHeight = $('.c-columnNavTop').height();//todo fix small bug:in small screen sizes navHeight changes after scroll at 3px
        var windowWidth = $(window).width();
        //var curXPos = $(document).body.scrollTop();//todo save scroll pos after resize

        if ( windowWidth >= 500) {

            $("#id_containerMain").css('padding-top', navTopHeight+50);
            $(".c-anchorOffset").css('top', -(navTopHeight - 30));
            //window.scrollTo(curXPos+50,0);
        } else {
            $("#id_containerMain").css('padding-top', 80);
            $(".c-anchorOffset").css('top', -20);
        }

        //console.log(navTopHeight);
        console.log(curXPos);

    }

    offsetResize();
    $(window).resize(function () {
        offsetResize();
    });

});

