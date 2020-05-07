$(document).ready(function () {
    /* Map circle animation*/
    window.setTimeout(function () {
        $('.graph-circle ').addClass('circle-animation');
    }, 1000);

    // Owl Carousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        mouseDrag: false,
        autoplay: true,
        animateOut: null,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    // client logos
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });

// tooltip for map
    tippy('.dot', {
        content: '<p>Lorem ipsum dolor sit amet, consectetuer adipi scing elit - Donec quam felis, ultricies nec</p>',
        theme: 'custom',
        arrow: false,
        placement: 'right',
    });

// jquery countup
    var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
    };

    var counts = [];

    $('.statvalue').each(function () {
        var num = $(this).attr('numx'); //end count
        var nuen = $(this).text();
        if (nuen === "") {
            nuen = 0;
        }

        counts.push(new CountUp(this, nuen, num, 0, 3, options));
    });

    // scroll-to-top
    var elm_class = '#scroll'; // Adjust this accordingly.
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) { // 300px from top
            $(elm_class).fadeIn();
        } else {
            $(elm_class).fadeOut();
        }
    });

    var waypoint1 = new Waypoint({
        element: document.getElementsByClassName("stats"),
        handler: function (direction) {
            if (direction == "up") {
                for (var i = 0; i < counts.length; i++) {
                    counts[i].reset();
                }
            } else {
                for (var i = 0; i < counts.length; i++) {
                    counts[i].start();
                }
            }
        },
        offset: "90%"
    });

    // bullet navigation
    $('.awesome-tooltip').tooltip({
        placement: 'left'
    });
    $(window).bind('scroll', function (e) {
        dotnavigation();
    });

    function dotnavigation() {
        var numSections = ($('section').length+100);
        $('#dot-nav li a').removeClass('active').parent('li').removeClass('active');
        $('section').each(function (i, item) {
            var ele = $(item), nextTop;
            // console.log(ele.next().html());
            if (typeof ele.next().offset() != "undefined") {
                nextTop = ele.next().offset().top;
            } else {
                nextTop = $(document).height();
            }
            if (ele.offset() !== null) {
                thisTop = ele.offset().top - ((nextTop - ele.offset().top) / numSections);
            } else {
                thisTop = 0;
            }
            var docTop = $(document).scrollTop();

            if (docTop >= thisTop && (docTop < nextTop)) {
                $('#dot-nav li').eq(i).addClass('active');
            }
        });
    }

    $('#dot-nav li').click(function () {
        var id = $(this).find('a').attr("href"),
            posi,
            ele,
            padding = 0;
        ele = $(id);
        posi = ($(ele).offset() || 0).top - padding;
        $('html, body').animate({scrollTop: posi}, 'slow');
        return false;
    });
});

