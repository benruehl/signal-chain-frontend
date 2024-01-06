<script lang="ts">
    import { Node, Svelvet, Minimap, Controls } from 'svelvet';
    import type { Device } from "$lib/models";

    export let devices: Device[];
</script>

<section class="root">
    <Svelvet controls locked>
        {#each devices as device}
            <Node
                id="node-{device.id}"
                label="{device.title}"
                position={{x: device.positionX, y: device.positionY}}/>
        {/each}
    </Svelvet>
</section>

<style lang="sass">
.root
    width: 100%
    height: calc(100vh - 1rem)
</style>