import type { Device, Link } from "$lib/models";
import type { Edge, Node } from "@xyflow/svelte";
import { derived, get, writable } from "svelte/store";

function createDeviceStore() {
    const nodeStore = writable<Node[]>();
    const edgeStore = writable<Edge[]>();
    const deviceStore = derived(
        [nodeStore, edgeStore],
        ([$nodes, $edges]) => $nodes.map(n => mapNodeToDevice(n, $edges))
    );

    function init(devices: Device[]) {
        nodeStore.set(devices.map(d => mapDeviceToNode(d)))
        edgeStore.set(devices
            .reduce((result: Edge[], current: Device) =>
                current.outgoingLink ? [...result, mapLinkToEdge(current.outgoingLink)] : result,
                []
            )
        )
    }
    
    async function createDevice() {
        const newDevice = {
            id: undefined,
            title: "New Device",
            positionX: 0,
            positionY: 0,
            incomingLinks: [],
            outgoingLink: null
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
                const deviceId = updatedDevice.id
                nodeStore.update(nodes => nodes.map(node => node.id ? node : {
                    ...node,
                    id: deviceId.toString()
                }))
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

    async function deleteDevice(deviceId: string) {
        const device = get(deviceStore).find(d => `${d.id}` === deviceId)

        if (!device) {
            throw new Error(`Cannot delete device because id does not exist. [id=${deviceId}]`)
        }

        const response = await fetch('/api/devices', {
			method: 'DELETE',
			body: JSON.stringify(device)
		});
	
		const result = await response.json();

        if (result) {
            nodeStore.update(existing => existing.filter(x => x.id !== deviceId))
        }
    }

    function mapDeviceToNode(device: Device): Node {
        return {
            id: device.id ?? "", // required and needs to be a string
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

    function mapLinkToEdge(link: Link): Edge {
        return {
            id: link.id ?? "", // required and needs to be a string
            type: "smoothstep",
            source: link.sourceDeviceId,
            target: link.targetDeviceId
        }
    }

    function mapNodeToDevice(node: Node, allEdges: Edge[]): Device {
        const incomingEdges = allEdges.filter(e => e.target === node.id);
        const outgoingEdges = allEdges.filter(e => e.source === node.id);
        return {
            id: node.id,
            positionX: node.position.x,
            positionY: node.position.y,
            title: node.data.label,
            incomingLinks: incomingEdges.map(e => mapEdgeToLink(e)),
            outgoingLink: outgoingEdges?.length ? mapEdgeToLink(outgoingEdges[0]) : null
        }
    }

    function mapEdgeToLink(edge: Edge): Link {
        return {
            id: edge.id,
            sourceDeviceId: edge.source,
            targetDeviceId: edge.target
        }
    }

    return {
        subscribe: deviceStore.subscribe,
        nodeStore: nodeStore,
        edgeStore: edgeStore,
        setInitialDevices: init,
        createDevice,
        updateDevice,
        deleteDevice
    }
}

export const deviceStore = createDeviceStore()