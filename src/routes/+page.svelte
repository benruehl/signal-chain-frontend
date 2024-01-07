<script lang="ts">
    import { Board } from '$lib/components';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Board devices={data.devices}/>