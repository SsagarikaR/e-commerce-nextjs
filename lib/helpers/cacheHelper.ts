import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Helper functions to manage the cache
export const invalidateCache = (cacheKey: string) => {
  cache.del(cacheKey); // Invalidate cache
};

export const setCache = (cacheKey: string, data: any) => {
  cache.set(cacheKey, data); // Set data to cache
};

export const getCache = (cacheKey: string) => {
  return cache.get(cacheKey); // Retrieve data from cache
};
