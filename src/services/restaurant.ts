export async function fetchRestaurants() {
    try {
        const response = await fetch("/api/restaurants");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        throw error;
    }
}