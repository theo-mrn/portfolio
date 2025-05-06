"use client";
import WorldMap from "@/components/ui/world-map";

export function WorldMapDemo() {
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full">
        <WorldMap
          dots={[
            {
              start: { lat: 48.8566, lng: 2.3522 }, // Paris
              end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 40.7128, lng: -74.0060 }, // New York
            },
            {
              start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
              end: { lat: 1.3521, lng: 103.8198 }, // Singapore
            },
            {
              start: { lat: 25.2048, lng: 55.2708 }, // Dubai
              end: { lat: -33.8688, lng: 151.2093 }, // Sydney
            },
            {
              start: { lat: 52.5200, lng: 13.4050 }, // Berlin
              end: { lat: 55.7558, lng: 37.6173 }, // Moscow
            },
       
            {
              start: { lat: 19.4326, lng: -99.1332 }, // Mexico City
              end: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
            },
            {
              start: { lat: 31.2304, lng: 121.4737 }, // Shanghai
              end: { lat: -33.9249, lng: 18.4241 }, // Cape Town
            },
          ]}
          lineColor="#0ea5e9"
        />
      </div>
      
      {/* Subtle overlay for better visibility */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

// Re-export for compatibility with dynamic import
export default { WorldMapDemo };
