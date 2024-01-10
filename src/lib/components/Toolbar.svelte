<script lang="ts">
    import { deviceStore } from "$lib/stores";

    const actions = [
        {
            label: "➕ Add Device",
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
    color: #52497A
    background-image: linear-gradient(to bottom right, #fbc2eb, #a6c1ee)
    backdrop-filter: blur(10px)
    padding: 1rem 2rem
    border-radius: 1000px
    transition: scale .2s ease

    &:hover
        scale: 1.1
</style>