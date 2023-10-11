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

export function generateEmbedUrl(params) {
    const baseURL = "https://www.google.com/maps/embed/v1/";
    const queryParams = [];

    queryParams.push(`key=${params.apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`); // Replace with your own API key

    if (!params.embedMode.trim().length) {
        throw new Error("Embed Mode is required");
    }

    if (params.embedMode === "place" || params.embedMode === "search") {
        queryParams.push(`q=${encodeURIComponent(params.query)}`);
    }

    if (params.embedMode === "directions") {
        if (params.origin.trim().length > 0) {
            queryParams.push(`origin=${params.origin}`);
        }

        if (params.destination.trim().length > 0) {
            queryParams.push(`destination=${params.destination}`);
        }

        if (params.waypoints.trim().length > 0) {
            queryParams.push(`waypoints=${params.waypoints}`);
        }

        if (params.directionsMode.trim().length > 0) {
            queryParams.push(`mode=${params.directionsMode}`);
        }

        if (params.avoid.trim().length > 0) {
            queryParams.push(`avoid=${params.avoid}`);
        }

        if (params.units.trim().length > 0) {
            queryParams.push(`units=${params.units}`);
        }
    }

    if (params.embedMode === "streetview") {
        if (params.pano.trim().length > 0) {
            queryParams.push(`pano=${params.pano}`);
        }

        if (params.location.trim().length > 0) {
            queryParams.push(`location=${params.location}`);
        }
    } else {
        if (params.center.trim().length > 0) {
            queryParams.push(`center=${encodeURIComponent(params.center)}`);
        }

        if (params.zoom.trim().length > 0) {
            queryParams.push(`zoom=${params.zoom}`);
        }

        if (params.mapType.trim().length > 0) {
            queryParams.push(`maptype=${params.mapType}`);
        }
    }

    return `${baseURL}${params.embedMode}?${queryParams.join("&")}`;
}

export default generateStaticMapURL;