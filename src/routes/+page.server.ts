import { fetchDevices } from '$lib/server';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    return {
        devices: await fetchDevices(fetch)
    }
}) satisfies PageLoad;
