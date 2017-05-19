/**
 * @author Hao Sun
 * @date 20160612
 * @fileoverview 简易分页
 */

$.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            pageLength: 3,
            perPage: 7,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);

    var listElement = $this;
    var perPage = settings.perPage;
    var children = listElement.children();
    var pager = $('.pager');
    //console.log(pager);
    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }

    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }

    var numItems = children.size();
    var numPages = Math.ceil(numItems/perPage);

    pager.data("curr",0);

    if (settings.showPrevNext){
        $('<li><a href="#" class="pagi prev_link">上一页</a></li>').appendTo(pager);
    }

    var curr = 0;
    /*
     while(numPages > curr && (settings.hidePageNumbers==false)){
     $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
     curr++;
     }*/
    function dispPagi() {
        $('<li class="currDisp active"><a class="currDisp" readonly>当前第'+(curr+1)+'页, ' +
            '共'+numPages+'页</a></li>').appendTo(pager);
    }

    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link">下一页</a></li>').appendTo(pager);
    }

    if (numPages > 15) {
        $('<li><a href="#" class="next10_link">后十页</a></li>').appendTo(pager);
    }

    dispPagi();

    pager.find('.prev_link').hide();
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }

    children.hide();
    children.slice(0, perPage).show();

    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;
        goTo(clickedPage,perPage);
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        //console.log(pager);
        return false;
    });
    pager.find('li .next10_link').click(function(){
        next10();
        return false;
    });

    function previous() {
        $(".currDisp").remove();
        curr--;
        dispPagi();
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }

    function next() {
        $(".currDisp").remove();
        curr++;
        dispPagi();
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }

    function next10() {
        $(".currDisp").remove();
        curr+=10;
        dispPagi();
        goToPage = parseInt(pager.data("curr")) + 10;
        goTo(goToPage);
    }

    function goTo(page){
        var startAt = page * perPage,
            endOn = startAt + perPage;

        children.css('display','none').slice(startAt, endOn).show();

        if (page>=1) {
            pager.find('.prev_link').show();
        }
        else {
            pager.find('.prev_link').hide();
        }

        if (page<(numPages-1)) {
            pager.find('.next_link').show();
        }
        else {
            pager.find('.next_link').hide();
        }

        if(page<(numPages-10)) {
            pager.find('.next10_link').show();
        }
        else {
            pager.find('.next10_link').hide();
        }

        pager.data("curr",page);
        //pager.children().removeClass("active");
        //pager.children().eq(curr).addClass("active");

    }
};

