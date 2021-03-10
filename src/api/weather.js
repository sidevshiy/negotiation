import server from '@/api/http';

export async function load(){
	let { data }  = await server.get('weather', { 
		params: { q: 'Prague',  appid: 'abe7a2963f2d12d3bd44ee7c5e8e7d01', units: 'metric'},
	});

	return data;
}
