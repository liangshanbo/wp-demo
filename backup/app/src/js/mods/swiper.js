"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Swiper 3.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 13, 2016
 */
define('mods/swiper', function (require, exports, module) {
    !function () {
        "use strict";

        function e(e) {
            e.fn.swiper = function (a) {
                var s;
                return e(this).each(function () {
                    var e = new t(this, a);
                    s || (s = e);
                }), s;
            };
        }

        var a,
            t = function t(e, i) {
            function r(e) {
                return Math.floor(e);
            }

            function n() {
                var e = b.params.autoplay,
                    a = b.slides.eq(b.activeIndex);
                a.attr("data-swiper-autoplay") && (e = a.attr("data-swiper-autoplay") || b.params.autoplay), b.autoplayTimeoutId = setTimeout(function () {
                    b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? i.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b));
                }, e);
            }

            function o(e, t) {
                var s = a(e.target);
                if (!s.is(t)) if ("string" == typeof t) s = s.parents(t);else if (t.nodeType) {
                    var i;
                    return s.parents().each(function (e, a) {
                        a === t && (i = t);
                    }), i ? t : void 0;
                }
                if (0 !== s.length) return s[0];
            }

            function l(e, a) {
                a = a || {};
                var t = window.MutationObserver || window.WebkitMutationObserver,
                    s = new t(function (e) {
                    e.forEach(function (e) {
                        b.onResize(!0), b.emit("onObserverUpdate", b, e);
                    });
                });
                s.observe(e, {
                    attributes: "undefined" == typeof a.attributes || a.attributes,
                    childList: "undefined" == typeof a.childList || a.childList,
                    characterData: "undefined" == typeof a.characterData || a.characterData
                }), b.observers.push(s);
            }

            function p(e) {
                e.originalEvent && (e = e.originalEvent);
                var a = e.keyCode || e.charCode;
                if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === a || !b.isHorizontal() && 40 === a)) return !1;
                if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === a || !b.isHorizontal() && 38 === a)) return !1;
                if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                    if (37 === a || 39 === a || 38 === a || 40 === a) {
                        var t = !1;
                        if (b.container.parents("." + b.params.slideClass).length > 0 && 0 === b.container.parents("." + b.params.slideActiveClass).length) return;
                        var s = {
                            left: window.pageXOffset,
                            top: window.pageYOffset
                        },
                            i = window.innerWidth,
                            r = window.innerHeight,
                            n = b.container.offset();
                        b.rtl && (n.left = n.left - b.container[0].scrollLeft);
                        for (var o = [[n.left, n.top], [n.left + b.width, n.top], [n.left, n.top + b.height], [n.left + b.width, n.top + b.height]], l = 0; l < o.length; l++) {
                            var p = o[l];
                            p[0] >= s.left && p[0] <= s.left + i && p[1] >= s.top && p[1] <= s.top + r && (t = !0);
                        }
                        if (!t) return;
                    }
                    b.isHorizontal() ? (37 !== a && 39 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !b.rtl || 37 === a && b.rtl) && b.slideNext(), (37 === a && !b.rtl || 39 === a && b.rtl) && b.slidePrev()) : (38 !== a && 40 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && b.slideNext(), 38 === a && b.slidePrev());
                }
            }

            function d() {
                var e = "onwheel",
                    a = e in document;
                if (!a) {
                    var t = document.createElement("div");
                    t.setAttribute(e, "return;"), a = "function" == typeof t[e];
                }
                return !a && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (a = document.implementation.hasFeature("Events.wheel", "3.0")), a;
            }

            function u(e) {
                e.originalEvent && (e = e.originalEvent);
                var a = 0,
                    t = b.rtl ? -1 : 1,
                    s = c(e);
                if (b.params.mousewheelForceToAxis) {
                    if (b.isHorizontal()) {
                        if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return;
                        a = s.pixelX * t;
                    } else {
                        if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return;
                        a = s.pixelY;
                    }
                } else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * t : -s.pixelY;
                if (0 !== a) {
                    if (b.params.mousewheelInvert && (a = -a), b.params.freeMode) {
                        var i = b.getWrapperTranslate() + a * b.params.mousewheelSensitivity,
                            r = b.isBeginning,
                            n = b.isEnd;
                        if (i >= b.minTranslate() && (i = b.minTranslate()), i <= b.maxTranslate() && (i = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(i), b.updateProgress(), b.updateActiveIndex(), (!r && b.isBeginning || !n && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function () {
                            b.slideReset();
                        }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), b.emit("onScroll", b, e), b.params.autoplay && b.params.autoplayDisableOnInteraction && b.stopAutoplay(), 0 === i || i === b.maxTranslate()) return;
                    } else {
                        if (new window.Date().getTime() - b.mousewheel.lastScrollTime > 60) if (a < 0) {
                            if (b.isEnd && !b.params.loop || b.animating) {
                                if (b.params.mousewheelReleaseOnEdges) return !0;
                            } else b.slideNext(), b.emit("onScroll", b, e);
                        } else if (b.isBeginning && !b.params.loop || b.animating) {
                            if (b.params.mousewheelReleaseOnEdges) return !0;
                        } else b.slidePrev(), b.emit("onScroll", b, e);
                        b.mousewheel.lastScrollTime = new window.Date().getTime();
                    }
                    return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1;
                }
            }

            function c(e) {
                var a = 10,
                    t = 40,
                    s = 800,
                    i = 0,
                    r = 0,
                    n = 0,
                    o = 0;
                return "detail" in e && (r = e.detail), "wheelDelta" in e && (r = -e.wheelDelta / 120), "wheelDeltaY" in e && (r = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (i = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (i = r, r = 0), n = i * a, o = r * a, "deltaY" in e && (o = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || o) && e.deltaMode && (1 === e.deltaMode ? (n *= t, o *= t) : (n *= s, o *= s)), n && !i && (i = n < 1 ? -1 : 1), o && !r && (r = o < 1 ? -1 : 1), {
                    spinX: i,
                    spinY: r,
                    pixelX: n,
                    pixelY: o
                };
            }

            function m(e, t) {
                e = a(e);
                var s,
                    i,
                    r,
                    n = b.rtl ? -1 : 1;
                s = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), r = e.attr("data-swiper-parallax-y"), i || r ? (i = i || "0", r = r || "0") : b.isHorizontal() ? (i = s, r = "0") : (r = s, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t + "%" : r * t + "px", e.transform("translate3d(" + i + ", " + r + ",0px)");
            }

            function h(e) {
                return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e;
            }

            if (!(this instanceof t)) return new t(e, i);
            var g = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                autoplayStopOnLast: !1,
                iOSEdgeSwipeDetection: !1,
                iOSEdgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeMomentumVelocityRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: .02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 },
                flip: { slideShadows: !0, limitRotation: !0 },
                cube: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 },
                fade: { crossFade: !1 },
                parallax: !1,
                zoom: !1,
                zoomMax: 3,
                zoomMin: 1,
                zoomToggle: !0,
                scrollbar: null,
                scrollbarHide: !0,
                scrollbarDraggable: !1,
                scrollbarSnapOnRelease: !1,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                mousewheelSensitivity: 1,
                mousewheelEventsTarged: "container",
                hashnav: !1,
                hashnavWatchState: !1,
                history: !1,
                replaceState: !1,
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                touchReleaseOnEdges: !1,
                uniqueNavElements: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                paginationProgressRender: null,
                paginationFractionRender: null,
                paginationCustomRender: null,
                paginationType: "bullets",
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                normalizeSlideIndex: !0,
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                passiveListeners: !0,
                containerModifierClass: "swiper-container-",
                slideClass: "swiper-slide",
                slideActiveClass: "swiper-slide-active",
                slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slideDuplicateNextClass: "swiper-slide-duplicate-next",
                slidePrevClass: "swiper-slide-prev",
                slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                wrapperClass: "swiper-wrapper",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                buttonDisabledClass: "swiper-button-disabled",
                paginationCurrentClass: "swiper-pagination-current",
                paginationTotalClass: "swiper-pagination-total",
                paginationHiddenClass: "swiper-pagination-hidden",
                paginationProgressbarClass: "swiper-pagination-progressbar",
                paginationClickableClass: "swiper-pagination-clickable",
                paginationModifierClass: "swiper-pagination-",
                lazyLoadingClass: "swiper-lazy",
                lazyStatusLoadingClass: "swiper-lazy-loading",
                lazyStatusLoadedClass: "swiper-lazy-loaded",
                lazyPreloaderClass: "swiper-lazy-preloader",
                notificationClass: "swiper-notification",
                preloaderClass: "preloader",
                zoomContainerClass: "swiper-zoom-container",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            },
                f = i && i.virtualTranslate;
            i = i || {};
            var v = {};
            for (var w in i) {
                if ("object" != _typeof(i[w]) || null === i[w] || i[w].nodeType || i[w] === window || i[w] === document || "undefined" != typeof s && i[w] instanceof s || "undefined" != typeof jQuery && i[w] instanceof jQuery) v[w] = i[w];else {
                    v[w] = {};
                    for (var y in i[w]) {
                        v[w][y] = i[w][y];
                    }
                }
            }for (var x in g) {
                if ("undefined" == typeof i[x]) i[x] = g[x];else if ("object" == _typeof(i[x])) for (var T in g[x]) {
                    "undefined" == typeof i[x][T] && (i[x][T] = g[x][T]);
                }
            }var b = this;
            if (b.params = i, b.originalParams = v, b.classNames = [], "undefined" != typeof a && "undefined" != typeof s && (a = s), ("undefined" != typeof a || (a = "undefined" == typeof s ? window.Dom7 || window.Zepto || window.jQuery : s)) && (b.$ = a, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function () {
                if (!b.params.breakpoints) return !1;
                var e,
                    a = !1,
                    t = [];
                for (e in b.params.breakpoints) {
                    b.params.breakpoints.hasOwnProperty(e) && t.push(e);
                }t.sort(function (e, a) {
                    return parseInt(e, 10) > parseInt(a, 10);
                });
                for (var s = 0; s < t.length; s++) {
                    e = t[s], e >= window.innerWidth && !a && (a = e);
                }return a || "max";
            }, b.setBreakpoint = function () {
                var e = b.getActiveBreakpoint();
                if (e && b.currentBreakpoint !== e) {
                    var a = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
                        t = b.params.loop && a.slidesPerView !== b.params.slidesPerView;
                    for (var s in a) {
                        b.params[s] = a[s];
                    }b.currentBreakpoint = e, t && b.destroyLoop && b.reLoop(!0);
                }
            }, b.params.breakpoints && b.setBreakpoint(), b.container = a(e), 0 !== b.container.length)) {
                if (b.container.length > 1) {
                    var S = [];
                    return b.container.each(function () {
                        S.push(new t(this, i));
                    }), S;
                }
                b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push(b.params.containerModifierClass + b.params.direction), b.params.freeMode && b.classNames.push(b.params.containerModifierClass + "free-mode"), b.support.flexbox || (b.classNames.push(b.params.containerModifierClass + "no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push(b.params.containerModifierClass + "autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), b.params.touchReleaseOnEdges && (b.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push(b.params.containerModifierClass + "3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push(b.params.containerModifierClass + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), "fade" !== b.params.effect && "flip" !== b.params.effect || (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof f && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = a(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass(b.params.paginationModifierClass + "clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass(b.params.paginationModifierClass + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = a(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = a(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function () {
                    return "horizontal" === b.params.direction;
                }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push(b.params.containerModifierClass + "rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push(b.params.containerModifierClass + "multirow"), b.device.android && b.classNames.push(b.params.containerModifierClass + "android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function () {
                    b.params.allowSwipeToNext = !1, b.params.allowSwipeToPrev === !1 && b.params.grabCursor && b.unsetGrabCursor();
                }, b.lockSwipeToPrev = function () {
                    b.params.allowSwipeToPrev = !1, b.params.allowSwipeToNext === !1 && b.params.grabCursor && b.unsetGrabCursor();
                }, b.lockSwipes = function () {
                    b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1, b.params.grabCursor && b.unsetGrabCursor();
                }, b.unlockSwipeToNext = function () {
                    b.params.allowSwipeToNext = !0, b.params.allowSwipeToPrev === !0 && b.params.grabCursor && b.setGrabCursor();
                }, b.unlockSwipeToPrev = function () {
                    b.params.allowSwipeToPrev = !0, b.params.allowSwipeToNext === !0 && b.params.grabCursor && b.setGrabCursor();
                }, b.unlockSwipes = function () {
                    b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0, b.params.grabCursor && b.setGrabCursor();
                }, b.setGrabCursor = function (e) {
                    b.container[0].style.cursor = "move", b.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", b.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", b.container[0].style.cursor = e ? "grabbing" : "grab";
                }, b.unsetGrabCursor = function () {
                    b.container[0].style.cursor = "";
                }, b.params.grabCursor && b.setGrabCursor(), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function (e, a, t, s, i, r) {
                    function n() {
                        r && r();
                    }

                    var o;
                    e.complete && i ? n() : a ? (o = new window.Image(), o.onload = n, o.onerror = n, s && (o.sizes = s), t && (o.srcset = t), a && (o.src = a)) : n();
                }, b.preloadImages = function () {
                    function e() {
                        "undefined" != typeof b && null !== b && b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)));
                    }

                    b.imagesToLoad = b.container.find("img");
                    for (var a = 0; a < b.imagesToLoad.length; a++) {
                        b.loadImage(b.imagesToLoad[a], b.imagesToLoad[a].currentSrc || b.imagesToLoad[a].getAttribute("src"), b.imagesToLoad[a].srcset || b.imagesToLoad[a].getAttribute("srcset"), b.imagesToLoad[a].sizes || b.imagesToLoad[a].getAttribute("sizes"), !0, e);
                    }
                }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function () {
                    return "undefined" == typeof b.autoplayTimeoutId && !!b.params.autoplay && !b.autoplaying && (b.autoplaying = !0, b.emit("onAutoplayStart", b), void n());
                }, b.stopAutoplay = function (e) {
                    b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b));
                }, b.pauseAutoplay = function (e) {
                    b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, n()) : b.wrapper.transitionEnd(function () {
                        b && (b.autoplayPaused = !1, b.autoplaying ? n() : b.stopAutoplay());
                    }));
                }, b.minTranslate = function () {
                    return -b.snapGrid[0];
                }, b.maxTranslate = function () {
                    return -b.snapGrid[b.snapGrid.length - 1];
                }, b.updateAutoHeight = function () {
                    var e,
                        a = [],
                        t = 0;
                    if ("auto" !== b.params.slidesPerView && b.params.slidesPerView > 1) for (e = 0; e < Math.ceil(b.params.slidesPerView); e++) {
                        var s = b.activeIndex + e;
                        if (s > b.slides.length) break;
                        a.push(b.slides.eq(s)[0]);
                    } else a.push(b.slides.eq(b.activeIndex)[0]);
                    for (e = 0; e < a.length; e++) {
                        if ("undefined" != typeof a[e]) {
                            var i = a[e].offsetHeight;
                            t = i > t ? i : t;
                        }
                    }t && b.wrapper.css("height", t + "px");
                }, b.updateContainerSize = function () {
                    var e, a;
                    e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, a = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === a && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), a = a - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = a, b.size = b.isHorizontal() ? b.width : b.height);
                }, b.updateSlidesSize = function () {
                    b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
                    var e,
                        a = b.params.spaceBetween,
                        t = -b.params.slidesOffsetBefore,
                        s = 0,
                        i = 0;
                    if ("undefined" != typeof b.size) {
                        "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * b.size), b.virtualSize = -a, b.rtl ? b.slides.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : b.slides.css({ marginRight: "", marginBottom: "" });
                        var n;
                        b.params.slidesPerColumn > 1 && (n = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (n = Math.max(n, b.params.slidesPerView * b.params.slidesPerColumn)));
                        var o,
                            l = b.params.slidesPerColumn,
                            p = n / l,
                            d = p - (b.params.slidesPerColumn * p - b.slides.length);
                        for (e = 0; e < b.slides.length; e++) {
                            o = 0;
                            var u = b.slides.eq(e);
                            if (b.params.slidesPerColumn > 1) {
                                var c, m, h;
                                "column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({
                                    "-webkit-box-ordinal-group": c,
                                    "-moz-box-ordinal-group": c,
                                    "-ms-flex-order": c,
                                    "-webkit-order": c,
                                    order: c
                                })) : (h = Math.floor(e / p), m = e - h * p), u.css("margin-" + (b.isHorizontal() ? "top" : "left"), 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px").attr("data-swiper-column", m).attr("data-swiper-row", h);
                            }
                            "none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = r(o))) : (o = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (o = r(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === e && (t = t - b.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t)) : (i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t), t = t + o + a), b.virtualSize += o + a, s = o, i++);
                        }
                        b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
                        var g;
                        if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }), b.support.flexbox && !b.params.setWrapperSize || (b.isHorizontal() ? b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }) : b.wrapper.css({ height: b.virtualSize + b.params.spaceBetween + "px" })), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * n, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.isHorizontal() ? b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }) : b.wrapper.css({ height: b.virtualSize + b.params.spaceBetween + "px" }), b.params.centeredSlides)) {
                            for (g = [], e = 0; e < b.snapGrid.length; e++) {
                                b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && g.push(b.snapGrid[e]);
                            }b.snapGrid = g;
                        }
                        if (!b.params.centeredSlides) {
                            for (g = [], e = 0; e < b.snapGrid.length; e++) {
                                b.snapGrid[e] <= b.virtualSize - b.size && g.push(b.snapGrid[e]);
                            }b.snapGrid = g, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size);
                        }
                        0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({ marginLeft: a + "px" }) : b.slides.css({ marginRight: a + "px" }) : b.slides.css({ marginBottom: a + "px" })), b.params.watchSlidesProgress && b.updateSlidesOffset();
                    }
                }, b.updateSlidesOffset = function () {
                    for (var e = 0; e < b.slides.length; e++) {
                        b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop;
                    }
                }, b.currentSlidesPerView = function () {
                    var e,
                        a,
                        t = 1;
                    if (b.params.centeredSlides) {
                        var s,
                            i = b.slides[b.activeIndex].swiperSlideSize;
                        for (e = b.activeIndex + 1; e < b.slides.length; e++) {
                            b.slides[e] && !s && (i += b.slides[e].swiperSlideSize, t++, i > b.size && (s = !0));
                        }for (a = b.activeIndex - 1; a >= 0; a--) {
                            b.slides[a] && !s && (i += b.slides[a].swiperSlideSize, t++, i > b.size && (s = !0));
                        }
                    } else for (e = b.activeIndex + 1; e < b.slides.length; e++) {
                        b.slidesGrid[e] - b.slidesGrid[b.activeIndex] < b.size && t++;
                    }return t;
                }, b.updateSlidesProgress = function (e) {
                    if ("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
                        "undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
                        var a = -e;
                        b.rtl && (a = e), b.slides.removeClass(b.params.slideVisibleClass);
                        for (var t = 0; t < b.slides.length; t++) {
                            var s = b.slides[t],
                                i = (a + (b.params.centeredSlides ? b.minTranslate() : 0) - s.swiperSlideOffset) / (s.swiperSlideSize + b.params.spaceBetween);
                            if (b.params.watchSlidesVisibility) {
                                var r = -(a - s.swiperSlideOffset),
                                    n = r + b.slidesSizesGrid[t],
                                    o = r >= 0 && r < b.size || n > 0 && n <= b.size || r <= 0 && n >= b.size;
                                o && b.slides.eq(t).addClass(b.params.slideVisibleClass);
                            }
                            s.progress = b.rtl ? -i : i;
                        }
                    }
                }, b.updateProgress = function (e) {
                    "undefined" == typeof e && (e = b.translate || 0);
                    var a = b.maxTranslate() - b.minTranslate(),
                        t = b.isBeginning,
                        s = b.isEnd;
                    0 === a ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / a, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !t && b.emit("onReachBeginning", b), b.isEnd && !s && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress);
                }, b.updateActiveIndex = function () {
                    var e,
                        a,
                        t,
                        s = b.rtl ? b.translate : -b.translate;
                    for (a = 0; a < b.slidesGrid.length; a++) {
                        "undefined" != typeof b.slidesGrid[a + 1] ? s >= b.slidesGrid[a] && s < b.slidesGrid[a + 1] - (b.slidesGrid[a + 1] - b.slidesGrid[a]) / 2 ? e = a : s >= b.slidesGrid[a] && s < b.slidesGrid[a + 1] && (e = a + 1) : s >= b.slidesGrid[a] && (e = a);
                    }b.params.normalizeSlideIndex && (e < 0 || "undefined" == typeof e) && (e = 0), t = Math.floor(e / b.params.slidesPerGroup), t >= b.snapGrid.length && (t = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = t, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses(), b.updateRealIndex());
                }, b.updateRealIndex = function () {
                    b.realIndex = parseInt(b.slides.eq(b.activeIndex).attr("data-swiper-slide-index") || b.activeIndex, 10);
                }, b.updateClasses = function () {
                    b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass + " " + b.params.slideDuplicateActiveClass + " " + b.params.slideDuplicateNextClass + " " + b.params.slideDuplicatePrevClass);
                    var e = b.slides.eq(b.activeIndex);
                    e.addClass(b.params.slideActiveClass), i.loop && (e.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass));
                    var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
                    b.params.loop && 0 === t.length && (t = b.slides.eq(0), t.addClass(b.params.slideNextClass));
                    var s = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
                    if (b.params.loop && 0 === s.length && (s = b.slides.eq(-1), s.addClass(b.params.slidePrevClass)), i.loop && (t.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass), s.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass)), b.paginationContainer && b.paginationContainer.length > 0) {
                        var r,
                            n = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
                        if (b.params.loop ? (r = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), r > b.slides.length - 1 - 2 * b.loopedSlides && (r -= b.slides.length - 2 * b.loopedSlides), r > n - 1 && (r -= n), r < 0 && "bullets" !== b.params.paginationType && (r = n + r)) : r = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function () {
                            a(this).index() === r && a(this).addClass(b.params.bulletActiveClass);
                        }) : b.bullets.eq(r).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(r + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(n)), "progress" === b.params.paginationType) {
                            var o = (r + 1) / n,
                                l = o,
                                p = 1;
                            b.isHorizontal() || (p = o, l = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + p + ")").transition(b.params.speed);
                        }
                        "custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, r + 1, n)), b.emit("onPaginationRendered", b, b.paginationContainer[0]));
                    }
                    b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))));
                }, b.updatePagination = function () {
                    if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
                        var e = "";
                        if ("bullets" === b.params.paginationType) {
                            for (var a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, t = 0; t < a; t++) {
                                e += b.params.paginationBulletRender ? b.params.paginationBulletRender(b, t, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
                            }b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination();
                        }
                        "fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0]);
                    }
                }, b.update = function (e) {
                    function a() {
                        b.rtl ? -b.translate : b.translate;
                        s = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(s), b.updateActiveIndex(), b.updateClasses();
                    }

                    if (b) if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
                        var t, s;
                        b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (t = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), t || a());
                    } else b.params.autoHeight && b.updateAutoHeight();
                }, b.onResize = function (e) {
                    b.params.breakpoints && b.setBreakpoint();
                    var a = b.params.allowSwipeToPrev,
                        t = b.params.allowSwipeToNext;
                    b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
                    var s = !1;
                    if (b.params.freeMode) {
                        var i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                        b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight();
                    } else b.updateClasses(), s = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
                    b.params.lazyLoading && !s && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = a, b.params.allowSwipeToNext = t;
                }, b.touchEventsDesktop = {
                    start: "mousedown",
                    move: "mousemove",
                    end: "mouseup"
                }, window.navigator.pointerEnabled ? b.touchEventsDesktop = {
                    start: "pointerdown",
                    move: "pointermove",
                    end: "pointerup"
                } : window.navigator.msPointerEnabled && (b.touchEventsDesktop = {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                }), b.touchEvents = {
                    start: b.support.touch || !b.params.simulateTouch ? "touchstart" : b.touchEventsDesktop.start,
                    move: b.support.touch || !b.params.simulateTouch ? "touchmove" : b.touchEventsDesktop.move,
                    end: b.support.touch || !b.params.simulateTouch ? "touchend" : b.touchEventsDesktop.end
                }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function (e) {
                    var a = e ? "off" : "on",
                        t = e ? "removeEventListener" : "addEventListener",
                        s = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
                        r = b.support.touch ? s : document,
                        n = !!b.params.nested;
                    if (b.browser.ie) s[t](b.touchEvents.start, b.onTouchStart, !1), r[t](b.touchEvents.move, b.onTouchMove, n), r[t](b.touchEvents.end, b.onTouchEnd, !1);else {
                        if (b.support.touch) {
                            var o = !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s[t](b.touchEvents.start, b.onTouchStart, o), s[t](b.touchEvents.move, b.onTouchMove, n), s[t](b.touchEvents.end, b.onTouchEnd, o);
                        }
                        (i.simulateTouch && !b.device.ios && !b.device.android || i.simulateTouch && !b.support.touch && b.device.ios) && (s[t]("mousedown", b.onTouchStart, !1), document[t]("mousemove", b.onTouchMove, n), document[t]("mouseup", b.onTouchEnd, !1));
                    }
                    window[t]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[a]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[a]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[a]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[a]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[a]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[a]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && s[t]("click", b.preventClicks, !0);
                }, b.attachEvents = function () {
                    b.initEvents();
                }, b.detachEvents = function () {
                    b.initEvents(!0);
                }, b.allowClick = !0, b.preventClicks = function (e) {
                    b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
                }, b.onClickNext = function (e) {
                    e.preventDefault(), b.isEnd && !b.params.loop || b.slideNext();
                }, b.onClickPrev = function (e) {
                    e.preventDefault(), b.isBeginning && !b.params.loop || b.slidePrev();
                }, b.onClickIndex = function (e) {
                    e.preventDefault();
                    var t = a(this).index() * b.params.slidesPerGroup;
                    b.params.loop && (t += b.loopedSlides), b.slideTo(t);
                }, b.updateClickedSlide = function (e) {
                    var t = o(e, "." + b.params.slideClass),
                        s = !1;
                    if (t) for (var i = 0; i < b.slides.length; i++) {
                        b.slides[i] === t && (s = !0);
                    }if (!t || !s) return b.clickedSlide = void 0, void (b.clickedIndex = void 0);
                    if (b.clickedSlide = t, b.clickedIndex = a(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
                        var r,
                            n = b.clickedIndex,
                            l = "auto" === b.params.slidesPerView ? b.currentSlidesPerView() : b.params.slidesPerView;
                        if (b.params.loop) {
                            if (b.animating) return;
                            r = parseInt(a(b.clickedSlide).attr("data-swiper-slide-index"), 10), b.params.centeredSlides ? n < b.loopedSlides - l / 2 || n > b.slides.length - b.loopedSlides + l / 2 ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                                b.slideTo(n);
                            }, 0)) : b.slideTo(n) : n > b.slides.length - l ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                                b.slideTo(n);
                            }, 0)) : b.slideTo(n);
                        } else b.slideTo(n);
                    }
                };
                var C,
                    z,
                    M,
                    E,
                    P,
                    I,
                    k,
                    L,
                    D,
                    B,
                    H = "input, select, textarea, button, video",
                    G = Date.now(),
                    X = [];
                b.animating = !1, b.touches = { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 };
                var Y, A;
                b.onTouchStart = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), Y = "touchstart" === e.type, Y || !("which" in e) || 3 !== e.which) {
                        if (b.params.noSwiping && o(e, "." + b.params.noSwipingClass)) return void (b.allowClick = !0);
                        if (!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
                            var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                s = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
                                if (C = !0, z = !1, M = !0, P = void 0, A = void 0, b.touches.startX = t, b.touches.startY = s, E = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (L = !1), "touchstart" !== e.type) {
                                    var i = !0;
                                    a(e.target).is(H) && (i = !1), document.activeElement && a(document.activeElement).is(H) && document.activeElement.blur(), i && e.preventDefault();
                                }
                                b.emit("onTouchStart", b, e);
                            }
                        }
                    }
                }, b.onTouchMove = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), !Y || "mousemove" !== e.type) {
                        if (e.preventedByNestedSwiper) return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void (b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        if (b.params.onlyExternal) return b.allowClick = !1, void (C && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, E = Date.now()));
                        if (Y && b.params.touchReleaseOnEdges && !b.params.loop) if (b.isHorizontal()) {
                            if (b.touches.currentX < b.touches.startX && b.translate <= b.maxTranslate() || b.touches.currentX > b.touches.startX && b.translate >= b.minTranslate()) return;
                        } else if (b.touches.currentY < b.touches.startY && b.translate <= b.maxTranslate() || b.touches.currentY > b.touches.startY && b.translate >= b.minTranslate()) return;
                        if (Y && document.activeElement && e.target === document.activeElement && a(e.target).is(H)) return z = !0, void (b.allowClick = !1);
                        if (M && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof P) {
                                var t;
                                b.isHorizontal() && b.touches.currentY === b.touches.startY || !b.isHorizontal() && b.touches.currentX === b.touches.startX ? P = !1 : (t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI, P = b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle);
                            }
                            if (P && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof A && b.browser.ieTouch && (b.touches.currentX === b.touches.startX && b.touches.currentY === b.touches.startY || (A = !0)), C) {
                                if (P) return void (C = !1);
                                if (A || !b.browser.ieTouch) {
                                    b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), z || (i.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), B = !1, !b.params.grabCursor || b.params.allowSwipeToNext !== !0 && b.params.allowSwipeToPrev !== !0 || b.setGrabCursor(!0)), z = !0;
                                    var s = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                                    s *= b.params.touchRatio, b.rtl && (s = -s), b.swipeDirection = s > 0 ? "prev" : "next", I = s + k;
                                    var r = !0;
                                    if (s > 0 && I > b.minTranslate() ? (r = !1, b.params.resistance && (I = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + s, b.params.resistanceRatio))) : s < 0 && I < b.maxTranslate() && (r = !1, b.params.resistance && (I = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - s, b.params.resistanceRatio))), r && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && I < k && (I = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && I > k && (I = k), b.params.threshold > 0) {
                                        if (!(Math.abs(s) > b.params.threshold || L)) return void (I = k);
                                        if (!L) return L = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, I = k, void (b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY);
                                    }
                                    b.params.followFinger && ((b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === X.length && X.push({
                                        position: b.touches[b.isHorizontal() ? "startX" : "startY"],
                                        time: E
                                    }), X.push({
                                        position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
                                        time: new window.Date().getTime()
                                    })), b.updateProgress(I), b.setWrapperTranslate(I));
                                }
                            }
                        }
                    }
                }, b.onTouchEnd = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), M && b.emit("onTouchEnd", b, e), M = !1, C) {
                        b.params.grabCursor && z && C && (b.params.allowSwipeToNext === !0 || b.params.allowSwipeToPrev === !0) && b.setGrabCursor(!1);
                        var t = Date.now(),
                            s = t - E;
                        if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), s < 300 && t - G > 300 && (D && clearTimeout(D), D = setTimeout(function () {
                            b && (b.params.paginationHide && b.paginationContainer.length > 0 && !a(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e));
                        }, 300)), s < 300 && t - G < 300 && (D && clearTimeout(D), b.emit("onDoubleTap", b, e))), G = Date.now(), setTimeout(function () {
                            b && (b.allowClick = !0);
                        }, 0), !C || !z || !b.swipeDirection || 0 === b.touches.diff || I === k) return void (C = z = !1);
                        C = z = !1;
                        var i;
                        if (i = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -I, b.params.freeMode) {
                            if (i < -b.minTranslate()) return void b.slideTo(b.activeIndex);
                            if (i > -b.maxTranslate()) return void (b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
                            if (b.params.freeModeMomentum) {
                                if (X.length > 1) {
                                    var r = X.pop(),
                                        n = X.pop(),
                                        o = r.position - n.position,
                                        l = r.time - n.time;
                                    b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || new window.Date().getTime() - r.time > 300) && (b.velocity = 0);
                                } else b.velocity = 0;
                                b.velocity = b.velocity * b.params.freeModeMomentumVelocityRatio, X.length = 0;
                                var p = 1e3 * b.params.freeModeMomentumRatio,
                                    d = b.velocity * p,
                                    u = b.translate + d;
                                b.rtl && (u = -u);
                                var c,
                                    m = !1,
                                    h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
                                if (u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -h && (u = b.maxTranslate() - h), c = b.maxTranslate(), m = !0, B = !0) : u = b.maxTranslate();else if (u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > h && (u = b.minTranslate() + h), c = b.minTranslate(), m = !0, B = !0) : u = b.minTranslate();else if (b.params.freeModeSticky) {
                                    var g,
                                        f = 0;
                                    for (f = 0; f < b.snapGrid.length; f += 1) {
                                        if (b.snapGrid[f] > -u) {
                                            g = f;
                                            break;
                                        }
                                    }u = Math.abs(b.snapGrid[g] - u) < Math.abs(b.snapGrid[g - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[g] : b.snapGrid[g - 1], b.rtl || (u = -u);
                                }
                                if (0 !== b.velocity) p = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity);else if (b.params.freeModeSticky) return void b.slideReset();
                                b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function () {
                                    b && B && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function () {
                                        b && b.onTransitionEnd();
                                    }));
                                })) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                                    b && b.onTransitionEnd();
                                }))) : b.updateProgress(u), b.updateActiveIndex();
                            }
                            return void ((!b.params.freeModeMomentum || s >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()));
                        }
                        var v,
                            w = 0,
                            y = b.slidesSizesGrid[0];
                        for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup) {
                            "undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? i >= b.slidesGrid[v] && i < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : i >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
                        }var x = (i - b.slidesGrid[w]) / y;
                        if (s > b.params.longSwipesMs) {
                            if (!b.params.longSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && (x >= b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w)), "prev" === b.swipeDirection && (x > 1 - b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w));
                        } else {
                            if (!b.params.shortSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w);
                        }
                    }
                }, b._slideTo = function (e, a) {
                    return b.slideTo(e, a, !0, !0);
                }, b.slideTo = function (e, a, t, s) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), e < 0 && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
                    var i = -b.snapGrid[b.snapIndex];
                    if (b.params.autoplay && b.autoplaying && (s || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(a) : b.stopAutoplay()), b.updateProgress(i), b.params.normalizeSlideIndex) for (var r = 0; r < b.slidesGrid.length; r++) {
                        -Math.floor(100 * i) >= Math.floor(100 * b.slidesGrid[r]) && (e = r);
                    }return !(!b.params.allowSwipeToNext && i < b.translate && i < b.minTranslate()) && !(!b.params.allowSwipeToPrev && i > b.translate && i > b.maxTranslate() && (b.activeIndex || 0) !== e) && ("undefined" == typeof a && (a = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.updateRealIndex(), b.rtl && -i === b.translate || !b.rtl && i === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(i), !1) : (b.updateClasses(), b.onTransitionStart(t), 0 === a || b.browser.lteIE9 ? (b.setWrapperTranslate(i), b.setWrapperTransition(0), b.onTransitionEnd(t)) : (b.setWrapperTranslate(i), b.setWrapperTransition(a), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                        b && b.onTransitionEnd(t);
                    }))), !0));
                }, b.onTransitionStart = function (e) {
                    "undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)));
                }, b.onTransitionEnd = function (e) {
                    b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.history && b.history && b.history.setHistory(b.params.history, b.activeIndex), b.params.hashnav && b.hashnav && b.hashnav.setHash();
                }, b.slideNext = function (e, a, t) {
                    if (b.params.loop) {
                        if (b.animating) return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t);
                    }
                    return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t);
                }, b._slideNext = function (e) {
                    return b.slideNext(!0, e, !0);
                }, b.slidePrev = function (e, a, t) {
                    if (b.params.loop) {
                        if (b.animating) return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex - 1, a, e, t);
                    }
                    return b.slideTo(b.activeIndex - 1, a, e, t);
                }, b._slidePrev = function (e) {
                    return b.slidePrev(!0, e, !0);
                }, b.slideReset = function (e, a, t) {
                    return b.slideTo(b.activeIndex, a, e);
                }, b.disableTouchControl = function () {
                    return b.params.onlyExternal = !0, !0;
                }, b.enableTouchControl = function () {
                    return b.params.onlyExternal = !1, !0;
                }, b.setWrapperTransition = function (e, a) {
                    b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, a), b.emit("onSetTransition", b, e);
                }, b.setWrapperTranslate = function (e, a, t) {
                    var s = 0,
                        i = 0,
                        n = 0;
                    b.isHorizontal() ? s = b.rtl ? -e : e : i = e, b.params.roundLengths && (s = r(s), i = r(i)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + s + "px, " + i + "px, " + n + "px)") : b.wrapper.transform("translate(" + s + "px, " + i + "px)")), b.translate = b.isHorizontal() ? s : i;
                    var o,
                        l = b.maxTranslate() - b.minTranslate();
                    o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), a && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, t), b.emit("onSetTranslate", b, b.translate);
                }, b.getTranslate = function (e, a) {
                    var t, s, i, r;
                    return "undefined" == typeof a && (a = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (s = i.transform || i.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map(function (e) {
                        return e.replace(",", ".");
                    }).join(", ")), r = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (r = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = r.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? r.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? r.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), b.rtl && s && (s = -s), s || 0);
                }, b.getWrapperTranslate = function (e) {
                    return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e);
                }, b.observers = [], b.initObservers = function () {
                    if (b.params.observeParents) for (var e = b.container.parents(), a = 0; a < e.length; a++) {
                        l(e[a]);
                    }l(b.container[0], { childList: !1 }), l(b.wrapper[0], { attributes: !1 });
                }, b.disconnectObservers = function () {
                    for (var e = 0; e < b.observers.length; e++) {
                        b.observers[e].disconnect();
                    }b.observers = [];
                }, b.createLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                    var e = b.wrapper.children("." + b.params.slideClass);
                    "auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);
                    var t,
                        s = [],
                        i = [];
                    for (e.each(function (t, r) {
                        var n = a(this);
                        t < b.loopedSlides && i.push(r), t < e.length && t >= e.length - b.loopedSlides && s.push(r), n.attr("data-swiper-slide-index", t);
                    }), t = 0; t < i.length; t++) {
                        b.wrapper.append(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                    }for (t = s.length - 1; t >= 0; t--) {
                        b.wrapper.prepend(a(s[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                    }
                }, b.destroyLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index");
                }, b.reLoop = function (e) {
                    var a = b.activeIndex - b.loopedSlides;
                    b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(a + b.loopedSlides, 0, !1);
                }, b.fixLoop = function () {
                    var e;
                    b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0));
                }, b.appendSlide = function (e) {
                    if (b.params.loop && b.destroyLoop(), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) for (var a = 0; a < e.length; a++) {
                        e[a] && b.wrapper.append(e[a]);
                    } else b.wrapper.append(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0);
                }, b.prependSlide = function (e) {
                    b.params.loop && b.destroyLoop();
                    var a = b.activeIndex + 1;
                    if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
                        for (var t = 0; t < e.length; t++) {
                            e[t] && b.wrapper.prepend(e[t]);
                        }a = b.activeIndex + e.length;
                    } else b.wrapper.prepend(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(a, 0, !1);
                }, b.removeSlide = function (e) {
                    b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
                    var a,
                        t = b.activeIndex;
                    if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
                        for (var s = 0; s < e.length; s++) {
                            a = e[s], b.slides[a] && b.slides.eq(a).remove(), a < t && t--;
                        }t = Math.max(t, 0);
                    } else a = e, b.slides[a] && b.slides.eq(a).remove(), a < t && t--, t = Math.max(t, 0);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(t + b.loopedSlides, 0, !1) : b.slideTo(t, 0, !1);
                }, b.removeAllSlides = function () {
                    for (var e = [], a = 0; a < b.slides.length; a++) {
                        e.push(a);
                    }b.removeSlide(e);
                }, b.effects = {
                    fade: {
                        setTranslate: function setTranslate() {
                            for (var e = 0; e < b.slides.length; e++) {
                                var a = b.slides.eq(e),
                                    t = a[0].swiperSlideOffset,
                                    s = -t;
                                b.params.virtualTranslate || (s -= b.translate);
                                var i = 0;
                                b.isHorizontal() || (i = s, s = 0);
                                var r = b.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({ opacity: r }).transform("translate3d(" + s + "px, " + i + "px, 0px)");
                            }
                        }, setTransition: function setTransition(e) {
                            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                b.slides.transitionEnd(function () {
                                    if (!a && b) {
                                        a = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) {
                                            b.wrapper.trigger(e[t]);
                                        }
                                    }
                                });
                            }
                        }
                    }, flip: {
                        setTranslate: function setTranslate() {
                            for (var e = 0; e < b.slides.length; e++) {
                                var t = b.slides.eq(e),
                                    s = t[0].progress;
                                b.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));
                                var i = t[0].swiperSlideOffset,
                                    r = -180 * s,
                                    n = r,
                                    o = 0,
                                    l = -i,
                                    p = 0;
                                if (b.isHorizontal() ? b.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + b.slides.length, b.params.flip.slideShadows) {
                                    var d = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                        u = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                    0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0));
                                }
                                t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
                            }
                        }, setTransition: function setTransition(e) {
                            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                b.slides.eq(b.activeIndex).transitionEnd(function () {
                                    if (!t && b && a(this).hasClass(b.params.slideActiveClass)) {
                                        t = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < e.length; s++) {
                                            b.wrapper.trigger(e[s]);
                                        }
                                    }
                                });
                            }
                        }
                    }, cube: {
                        setTranslate: function setTranslate() {
                            var e,
                                t = 0;
                            b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({ height: b.width + "px" })) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));
                            for (var s = 0; s < b.slides.length; s++) {
                                var i = b.slides.eq(s),
                                    r = 90 * s,
                                    n = Math.floor(r / 360);
                                b.rtl && (r = -r, n = Math.floor(-r / 360));
                                var o = Math.max(Math.min(i[0].progress, 1), -1),
                                    l = 0,
                                    p = 0,
                                    d = 0;
                                s % 4 === 0 ? (l = 4 * -n * b.size, d = 0) : (s - 1) % 4 === 0 ? (l = 0, d = 4 * -n * b.size) : (s - 2) % 4 === 0 ? (l = b.size + 4 * n * b.size, d = b.size) : (s - 3) % 4 === 0 && (l = -b.size, d = 3 * b.size + 4 * b.size * n), b.rtl && (l = -l), b.isHorizontal() || (p = l, l = 0);
                                var u = "rotateX(" + (b.isHorizontal() ? 0 : -r) + "deg) rotateY(" + (b.isHorizontal() ? r : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                                if (o <= 1 && o > -1 && (t = 90 * s + 90 * o, b.rtl && (t = 90 * -s - 90 * o)), i.transform(u), b.params.cube.slideShadows) {
                                    var c = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                                        m = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                    0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0));
                                }
                            }
                            if (b.wrapper.css({
                                "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                "transform-origin": "50% 50% -" + b.size / 2 + "px"
                            }), b.params.cube.shadow) if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");else {
                                var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                    g = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                    f = b.params.cube.shadowScale,
                                    v = b.params.cube.shadowScale / g,
                                    w = b.params.cube.shadowOffset;
                                e.transform("scale3d(" + f + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)");
                            }
                            var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
                            b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)");
                        }, setTransition: function setTransition(e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e);
                        }
                    }, coverflow: {
                        setTranslate: function setTranslate() {
                            for (var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, s = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, i = b.params.coverflow.depth, r = 0, n = b.slides.length; r < n; r++) {
                                var o = b.slides.eq(r),
                                    l = b.slidesSizesGrid[r],
                                    p = o[0].swiperSlideOffset,
                                    d = (t - p - l / 2) / l * b.params.coverflow.modifier,
                                    u = b.isHorizontal() ? s * d : 0,
                                    c = b.isHorizontal() ? 0 : s * d,
                                    m = -i * Math.abs(d),
                                    h = b.isHorizontal() ? 0 : b.params.coverflow.stretch * d,
                                    g = b.isHorizontal() ? b.params.coverflow.stretch * d : 0;
                                Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
                                var f = "translate3d(" + g + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
                                if (o.transform(f), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, b.params.coverflow.slideShadows) {
                                    var v = b.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                        w = b.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                    0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0);
                                }
                            }
                            if (b.browser.ie) {
                                var y = b.wrapper[0].style;
                                y.perspectiveOrigin = t + "px 50%";
                            }
                        }, setTransition: function setTransition(e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
                        }
                    }
                }, b.lazy = {
                    initialImageLoaded: !1, loadImageInSlide: function loadImageInSlide(e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== b.slides.length)) {
                            var s = b.slides.eq(e),
                                i = s.find("." + b.params.lazyLoadingClass + ":not(." + b.params.lazyStatusLoadedClass + "):not(." + b.params.lazyStatusLoadingClass + ")");
                            !s.hasClass(b.params.lazyLoadingClass) || s.hasClass(b.params.lazyStatusLoadedClass) || s.hasClass(b.params.lazyStatusLoadingClass) || (i = i.add(s[0])), 0 !== i.length && i.each(function () {
                                var e = a(this);
                                e.addClass(b.params.lazyStatusLoadingClass);
                                var i = e.attr("data-background"),
                                    r = e.attr("data-src"),
                                    n = e.attr("data-srcset"),
                                    o = e.attr("data-sizes");
                                b.loadImage(e[0], r || i, n, o, !1, function () {
                                    if (i ? (e.css("background-image", 'url("' + i + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), o && (e.attr("sizes", o), e.removeAttr("data-sizes")), r && (e.attr("src", r), e.removeAttr("data-src"))), e.addClass(b.params.lazyStatusLoadedClass).removeClass(b.params.lazyStatusLoadingClass), s.find("." + b.params.lazyPreloaderClass + ", ." + b.params.preloaderClass).remove(), b.params.loop && t) {
                                        var a = s.attr("data-swiper-slide-index");
                                        if (s.hasClass(b.params.slideDuplicateClass)) {
                                            var l = b.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")");
                                            b.lazy.loadImageInSlide(l.index(), !1);
                                        } else {
                                            var p = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
                                            b.lazy.loadImageInSlide(p.index(), !1);
                                        }
                                    }
                                    b.emit("onLazyImageReady", b, s[0], e[0]);
                                }), b.emit("onLazyImageLoad", b, s[0], e[0]);
                            });
                        }
                    }, load: function load() {
                        var e,
                            t = b.params.slidesPerView;
                        if ("auto" === t && (t = 0), b.lazy.initialImageLoaded || (b.lazy.initialImageLoaded = !0), b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function () {
                            b.lazy.loadImageInSlide(a(this).index());
                        });else if (t > 1) for (e = b.activeIndex; e < b.activeIndex + t; e++) {
                            b.slides[e] && b.lazy.loadImageInSlide(e);
                        } else b.lazy.loadImageInSlide(b.activeIndex);
                        if (b.params.lazyLoadingInPrevNext) if (t > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
                            var s = b.params.lazyLoadingInPrevNextAmount,
                                i = t,
                                r = Math.min(b.activeIndex + i + Math.max(s, i), b.slides.length),
                                n = Math.max(b.activeIndex - Math.max(i, s), 0);
                            for (e = b.activeIndex + t; e < r; e++) {
                                b.slides[e] && b.lazy.loadImageInSlide(e);
                            }for (e = n; e < b.activeIndex; e++) {
                                b.slides[e] && b.lazy.loadImageInSlide(e);
                            }
                        } else {
                            var o = b.wrapper.children("." + b.params.slideNextClass);
                            o.length > 0 && b.lazy.loadImageInSlide(o.index());
                            var l = b.wrapper.children("." + b.params.slidePrevClass);
                            l.length > 0 && b.lazy.loadImageInSlide(l.index());
                        }
                    }, onTransitionStart: function onTransitionStart() {
                        b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load();
                    }, onTransitionEnd: function onTransitionEnd() {
                        b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load();
                    }
                }, b.scrollbar = {
                    isTouched: !1, setDragPosition: function setDragPosition(e) {
                        var a = b.scrollbar,
                            t = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                            s = t - a.track.offset()[b.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                            i = -b.minTranslate() * a.moveDivider,
                            r = -b.maxTranslate() * a.moveDivider;
                        s < i ? s = i : s > r && (s = r), s = -s / a.moveDivider, b.updateProgress(s), b.setWrapperTranslate(s, !0);
                    }, dragStart: function dragStart(e) {
                        var a = b.scrollbar;
                        a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), b.params.scrollbarHide && a.track.css("opacity", 1), b.wrapper.transition(100), a.drag.transition(100), b.emit("onScrollbarDragStart", b);
                    }, dragMove: function dragMove(e) {
                        var a = b.scrollbar;
                        a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), b.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), b.emit("onScrollbarDragMove", b));
                    }, dragEnd: function dragEnd(e) {
                        var a = b.scrollbar;
                        a.isTouched && (a.isTouched = !1, b.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
                            a.track.css("opacity", 0), a.track.transition(400);
                        }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset());
                    }, draggableEvents: function () {
                        return b.params.simulateTouch !== !1 || b.support.touch ? b.touchEvents : b.touchEventsDesktop;
                    }(), enableDraggable: function enableDraggable() {
                        var e = b.scrollbar,
                            t = b.support.touch ? e.track : document;
                        a(e.track).on(e.draggableEvents.start, e.dragStart), a(t).on(e.draggableEvents.move, e.dragMove), a(t).on(e.draggableEvents.end, e.dragEnd);
                    }, disableDraggable: function disableDraggable() {
                        var e = b.scrollbar,
                            t = b.support.touch ? e.track : document;
                        a(e.track).off(e.draggableEvents.start, e.dragStart), a(t).off(e.draggableEvents.move, e.dragMove), a(t).off(e.draggableEvents.end, e.dragEnd);
                    }, set: function set() {
                        if (b.params.scrollbar) {
                            var e = b.scrollbar;
                            e.track = a(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && e.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0);
                        }
                    }, setTranslate: function setTranslate() {
                        if (b.params.scrollbar) {
                            var e,
                                a = b.scrollbar,
                                t = (b.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : e < 0 ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (b.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
                                a.track[0].style.opacity = 0, a.track.transition(400);
                            }, 1e3));
                        }
                    }, setTransition: function setTransition(e) {
                        b.params.scrollbar && b.scrollbar.drag.transition(e);
                    }
                }, b.controller = {
                    LinearSpline: function LinearSpline(e, a) {
                        this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var t, s;
                        this.x.length;
                        this.interpolate = function (e) {
                            return e ? (s = i(this.x, e), t = s - 1, (e - this.x[t]) * (this.y[s] - this.y[t]) / (this.x[s] - this.x[t]) + this.y[t]) : 0;
                        };
                        var i = function () {
                            var e, a, t;
                            return function (s, i) {
                                for (a = -1, e = s.length; e - a > 1;) {
                                    s[t = e + a >> 1] <= i ? a = t : e = t;
                                }return e;
                            };
                        }();
                    }, getInterpolateFunction: function getInterpolateFunction(e) {
                        b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid));
                    }, setTranslate: function setTranslate(e, a) {
                        function s(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(a), r = -b.controller.spline.interpolate(-e)), r && "container" !== b.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (b.maxTranslate() - b.minTranslate()), r = (e - b.minTranslate()) * i + a.minTranslate()), b.params.controlInverse && (r = a.maxTranslate() - r), a.updateProgress(r), a.setWrapperTranslate(r, !1, b), a.updateActiveIndex();
                        }

                        var i,
                            r,
                            n = b.params.control;
                        if (b.isArray(n)) for (var o = 0; o < n.length; o++) {
                            n[o] !== a && n[o] instanceof t && s(n[o]);
                        } else n instanceof t && a !== n && s(n);
                    }, setTransition: function setTransition(e, a) {
                        function s(a) {
                            a.setWrapperTransition(e, b), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
                                r && (a.params.loop && "slide" === b.params.controlBy && a.fixLoop(), a.onTransitionEnd());
                            }));
                        }

                        var i,
                            r = b.params.control;
                        if (b.isArray(r)) for (i = 0; i < r.length; i++) {
                            r[i] !== a && r[i] instanceof t && s(r[i]);
                        } else r instanceof t && a !== r && s(r);
                    }
                }, b.hashnav = {
                    onHashCange: function onHashCange(e, a) {
                        var t = document.location.hash.replace("#", ""),
                            s = b.slides.eq(b.activeIndex).attr("data-hash");
                        t !== s && b.slideTo(b.wrapper.children("." + b.params.slideClass + '[data-hash="' + t + '"]').index());
                    }, attachEvents: function attachEvents(e) {
                        var t = e ? "off" : "on";
                        a(window)[t]("hashchange", b.hashnav.onHashCange);
                    }, setHash: function setHash() {
                        if (b.hashnav.initialized && b.params.hashnav) if (b.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + b.slides.eq(b.activeIndex).attr("data-hash") || "");else {
                            var e = b.slides.eq(b.activeIndex),
                                a = e.attr("data-hash") || e.attr("data-history");
                            document.location.hash = a || "";
                        }
                    }, init: function init() {
                        if (b.params.hashnav && !b.params.history) {
                            b.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e) for (var a = 0, t = 0, s = b.slides.length; t < s; t++) {
                                var i = b.slides.eq(t),
                                    r = i.attr("data-hash") || i.attr("data-history");
                                if (r === e && !i.hasClass(b.params.slideDuplicateClass)) {
                                    var n = i.index();
                                    b.slideTo(n, a, b.params.runCallbacksOnInit, !0);
                                }
                            }
                            b.params.hashnavWatchState && b.hashnav.attachEvents();
                        }
                    }, destroy: function destroy() {
                        b.params.hashnavWatchState && b.hashnav.attachEvents(!0);
                    }
                }, b.history = {
                    init: function init() {
                        if (b.params.history) {
                            if (!window.history || !window.history.pushState) return b.params.history = !1, void (b.params.hashnav = !0);
                            b.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, b.params.runCallbacksOnInit), b.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState));
                        }
                    }, setHistoryPopState: function setHistoryPopState() {
                        b.history.paths = b.history.getPathValues(), b.history.scrollToSlide(b.params.speed, b.history.paths.value, !1);
                    }, getPathValues: function getPathValues() {
                        var e = window.location.pathname.slice(1).split("/"),
                            a = e.length,
                            t = e[a - 2],
                            s = e[a - 1];
                        return { key: t, value: s };
                    }, setHistory: function setHistory(e, a) {
                        if (b.history.initialized && b.params.history) {
                            var t = b.slides.eq(a),
                                s = this.slugify(t.attr("data-history"));
                            window.location.pathname.includes(e) || (s = e + "/" + s), b.params.replaceState ? window.history.replaceState(null, null, s) : window.history.pushState(null, null, s);
                        }
                    }, slugify: function slugify(e) {
                        return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
                    }, scrollToSlide: function scrollToSlide(e, a, t) {
                        if (a) for (var s = 0, i = b.slides.length; s < i; s++) {
                            var r = b.slides.eq(s),
                                n = this.slugify(r.attr("data-history"));
                            if (n === a && !r.hasClass(b.params.slideDuplicateClass)) {
                                var o = r.index();
                                b.slideTo(o, e, t);
                            }
                        } else b.slideTo(0, e, t);
                    }
                }, b.disableKeyboardControl = function () {
                    b.params.keyboardControl = !1, a(document).off("keydown", p);
                }, b.enableKeyboardControl = function () {
                    b.params.keyboardControl = !0, a(document).on("keydown", p);
                }, b.mousewheel = {
                    event: !1,
                    lastScrollTime: new window.Date().getTime()
                }, b.params.mousewheelControl && (b.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : d() ? "wheel" : "mousewheel"), b.disableMousewheelControl = function () {
                    if (!b.mousewheel.event) return !1;
                    var e = b.container;
                    return "container" !== b.params.mousewheelEventsTarged && (e = a(b.params.mousewheelEventsTarged)), e.off(b.mousewheel.event, u), !0;
                }, b.enableMousewheelControl = function () {
                    if (!b.mousewheel.event) return !1;
                    var e = b.container;
                    return "container" !== b.params.mousewheelEventsTarged && (e = a(b.params.mousewheelEventsTarged)), e.on(b.mousewheel.event, u), !0;
                }, b.parallax = {
                    setTranslate: function setTranslate() {
                        b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            m(this, b.progress);
                        }), b.slides.each(function () {
                            var e = a(this);
                            e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                                var a = Math.min(Math.max(e[0].progress, -1), 1);
                                m(this, a);
                            });
                        });
                    }, setTransition: function setTransition(e) {
                        "undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var t = a(this),
                                s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                            0 === e && (s = 0), t.transition(s);
                        });
                    }
                }, b.zoom = {
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        slide: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        image: void 0,
                        imageWrap: void 0,
                        zoomMax: b.params.zoomMax
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 },
                    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
                        if (e.targetTouches.length < 2) return 1;
                        var a = e.targetTouches[0].pageX,
                            t = e.targetTouches[0].pageY,
                            s = e.targetTouches[1].pageX,
                            i = e.targetTouches[1].pageY,
                            r = Math.sqrt(Math.pow(s - a, 2) + Math.pow(i - t, 2));
                        return r;
                    },
                    onGestureStart: function onGestureStart(e) {
                        var t = b.zoom;
                        if (!b.support.gestures) {
                            if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                            t.gesture.scaleStart = t.getDistanceBetweenTouches(e);
                        }
                        return t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = a(this), 0 === t.gesture.slide.length && (t.gesture.slide = b.slides.eq(b.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + b.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-swiper-zoom") || b.params.zoomMax, 0 !== t.gesture.imageWrap.length) ? (t.gesture.image.transition(0), void (t.isScaling = !0)) : void (t.gesture.image = void 0);
                    },
                    onGestureChange: function onGestureChange(e) {
                        var a = b.zoom;
                        if (!b.support.gestures) {
                            if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                            a.gesture.scaleMove = a.getDistanceBetweenTouches(e);
                        }
                        a.gesture.image && 0 !== a.gesture.image.length && (b.support.gestures ? a.scale = e.scale * a.currentScale : a.scale = a.gesture.scaleMove / a.gesture.scaleStart * a.currentScale, a.scale > a.gesture.zoomMax && (a.scale = a.gesture.zoomMax - 1 + Math.pow(a.scale - a.gesture.zoomMax + 1, .5)), a.scale < b.params.zoomMin && (a.scale = b.params.zoomMin + 1 - Math.pow(b.params.zoomMin - a.scale + 1, .5)), a.gesture.image.transform("translate3d(0,0,0) scale(" + a.scale + ")"));
                    },
                    onGestureEnd: function onGestureEnd(e) {
                        var a = b.zoom;
                        !b.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || a.gesture.image && 0 !== a.gesture.image.length && (a.scale = Math.max(Math.min(a.scale, a.gesture.zoomMax), b.params.zoomMin), a.gesture.image.transition(b.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (a.gesture.slide = void 0));
                    },
                    onTouchStart: function onTouchStart(e, a) {
                        var t = e.zoom;
                        t.gesture.image && 0 !== t.gesture.image.length && (t.image.isTouched || ("android" === e.device.os && a.preventDefault(), t.image.isTouched = !0, t.image.touchesStart.x = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, t.image.touchesStart.y = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY));
                    },
                    onTouchMove: function onTouchMove(e) {
                        var a = b.zoom;
                        if (a.gesture.image && 0 !== a.gesture.image.length && (b.allowClick = !1, a.image.isTouched && a.gesture.slide)) {
                            a.image.isMoved || (a.image.width = a.gesture.image[0].offsetWidth, a.image.height = a.gesture.image[0].offsetHeight, a.image.startX = b.getTranslate(a.gesture.imageWrap[0], "x") || 0, a.image.startY = b.getTranslate(a.gesture.imageWrap[0], "y") || 0, a.gesture.slideWidth = a.gesture.slide[0].offsetWidth, a.gesture.slideHeight = a.gesture.slide[0].offsetHeight, a.gesture.imageWrap.transition(0), b.rtl && (a.image.startX = -a.image.startX), b.rtl && (a.image.startY = -a.image.startY));
                            var t = a.image.width * a.scale,
                                s = a.image.height * a.scale;
                            if (!(t < a.gesture.slideWidth && s < a.gesture.slideHeight)) {
                                if (a.image.minX = Math.min(a.gesture.slideWidth / 2 - t / 2, 0), a.image.maxX = -a.image.minX, a.image.minY = Math.min(a.gesture.slideHeight / 2 - s / 2, 0), a.image.maxY = -a.image.minY, a.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.image.isMoved && !a.isScaling) {
                                    if (b.isHorizontal() && Math.floor(a.image.minX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x < a.image.touchesStart.x || Math.floor(a.image.maxX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x > a.image.touchesStart.x) return void (a.image.isTouched = !1);
                                    if (!b.isHorizontal() && Math.floor(a.image.minY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y < a.image.touchesStart.y || Math.floor(a.image.maxY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y > a.image.touchesStart.y) return void (a.image.isTouched = !1);
                                }
                                e.preventDefault(), e.stopPropagation(), a.image.isMoved = !0, a.image.currentX = a.image.touchesCurrent.x - a.image.touchesStart.x + a.image.startX, a.image.currentY = a.image.touchesCurrent.y - a.image.touchesStart.y + a.image.startY, a.image.currentX < a.image.minX && (a.image.currentX = a.image.minX + 1 - Math.pow(a.image.minX - a.image.currentX + 1, .8)), a.image.currentX > a.image.maxX && (a.image.currentX = a.image.maxX - 1 + Math.pow(a.image.currentX - a.image.maxX + 1, .8)), a.image.currentY < a.image.minY && (a.image.currentY = a.image.minY + 1 - Math.pow(a.image.minY - a.image.currentY + 1, .8)), a.image.currentY > a.image.maxY && (a.image.currentY = a.image.maxY - 1 + Math.pow(a.image.currentY - a.image.maxY + 1, .8)), a.velocity.prevPositionX || (a.velocity.prevPositionX = a.image.touchesCurrent.x), a.velocity.prevPositionY || (a.velocity.prevPositionY = a.image.touchesCurrent.y), a.velocity.prevTime || (a.velocity.prevTime = Date.now()), a.velocity.x = (a.image.touchesCurrent.x - a.velocity.prevPositionX) / (Date.now() - a.velocity.prevTime) / 2, a.velocity.y = (a.image.touchesCurrent.y - a.velocity.prevPositionY) / (Date.now() - a.velocity.prevTime) / 2, Math.abs(a.image.touchesCurrent.x - a.velocity.prevPositionX) < 2 && (a.velocity.x = 0), Math.abs(a.image.touchesCurrent.y - a.velocity.prevPositionY) < 2 && (a.velocity.y = 0), a.velocity.prevPositionX = a.image.touchesCurrent.x, a.velocity.prevPositionY = a.image.touchesCurrent.y, a.velocity.prevTime = Date.now(), a.gesture.imageWrap.transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)");
                            }
                        }
                    },
                    onTouchEnd: function onTouchEnd(e, a) {
                        var t = e.zoom;
                        if (t.gesture.image && 0 !== t.gesture.image.length) {
                            if (!t.image.isTouched || !t.image.isMoved) return t.image.isTouched = !1, void (t.image.isMoved = !1);
                            t.image.isTouched = !1, t.image.isMoved = !1;
                            var s = 300,
                                i = 300,
                                r = t.velocity.x * s,
                                n = t.image.currentX + r,
                                o = t.velocity.y * i,
                                l = t.image.currentY + o;
                            0 !== t.velocity.x && (s = Math.abs((n - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (i = Math.abs((l - t.image.currentY) / t.velocity.y));
                            var p = Math.max(s, i);
                            t.image.currentX = n, t.image.currentY = l;
                            var d = t.image.width * t.scale,
                                u = t.image.height * t.scale;
                            t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - u / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(p).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)");
                        }
                    },
                    onTransitionEnd: function onTransitionEnd(e) {
                        var a = e.zoom;
                        a.gesture.slide && e.previousIndex !== e.activeIndex && (a.gesture.image.transform("translate3d(0,0,0) scale(1)"), a.gesture.imageWrap.transform("translate3d(0,0,0)"), a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0, a.scale = a.currentScale = 1);
                    },
                    toggleZoom: function toggleZoom(e, t) {
                        var s = e.zoom;
                        if (s.gesture.slide || (s.gesture.slide = e.clickedSlide ? a(e.clickedSlide) : e.slides.eq(e.activeIndex), s.gesture.image = s.gesture.slide.find("img, svg, canvas"), s.gesture.imageWrap = s.gesture.image.parent("." + e.params.zoomContainerClass)), s.gesture.image && 0 !== s.gesture.image.length) {
                            var i, r, n, o, l, p, d, u, c, m, h, g, f, v, w, y, x, T;
                            "undefined" == typeof s.image.touchesStart.x && t ? (i = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, r = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (i = s.image.touchesStart.x, r = s.image.touchesStart.y), s.scale && 1 !== s.scale ? (s.scale = s.currentScale = 1, s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), s.gesture.slide = void 0) : (s.scale = s.currentScale = s.gesture.imageWrap.attr("data-swiper-zoom") || e.params.zoomMax, t ? (x = s.gesture.slide[0].offsetWidth, T = s.gesture.slide[0].offsetHeight, n = s.gesture.slide.offset().left, o = s.gesture.slide.offset().top, l = n + x / 2 - i, p = o + T / 2 - r, c = s.gesture.image[0].offsetWidth, m = s.gesture.image[0].offsetHeight, h = c * s.scale, g = m * s.scale, f = Math.min(x / 2 - h / 2, 0), v = Math.min(T / 2 - g / 2, 0), w = -f, y = -v, d = l * s.scale, u = p * s.scale, d < f && (d = f), d > w && (d = w), u < v && (u = v), u > y && (u = y)) : (d = 0, u = 0), s.gesture.imageWrap.transition(300).transform("translate3d(" + d + "px, " + u + "px,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")"));
                        }
                    },
                    attachEvents: function attachEvents(e) {
                        var t = e ? "off" : "on";
                        if (b.params.zoom) {
                            var s = (b.slides, !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            });
                            b.support.gestures ? (b.slides[t]("gesturestart", b.zoom.onGestureStart, s), b.slides[t]("gesturechange", b.zoom.onGestureChange, s), b.slides[t]("gestureend", b.zoom.onGestureEnd, s)) : "touchstart" === b.touchEvents.start && (b.slides[t](b.touchEvents.start, b.zoom.onGestureStart, s), b.slides[t](b.touchEvents.move, b.zoom.onGestureChange, s), b.slides[t](b.touchEvents.end, b.zoom.onGestureEnd, s)), b[t]("touchStart", b.zoom.onTouchStart), b.slides.each(function (e, s) {
                                a(s).find("." + b.params.zoomContainerClass).length > 0 && a(s)[t](b.touchEvents.move, b.zoom.onTouchMove);
                            }), b[t]("touchEnd", b.zoom.onTouchEnd), b[t]("transitionEnd", b.zoom.onTransitionEnd), b.params.zoomToggle && b.on("doubleTap", b.zoom.toggleZoom);
                        }
                    },
                    init: function init() {
                        b.zoom.attachEvents();
                    },
                    destroy: function destroy() {
                        b.zoom.attachEvents(!0);
                    }
                }, b._plugins = [];
                for (var O in b.plugins) {
                    var N = b.plugins[O](b, b.params[O]);
                    N && b._plugins.push(N);
                }
                return b.callPlugins = function (e) {
                    for (var a = 0; a < b._plugins.length; a++) {
                        e in b._plugins[a] && b._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    }
                }, b.emitterEventListeners = {}, b.emit = function (e) {
                    b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    var a;
                    if (b.emitterEventListeners[e]) for (a = 0; a < b.emitterEventListeners[e].length; a++) {
                        b.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    }b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }, b.on = function (e, a) {
                    return e = h(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(a), b;
                }, b.off = function (e, a) {
                    var t;
                    if (e = h(e), "undefined" == typeof a) return b.emitterEventListeners[e] = [], b;
                    if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
                        for (t = 0; t < b.emitterEventListeners[e].length; t++) {
                            b.emitterEventListeners[e][t] === a && b.emitterEventListeners[e].splice(t, 1);
                        }return b;
                    }
                }, b.once = function (e, a) {
                    e = h(e);
                    var t = function t() {
                        a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, t);
                    };
                    return b.on(e, t), b;
                }, b.a11y = {
                    makeFocusable: function makeFocusable(e) {
                        return e.attr("tabIndex", "0"), e;
                    },
                    addRole: function addRole(e, a) {
                        return e.attr("role", a), e;
                    },
                    addLabel: function addLabel(e, a) {
                        return e.attr("aria-label", a), e;
                    },
                    disable: function disable(e) {
                        return e.attr("aria-disabled", !0), e;
                    },
                    enable: function enable(e) {
                        return e.attr("aria-disabled", !1), e;
                    },
                    onEnterKey: function onEnterKey(e) {
                        13 === e.keyCode && (a(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : a(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), a(e.target).is("." + b.params.bulletClass) && a(e.target)[0].click());
                    },
                    liveRegion: a('<span class="' + b.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                    notify: function notify(e) {
                        var a = b.a11y.liveRegion;
                        0 !== a.length && (a.html(""), a.html(e));
                    },
                    init: function init() {
                        b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), a(b.container).append(b.a11y.liveRegion);
                    },
                    initPagination: function initPagination() {
                        b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function () {
                            var e = a(this);
                            b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1));
                        });
                    },
                    destroy: function destroy() {
                        b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove();
                    }
                }, b.init = function () {
                    b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.zoom && b.zoom && b.zoom.init(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnavReplaceState && (b.params.replaceState = b.params.hashnavReplaceState), b.params.history && b.history && b.history.init(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b);
                }, b.cleanupStyles = function () {
                    b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"));
                }, b.destroy = function (e, a) {
                    b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), a && b.cleanupStyles(), b.disconnectObservers(), b.params.zoom && b.zoom && b.zoom.destroy(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.params.history && !b.params.replaceState && window.removeEventListener("popstate", b.history.setHistoryPopState), b.params.hashnav && b.hashnav && b.hashnav.destroy(), b.emit("onDestroy"), e !== !1 && (b = null);
                }, b.init(), b;
            }
        };
        t.prototype = {
            isSafari: function () {
                var e = window.navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
            }(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
            isArray: function isArray(e) {
                return "[object Array]" === Object.prototype.toString.apply(e);
            },
            browser: {
                ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
                ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
                lteIE9: function () {
                    var e = document.createElement("div");
                    return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length;
                }()
            },
            device: function () {
                var e = window.navigator.userAgent,
                    a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                    t = e.match(/(iPad).*OS\s([\d_]+)/),
                    s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                    i = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
                return { ios: t || i || s, android: a };
            }(),
            support: {
                touch: window.Modernizr && Modernizr.touch === !0 || function () {
                    return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
                }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
                    var e = document.createElement("div").style;
                    return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
                }(), flexbox: function () {
                    for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) {
                        if (a[t] in e) return !0;
                    }
                }(), observer: function () {
                    return "MutationObserver" in window || "WebkitMutationObserver" in window;
                }(), passiveListener: function () {
                    var e = !1;
                    try {
                        var a = Object.defineProperty({}, "passive", {
                            get: function get() {
                                e = !0;
                            }
                        });
                        window.addEventListener("testPassiveListener", null, a);
                    } catch (e) {}
                    return e;
                }(), gestures: function () {
                    return "ongesturestart" in window;
                }()
            },
            plugins: {}
        };
        for (var s = function () {
            var e = function e(_e) {
                var a = this,
                    t = 0;
                for (t = 0; t < _e.length; t++) {
                    a[t] = _e[t];
                }return a.length = _e.length, this;
            },
                a = function a(_a, t) {
                var s = [],
                    i = 0;
                if (_a && !t && _a instanceof e) return _a;
                if (_a) if ("string" == typeof _a) {
                    var r,
                        n,
                        o = _a.trim();
                    if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                        var l = "div";
                        for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), 0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = _a, i = 0; i < n.childNodes.length; i++) {
                            s.push(n.childNodes[i]);
                        }
                    } else for (r = t || "#" !== _a[0] || _a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(_a) : [document.getElementById(_a.split("#")[1])], i = 0; i < r.length; i++) {
                        r[i] && s.push(r[i]);
                    }
                } else if (_a.nodeType || _a === window || _a === document) s.push(_a);else if (_a.length > 0 && _a[0].nodeType) for (i = 0; i < _a.length; i++) {
                    s.push(_a[i]);
                }return new e(s);
            };
            return e.prototype = {
                addClass: function addClass(e) {
                    if ("undefined" == typeof e) return this;
                    for (var a = e.split(" "), t = 0; t < a.length; t++) {
                        for (var s = 0; s < this.length; s++) {
                            this[s].classList.add(a[t]);
                        }
                    }return this;
                }, removeClass: function removeClass(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++) {
                        for (var s = 0; s < this.length; s++) {
                            this[s].classList.remove(a[t]);
                        }
                    }return this;
                }, hasClass: function hasClass(e) {
                    return !!this[0] && this[0].classList.contains(e);
                }, toggleClass: function toggleClass(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++) {
                        for (var s = 0; s < this.length; s++) {
                            this[s].classList.toggle(a[t]);
                        }
                    }return this;
                }, attr: function attr(e, a) {
                    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                    for (var t = 0; t < this.length; t++) {
                        if (2 === arguments.length) this[t].setAttribute(e, a);else for (var s in e) {
                            this[t][s] = e[s], this[t].setAttribute(s, e[s]);
                        }
                    }return this;
                }, removeAttr: function removeAttr(e) {
                    for (var a = 0; a < this.length; a++) {
                        this[a].removeAttribute(e);
                    }return this;
                }, data: function data(e, a) {
                    if ("undefined" != typeof a) {
                        for (var t = 0; t < this.length; t++) {
                            var s = this[t];
                            s.dom7ElementDataStorage || (s.dom7ElementDataStorage = {}), s.dom7ElementDataStorage[e] = a;
                        }
                        return this;
                    }
                    if (this[0]) {
                        var i = this[0].getAttribute("data-" + e);
                        return i ? i : this[0].dom7ElementDataStorage && (e in this[0].dom7ElementDataStorage) ? this[0].dom7ElementDataStorage[e] : void 0;
                    }
                }, transform: function transform(e) {
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
                    }
                    return this;
                }, transition: function transition(e) {
                    "string" != typeof e && (e += "ms");
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
                    }
                    return this;
                }, on: function on(e, t, s, i) {
                    function r(e) {
                        var i = e.target;
                        if (a(i).is(t)) s.call(i, e);else for (var r = a(i).parents(), n = 0; n < r.length; n++) {
                            a(r[n]).is(t) && s.call(r[n], e);
                        }
                    }

                    var n,
                        o,
                        l = e.split(" ");
                    for (n = 0; n < this.length; n++) {
                        if ("function" == typeof t || t === !1) for ("function" == typeof t && (s = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++) {
                            this[n].addEventListener(l[o], s, i);
                        } else for (o = 0; o < l.length; o++) {
                            this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
                                listener: s,
                                liveListener: r
                            }), this[n].addEventListener(l[o], r, i);
                        }
                    }return this;
                }, off: function off(e, a, t, s) {
                    for (var i = e.split(" "), r = 0; r < i.length; r++) {
                        for (var n = 0; n < this.length; n++) {
                            if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], s = arguments[2] || !1), this[n].removeEventListener(i[r], t, s);else if (this[n].dom7LiveListeners) for (var o = 0; o < this[n].dom7LiveListeners.length; o++) {
                                this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[r], this[n].dom7LiveListeners[o].liveListener, s);
                            }
                        }
                    }return this;
                }, once: function once(e, a, t, s) {
                    function i(n) {
                        t(n), r.off(e, a, i, s);
                    }

                    var r = this;
                    "function" == typeof a && (a = !1, t = arguments[1], s = arguments[2]), r.on(e, a, i, s);
                }, trigger: function trigger(e, a) {
                    for (var t = 0; t < this.length; t++) {
                        var s;
                        try {
                            s = new window.CustomEvent(e, { detail: a, bubbles: !0, cancelable: !0 });
                        } catch (t) {
                            s = document.createEvent("Event"), s.initEvent(e, !0, !0), s.detail = a;
                        }
                        this[t].dispatchEvent(s);
                    }
                    return this;
                }, transitionEnd: function transitionEnd(e) {
                    function a(r) {
                        if (r.target === this) for (e.call(this, r), t = 0; t < s.length; t++) {
                            i.off(s[t], a);
                        }
                    }

                    var t,
                        s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                        i = this;
                    if (e) for (t = 0; t < s.length; t++) {
                        i.on(s[t], a);
                    }return this;
                }, width: function width() {
                    return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null;
                }, outerWidth: function outerWidth(e) {
                    return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
                }, height: function height() {
                    return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null;
                }, outerHeight: function outerHeight(e) {
                    return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null;
                }, offset: function offset() {
                    if (this.length > 0) {
                        var e = this[0],
                            a = e.getBoundingClientRect(),
                            t = document.body,
                            s = e.clientTop || t.clientTop || 0,
                            i = e.clientLeft || t.clientLeft || 0,
                            r = window.pageYOffset || e.scrollTop,
                            n = window.pageXOffset || e.scrollLeft;
                        return { top: a.top + r - s, left: a.left + n - i };
                    }
                    return null;
                }, css: function css(e, a) {
                    var t;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (t = 0; t < this.length; t++) {
                                for (var s in e) {
                                    this[t].style[s] = e[s];
                                }
                            }return this;
                        }
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e);
                    }
                    if (2 === arguments.length && "string" == typeof e) {
                        for (t = 0; t < this.length; t++) {
                            this[t].style[e] = a;
                        }return this;
                    }
                    return this;
                }, each: function each(e) {
                    for (var a = 0; a < this.length; a++) {
                        e.call(this[a], a, this[a]);
                    }return this;
                }, html: function html(e) {
                    if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
                    for (var a = 0; a < this.length; a++) {
                        this[a].innerHTML = e;
                    }return this;
                }, text: function text(e) {
                    if ("undefined" == typeof e) return this[0] ? this[0].textContent.trim() : null;
                    for (var a = 0; a < this.length; a++) {
                        this[a].textContent = e;
                    }return this;
                }, is: function is(t) {
                    if (!this[0]) return !1;
                    var s, i;
                    if ("string" == typeof t) {
                        var r = this[0];
                        if (r === document) return t === document;
                        if (r === window) return t === window;
                        if (r.matches) return r.matches(t);
                        if (r.webkitMatchesSelector) return r.webkitMatchesSelector(t);
                        if (r.mozMatchesSelector) return r.mozMatchesSelector(t);
                        if (r.msMatchesSelector) return r.msMatchesSelector(t);
                        for (s = a(t), i = 0; i < s.length; i++) {
                            if (s[i] === this[0]) return !0;
                        }return !1;
                    }
                    if (t === document) return this[0] === document;
                    if (t === window) return this[0] === window;
                    if (t.nodeType || t instanceof e) {
                        for (s = t.nodeType ? [t] : t, i = 0; i < s.length; i++) {
                            if (s[i] === this[0]) return !0;
                        }return !1;
                    }
                    return !1;
                }, index: function index() {
                    if (this[0]) {
                        for (var e = this[0], a = 0; null !== (e = e.previousSibling);) {
                            1 === e.nodeType && a++;
                        }return a;
                    }
                }, eq: function eq(a) {
                    if ("undefined" == typeof a) return this;
                    var t,
                        s = this.length;
                    return a > s - 1 ? new e([]) : a < 0 ? (t = s + a, new e(t < 0 ? [] : [this[t]])) : new e([this[a]]);
                }, append: function append(a) {
                    var t, s;
                    for (t = 0; t < this.length; t++) {
                        if ("string" == typeof a) {
                            var i = document.createElement("div");
                            for (i.innerHTML = a; i.firstChild;) {
                                this[t].appendChild(i.firstChild);
                            }
                        } else if (a instanceof e) for (s = 0; s < a.length; s++) {
                            this[t].appendChild(a[s]);
                        } else this[t].appendChild(a);
                    }return this;
                }, prepend: function prepend(a) {
                    var t, s;
                    for (t = 0; t < this.length; t++) {
                        if ("string" == typeof a) {
                            var i = document.createElement("div");
                            for (i.innerHTML = a, s = i.childNodes.length - 1; s >= 0; s--) {
                                this[t].insertBefore(i.childNodes[s], this[t].childNodes[0]);
                            }
                        } else if (a instanceof e) for (s = 0; s < a.length; s++) {
                            this[t].insertBefore(a[s], this[t].childNodes[0]);
                        } else this[t].insertBefore(a, this[t].childNodes[0]);
                    }return this;
                }, insertBefore: function insertBefore(e) {
                    for (var t = a(e), s = 0; s < this.length; s++) {
                        if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0]);else if (t.length > 1) for (var i = 0; i < t.length; i++) {
                            t[i].parentNode.insertBefore(this[s].cloneNode(!0), t[i]);
                        }
                    }
                }, insertAfter: function insertAfter(e) {
                    for (var t = a(e), s = 0; s < this.length; s++) {
                        if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0].nextSibling);else if (t.length > 1) for (var i = 0; i < t.length; i++) {
                            t[i].parentNode.insertBefore(this[s].cloneNode(!0), t[i].nextSibling);
                        }
                    }
                }, next: function next(t) {
                    return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : []);
                }, nextAll: function nextAll(t) {
                    var s = [],
                        i = this[0];
                    if (!i) return new e([]);
                    for (; i.nextElementSibling;) {
                        var r = i.nextElementSibling;
                        t ? a(r).is(t) && s.push(r) : s.push(r), i = r;
                    }
                    return new e(s);
                }, prev: function prev(t) {
                    return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : []);
                }, prevAll: function prevAll(t) {
                    var s = [],
                        i = this[0];
                    if (!i) return new e([]);
                    for (; i.previousElementSibling;) {
                        var r = i.previousElementSibling;
                        t ? a(r).is(t) && s.push(r) : s.push(r), i = r;
                    }
                    return new e(s);
                }, parent: function parent(e) {
                    for (var t = [], s = 0; s < this.length; s++) {
                        e ? a(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode);
                    }return a(a.unique(t));
                }, parents: function parents(e) {
                    for (var t = [], s = 0; s < this.length; s++) {
                        for (var i = this[s].parentNode; i;) {
                            e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
                        }
                    }return a(a.unique(t));
                }, find: function find(a) {
                    for (var t = [], s = 0; s < this.length; s++) {
                        for (var i = this[s].querySelectorAll(a), r = 0; r < i.length; r++) {
                            t.push(i[r]);
                        }
                    }return new e(t);
                }, children: function children(t) {
                    for (var s = [], i = 0; i < this.length; i++) {
                        for (var r = this[i].childNodes, n = 0; n < r.length; n++) {
                            t ? 1 === r[n].nodeType && a(r[n]).is(t) && s.push(r[n]) : 1 === r[n].nodeType && s.push(r[n]);
                        }
                    }return new e(a.unique(s));
                }, remove: function remove() {
                    for (var e = 0; e < this.length; e++) {
                        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    }return this;
                }, add: function add() {
                    var e,
                        t,
                        s = this;
                    for (e = 0; e < arguments.length; e++) {
                        var i = a(arguments[e]);
                        for (t = 0; t < i.length; t++) {
                            s[s.length] = i[t], s.length++;
                        }
                    }
                    return s;
                }
            }, a.fn = e.prototype, a.unique = function (e) {
                for (var a = [], t = 0; t < e.length; t++) {
                    a.indexOf(e[t]) === -1 && a.push(e[t]);
                }return a;
            }, a;
        }(), i = ["jQuery", "Zepto", "Dom7"], r = 0; r < i.length; r++) {
            window[i[r]] && e(window[i[r]]);
        }var n;
        n = "undefined" == typeof s ? window.Dom7 || window.Zepto || window.jQuery : s, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function (e) {
            function a(r) {
                if (r.target === this) for (e.call(this, r), t = 0; t < s.length; t++) {
                    i.off(s[t], a);
                }
            }

            var t,
                s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                i = this;
            if (e) for (t = 0; t < s.length; t++) {
                i.on(s[t], a);
            }return this;
        }), "transform" in n.fn || (n.fn.transform = function (e) {
            for (var a = 0; a < this.length; a++) {
                var t = this[a].style;
                t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
            }
            return this;
        }), "transition" in n.fn || (n.fn.transition = function (e) {
            "string" != typeof e && (e += "ms");
            for (var a = 0; a < this.length; a++) {
                var t = this[a].style;
                t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
            }
            return this;
        }), "outerWidth" in n.fn || (n.fn.outerWidth = function (e) {
            return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
        })), window.Swiper = t;
    }(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
        "use strict";

        return window.Swiper;
    });
});
//# sourceMappingURL=maps/swiper.js.map
//# sourceMappingURL=../src/maps/mods/swiper.js.map
