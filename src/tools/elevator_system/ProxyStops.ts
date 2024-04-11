export class ProxyStops {
    private proxy = new Map<number, number[]>();

    /**
     * Add a proxy for a given stop
     *
     * @param proxy The floor which will be used as a proxy
     * @param connectedFloor The floor connected to the proxy
     */
    public addProxyForStop(proxy: number, connectedFloor: number | number[]): void {
        if (!this.proxy.has(proxy)) this.proxy.set(proxy, []);

        (Array.isArray(connectedFloor) ? connectedFloor : [connectedFloor]).forEach((floor) => {
            // If the floor is not already connected to the proxy, add it
            if (!this.proxy.get(proxy)!.includes(floor)) this.proxy.get(proxy)!.push(floor);
        });

    }

    /**
     * Accept a floor number and return all proxies connected to it
     * @param proxy The floor number to get proxies for
     * @param removeItAfterwards If true, the proxies will be removed from the list after being returned
     *
     * @returns An array of proxies connected to the given floor
     */
    public getConnectedFloors(proxy: number, removeItAfterwards: boolean = true): number[] {
        if (!this.proxy.has(proxy)) return [];

        const result = this.proxy.get(proxy)!;
        if (removeItAfterwards) this.proxy.delete(proxy);

        return result;
    }
}