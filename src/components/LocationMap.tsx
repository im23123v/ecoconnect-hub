import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface LocationMapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

export const LocationMap = ({ lat, lng, name, address }: LocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("mapbox_token");
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || mapLoaded) return;

    const loadMapbox = async () => {
      try {
        const mapboxgl = (await import("mapbox-gl")).default;
        await import("mapbox-gl/dist/mapbox-gl.css");

        mapboxgl.accessToken = mapboxToken;

        const map = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/light-v11",
          center: [lng, lat],
          zoom: 14,
        });

        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Add marker
        const markerEl = document.createElement("div");
        markerEl.className = "custom-marker";
        markerEl.innerHTML = `
          <div class="w-10 h-10 bg-eco-leaf rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `;

        new mapboxgl.Marker(markerEl)
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <h3 class="font-semibold text-sm">${name}</h3>
                <p class="text-xs text-gray-600">${address}</p>
              </div>
            `)
          )
          .addTo(map);

        setMapLoaded(true);

        return () => map.remove();
      } catch (error) {
        console.error("Error loading map:", error);
        setShowTokenInput(true);
        localStorage.removeItem("mapbox_token");
      }
    };

    loadMapbox();
  }, [mapboxToken, lat, lng, name, address, mapLoaded]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem("mapbox_token", mapboxToken.trim());
      setShowTokenInput(false);
    }
  };

  if (showTokenInput) {
    return (
      <div className="relative w-full h-[400px] rounded-2xl bg-muted flex flex-col items-center justify-center p-6 border border-border">
        <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Enable Map View</h3>
        <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
          Enter your Mapbox public token to view the interactive map. 
          Get your free token at{" "}
          <a 
            href="https://mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleTokenSubmit} variant="eco">
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-card border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="animate-pulse flex flex-col items-center">
            <MapPin className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  );
};
