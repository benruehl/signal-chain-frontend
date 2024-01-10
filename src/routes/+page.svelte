<script lang="ts">
    import { Board } from '$lib/components';
    import { deviceStore } from '$lib/stores';
    import type { PageData } from './$types';

    export let data: PageData;

    deviceStore.setInitialDevices(data.devices)
</script>

<Board/>

<style lang="sass">
    :global(body)
        font-family: Sans-Serif
</style>