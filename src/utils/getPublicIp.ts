export async function getPublicIP(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('Failed to fetch IP address');
    const data = await response.json();
    return data.ip as string;
  } catch (error) {
    console.error('getPublicIP error:', error);
    return null;
  }
}