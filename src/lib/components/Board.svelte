<script lang="ts">
    import { writable } from 'svelte/store';
    import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
    import type { Device } from '$lib/models';
    import '@xyflow/svelte/dist/style.css';

    export let devices: Device[];

    const nodes = writable(devices.map(d => ({
        id: `${d.id}`, // required and needs to be a string
        position: { // required
            x: d.positionX,
            y: d.positionY
        },
        data: {
            label: d.title // required
        }
    })));

    const edges = writable([]);

    function handleNodeDrag(event: CustomEvent) {
        const { id, position } = event.detail.node
        const device = devices.find(d => d.id == id)
        const updatedDevice = {
            ...device,
            positionX: position.x,
            positionY: position.y
        } as Device

        updateDevice(updatedDevice)
    }

    async function updateDevice(device: Device) {
        const response = await fetch('/api/devices', {
			method: 'PUT',
			body: JSON.stringify(device),
			headers: {
				'content-type': 'application/json',
			},
		});
	
        // TODO handle response
		await response.json();
    }
</script>

<section class="root">
    <SvelteFlow {nodes} {edges} on:nodedragstop={handleNodeDrag}>
        <Background />
        <Controls />
    </SvelteFlow>
</section>

<style lang="sass">
.root
    width: 100%
    height: calc(100vh - 1rem)
</style>