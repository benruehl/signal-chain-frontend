<script lang="ts">
    import { writable } from 'svelte/store';
    import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
    import '@xyflow/svelte/dist/style.css';
    import Toolbar from './Toolbar.svelte';
    import { deviceStore } from '$lib/stores';

    const nodes = deviceStore.nodeStore;

    const edges = writable([]);

    function handleNodeDrag(event: CustomEvent) {
        const { id, position } = event.detail.node
        deviceStore.updateDevicePosition(id, position.x, position.y)
    }
</script>

<section class="root">
    <SvelteFlow {nodes} {edges} on:nodedragstop={handleNodeDrag}>
        <Toolbar />
        <Background />
        <Controls />
    </SvelteFlow>
</section>

<style lang="sass">
.root
    width: 100%
    height: calc(100vh - 1rem)
</style>