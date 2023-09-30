/***
 * Generate Google Maps Static API URL from params
 *
 */

function generateStaticMapURL(params) {
    // Define the base URL for Google Static Maps API
    const baseURL = "https://maps.googleapis.com/maps/api/staticmap?";

    // Check if the 'center' parameter is provided; if not, return an error
    if (!params.center) {
        throw new Error("Center location is required.");
    }

    // Initialize an array to store query parameters
    const queryParams = [];

    // Add required parameters
    queryParams.push(`center=${encodeURIComponent(params.center)}`);
    queryParams.push(`zoom=${params.zoom || 15}`);
    queryParams.push(`size=${params.size || "640x480"}`);
    queryParams.push(`key=${params.apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`); // Replace with your own API key

    // Add optional parameters
    if (params.markers?.length) {
        for (const marker of params.markers) {
            queryParams.push(`markers=${encodeURIComponent(marker)}`);
        }
    }

    if (params.mapType) {
        queryParams.push(`maptype=${params.mapType}`);
    }

    if (params.scale) {
        queryParams.push(`scale=${params.scale}`);
    }

    if (params.path) {
        queryParams.push(`path=${encodeURIComponent(params.path)}`);
    }

    if (params.visible) {
        queryParams.push(`visible=${encodeURIComponent(params.visible)}`);
    }

    // Construct the final URL by joining all query parameters
    return `${baseURL}${queryParams.join("&")}`;
}

export default generateStaticMapURL;