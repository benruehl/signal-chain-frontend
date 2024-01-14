<script lang="ts">
    import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
    import '@xyflow/svelte/dist/style.css';
    import Toolbar from './Toolbar.svelte';
    import DeviceNode from './DeviceNode.svelte';
    import { deviceStore } from '$lib/stores';

    const nodes = deviceStore.nodeStore;
    const edges = deviceStore.edgeStore;

    $: {
        console.log($edges)
    }

    const nodeTypes = {
        deviceNode: DeviceNode
    };

    function handleNodeDrag(event: CustomEvent) {
        const { id, position } = event.detail.node
        deviceStore.updateDevice(id, device => ({
            ...device,
            positionX: position.x,
            positionY: position.y
        }))
    }
</script>

<section class="root">
    <SvelteFlow {nodes} {nodeTypes} {edges} on:nodedragstop={handleNodeDrag}>
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