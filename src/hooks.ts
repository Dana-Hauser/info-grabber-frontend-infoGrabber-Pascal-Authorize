import type { Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {

	//Datenbankanbindung hier
	const Datenbankergebnisfüruser = "42053069-3477-4c51-94b2-cb007932b917"
	const cookievergleich = Datenbankergebnisfüruser

	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userid = cookies['userid'] || crypto.randomUUID();

	const response = await resolve(event);

	if(event.url.pathname =="/projekte"){
		if(cookies.userid == cookievergleich){
			console.log("Projekte wird geladen")
			return new Response('Redirect', {status: 303, headers: { Location: '/login' }})
		}else{
			console.log("Projekte wird nicht geladen")
		}
	}

	if (!cookies['userid']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};
