import { SWRConfiguration } from "swr";

export default {
  refreshInterval: 3000,
  fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
} as SWRConfiguration;
