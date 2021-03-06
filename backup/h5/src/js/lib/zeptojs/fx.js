'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;
define("lib/zeptojs/fx", function (require, exports, module) {
    var prefix = '',
        eventPrefix,
        vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
        testEl = document.createElement('div'),
        supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        transform,
        transitionProperty,
        transitionDuration,
        transitionTiming,
        transitionDelay,
        animationName,
        animationDuration,
        animationTiming,
        animationDelay,
        cssReset = {};

    function dasherize(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    function normalizeEvent(name) {
        return eventPrefix ? eventPrefix + name : name.toLowerCase();
    }

    if (testEl.style.transform === undefined) $.each(vendors, function (vendor, event) {
        if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
            prefix = '-' + vendor.toLowerCase() + '-';
            eventPrefix = event;
            return false;
        }
    });

    transform = prefix + 'transform';
    cssReset[transitionProperty = prefix + 'transition-property'] = cssReset[transitionDuration = prefix + 'transition-duration'] = cssReset[transitionDelay = prefix + 'transition-delay'] = cssReset[transitionTiming = prefix + 'transition-timing-function'] = cssReset[animationName = prefix + 'animation-name'] = cssReset[animationDuration = prefix + 'animation-duration'] = cssReset[animationDelay = prefix + 'animation-delay'] = cssReset[animationTiming = prefix + 'animation-timing-function'] = '';

    $.fx = {
        off: eventPrefix === undefined && testEl.style.transitionProperty === undefined,
        speeds: { _default: 400, fast: 200, slow: 600 },
        cssPrefix: prefix,
        transitionEnd: normalizeEvent('TransitionEnd'),
        animationEnd: normalizeEvent('AnimationEnd')
    };

    $.fn.animate = function (properties, duration, ease, callback, delay) {
        if ($.isFunction(duration)) callback = duration, ease = undefined, duration = undefined;
        if ($.isFunction(ease)) callback = ease, ease = undefined;
        if ($.isPlainObject(duration)) ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration;
        if (duration) duration = (typeof duration == 'number' ? duration : $.fx.speeds[duration] || $.fx.speeds._default) / 1000;
        if (delay) delay = parseFloat(delay) / 1000;
        return this.anim(properties, duration, ease, callback, delay);
    };

    $.fn.anim = function (properties, duration, ease, callback, delay) {
        var key,
            cssValues = {},
            cssProperties,
            transforms = '',
            that = this,
            _wrappedCallback,
            endEvent = $.fx.transitionEnd,
            fired = false;

        if (duration === undefined) duration = $.fx.speeds._default / 1000;
        if (delay === undefined) delay = 0;
        if ($.fx.off) duration = 0;

        if (typeof properties == 'string') {
            // keyframe animation
            cssValues[animationName] = properties;
            cssValues[animationDuration] = duration + 's';
            cssValues[animationDelay] = delay + 's';
            cssValues[animationTiming] = ease || 'linear';
            endEvent = $.fx.animationEnd;
        } else {
            cssProperties = [];
            // CSS transitions
            for (key in properties) {
                if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') ';else cssValues[key] = properties[key], cssProperties.push(dasherize(key));
            }if (transforms) cssValues[transform] = transforms, cssProperties.push(transform);
            if (duration > 0 && (typeof properties === 'undefined' ? 'undefined' : _typeof(properties)) === 'object') {
                cssValues[transitionProperty] = cssProperties.join(', ');
                cssValues[transitionDuration] = duration + 's';
                cssValues[transitionDelay] = delay + 's';
                cssValues[transitionTiming] = ease || 'linear';
            }
        }

        _wrappedCallback = function wrappedCallback(event) {
            if (typeof event !== 'undefined') {
                if (event.target !== event.currentTarget) return; // makes sure the event didn't bubble from "below"
                $(event.target).unbind(endEvent, _wrappedCallback);
            } else $(this).unbind(endEvent, _wrappedCallback); // triggered by setTimeout

            fired = true;
            $(this).css(cssReset);
            callback && callback.call(this);
        };
        if (duration > 0) {
            this.bind(endEvent, _wrappedCallback);
            // transitionEnd is not always firing on older Android phones
            // so make sure it gets fired
            setTimeout(function () {
                if (fired) return;
                _wrappedCallback.call(that);
            }, (duration + delay) * 1000 + 25);
        }

        // trigger page reflow so new elements can animate
        this.size() && this.get(0).clientLeft;

        this.css(cssValues);

        if (duration <= 0) setTimeout(function () {
            that.each(function () {
                _wrappedCallback.call(this);
            });
        }, 0);

        return this;
    };

    testEl = null;
});
//# sourceMappingURL=../../../maps/lib/zeptojs/fx.js.map
