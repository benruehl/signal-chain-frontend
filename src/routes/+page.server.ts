import { fetchDevices } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
    return {
        devices: await fetchDevices(fetch)
    }
}) satisfies PageServerLoad;
