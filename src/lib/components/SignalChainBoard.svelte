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
</script>

<section class="root">
    <SvelteFlow {nodes} {edges}>
        <Background />
        <Controls />
    </SvelteFlow>
</section>

<style lang="sass">
.root
    width: 100%
    height: calc(100vh - 1rem)
</style>