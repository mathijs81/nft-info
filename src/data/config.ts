
export const apiKey = 'ckey_b4da8e5242c341e3b8e90c07061';
export const authKey = btoa(`${apiKey}:`);

export const fetchHeaders = {
  Authorization: `Basic ${authKey}`,
};

const nftPortKey = '72d6a6cf-7998-4a9d-8f12-3483c3d15e87';
export const nftPortHeader = {
  Authorization: nftPortKey,
};
