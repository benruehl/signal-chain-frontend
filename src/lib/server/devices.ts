import { env } from '$env/dynamic/private'
import type { Device } from "$lib/models";

export const fetchDevices = async (f: typeof fetch) => {
    const res = await f(`${env.API_BASE_URL}/devices`);
    const devices = await res.json() as Device[];
    return devices;
}

export const createDevice = async (f: typeof fetch, device: Device) => {
    const res = await f(`${env.API_BASE_URL}/devices`, {
        method: "POST",
        body: JSON.stringify(device),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json() as Device;
}

export const updateDevice = async (f: typeof fetch, device: Device) => {
    const res = await f(`${env.API_BASE_URL}/devices/${device.id}`, {
        method: "PUT",
        body: JSON.stringify({
            ...device,
            id: undefined
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json() as Device;
}
