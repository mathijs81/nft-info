export function formatAddress(address?: string | null, startLen = 4, endLen = 4): string | undefined {
    if (address === undefined || address === null) {
        return undefined;
    }
    if (address.length > startLen + endLen + 2) {
        return (
            address.substring(0, startLen) +
            '...' +
            address.substring(address.length - endLen, address.length)
        );
    }
    return address;
}
  