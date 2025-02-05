import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",
    prepareHeaders: (headers) => {
      // Add your API key if you have one
      // headers.set('x-cg-pro-api-key', 'YOUR_API_KEY');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getGlobalStats: builder.query({
      query: () => "global",
      transformResponse: (response) => response,
      keepUnusedDataFor: 300,
    }),
    getTopTrendingCoins: builder.query({
      query: () => ({
        url: "coins/markets",
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        }
      }),
      keepUnusedDataFor: 300,
    }),
    getGlobalExchange: builder.query({
      query: () => "exchanges",
      transformResponse: (response) => response, // Optional: Handle or process the response if necessary
      keepUnusedDataFor: 300,
    }),
    // You can add other endpoints as needed
  }),
});

export const {
  useGetGlobalStatsQuery,
  useGetTopTrendingCoinsQuery,
  useGetGlobalExchangeQuery,
  // You can add more exports here
} = cryptoApi;
