/**
 * Created by sungjin.kim on 14-11-20.
 */
$(window).ready(function () {
    $('#detail-item').on('show.bs.modal', function (event) {
        var selected = $(event.relatedTarget);
        $(this).find('.modal-thumb').attr('src', selected.find('img').attr('src'));
    });

    $('i.scroll').on('click', function (e) {
        var width = $(window).width();

        if (width > 1400) {
            $("html, body").animate({ scrollTop: "800px" }, 1000);
        }
    });
});