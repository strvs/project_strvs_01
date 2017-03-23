var sliderPeriod    = 5000;
var sliderTimer     = null;

$(document).ready(function() {

    $('.mobile-menu-link').click(function(e) {
        $('html').toggleClass('mobile-menu-open');
        e.preventDefault();
    });

    $('.gallery-item a').fancybox({
        baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
			'<div class="fancybox-bg"></div>' +
			'<div class="fancybox-controls">' +
				'<div class="fancybox-infobar">' +
					'<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
					'<div class="fancybox-infobar__body">' +
						'<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
					'</div>' +
					'<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
				'</div>' +
				'<div class="fancybox-buttons">' +
					'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
				'</div>' +
			'</div>' +
			'<div class="fancybox-slider-wrap">' +
				'<div class="fancybox-slider"></div>' +
			'</div>' +
			'<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
		'</div>'
    });

    $('.slider').each(function() {
        var curSlider = $(this);
        curSlider.data('curIndex', 0);
        curSlider.data('disableAnimation', true);
        if (curSlider.find('.slider-item').length > 1) {
            var curHTML = '';
            var i = 1;
            curSlider.find('.slider-item').each(function() {
                curHTML += '<a href="#">' + i + '</a>';
                i++;
            });
            $('.slider-ctrl').html(curHTML);
            $('.slider-ctrl a:first').addClass('active');
            sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
        }
        $(window).on('load resize', function() {
            var curSlider = $('.slider');
            curSlider.removeAttr('style');
            var curIndex = curSlider.data('curIndex');
            curSlider.css({'height': curSlider.find('.slider-item').eq(curIndex).height()});
        });
    });

    function sliderNext() {
        var curSlider = $('.slider');

        if (curSlider.data('disableAnimation')) {
            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex + 1;
            if (newIndex >= curSlider.find('.slider-item').length) {
                newIndex = 0;
            }

            curSlider.data('curIndex', newIndex);
            curSlider.data('disableAnimation', false);

            curSlider.find('.slider-item').eq(curIndex).css({'z-index': 2});
            curSlider.find('.slider-item').eq(newIndex).css({'z-index': 1}).show();

            curSlider.find('.slider-ctrl a.active').removeClass('active');
            curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

            curSlider.find('.slider-item').eq(curIndex).fadeOut(function() {
                curSlider.data('disableAnimation', true);
                sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
            });
            curSlider.animate({'height': curSlider.find('.slider-item').eq(newIndex).height()});
        }
    }

    $('.slider').on('click', '.slider-ctrl a', function(e) {
        if (!$(this).hasClass('active')) {
            window.clearTimeout(sliderTimer);
            sliderTimer = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = $('.slider-ctrl a').index($(this));

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-item').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-item').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('.slider-ctrl a.active').removeClass('active');
                curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                curSlider.find('.slider-item').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
                curSlider.animate({'height': curSlider.find('.slider-item').eq(newIndex).height()});
            }
        }

        e.preventDefault();
    });

    var cookieOptions = {path: '/'};
    var cookiePrefix = 'BITRIX_SM_';
    var font         = cookiePrefix + 'font';
    var color        = cookiePrefix + 'color';
    var style        = cookiePrefix + 'style';
    var spacing      = cookiePrefix + 'spacing';
    var special_v    = cookiePrefix + 'special_v';

    function Init() {
        $.cookie(special_v, '1', cookieOptions);
        $.cookie(font, 'small', cookieOptions);
        $.cookie(color, 'white', cookieOptions);
        $.cookie(style, 'arial', cookieOptions);
        $.cookie(spacing, 'spacing-small', cookieOptions);

        $('#' + $.cookie(font)).addClass('selected');
        $('#' + $.cookie(color)).addClass('selected');
        $('#' + $.cookie(style)).addClass('selected');
        $('#' + $.cookie(spacing)).addClass('selected');
        $('body').addClass('special');
        $('body').addClass('white');

        $('#special-pannel').css('display', 'block');
    }

    function Refresh() {
        $('#special-pannel').css('display', 'block');

        $('#' + $.cookie(font)).addClass('selected');
        $('#' + $.cookie(color)).addClass('selected');
        $('#' + $.cookie(style)).addClass('selected');
        $('#' + $.cookie(spacing)).addClass('selected');

        $('body').addClass('special');
        $('body').addClass($.cookie(font));
        $('body').addClass($.cookie(color));
        $('body').addClass($.cookie(style));
        $('body').addClass($.cookie(spacing));
    }


    function SetFont(id) {
        var hasClass = $.cookie(font);
        $('body').removeClass(hasClass);

        switch (id) {
          case 'small':
            $('body').addClass('small');
            break;
          case 'medium':
            $('body').addClass('medium');
            break
          case 'big':
            $('body').addClass('big');
            break;
          default:
            $('body').addClass('small');
        }

        $('#' + $.cookie(font)).removeClass('selected');
        $.cookie(font, id, cookieOptions);
        $('#' + $.cookie(font)).addClass('selected');
    }

    function SetColor(id) {
        var hasClass = $.cookie(color);
        $('body').removeClass(hasClass);

        switch (id) {
          case 'white':
            $('body').addClass('white');
            break;
          case 'black':
            $('body').addClass('black');
            break
          case 'blue':
            $('body').addClass('blue');
            break;
          default:
            $('body').addClass('white');
        }

        $('#' + $.cookie(color)).removeClass('selected');
        $.cookie(color, id, cookieOptions);
        $('#' + $.cookie(color)).addClass('selected');
    }

    function SetStyle(id) {
        var hasClass = $.cookie(style);
        $('body').removeClass(hasClass);

        switch (id) {
          case 'arial':
            $('body').addClass('arial');
            break;
          case 'times':
            $('body').addClass('times');
            break
          default:
            $('body').addClass('arial');
        }

        $('#' + $.cookie(style)).removeClass('selected');
        $.cookie(style, id, cookieOptions);
        $('#' + $.cookie(style)).addClass('selected');
    }

    function SetSpacing(id) {
        var hasClass = $.cookie(spacing);
        $('body').removeClass(hasClass);

        switch (id) {
          case 'spacing-small':
            $('body').addClass('spacing-small');
            break;
          case 'spacing-normal':
            $('body').addClass('spacing-normal');
            break;
          case 'spacing-big':
            $('body').addClass('spacing-big');
            break;
          default:
            $('body').addClass('spacing-small');
        }

        $('#' + $.cookie(spacing)).removeClass('selected');
        $.cookie(spacing, id, cookieOptions);
        $('#' + $.cookie(spacing)).addClass('selected');
    }

    function SetToDefault() {
        $('body').removeClass($.cookie(font));
        $('body').removeClass($.cookie(color));
        $('body').removeClass($.cookie(style));
        $('body').removeClass($.cookie(spacing));
        $('body').removeClass('special');

        $('#' + $.cookie(font)).removeClass('selected');
        $('#' + $.cookie(color)).removeClass('selected');
        $('#' + $.cookie(style)).removeClass('selected');
        $('#' + $.cookie(spacing)).removeClass('selected');

        $.cookie(font, null, {path:'/'});
        $.cookie(color, null, {path:'/'});
        $.cookie(style, null, {path:'/'});
        $.cookie(special_v, null, {path:'/'});

        if($('#anounce').length) {
            $('#anounce').elementSlide({
                show_items: 1,
                step: 1
            });
        }

        if($('#new_slide').length) {
            $('#new_slide').elementSlide({
                show_items: 3,
                step: 3
            });
        }

        $('#special-pannel').css('display', 'none');
    }

    if ($.cookie(special_v) == '1') {
       Refresh();
    }

    $('#special-pannel .font a').click(function(e){
        SetFont($(this).attr('id'));
        e.preventDefault();
    });

    $('#special-pannel .color a').click(function(e){
        SetColor($(this).attr('id'));
        e.preventDefault();
    });

    $('#special-pannel .style a').click(function(e){
        SetStyle($(this).attr('id'));
        e.preventDefault();
    });

    $('#special-pannel .spacing a').click(function(e){
        SetSpacing($(this).attr('id'));
        e.preventDefault();
    });

    $('#special-pannel .todefault a').click(function(e){
        SetToDefault();
        e.preventDefault();
    });

    $('.special-link a').click(function(e) {
        Init();
        e.preventDefault();
    });

    $('nav .container > ul > li').each(function() {
        if ($(this).find('ul').length > 0) {
            $(this).addClass('with-submenu');
        }
    });

    $('nav .container > ul > li > a').click(function(e) {
        if ($(window).width() < 1240 && $(this).parent().hasClass('with-submenu')) {
            $(this).parent().toggleClass('open');
            e.preventDefault();
        }
    });

});