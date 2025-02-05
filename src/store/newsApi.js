import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = "cb92eb9d-b7d0-4a21-8064-f0d116510679";

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.goperigon.com/v1/',
    }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: () => `all?apiKey=${apiKey}&title=crypto`,
            transformResponse: (response) => {
                // Check if response has a data array
                return response.data || response.articles || response;
            }
        }),
    }),
});

export const { useGetNewsQuery } = newsApi;