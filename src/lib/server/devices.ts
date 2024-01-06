import { env } from '$env/dynamic/private'
import type { Device } from "$lib/models";

export const fetchDevices = async (f: typeof fetch) => {
    const res = await f(`${env.API_BASE_URL}/devices`);
    const devices = await res.json() as Device[];
    return devices;
}
