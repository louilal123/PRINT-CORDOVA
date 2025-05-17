class DataManager {
  constructor() {
    this.shops = [];
    this.favorites = this.loadFavorites();
  }

  /**
   * Load shop data from JSON file
   * @returns {Promise} Promise that resolves with shop data
   */
  async loadShops() {
    try {
      const response = await fetch('src/assets/shops.json');
      if (!response.ok) {
        throw new Error('Failed to fetch shop data');
      }
      const data = await response.json();
      this.shops = data.shops;
      return this.shops;
    } catch (error) {
      console.error('Error loading shop data:', error);
      return [];
    }
  }

  /**
   * Search shops by name, location, or services
   * @param {string} query - The search query
   * @returns {Array} Filtered shops that match the query
   */
  searchShops(query) {
    if (!query) return this.shops;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return this.shops.filter(shop => {
      // Search by name
      if (shop.name.toLowerCase().includes(normalizedQuery)) return true;
      
      // Search by location
      if (shop.location.toLowerCase().includes(normalizedQuery)) return true;
      
      // Search by services
      if (shop.services.some(service => service.toLowerCase().includes(normalizedQuery))) return true;
      
      return false;
    });
  }

  /**
   * Toggle a shop's favorite status
   * @param {number} shopId - The ID of the shop to toggle
   * @returns {boolean} New favorite status
   */
  toggleFavorite(shopId) {
    const index = this.favorites.indexOf(shopId);
    
    if (index === -1) {
      // Add to favorites
      this.favorites.push(shopId);
    } else {
      // Remove from favorites
      this.favorites.splice(index, 1);
    }
    
    this.saveFavorites();
    return this.isFavorite(shopId);
  }

  /**
   * Check if a shop is in favorites
   * @param {number} shopId - The ID of the shop to check
   * @returns {boolean} Whether the shop is a favorite
   */
  isFavorite(shopId) {
    return this.favorites.includes(shopId);
  }

  /**
   * Get all favorite shops
   * @returns {Array} List of favorite shops
   */
  getFavorites() {
    return this.shops.filter(shop => this.favorites.includes(shop.id));
  }

  /**
   * Save favorites to localStorage
   */
  saveFavorites() {
    localStorage.setItem('favoriteShops', JSON.stringify(this.favorites));
  }

  /**
   * Load favorites from localStorage
   * @returns {Array} List of favorite shop IDs
   */
  loadFavorites() {
    const stored = localStorage.getItem('favoriteShops');
    return stored ? JSON.parse(stored) : [];
  }
}

// Create a single data manager instance
const dataManager = new DataManager();