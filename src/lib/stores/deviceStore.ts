import type { Device } from "$lib/models";
import type { Node } from "@xyflow/svelte";
import { derived, get, writable } from "svelte/store";

function createDeviceStore() {
    const nodeStore = writable<Node[]>();
    const deviceStore = derived(nodeStore, nodes => nodes.map(n => mapNodeToDevice(n)));

    function setInitialDevices(devices: Device[]) {
        nodeStore.set(devices.map(d => mapDeviceToNode(d)))
    }
    
    async function createDevice() {
        const newDevice = {
            id: undefined,
            title: "New Device",
            positionX: 0,
            positionY: 0
        } satisfies Device

        const newNode = mapDeviceToNode(newDevice)
    
        nodeStore.update(existing => [...existing, newNode])

        const response = await fetch('/api/devices', {
			method: 'POST',
			body: JSON.stringify(newDevice)
		});
	
        if (response.ok) {
            // update new node id if response was successful
            const updatedDevice = await response.json() as Device;
            if (updatedDevice.id) {
                newNode.id = updatedDevice.id.toString();
            }
        } else {
            // remove new node if response was not successful
            nodeStore.update(existing => existing.filter(x => x !== newNode))
        }
    }

    async function updateDevice(deviceId: string, update: (device: Device) => Device) {
        const device = get(deviceStore).find(d => `${d.id}` === deviceId)

        if (!device) {
            throw new Error(`Cannot update device because id does not exist. [id=${deviceId}]`)
        }

        const updatedDevice = update(device);

        const response = await fetch('/api/devices', {
			method: 'PUT',
			body: JSON.stringify(updatedDevice)
		});
	
        // TODO handle response
		await response.json();
    }

    function mapDeviceToNode(device: Device): Node {
        return {
            id: `${device.id}`, // required and needs to be a string
            type: "deviceNode", // matches defined type of custom node component
            position: {
                x: device.positionX, // required
                y: device.positionY // required
            },
            data: {
                label: device.title // required
            }
        }
    }

    function mapNodeToDevice(node: Node): Device {
        return {
            id: Number.parseInt(node.id),
            positionX: node.position.x,
            positionY: node.position.y,
            title: node.data.label
        }
    }

    return {
        subscribe: deviceStore.subscribe,
        nodeStore: nodeStore,
        setInitialDevices,
        createDevice,
        updateDevice,
    }
}

export const deviceStore = createDeviceStore()