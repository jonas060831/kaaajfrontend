import mapboxgl, { Map } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from "react";

import styles from './DisplaysLocatorMap.module.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

const DisplaysLocatorMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [startingLocationView] = useState<[number, number]>([-74.006, 40.7128]); // New York

  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e:any) => setIsDarkMode(e.matches);

    // Add event listener with backward compatibility
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange); // Safari fallback
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);


  const loadMap = () => {
    if (!mapContainerRef.current) return null;

    const initialMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isDarkMode ? import.meta.env.VITE_MAPBOX_DARKMODE_CSS as string : import.meta.env.VITE_MAPBOX_LIGHTMODE_CSS,
      center: startingLocationView,
      zoom: 12,
    });

    setMap(initialMap);
    return initialMap;
  };

  useEffect(() => {
    const mapInstance = loadMap();
    return () => {
      mapInstance?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;
    // You can perform actions with the map here
    
    const newStyle = isDarkMode ?
    import.meta.env.VITE_MAPBOX_DARKMODE_CSS as string :
    import.meta.env.VITE_MAPBOX_LIGHTMODE_CSS as string

    map.setStyle(newStyle)

  }, [isDarkMode, map]);

  return (
    <div className={styles.map_wrapper}>
        <div
         ref={mapContainerRef}
         className={styles.map_container}
        />
    </div>
  );
};

export default DisplaysLocatorMap;
