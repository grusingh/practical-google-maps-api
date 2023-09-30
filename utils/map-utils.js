/***
* Generate Google Maps Static API URL from params
* 
* Example usage:
* const mapParams = {
* center: "New+York,NY",
*  zoom: 12,
*  size: "800x600",
*  markers: "color:red|label:A|New+York,NY",
*  apiKey: "YOUR_API_KEY",
*};
* 
* const staticMapURL = generateStaticMapURL(mapParams);
* console.log(staticMapURL);
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
    if (params.markers) {
        queryParams.push(`markers=${encodeURIComponent(params.markers)}`);
    }

    if (params.mapType) {
        queryParams.push(`maptype=${params.mapType}`);
    }

    // Construct the final URL by joining all query parameters
    const mapURL = `${baseURL}${queryParams.join("&")}`;

    return mapURL;
}

export default generateStaticMapURL;