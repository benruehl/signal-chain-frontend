import { updateDevice } from "$lib/server";
import type { RequestHandler } from "@sveltejs/kit"

export const PUT: RequestHandler = async ({ request }) => {
    const device = await request.json();
    await updateDevice(fetch, device);

    return new Response(JSON.stringify({ success: true }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}