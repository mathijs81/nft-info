
export const apiKey = 'ckey_b4da8e5242c341e3b8e90c07061';
export const authKey = btoa(`${apiKey}:`);

export const fetchHeaders = {
  Authorization: `Basic ${authKey}`,
};
