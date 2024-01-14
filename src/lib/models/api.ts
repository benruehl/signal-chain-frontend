export interface Device {
    id: string | undefined,
    title: string,
    positionX: number,
    positionY: number,
    incomingLinks: Link[],
    outgoingLink: Link | null,
}

export interface Link {
    id: string | undefined,
    sourceDeviceId: string,
    targetDeviceId: string,
}
