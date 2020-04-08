/** Jquery Count up numbers when scrolled into view
 * Add class 'jquery-countup' to heading or paragraph tag with a number to count up to
 * ie <h1 class="jquery-countup">100</h1>
 * **/

function countUp(element) {
    //duration of count = 2000ms
    var time = 2;
    var num = element.text();
    num = parseInt(num.replace(/ /g, ''));
    //set this number to 0
    element
        .text(0);
    //figure out what to count up in
    var inc = parseInt(num) / (time * 20);
    var current = 0
    var timer = setInterval(function () {
        current += inc;
        element
            .text(format("#,###.##", parseInt(current)));
        if (current >= num) {
            clearInterval(timer);
        }
    }, 25);
}

var hasScrolled = false;

function isScrolledIntoView(elem) {
    if (typeof (elem) !== 'undefined') {
        var docViewTop = jQuery(window).scrollTop();
        var docViewBottom = docViewTop + jQuery(window).height();
        var elemTop = jQuery(elem).offset().top;
        var elemBottom = elemTop + jQuery(elem).height();
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
}

jQuery(window).scroll(function () {
    if ($('.jquery-countup').length) {
        if (isScrolledIntoView('.jquery-countup') && hasScrolled == false) {
            hasScrolled = true; //only do this once
            jQuery('.jquery-countup').each(function () {
                countUp(jQuery(this));
            });
        }
    }
});

/**
 IntegraXor Web SCADA - JavaScript Number Formatter
 http://www.integraxor.com/
 author: KPL, KHL
 (c)2011 ecava
 Dual licensed under the MIT or GPL Version 2 licenses.
 **/
window.format = function (b, a) {
    if (!b || isNaN(+a)) return a;
    var a = b.charAt(0) == "-" ? -a : +a, j = a < 0 ? a = -a : 0, e = b.match(/[^\d\-\+#]/g),
        h = e && e[e.length - 1] || ".", e = e && e[1] && e[0] || ",", b = b.split(h),
        a = a.toFixed(b[1] && b[1].length), a = +a + "", d = b[1] && b[1].lastIndexOf("0"), c = a.split(".");
    if (!c[1] || c[1] && c[1].length <= d) a = (+a).toFixed(d + 1);
    d = b[0].split(e);
    b[0] = d.join("");
    var f = b[0] && b[0].indexOf("0");
    if (f > -1) for (; c[0].length < b[0].length - f;) c[0] = "0" + c[0]; else +c[0] == 0 && (c[0] = "");
    a = a.split(".");
    a[0] = c[0];
    if (c = d[1] && d[d.length -
    1].length) {
        for (var d = a[0], f = "", k = d.length % c, g = 0, i = d.length; g < i; g++) f += d.charAt(g), !((g - k + 1) % c) && g < i - c && (f += e);
        a[0] = f
    }
    a[1] = b[1] && a[1] ? h + a[1] : "";
    return (j ? "-" : "") + a[0] + a[1]
};