var mobile = require('/mods/check/mobile');

describe('mobile type',function(){
	it('isAndroid',function(){
		expect(isAndroid('Android')).toBe(true);
	});
});