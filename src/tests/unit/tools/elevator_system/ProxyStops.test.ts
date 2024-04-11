import { ProxyStops } from "@Elevator/ProxyStops.ts";

describe("ProxyStops", () => {
    let proxyStops: ProxyStops;

    beforeEach(() => {
        proxyStops = new ProxyStops();
    });

    describe("addProxyForStop", () => {
        it("should add a proxy for a given stop", () => {
            proxyStops.addProxyForStop(1, 2);

            expect(proxyStops.getConnectedFloors(1)).toEqual([2]);
        });

        it("should add multiple proxies for a given stop", () => {
            proxyStops.addProxyForStop(1, 2);
            proxyStops.addProxyForStop(1, 3);

            expect(proxyStops.getConnectedFloors(1)).toEqual([2, 3]);
        });
    });

    describe("getAndRemoveProxy", () => {
        it("should return an empty array if there are no proxies for a given stop", () => {
            expect(proxyStops.getConnectedFloors(1)).toEqual([]);
        });

        it("should return the proxy for a given stop and remove it from the list", () => {
            proxyStops.addProxyForStop(1, 2);

            expect(proxyStops.getConnectedFloors(1)).toEqual([2]);
            expect(proxyStops.getConnectedFloors(1)).toEqual([]);
        });
    });
});