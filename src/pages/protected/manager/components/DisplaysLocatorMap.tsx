import mapboxgl, { Map } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from "react";

import styles from './DisplaysLocatorMap.module.css'
import { search } from "../../../../services/accountService";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

const DisplaysLocatorMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [displays, setDisplays] = useState([])
  const [startingLocationView] = useState<[number, number]>([-74.006, 40.7128]); // New York

  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Detect color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange); // For Safari
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Create the map ONCE
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isDarkMode
        ? import.meta.env.VITE_MAPBOX_DARKMODE_CSS as string
        : import.meta.env.VITE_MAPBOX_LIGHTMODE_CSS as string,
      center: startingLocationView,
      zoom: 12,
    });

    setMap(initialMap);

    return () => {
      initialMap.remove();
    };
  }, []);

  // Update style on theme change
  useEffect(() => {
    if (!map) return;

    const updateMode = () => {
      const newStyle = isDarkMode
        ? import.meta.env.VITE_MAPBOX_DARKMODE_CSS as string
        : import.meta.env.VITE_MAPBOX_LIGHTMODE_CSS as string;

      map!.setStyle(newStyle);

      map!.once("style.load", () => {
        console.log("Map style updated to:", isDarkMode ? "dark" : "light");
        // Re-add any custom markers/layers here if needed
      });
    }

    updateMode()

  }, [isDarkMode]);

  //pins
  useEffect(() => {
    if(!map) return //dont run until map exist

    let markers: mapboxgl.Marker[] = [];


    //fetch displays location and pin it to the map
    (async () => {

      const res = await search("Proprietor")
      setDisplays(res)

      

      markers = res.map((proprietor:any) => {
        const { location } = proprietor
        new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .addTo(map)
      })

      if(res.length > 0) {
        const first = res[0].location

        map.flyTo({
          center: [first.longitude, first.latitude],
          zoom: 18,
          pitch: 60,       // tilt the map
          bearing: -30,    // rotate the map
          speed: 1.2,      // optional: slow down fly speed
          curve: 1.8       // optional: flight curve
        })
      }

    })()

    return () => {
      //only remove the markers you added
      markers.forEach(m => m.remove())
    }

  }, [map])

  
  return (
    <div className={styles.map_wrapper}>
      <div ref={mapContainerRef} className={styles.map_container} />
    </div>
  );
};

export default DisplaysLocatorMap;
