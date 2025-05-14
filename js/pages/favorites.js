
function renderFavoritesPage() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const shops = JSON.parse(localStorage.getItem('shops'));
    
    // Get favorited shops
    const favoritedShops = shops.filter(shop => favorites.includes(shop.id));
    
    let favoritesContent = `
        <div class="p-4 fade-in">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Your Favorites</h1>
            
            ${favoritedShops.length > 0 ? `
                <div class="space-y-4 pb-4">
            ` : `
                <div class="text-center py-8 fade-in">
                    <i class="far fa-heart text-5xl text-gray-300 mb-3"></i>
                    <p class="text-gray-600 mb-3">You haven't added any print shops to your favorites yet.</p>
                    <button onclick="loadPage('directory')" class="gradient-primary text-white py-2 px-6 rounded-full text-sm">Browse Print Shops</button>
                </div>
            `}
    `;
    
    // List favorited shops
    if (favoritedShops.length > 0) {
        favoritedShops.forEach((shop, index) => {
            const isOpenClass = shop.isOpen ? 'status-open' : 'status-closed';
            const isOpenText = shop.isOpen ? 'Open Now' : 'Closed';
            
            favoritesContent += `
                <div class="shop-card glass-card rounded-lg overflow-hidden shadow-md relative slide-in" style="animation-delay: ${0.1 * index}s">
                    <button onclick="toggleFavorite(${shop.id}, true)" class="absolute top-2 right-2 bg-white p-2 rounded-full text-accent shadow-sm z-10">
                        <i class="fas fa-heart"></i>
                    </button>
                    <div class="p-4" onclick="loadPage('detail', ${shop.id})">
                        <div class="flex justify-between items-start">
                            <h3 class="font-bold text-gray-800">${shop.name}</h3>
                            <span class="text-sm ${isOpenClass} text-white px-2 py-1 rounded-full">${isOpenText}</span>
                        </div>
                        <div class="flex items-center justify-between mt-1">
                            <p class="text-sm text-gray-600">
                                <i class="fas fa-map-marker-alt text-accent mr-1"></i> ${shop.location.area}
                            </p>
                           
                        </div>
                        <div class="mt-3 flex flex-wrap gap-1">
                            ${shop.services.slice(0, 3).map(service => 
                                `<span class="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">${service}</span>`
                            ).join('')}
                            ${shop.services.length > 3 ? `<span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">+${shop.services.length - 3} more</span>` : ''}
                        </div>
                        <div class="mt-3 flex items-center justify-between">
                            <div class="flex text-yellow-400 text-sm">
                                <i class="fas fa-star"></i>
                                <span class="ml-1 text-gray-700">${shop.rating}</span>
                            </div>
                            <button class="text-primary text-sm font-medium">View Details</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    favoritesContent += `
            </div>
        </div>
    `;
    
    document.getElementById('content').innerHTML = favoritesContent;
}
