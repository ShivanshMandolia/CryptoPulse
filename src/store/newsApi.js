import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/",
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => ({
        url: "everything",
        params: {
          q: "cryptocurrency",
          apiKey: "f7becb7ea20843eea9438d963e606b72", // Use your API key here
          language: "en", // You can change language as needed
          pageSize: 5, // Number of news articles to fetch per request
        },
      }),
      transformResponse: (response) => response.articles, // You can adjust this based on your needs
      keepUnusedDataFor: 60, // Cache the data for 60 seconds (adjust as needed)
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
