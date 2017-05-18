import share from './share';

[1,2,3,4].map(item => item + 1);

function Fn(){
	let params = Array.from(arguments,arg => arg * 2);
	return 1;
}

async function main(){
	let res = await Fn(1,2,4);
	console.log(res); 
}

share.init();