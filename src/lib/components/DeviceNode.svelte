<script lang="ts">
    import { clickoutside } from '@svelte-put/clickoutside';
    import { deviceStore } from '$lib/stores';
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
    type $$Props = NodeProps;
  
    export let id: $$Props['id'];
    export let data: $$Props['data'];
    export let isConnectable: $$Props['isConnectable'];
    
    let { label } = data;
    let isEditing = false;

    function handleDoubleClick() {
        isEditing = true;
    }

    async function handleClickOutside() {
        if (isEditing) {
            await deviceStore.updateDevice(id, device => ({
                ...device,
                title: label,
            }))
        }

        isEditing = false;
    }

    async function handleDeleteClick() {
        await deviceStore.deleteDevice(id)
    }
</script>
  
<Handle type="target" position={Position.Left} {isConnectable} />
<input
    class="label nodrag {isEditing ? 'edit-mode' : 'read-mode'}" 
    type="text"
    on:dblclick={handleDoubleClick}
    use:clickoutside on:clickoutside={handleClickOutside}
    readonly={!isEditing}
    title="Device Name"
    bind:value={label}
/>
<button
    class="delete-button"
    type="button"
    title="Delete Device"
    on:click={handleDeleteClick}>
    ❌
</button>
<Handle
    type="source"
    position={Position.Right}
    id="out"
    style="top: 50%;"
    {isConnectable}
/>
  
<style lang="sass">
    :global(.svelte-flow__node-deviceNode)
        cursor: pointer
        background: radial-gradient(ellipse at top, #dadde1, transparent), #f0f0f0
        padding: 1rem 2rem
        border-radius: 8px

    :global(.svelte-flow__node-deviceNode.selected)
        background: radial-gradient(ellipse at top, #fbc2eb, transparent), #f0f0f0

    :global(.svelte-flow__handle)
        background: white
        border: 1px solid #808080

    .label
        all: unset
        min-width: 10ch
        width: 10ch
        cursor: text
        border: 1px solid transparent
        border-radius: 4px
        padding: 2px .5ch
        text-align: center
        
        &.edit-mode
            outline-offset: 4px
            border-color: #3c5c87
            background: rgba(255, 255, 255, .75)
            
    .delete-button
        all: unset
        position: absolute
        translate: -50%
        left: 50%
        bottom: -12px
        background: white
        border-radius: 1000px
        padding: 4px
        font-size: 12px
        cursor: pointer
        display: none

    :global(.svelte-flow__node-deviceNode.selected .delete-button)
        display: block

</style>