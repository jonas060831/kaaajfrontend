interface DeviceDetails {
  device_type: 'Mobile' | 'Tablet' | 'Desktop';
  user_agent: string; // e.g., "Chrome on Windows"
}

export const getDeviceDetails = (): DeviceDetails => {
  const ua = navigator.userAgent;

  const isMobile = /Mobi|Android/i.test(ua);
  const isTablet = /Tablet|iPad/i.test(ua);

  const device_type: DeviceDetails['device_type'] = isMobile
    ? 'Mobile'
    : isTablet
    ? 'Tablet'
    : 'Desktop';

  let browser = 'Unknown Browser';
  let os = 'Unknown OS';

  // Detect browser
  if (/Chrome\/\d+/.test(ua) && !/Edge\/\d+/.test(ua)) {
    browser = 'Chrome';
  } else if (/Safari\/\d+/.test(ua) && /Version\/\d+/.test(ua)) {
    browser = 'Safari';
  } else if (/Firefox\/\d+/.test(ua)) {
    browser = 'Firefox';
  } else if (/Edg\/\d+/.test(ua)) {
    browser = 'Edge';
  } else if (/MSIE|Trident/.test(ua)) {
    browser = 'Internet Explorer';
  }

  // Detect OS
  if (/Windows NT/.test(ua)) {
    os = 'Windows';
  } else if (/Mac OS X/.test(ua)) {
    os = 'macOS';
  } else if (/Android/.test(ua)) {
    os = 'Android';
  } else if (/iPhone|iPad|iPod/.test(ua)) {
    os = 'iOS';
  } else if (/Linux/.test(ua)) {
    os = 'Linux';
  }

  return {
    device_type,
    user_agent: `${browser} on ${os}`,
  };
};
