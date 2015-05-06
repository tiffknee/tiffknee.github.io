/*! The MIT License (MIT)

 Copyright (c) 2014 Prince John Wesley <princejohnwesley@gmail.com>

 ADAPTED FOR HARVARD SEAS CS-171: DATA VISUALIZATION COURSE FINAL PROJECT HYDROCROPMONITOR

 **/
!function (a, b) {
    "use strict";
    a.fn.CircularSlider = function (c) {
        var d = this;
        if (0 !== d.find("div.jcs-panel").length)throw"Already Created!!!";
        var e = function (a, b) {
            a.jcsIndicator.width() && a.jcsIndicator.height() || a.jcsIndicator.css({
                width: b / 5 + "px",
                height: b / 5 + "px"
            })
        }, f = {
            Circle: {
                drawShape: function (a, b) {
                    var c = 2 * b, d = c + "px", e = a.jcs, f = a.jcsValue, g = a.jcsPanel;
                    e.css({width: d, height: d, "border-radius": d});
                    var i = c + b / 10;
                    g.css({"border-width": b / 10 + "px", "border-radius": i + "px"});
                    var j = e.outerWidth() - e.innerWidth() + (f.outerWidth() - f.innerWidth()), k = h.innerCircleRatio * b, l = b - k - j / 2;
                    f.css({
                        width: 2 * k + "px",
                        height: 2 * k + "px",
                        "font-size": k / 2 + "px",
                        top: l + "px",
                        left: l + "px"
                    })
                }, getCenter: function (a, b) {
                    return {x: a.left + b, y: a.top + b, r: b}
                }, deg2Val: function (a) {
                    if (0 > a || a > 359)throw"Invalid angle " + a;
                    a = (a + 90) % 360, Math.round(a * (j / 360)) + h.min;
                    return a = Math.floor(a/15)
                }, val2Deg: function (a) {
                    if (a < h.min || a > h.max)throw"Invalid range " + a;
                    var b = a - h.min;
                    var clock = (Math.round(b * (360 / j)) - 90) % 360
                    return clock*15+180
                }
            }, "Half Circle": {
                drawShape: function (a, b) {
                    var c = 2 * b, d = a.jcs, e = a.jcsValue, f = a.jcsPanel;
                    d.css({
                        width: c + "px",
                        height: b + "px",
                        "border-radius": c + "px " + c + "px 0 0",
                        "border-bottom": "none"
                    });
                    var g = c + b / 10;
                    f.css({
                        "border-width": b / 10 + "px",
                        "border-radius": g + "px " + g + "px 0 0",
                        "border-bottom": "none"
                    });
                    var i = d.outerWidth() - d.innerWidth() + (e.outerWidth() - e.innerWidth()), j = h.innerCircleRatio * b, k = b - j - i / 2;
                    e.css({
                        width: 2 * j + "px",
                        height: 2 * j + "px",
                        "font-size": j / 2 + "px",
                        top: k + "px",
                        left: k + "px"
                    })
                }, getCenter: function (a, b) {
                    return {x: a.left + b, y: a.top + b, r: b}
                }, deg2Val: function (a) {
                    if (0 > a || a > 359)throw"Invalid angle " + a;
                    return a = (a + 180) % 360, Math.round(a * (j / 180)) + h.min
                }, val2Deg: function (a) {
                    if (a < h.min || a > h.max)throw"Invalid range " + a;
                    var b = a - h.min;
                    return (Math.round(b * (180 / j)) - 180) % 360
                }
            }, "Half Circle Left": {
                drawShape: function (a, b) {
                    var c = 2 * b, d = a.jcs, e = a.jcsValue, f = a.jcsPanel;
                    d.css({
                        height: c + "px",
                        width: b + "px",
                        "border-radius": c + "px 0 0 " + c + "px",
                        "border-right": "none"
                    });
                    var g = c + b / 10;
                    f.css({
                        "border-width": b / 10 + "px",
                        "border-radius": g + "px 0 0" + g + "px",
                        "border-right": "none"
                    });
                    var i = d.outerWidth() - d.innerWidth() + (e.outerWidth() - e.innerWidth()), j = h.innerCircleRatio * b, k = b - j - i / 2;
                    e.css({
                        width: 2 * j + "px",
                        height: 2 * j + "px",
                        "font-size": j / 2 + "px",
                        top: k + "px",
                        left: k + "px"
                    })
                }, getCenter: function (a, b) {
                    return {x: a.left + 2 * b, y: a.top + 2 * b, r: 2 * b}
                }, deg2Val: function (a) {
                    if (0 > a || a > 359)throw"Invalid angle " + a;
                    return a = (a - 90) % 360, Math.round(a * (j / 180)) + h.min
                }, val2Deg: function (a) {
                    if (a < h.min || a > h.max)throw"Invalid range " + a;
                    var b = a - h.min;
                    return (Math.round(b * (180 / j)) + 90) % 360
                }
            }, "Half Circle Right": {
                drawShape: function (a, b) {
                    var c = 2 * b, d = a.jcs, e = a.jcsValue, f = a.jcsPanel;
                    d.css({
                        height: c + "px",
                        width: b + "px",
                        "border-radius": "0 " + c + "px " + c + "px 0",
                        "border-left": "none"
                    });
                    var g = c + b / 10;
                    f.css({
                        "border-width": b / 10 + "px",
                        "border-radius": "0 " + g + "px" + g + "px 0",
                        "border-left": "none"
                    });
                    var i = d.outerWidth() - d.innerWidth() + (e.outerWidth() - e.innerWidth()), j = h.innerCircleRatio * b, k = b - j - i / 2;
                    e.css({
                        width: 2 * j + "px",
                        height: 2 * j + "px",
                        "font-size": j / 2 + "px",
                        top: k + "px",
                        left: -k + "px"
                    })
                }, getCenter: function (a, b) {
                    return {x: a.left, y: a.top + 2 * b, r: 2 * b}
                }, deg2Val: function (a) {
                    if (0 > a || a > 359)throw"Invalid angle " + a;
                    return a = (a + 90) % 360, Math.round(a * (j / 180)) + h.min
                }, val2Deg: function (a) {
                    if (a < h.min || a > h.max)throw"Invalid range " + a;
                    var b = a - h.min;
                    return (Math.round(b * (180 / j)) - 90) % 360
                }
            }, "Half Circle Bottom": {
                drawShape: function (a, b) {
                    var c = 2 * b, d = a.jcs, e = a.jcsValue, f = a.jcsPanel;
                    d.css({
                        width: c + "px",
                        height: b + "px",
                        "border-radius": "0 0 " + c + "px " + c + "px",
                        "border-top": "none"
                    });
                    var g = c + b / 10;
                    f.css({
                        "border-width": b / 10 + "px",
                        "border-radius": "0 0 " + g + "px " + g + "px",
                        "border-top": "none"
                    });
                    var i = d.outerWidth() - d.innerWidth() + (e.outerWidth() - e.innerWidth()), j = h.innerCircleRatio * b, k = b - j - i / 2;
                    e.css({
                        width: 2 * j + "px",
                        height: 2 * j + "px",
                        "font-size": j / 2 + "px",
                        top: -k + "px",
                        left: k + "px"
                    })
                }, getCenter: function (a, b) {
                    return {x: a.left + b, y: a.top, r: b}
                }, deg2Val: function (a) {
                    if (0 > a || a > 359)throw"Invalid angle " + a;
                    return Math.round(a * (j / 180)) + h.min
                }, val2Deg: function (a) {
                    if (a < h.min || a > h.max)throw"Invalid range " + a;
                    var b = a - h.min;
                    return Math.round(b * (180 / j))
                }
            }
        }, g = {
            radius: 50,
            innerCircleRatio: "0.7",
            handleDist: 95,
            min: 0,
            max: 359,
            value: 0,
            clockwise: !0,
            labelSuffix: ":00",
            labelPrefix: "",
            shape: "Circle",
            touch: !0,
            animate: !0,
            animateDuration: 0,
            selectable: !1,
            slide: function (a, b) {
            },
            formLabel: b
        }, h = a.extend({}, g, c), i = function () {
            if ((0 | h.min) !== h.min)throw"Invalid min value : " + h.min;
            if ((0 | h.max) !== h.max)throw"Invalid max value : " + h.max;
            if ((0 | h.value) !== h.value)throw"Invalid initial value : " + h.value;
            if (h.max < h.min)throw"Invalid range : " + h.max + "<" + h.min;
            if (h.value < h.min && (h.value = h.min), h.value > h.max && (h.value = h.max), h.labelSuffix || (h.labelSuffix = g.labelSuffix), h.labelPrefix || (h.labelPrefix = g.labelPrefix), h.formLabel && !a.isFunction(h.formLabel) && (h.formLabel = g.formLabel), h.shape || (h.shape = g.shape), !f[h.shape])throw"Invalid shape : " + h.shape;
            if (!h.innerCircleRatio || h.innerCircleRatio < .1 || h.innerCircleRatio > .9)throw"Invalid innerCircleRatio. Expected: between 0.1 and 0.9, Found: " + h.innerCircleRatio;
            if ((0 | h.animateDuration) !== h.animateDuration || h.animateDuration < 0)throw"Invalid animate duration(in ms) : " + h.animateDuration;
            ((0 | h.handleDist) !== h.handleDist || h.handleDist <= 0 || h.handleDist > 100) && (h.handleDist = g.handleDist), h.animate = !!h.animate
        };
        i();
        var j = h.max - h.min + 1, k = a('<div class="jcs-panel"><div class="jcs"><span class="jcs-value"></span></div><div class="jcs-indicator"> </div></div>');
        k.appendTo(d);
        var l = Math.abs(parseInt(h.radius)) || g.radius, m = k.find("div.jcs"), n = k.find("div.jcs-indicator"), o = k.find("span.jcs-value"), p = {
            jcs: m,
            jcsPanel: k,
            jcsIndicator: n,
            jcsValue: o
        };
        f[h.shape].drawShape(p, l), e(p, l);
        var q = m.position(), r = m.outerWidth() - m.innerWidth(), s = n.outerWidth() - n.innerWidth(), t = (m.width() + r) / 2, u = (n.width() + s) / 2, v = f[h.shape].getCenter(q, t), w = !1, x = !1, y = function (a) {
            var b = {
                x: a.offsetX || a.originalEvent.layerX,
                y: a.offsetY || a.originalEvent.layerY
            }, c = b.x - v.x, d = b.y - v.y, e = Math.atan2(d, c), g = 180 * e / Math.PI, i = parseInt(0 > g ? 360 + g : g) % 360, j = (v.x + v.r * Math.cos(e) - u, v.y + v.r * Math.sin(e) - u, (f[h.shape].val2Deg(h.value) + 360) % 360);
            if (j !== i) {
                var k = Math.min((i + 360 - j) % 360, (j + 360 - i) % 360);
                k || (k = 180);
                var l = (i + 360 - j) % 360 === k, m = h.animateDuration / k, n = 4, o = 1;
                m >= 4 ? n = parseInt(m) : o = m >= 1 ? 4 * parseInt(m) : 4 / m;
                var p = j, q = parseInt(k / o);
                x = !0;
                var r = function () {
                    p += l ? o : -o, p = (p + 360) % 360, --q <= 0 && (clearInterval(s), x = !1, p = i), C(f[h.shape].deg2Val(p))
                }, s = window.setInterval(r, n)
            }
        }, z = function (b) {
            if (b.stopPropagation(), w && !x) {
                var c = {
                    x: b.offsetX || b.originalEvent.layerX,
                    y: b.offsetY || b.originalEvent.layerY
                }, e = c.x - v.x, g = c.y - v.y, i = Math.atan2(g, e), j = 180 * i / Math.PI, k = parseInt(0 > j ? 360 + j : j) % 360, l = v.x + v.r * h.handleDist / 100 * Math.cos(i) - u, m = v.y + v.r * h.handleDist / 100 * Math.sin(i) - u;
                n.css({top: m + "px", left: l + "px"});
                var p = f[h.shape].deg2Val(k), q = h.clockwise ? p : h.max - p;
                q < h.min ? q = h.min : q > h.max && (q = h.max), o.html(A(q)), h.slide && a.isFunction(h.slide) && h.slide(d, q)
            }
        };
        m.on("mousedown", function (a) {
            w = !0, a.stopPropagation()
        }), m.on("mouseup", function (a) {
            w = !1, a.stopPropagation()
        }), m.on("mousemove", z), m.on("click", function (a) {
            a.stopPropagation();
            var b = {
                x: a.offsetX || a.originalEvent.layerX,
                y: a.offsetY || a.originalEvent.layerY
            }, c = b.x - v.x, d = b.y - v.y, e = Math.sqrt(c * c + d * d);
            (r >= l - e || e > l) && (h.animate ? y(a) : (w = !0, z(a))), w = !1
        }), k.on("click", function (a) {
            m.trigger(a)
        }), k.on("mouseup", function (a) {
            m.trigger(a)
        }), k.on("mousemove", function (a) {
            m.trigger(a)
        }), k.on("mousedown", function (a) {
            m.trigger(a)
        });
        var A = function (a) {
            return h.value = a, h.formLabel ? h.formLabel(a, h.labelPrefix, h.labelSuffix) : h.labelPrefix + a + h.labelSuffix
        }, B = function () {
            f[h.shape].drawShape(p, l), p.jcsIndicator.css({
                width: l / 5 + "px",
                height: l / 5 + "px"
            }), q = m.position(), r = m.outerWidth() - m.innerWidth(), s = n.outerWidth() - n.innerWidth(), t = (m.width() + r) / 2, u = (n.width() + s) / 2, v = f[h.shape].getCenter(q, t), C(h.value || h.min)
        }, C = function (b) {
            if ((0 | b) !== b)throw"Invalid input (expected integer) : " + b;
            var c = h.clockwise ? b : h.max - b, e = f[h.shape].val2Deg(c), g = e * Math.PI / 180, i = v.x + v.r * h.handleDist / 100 * Math.cos(g) - u, j = v.y + v.r * h.handleDist / 100 * Math.sin(g) - u;
            n.css("top", j + "px"), n.css("left", i + "px"), o.html(A(b)), h.slide && a.isFunction(h.slide) && h.slide(d, c)
        }, D = function () {
            return h.value
        }, E = function () {
            return h.animate
        }, F = function (a) {
            h.animate = !!a
        }, G = function () {
            return h.animateDuration
        }, H = function (a) {
            if ((0 | a) !== a || 0 > a)throw"Invalid animate duration(in ms) : " + a;
            h.animateDuration = a
        }, I = function (a) {
            if (isNaN(a))throw"Invalid Radius value: " + a;
            h.radius = Math.abs(parseInt(a)), l = h.radius, B()
        }, J = function () {
            return h.radius
        }, K = function () {
            return Object.keys()
        }, L = function (a, b) {
            if ((0 | a) !== a)throw"Invalid min value : " + a;
            if ((0 | b) !== b)throw"Invalid max value : " + b;
            if (a > b)throw"Min range should be less than max";
            h.min = a, h.max = b, j = h.max - h.min + 1;
            var c = h.value;
            (a > c || c > b) && (c = a), C(c)
        }, M = "", N = function (b) {
            var c = b.changedTouches;
            if (!(c.length > 1)) {
                var d = c[0], e = a(d.target);
                if (e.hasClass("jcs")) {
                    var f = e.offset(), g = e.width(), h = e.height(), i = d.clientX, j = d.clientY;
                    if (!(i < f.left || i > g + f.left || j < f.top || j > h + f.top)) {
                        var k = ["touchstart", "touchmove", "touchend"], l = ["mousedown", "mousemove", "mouseup"], m = k.indexOf(b.type);
                        if (-1 !== m) {
                            var n = l[m];
                            b.type === k[2] && M === k[0] && (n = "click");
                            var o = document.createEvent("MouseEvent");
                            o.initMouseEvent(n, !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), d.target.dispatchEvent(o), b.preventDefault(), M = b.type
                        }
                    }
                }
            }
        };
        return h.touch && (document.addEventListener("touchstart", N, !0), document.addEventListener("touchmove", N, !0), document.addEventListener("touchend", N, !0), document.addEventListener("touchcancel", N, !0)), h.selectable || k.addClass("noselect"), C(h.value || h.min), a.extend({}, this, {
            setValue: C,
            getValue: D,
            getSupportedShapes: K,
            setRadius: I,
            getRadius: J,
            setRange: L,
            getAnimateDuration: G,
            setAnimateDuration: H,
            setAnimate: F,
            getAnimate: E
        })
    }
}(jQuery);