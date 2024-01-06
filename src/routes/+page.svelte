<script lang="ts">
    import { SignalChainBoard } from '$lib/components';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<SignalChainBoard devices={data.devices}/>