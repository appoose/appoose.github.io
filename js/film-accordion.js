$(function() {

    $(document).ready(function(){

        // $(".fancybox").fancybox(); 
        $(".various").fancybox({
            maxWidth    : 800,
            maxHeight   : 600,
            fitToView   : false,
            width       : '70%',
            height      : '70%',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
        });
        
        if($(window).width() > 767){
            if ($(".navigation").height() > $(".content").height()){
               $(".content").height($(".navigation").height());
            }
            else{
               $(".navigation").height($(".content").outerHeight());
            }
        }

        if (window.location.hash != ""){
            console.log(window.location.hash);
            $(window.location.hash).parent().find('dt:first').click();     
        }
    });

    // Set up variables
    var $el, $parentWrap, $otherWrap, 
        $allTitles = $("dt").css({
            padding: 5, // setting the padding here prevents a weird situation, where it would start animating at 0 padding instead of 5
            "cursor": "pointer" // make it seem clickable
        }),
        $allCells = $("dd").css({
            position: "relative",
            top: -1,
            left: 0,
            display: "none" // info cells are just kicked off the page with CSS (for accessibility)
        });

    // clicking image of inactive column just opens column, doesn't go to link   
    $(".page-wrap").delegate("a.image","click", function(e) { 
        
        if ( !$(this).parent().hasClass("curCol") ) {         
            e.preventDefault(); 
            $(this).next().find('dt:first').click(); 
        } 
        
    });

    // $('a[href^="#"]').click(function(){
    //    $(this).next("dd").slideUp(); 
    // });


    $(".collapse").click(function(){
        $(this).parent().slideUp();
        if ( $(window).scrollTop() > $(this).parent().offset().top){
            $('html,body').animate({
                scrollTop: ($(this).parent().offset().top-200)
            },0);
        }
        $(this).parent().prev("dt").removeClass("current");
        $(this).parent().prev("dt").children(".arrow").replaceWith('<span class="arrow">&#x25BC;</span>');   
    });

    // clicking on titles does stuff
    $(".page-wrap").delegate("dt", "click", function() {
    			 
    // cache this, as always, is good form
    $el = $(this);
    $parentWrap = $el.parent().parent();
    $otherWraps = $(".info-col").not($parentWrap);


    // if this is already the active cell, collapse it
    if ($el.hasClass("current")){
       $el.next("dd").slideUp();
       $el.children(".arrow").replaceWith('<span class="arrow">&#x25BC;</span>');   
       $el.removeClass("current");
    }else if (!$el.hasClass("current")) {
        

            // remove current cell from selection of all cells
            $allTitles = $("dt").not(this);
            
            $el.children(".arrow").replaceWith('<span class="arrow">&#x25B2;</span>');   
            // animate current title to larger size         
            // $el.child('.arrow').replaceWith('&#x25B2;')   
            $el.next().slideDown();
            
            // make the current column the large size
            $parentWrap.addClass("curCol");
            
            // make other columns the small size
            $otherWraps.removeClass("curCol");
            
            // make sure the correct column is current
            $allTitles.removeClass("current");
            $el.addClass("current");  
        
        }
        
    });

    $("#starter").trigger("click");

});
