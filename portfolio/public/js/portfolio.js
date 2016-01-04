$(document).ready(function () {
    //$(".row-header").addClass("text-center");
    //$(".column-left").addClass("col-md-1");
    //$(".column-right").addClass("col-md-1");
    $(".column-double-center").addClass("col-md-12");
    $(".c-columnNavTop").addClass("col-md-12");
    //$(".column-left-center").addClass("col-md-7");
    //$(".column-right-center").addClass("col-md-3");


    //$(".container-main").addClass("container-fluid col-md-8");
    $(".column-thumbnail-center").addClass("col-md-3 text-center");
    //$(".column-double-center").addClass("bg-overlay");


        $("#id_containerMain").css('padding-top', $('.c-columnNavTop').height() + 100);
        $(window).resize(function(){
            $("#id_containerMain").css('padding-top', $('.c-columnNavTop').height() + 100);
        });

});

