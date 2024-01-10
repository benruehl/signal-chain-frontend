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

    function handleDoubleClick(event: MouseEvent) {
        isEditing = true;
    }

    function handleClickOutside(event: CustomEvent) {
        if (isEditing) {
            deviceStore.updateDevice(id, device => ({
                ...device,
                title: label,
            }))
        }

        isEditing = false;
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
        background: radial-gradient(ellipse at top, #dadde1, transparent), rgba(220, 220, 220, .5)
        padding: 1rem 2rem
        border-radius: 8px

    :global(.svelte-flow__node-deviceNode.selected)
        background: radial-gradient(ellipse at top, #c8d8ed, transparent), rgba(220, 220, 220, .5)

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
            
</style>