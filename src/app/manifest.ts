import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Devvault",
    short_name: "Devvault",
    description: "Store and Discover Code Snippets",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
  };
}
