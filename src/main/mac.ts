import os from 'os';

export function getAllMacAddresses() {
    const networkInterfaces = os.networkInterfaces();
    const macAddresses: { [interfaceName: string]: string[] } = {};

    for (const [interfaceName, interfaces] of Object.entries(networkInterfaces)) {
        if (interfaces) {
            macAddresses[interfaceName] = interfaces
                .filter((netInterface) => !netInterface.internal) // Exclude internal interfaces like "lo"
                .map((netInterface) => netInterface.mac);
        }
    }

    return macAddresses;
}

export function getCurrentMacAddress() {
    const networkInterfaces = os.networkInterfaces();

    for (const interfaces of Object.values(networkInterfaces)) {
        if (interfaces) {
            for (const netInterface of interfaces) {
                if (!netInterface.internal && netInterface.mac) {
                    return netInterface.mac; // Return the first non-internal MAC address
                }
            }
        }
    }

    return null; // If no external MAC address is found
}
