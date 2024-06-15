import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.devvault.xyz",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://www.devvault.xyz/es",
          de: "https://www.devvault.xyz/de",
        },
      },
    },
    {
      url: "https://www.devvault.xyz/trending",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://www.devvault.xyz/es/about",
          de: "https://www.devvault.xyz/de/about",
        },
      },
    },
    {
      url: "https://www.devvault.xyz/leaderboard",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://www.devvault.xyz/es/blog",
          de: "https://www.devvault.xyz/de/blog",
        },
      },
    },
    {
      url: "https://www.devvault.xyz/new-code",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://www.devvault.xyz/es/blog",
          de: "https://www.devvault.xyz/de/blog",
        },
      },
    },
    {
      url: "https://www.devvault.xyz/profile",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://www.devvault.xyz/es/blog",
          de: "https://www.devvault.xyz/de/blog",
        },
      },
    },
  ];
}
