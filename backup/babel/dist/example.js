'use strict';

var main = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
		var res;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return Fn(1, 2, 4);

					case 2:
						res = _context.sent;

						console.log(res);

					case 4:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function main() {
		return _ref.apply(this, arguments);
	};
}();

var _share = require('./share');

var _share2 = _interopRequireDefault(_share);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

[1, 2, 3, 4].map(function (item) {
	return item + 1;
});

function Fn() {
	var params = Array.from(arguments, function (arg) {
		return arg * 2;
	});
	return 1;
}

_share2.default.init();