'use strict';

define("lib/polyfill/string.js", function (require, exports, module) {

	if (!String.prototype.includes) {
		String.prototype.includes = function (search, start) {
			'use strict';

			if (typeof start !== 'number') {
				start = 0;
			}

			if (start + search.length > this.length) {
				return false;
			} else {
				return this.indexOf(search, start) !== -1;
			}
		};
	}

	if (!String.prototype.repeat) {
		String.prototype.repeat = function (count) {
			'use strict';

			if (this === null) {
				throw new TypeError('can\'t convert ' + this + ' to object');
			}
			var str = '' + this;
			count = +count;
			if (count !== count) {
				count = 0;
			}
			if (count < 0) {
				throw new RangeError('repeat count must be non-negative');
			}
			if (count === Infinity) {
				throw new RangeError('repeat count must be less than infinity');
			}
			count = Math.floor(count);
			if (str.length === 0 || count === 0) {
				return '';
			}
			if (str.length * count >= 1 << 28) {
				throw new RangeError('repeat count must not overflow maximum string size');
			}
			var rpt = '';
			for (;;) {
				if ((count & 1) === 1) {
					rpt += str;
				}
				count >>>= 1;
				if (count === 0) {
					break;
				}
				str += str;
			}
			return rpt;
		};
	}

	if (!String.prototype.padStart) {
		String.prototype.padStart = function (len) {
			var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

			var num = Math.floor(len - this.length);
			return num > 0 ? char.toString().repeat(num) + this : this;
		};
	}

	if (!String.prototype.padEnd) {
		String.prototype.padEnd = function (len) {
			var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

			var num = Math.floor(len - this.length);
			return num > 0 ? this + char.toString().repeat(num) : this;
		};
	}

	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function (searchString, position) {
			position = position || 0;
			return this.substr(position, searchString.length) === searchString;
		};
	}

	if (!String.prototype.endsWith) {
		String.prototype.endsWith = function (searchString, position) {
			var subjectString = this.toString();
			if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
				position = subjectString.length;
			}
			position -= searchString.length;
			var lastIndex = subjectString.lastIndexOf(searchString, position);
			return lastIndex !== -1 && lastIndex === position;
		};
	}
});
//# sourceMappingURL=../../../maps/lib/polyfill/string.js.map
