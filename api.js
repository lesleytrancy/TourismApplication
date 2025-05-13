// WARNING: API Keys should NEVER be hardcoded in frontend code in production!
// These keys are only for demonstration purposes.
// In a production environment, these should be:
// 1. Stored securely on a backend server
// 2. Accessed through environment variables
// 3. Protected with proper authentication and authorization
// 4. Implemented with rate limiting and other security measures

const OPENWEATHER_API_KEY = '149e12bba9f9e6e74321ab2726a6c5a1';
const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyChLxKwMDpOgPLMThKQFoOBB8Na0xTybUc';
const Maps_API_KEY = 'AIzaSyBqZwpKlkAGTDfyZsVeW5y0hTp9IR4n8-E';

/**
 * Fetches weather data from OpenWeatherMap API (One Call API)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} exclude - Parts to exclude from response (e.g., 'minutely,hourly')
 * @returns {Promise<Object>} Weather data
 */
async function WorkspaceWeather(lat, lon, exclude = '') {
    try {
        // Note: Using One Call API 2.5. OpenWeatherMap recommends 3.0, which has a different endpoint.
        // For 3.0 endpoint would be: https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
        // Using units=metric for Celsius, units=imperial for Fahrenheit
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${OPENWEATHER_API_KEY}`;
        console.log('Fetching weather from:', url); // Log the URL for debugging
        const response = await fetch(url);
        if (!response.ok) {
            // Attempt to read response body for more detailed error if available
             const errorBody = await response.text();
             throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }
        const data = await response.json();
        console.log('Weather data fetched:', data); // Log fetched data
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

/**
 * Fetches coordinates (latitude and longitude) for a given city name using OpenWeatherMap Geocoding API.
 * Returns the first result found.
 * @param {string} city - City name
 * @returns {Promise<Object | null>} Geocoding data (first result) or null if not found
 */
async function getCoordinatesByCity(city) {
    try {
        // Geocoding API endpoint
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
        console.log('Fetching coordinates from:', url); // Log the URL for debugging
        const response = await fetch(url);
         if (!response.ok) {
             // Attempt to read response body for more detailed error if available
             const errorBody = await response.text();
             throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }
        const data = await response.json();
        console.log('Geocoding data fetched:', data); // Log fetched data


        if (data && data.length > 0) {
            // Return the first result
            return data[0];
        } else {
            // City not found
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}


/**
 * Translates text using Google Translate API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (e.g., 'en', 'zh', 'ja')
 * @param {string} sourceLang - Source language code (defaults to 'auto')
 * @returns {Promise<string>} Translated text
 */
async function translateText(text, targetLang, sourceLang = 'auto') {
    try {
        // Google Translate API endpoint
        const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
        console.log('Translating text to:', targetLang); // Log the target language
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: sourceLang,
                target: targetLang,
                format: 'text'
            })
        });

        if (!response.ok) {
             // Attempt to read response body for more detailed error if available
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }

        const data = await response.json();
         console.log('Translation data fetched:', data); // Log fetched data

        if (data && data.data && data.data.translations && data.data.translations.length > 0) {
             return data.data.translations[0].translatedText;
        } else {
             throw new Error("Translation API returned unexpected format.");
        }
    } catch (error) {
        console.error('Error translating text:', error);
        throw error;
    }
}

/**
 * Initializes Google Maps in the specified element.
 * Loads the Google Maps script dynamically if not already present.
 * @param {string} elementId - ID of the element to contain the map
 * @returns {Promise<Object>} Map instance (google.maps.Map)
 */
async function initializeMap(elementId) {
    try {
        // Check if Google Maps script is already loaded
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
             console.log("Google Maps script already loaded.");
              const mapElement = document.getElementById(elementId);
              if (!mapElement) {
                  throw new Error(`Element with ID ${elementId} not found`);
              }
               const map = new google.maps.Map(mapElement, {
                    center: { lat: -33.8688, lng: 151.2093 }, // Default: Sydney coordinates
                    zoom: 12
                });
                console.log('Map initialized with existing script.');
                return Promise.resolve(map); // Resolve with existing map
        }


        // Load Google Maps script dynamically
        console.log('Loading Google Maps script dynamically.');
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${Maps_API_KEY}`;
        script.async = true;
        script.defer = true;

        return new Promise((resolve, reject) => {
            script.onload = () => {
                 console.log("Google Maps script loaded successfully.");
                const mapElement = document.getElementById(elementId);
                if (!mapElement) {
                    reject(new Error(`Element with ID ${elementId} not found`));
                    return;
                }

                const map = new google.maps.Map(mapElement, {
                    center: { lat: -33.8688, lng: 151.2093 }, // Default: Sydney coordinates
                    zoom: 12
                });

                console.log('Map initialized after dynamic script load.');
                resolve(map);
            };

            script.onerror = () => {
                console.error("Failed to load Google Maps script.");
                reject(new Error('Failed to load Google Maps script'));
            };

            document.head.appendChild(script);
        });
    } catch (error) {
        console.error('Error initializing map:', error);
        throw error;
    }
}


// Export functions for use in other files by attaching to the window object
window.WorkspaceWeather = WorkspaceWeather;
window.getCoordinatesByCity = getCoordinatesByCity; // Export new function
window.translateText = translateText;
window.initializeMap = initializeMap;