import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GarageFloorToday",
    short_name: "GFT",
    description: "America's premium concrete coating company.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1E7",
    theme_color: "#14120F",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
