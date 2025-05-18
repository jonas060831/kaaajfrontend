// utils/getUserLocation.ts
export interface UserLocation {
  city: string;
  region: string;
  country: string;
  error?: string;
}

export async function getApproximateUserLocation(ip?: string): Promise<UserLocation> {
  try {
    // Use ipapi.co with or without IP; without IP it auto-detects client's IP
    const url = ip ? `https://ipapi.co/${ip}/json/` : `https://ipapi.co/json/`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.status}`);
    }

    const data = await response.json();

    return {
      city: data.city || null,
      region: data.region || null,
      country: data.country_name || null,
    };
  } catch (error: any) {
    console.error('getUserLocation error:', error);
    return { city: 'Unknown', region: 'Unknown', country: 'Unknown', error: error.message };
  }
}
