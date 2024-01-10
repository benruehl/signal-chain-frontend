import type { Device } from "$lib/models";
import { createDevice, deleteDevice, updateDevice } from "$lib/server";
import type { RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request }) => {
    const device = await request.json() as Device;
    await createDevice(fetch, device);
    return new Response(JSON.stringify({ success: true }));
}

export const PUT: RequestHandler = async ({ request }) => {
    const device = await request.json() as Device;
    await updateDevice(fetch, device);
    return new Response(JSON.stringify({ success: true }));
}

export const DELETE: RequestHandler = async ({ request }) => {
    const device = await request.json() as Device;
    if (!device.id) {
        throw new Error("Device is missing id.")
    }
    const result = await deleteDevice(fetch, device.id);
    return new Response(JSON.stringify({ success: result }));
}