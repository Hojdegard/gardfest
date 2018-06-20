$(function () {
    if ($('.nav-link').length) {
        const path = window.location.pathname;
        $('.nav-link').each( function(){
            $(this).addClass( path === $(this)[0].getAttribute("href") ? " active" : "");
        });
    }
});