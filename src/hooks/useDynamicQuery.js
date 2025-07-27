import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useAxios } from "@/lib/configAxios";

/**
 * Builds Axios arguments based on HTTP method.
 * - For GET: { params: data, ...config }
 * - For DELETE: no body
 * - For POST, PUT, PATCH: [url, data, config]
 */
const buildAxiosArgs = ({ method, url, data, config }) => {
  if (method === "get") return [url, { params: data, ...config }];
  if (method === "delete") return [url, config];
  return [url, data, config];
};

/**
 * Appends `id` to URL if `withIdInUrl` is true.
 * Example: /users -> /users/123
 */
const resolveUrl = (url, data, withIdInUrl) =>
  withIdInUrl && data?.id ? `${url}/${data.id}` : url;

/**
 * Creates a mutation function for useMutation.
 */
const getMutationFn = (api, method, url, withIdInUrl, config) => {
  return async (data) => {
    const finalUrl = resolveUrl(url, data, withIdInUrl);
    const args = buildAxiosArgs({ method, url: finalUrl, data, config });
    const response = await api[method](...args);
    return response.data;
  };
};

/**
 * Creates a fetch function for useQuery and useInfiniteQuery.
 */
const getFetchFn = (api, url, params, config) => {
  return async ({ pageParam = params.page || 1 }) => {
    const response = await api.get(url, {
      params: { ...params, page: pageParam },
      ...config,
    });
    return response.data;
  };
};

/**
 * A universal React Query hook for:
 * - Regular queries (`mode: "query"`)
 * - Infinite queries (`mode: "infinite"`)
 * - Mutations (`mode: "mutation"`)
 *
 * @param {Object} options
 * @param {"query"|"infinite"|"mutation"} options.mode - Type of hook to use.
 * @param {"get"|"post"|"put"|"delete"|"patch"} [options.method="get"] - HTTP method (only for mutations).
 * @param {string} options.url - API endpoint URL.
 * @param {Array<any>} [options.queryKey=[]] - React Query cache key.
 * @param {Object} [options.params={}] - Parameters for GET requests.
 * @param {boolean} [options.withIdInUrl=false] - Appends `id` to URL for mutations.
 * @param {Object} [options.config={}] - Axios config.
 * @param {(lastPage: any, allPages: any[]) => any} [options.getNextPageParam] - For infinite pagination.
 * @param {Object} [options.queryOptions] - Options for useQuery / useInfiniteQuery.
 * @param {Object} [options.mutationOptions] - Options for useMutation.
 */
const useDynamicQuery = ({
  mode = "query",
  method = "get",
  url,
  queryKey = [],
  params = {},
  withIdInUrl = false,
  config = {},
  getNextPageParam,
  queryOptions = {
    refetchOnWindowFocus: false, // ✅ directly placed here
  },
  mutationOptions = {},
}) => {
  const api = useAxios();
  const methodName = method.toLowerCase();

  // Prepare functions for each hook
  const mutationFn = getMutationFn(api, methodName, url, withIdInUrl, config);
  const fetchFn = getFetchFn(api, url, params, config);

  // Hooks (called unconditionally)
  const mutationResult = useMutation({
    mutationFn,
    ...mutationOptions,
  });

  const infiniteQueryResult = useInfiniteQuery({
    queryKey,
    queryFn: fetchFn,
    ...(getNextPageParam && { getNextPageParam }),
    ...queryOptions,
    enabled: mode === "infinite",
  });

  const queryResult = useQuery({
    queryKey: [...queryKey, params.page || 1],
    queryFn: () => fetchFn({ pageParam: params.page }),
    ...queryOptions,
    enabled: mode === "query",
  });

  if (mode === "mutation") return mutationResult;
  if (mode === "infinite") return infiniteQueryResult;
  return queryResult;
};

export default useDynamicQuery;
