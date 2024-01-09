<script lang="ts">
    import { deviceStore } from "$lib/stores";

    const actions = [
        {
            label: "Add Node",
            action: () => deviceStore.createDevice()
        }
    ]
</script>

<div class="root">
    {#each actions as action}
        <button class="action" on:click={action.action}>
            {action.label}
        </button>
    {/each}
</div>

<style lang="sass">
.root
    position: absolute
    bottom: 0
    left: 50%
    translate: -50% 0
    margin: 15px
    display: flex
    z-index: 5

.action
    all: unset
    cursor: pointer
    background: rgba(220, 220, 220, .5)
    backdrop-filter: blur(10px)
    padding: 1rem
    border-radius: 8px

    &:hover
        background: rgba(220, 220, 220, .75)
</style>