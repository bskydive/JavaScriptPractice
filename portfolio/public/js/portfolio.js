$(document).ready(function () {
    $(".column-double-center").addClass("col-md-12");
    $(".column-center").addClass("col-md-6");
    $(".column-thumbnail-center").addClass("col-md-3 text-center");




    function offsetResize() {

        //todo fix small bug:in small screen sizes navHeight changes after scroll at 3px
        var navTopHeight = $('.c-row-NavTop').height();
        var rowTagsHeight = $('.c-row-tags').height();
        var windowWidth = $(window).width();
        //var curXPos = $(document).body.scrollTop();
        //todo save scroll pos after resize

        if ( windowWidth >= 315) {

            $("#id_containerMain").css('padding-top', navTopHeight);
            $(".c-anchorOffset").css('top', -(navTopHeight));
            //window.scrollTo(curXPos+50,0);
        } else {
            $("#id_containerMain").css('padding-top', 0);
            $(".c-anchorOffset").css('top', -20);
        }

        //console.log('navTopHeight='+navTopHeight+'\nrowTagsHeight='+rowTagsHeight);

        //console.log(curXPos);

    }

    offsetResize();
    $(window).resize(function () {
        offsetResize();
    });

//
//    // Cache selectors
//    var lastId,
//        topMenu = $("#top-menu"),
//        topMenuHeight = topMenu.outerHeight()+15,
//    // All list items
//        menuItems = topMenu.find("a"),
//    // Anchors corresponding to menu items
//        scrollItems = menuItems.map(function(){
//            var item = $($(this).attr("href"));
//            if (item.length) { return item; }
//        }),
//        noScrollAction = false;
//
//// Bind click handler to menu items
//// so we can get a fancy scroll animation
//    menuItems.click(function(e){
//        var href = $(this).attr("href"),
//            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
//        noScrollAction = true;
//        $('html, body').stop().animate({
//            scrollTop: offsetTop
//        },{
//            duration: 300,
//            complete: function() {
//                menuItems
//                    .parent().removeClass("active")
//                    .end().filter("[href=" + href +"]").parent().addClass("active");
//                setTimeout(function(){ noScrollAction = false; }, 10);
//            }
//        });
//        e.preventDefault();
//    });
//
//// Bind to scroll
//    $(window).scroll(function(){
//        if(!noScrollAction){
//            // Get container scroll position
//            var fromTop = $(this).scrollTop()+topMenuHeight;
//
//            // Get id of current scroll item
//            var cur = scrollItems.map(function(){
//                if ($(this).offset().top < fromTop)
//                    return this;
//            });
//            // Get the id of the current element
//            cur = cur[cur.length-1];
//            var id = cur && cur.length ? cur[0].id : "";
//
//            if (lastId !== id) {
//                lastId = id;
//                // Set/remove active class
//                menuItems
//                    .parent().removeClass("active")
//                    .end().filter("[href=#"+id+"]").parent().addClass("active");
//            }
//        }
//    });

});

