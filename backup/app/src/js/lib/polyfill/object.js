'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define("lib/polyfill/object.js", function (require, exports, module) {

	if (typeof Object.assign !== 'function') {
		(function () {
			Object.assign = function (target) {
				'use strict';
				// We must check against these specific cases.

				if (target === undefined || target === null) {
					throw new TypeError('Cannot convert undefined or null to object');
				}

				var output = Object(target);
				for (var index = 1; index < arguments.length; index++) {
					var source = arguments[index];
					if (source !== undefined && source !== null) {
						for (var nextKey in source) {
							if (source.hasOwnProperty(nextKey)) {
								output[nextKey] = source[nextKey];
							}
						}
					}
				}
				return output;
			};
		})();
	}

	if (!Object.is) {
		Object.is = function (x, y) {
			if (x === y) {
				return x !== 0 || 1 / x === 1 / y;
			} else {
				return x !== x && y !== y;
			}
		};
	}

	if (!Object.keys) {
		Object.keys = function () {
			'use strict';

			var hasOwnProperty = Object.prototype.hasOwnProperty,
			    hasDontEnumBug = !{
				toString: null
			}.propertyIsEnumerable('toString'),
			    dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
			    dontEnumsLength = dontEnums.length;

			return function (obj) {
				if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
					throw new TypeError('Object.keys called on non-object');
				}

				var result = [],
				    prop,
				    i;

				for (prop in obj) {
					if (hasOwnProperty.call(obj, prop)) {
						result.push(prop);
					}
				}

				if (hasDontEnumBug) {
					for (i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) {
							result.push(dontEnums[i]);
						}
					}
				}
				return result;
			};
		}();
	}
});
//# sourceMappingURL=../../src/maps/lib/polyfill/object.js.map
