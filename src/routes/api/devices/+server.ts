import { createDevice, updateDevice } from "$lib/server";
import type { RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request }) => {
    const device = await request.json();
    await createDevice(fetch, device);
    return new Response(JSON.stringify({ success: true }));
}

export const PUT: RequestHandler = async ({ request }) => {
    const device = await request.json();
    await updateDevice(fetch, device);
    return new Response(JSON.stringify({ success: true }));
}