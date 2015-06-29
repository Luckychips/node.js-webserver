/**
 * Created by sungjin.kim on 14-11-20.
 */
$(window).ready(function () {
    $('.place_item').find('.hover_mask').on('click', function (e) {
//        alert($(this).siblings('img').attr('src'));
//        var options = {};
//        $('[data-remodal-id=modal]').remodal(options).open();

        var options = {};
        $('.remodal').find('img').attr('src', $(this).siblings('img').attr('src'));
        $('[data-remodal-id=modal]').remodal(options).open();
    });

    $('i.scroll').on('click', function (e) {
        var width = $(window).width();

        if (width > 1400) {
            $("html, body").animate({ scrollTop: "600px" }, 1000);
        }
    });
});