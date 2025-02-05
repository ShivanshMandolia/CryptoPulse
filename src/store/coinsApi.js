import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinsApi = createApi({
    reducerPath: 'coinsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://coinranking1.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', '7b520d91a9mshe747033b3e99af1p1dda52jsndbcdadd80772'); // Replace with your API key
            headers.set('x-rapidapi-host', 'coinranking1.p.rapidapi.com');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCoins: builder.query({
            query: () => 'coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0'
        }),
        getCoinDetails: builder.query({
            query: (coinUuid) => `coin/${coinUuid}`
        }),
        getCoinHistory: builder.query({
            query: ({coinId,timeperiod}) => `coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timeperiod}`
        })
        
    })
});

// Export hooks for usage in components
export const { useGetCoinsQuery, useGetCoinDetailsQuery,useGetCoinHistoryQuery } = coinsApi;
