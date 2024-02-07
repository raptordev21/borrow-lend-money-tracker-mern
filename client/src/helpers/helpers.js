function detectBrowser() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf('Chrome') !== -1) {
    return 'Google Chrome';
  } else if (userAgent.indexOf('Firefox') !== -1) {
    return 'Mozilla Firefox';
  } else if (userAgent.indexOf('Safari') !== -1) {
    return 'Apple Safari';
  } else if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1) {
    return 'Internet Explorer';
  } else if (userAgent.indexOf('Edge') !== -1) {
    return 'Microsoft Edge';
  } else {
    return 'Unknown browser';
  }
}

function detectOS() {
  const userAgent = navigator.userAgent;
  let os = 'Unknown';

  if (userAgent.indexOf('Win') !== -1) {
    os = 'Windows';
  } else if (userAgent.indexOf('Mac') !== -1) {
    os = 'MacOS';
  } else if (userAgent.indexOf('Linux') !== -1) {
    os = 'Linux';
  } else if (userAgent.indexOf('Android') !== -1) {
    os = 'Android';
  } else if (userAgent.indexOf('iOS') !== -1) {
    os = 'iOS';
  }

  return os;
}

function getUserDeviceType() {
  const userAgent = navigator.userAgent;

  if (/Android/i.test(userAgent)) {
    return 'Android';
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'iOS';
  } else if (/Windows Phone/i.test(userAgent)) {
    return 'Windows Phone';
  } else if (/Mac/i.test(navigator.platform)) {
    return 'Mac';
  } else if (/Win/i.test(navigator.platform)) {
    return 'Windows';
  } else if (/Linux/i.test(navigator.platform)) {
    return 'Linux';
  } else {
    return 'Unknown';
  }
}

// Example usage:
const deviceType = getUserDeviceType();
console.log('User device type:', deviceType);

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(`Error getting location: ${error.message}`);
        }
      );
    } else {
      reject('Geolocation is not supported by this browser.');
    }
  });
}

getUserLocation()
  .then((location) => {
    console.log('User location:', location);
  })
  .catch((error) => {
    console.error(error);
  });


async function getUserLocation() {
  const apiKey = 'YOUR_GOOGLE_API_KEY';
  
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching location: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const address = data.results[0].formatted_address;
      return address;
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error(error.message);
    return 'Error getting location';
  }
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
}

// Example usage:
getUserLocation()
  .then((location) => {
    console.log('User location:', location);
  })
  .catch((error) => {
    console.error(error);
  });

async function getUserIPAddress() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');

    if (!response.ok) {
      throw new Error(`Error fetching IP address: ${response.statusText}`);
    }

    const data = await response.json();
    const ipAddress = data.ip;

    return ipAddress;
  } catch (error) {
    console.error(error.message);
    return 'Error getting IP address';
  }
}

// Example usage:
getUserIPAddress()
  .then((ipAddress) => {
    console.log('User IP address:', ipAddress);
  })
  .catch((error) => {
    console.error(error);
  });
