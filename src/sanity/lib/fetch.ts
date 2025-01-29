// fetch.ts
import { createClient } from "next-sanity";

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your actual project ID in the .env file
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Replace with your actual dataset in the .env file
  apiVersion: "2021-03-25", // You can update to a newer version if needed
  useCdn: true,
});

// Generic fetch function
export async function sanityFetch({ query, params = {} }: { query: string; params?: any }) {
  try {
    return await client.fetch(query, params); // Fetch the query data from Sanity
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return []; // Return empty array if an error occurs
  }
}
