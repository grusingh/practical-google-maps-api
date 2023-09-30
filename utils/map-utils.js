/***
 * Generate Google Maps Static API URL from params
 */

function generateStaticMapURL(params) {
    // Define the base URL for Google Static Maps API
    const baseURL = "https://maps.googleapis.com/maps/api/staticmap?";

    // Initialize an array to store query parameters
    const queryParams = [];

    // Add required parameters
    queryParams.push(`size=${params.size || "480x480"}`);
    queryParams.push(`key=${params.apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`); // Replace with your own API key

    // Add optional parameters
    // Add the center location
    if (params.center.trim().length > 0) {
        queryParams.push(`center=${encodeURIComponent(params.center)}`);
    }

    if (params.zoom.trim().length > 0) {
        queryParams.push(`zoom=${params.zoom}`);
    }

    if (params.markers?.length) {
        for (const marker of params.markers) {
            queryParams.push(`markers=${encodeURIComponent(marker)}`);
        }
    }

    if (params.mapType.trim().length > 0) {
        queryParams.push(`maptype=${params.mapType}`);
    }

    if (params.scale.trim().length > 0) {
        queryParams.push(`scale=${params.scale}`);
    }

    if (params.path.trim().length > 0) {
        queryParams.push(`path=${encodeURIComponent(params.path)}`);
    }

    if (params.visible.trim().length > 0) {
        queryParams.push(`visible=${encodeURIComponent(params.visible)}`);
    }

    // Construct the final URL by joining all query parameters
    return `${baseURL}${queryParams.join("&")}`;
}

export default generateStaticMapURL;