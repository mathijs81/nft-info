export function formatAddress(address?: string | null, startLen = 4, endLen = 4): string | undefined {
  if (address === undefined || address === null)
    return undefined;

  if (address.length > startLen + endLen + 2) {
    return (
      `${address.substring(0, startLen)
      }...${
        address.substring(address.length - endLen, address.length)}`
    );
  }
  return address;
}
export function addressesEqual(address1: string | undefined | null, address2: string | undefined | null): boolean {
  if (address1 && address2)
    return address1.toLowerCase() === address2.toLowerCase();

  return false;
}
