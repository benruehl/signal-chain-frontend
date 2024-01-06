<script lang="ts">
    import type { Device } from "$lib/models";

    export let devices: Device[];
</script>

<section class="root">
    {#each devices as device}
        <div class="device-container">
            <h3>{device.title}</h3>
        </div>
    {/each}
</section>

<style lang="sass">

</style>