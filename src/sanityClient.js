import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "mq7nx1p6",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});