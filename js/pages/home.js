
function renderHomePage() {
    const shops = JSON.parse(localStorage.getItem('shops'));
    const featuredShops = shops.filter(shop => shop.isFeatured);
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const recentShops = recentlyViewed.map(id => shops.find(shop => shop.id === id)).filter(Boolean);
    
    let homeContent = `
        <div class="clip-path-header h-52 flex items-center justify-center relative mb-8 fade-in">
            <div class="text-center text-white px-4 pt-10">
                <h1 class="text-3xl font-bold mb-2 drop-shadow-md">Print Bantayan Island</h1>
                <p class="text-sm opacity-90 mb-4">Find printing services across Bantayan Island</p>
                <div class="relative">
                    <input type="text" id="searchInput" 
                           placeholder="Search for print services..." 
                           class="w-full py-3 px-4 rounded-full shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                           onkeyup="if(event.key === 'Enter') quickSearch()">
                    <button onclick="quickSearch()" class="absolute right-2 top-2 gradient-secondary text-white p-1 rounded-full w-8 h-8 flex items-center justify-center">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="px-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">Popular Services</h2>
            </div>
            
            <div class="overflow-x-auto flex space-x-3 pb-2 no-scrollbar mb-6 slide-in">
                <button onclick="filterByService('Digital Printing')" class="service-btn flex-shrink-0 py-2 px-4 rounded-full font-medium text-sm shadow-sm">
                    <i class="fas fa-print mr-2"></i>Digital Printing
                </button>
                <button onclick="filterByService('Graphic Design')" class="service-btn flex-shrink-0 py-2 px-4 rounded-full font-medium text-sm shadow-sm">
                    <i class="fas fa-palette mr-2"></i>Graphic Design
                </button>
                <button onclick="filterByService('T-Shirt')" class="service-btn flex-shrink-0 py-2 px-4 rounded-full font-medium text-sm shadow-sm">
                    <i class="fas fa-tshirt mr-2"></i>T-Shirt Printing
                </button>
                <button onclick="filterByService('Photo')" class="service-btn flex-shrink-0 py-2 px-4 rounded-full font-medium text-sm shadow-sm">
                    <i class="fas fa-camera mr-2"></i>Photo Printing
                </button>
            </div>
            
            ${recentShops.length > 0 ? `
                <div class="mb-8 slide-in" style="animation-delay: 0.1s">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-gray-800">Recently Viewed</h2>
                    </div>
                    <div class="overflow-x-auto flex space-x-4 pb-4 no-scrollbar">
                        ${recentShops.map(shop => {
                            const isOpenClass = shop.isOpen ? 'status-open' : 'status-closed';
                            const isOpenText = shop.isOpen ? 'Open' : 'Closed';
                            
                            return `
                                <div class="shop-card rounded-lg shadow-md flex-shrink-0 w-44" onclick="loadPage('detail', ${shop.id})">
                                    <div class="p-3">
                                        <div class="flex justify-between items-start mb-2">
                                            <h3 class="font-medium text-gray-800 text-sm">${shop.name}</h3>
                                            <span class="text-xs ${isOpenClass} text-white px-2 rounded-full">${isOpenText}</span>
                                        </div>
                                        <p class="text-xs text-gray-600 mb-1">
                                            <i class="fas fa-map-marker-alt text-accent mr-1"></i> ${shop.location.area}
                                        </p>
                                        <div class="flex items-center justify-between">
                                            <div class="flex text-yellow-400 text-xs">
                                                <i class="fas fa-star"></i>
                                                <span class="ml-1 text-gray-700">${shop.rating}</span>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="mb-8 slide-in" style="animation-delay: 0.2s">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Featured Shops</h2>
                <div class="space-y-4">
    `;
    
    // Add featured shops
    if (featuredShops.length > 0) {
        featuredShops.forEach(shop => {
            const isOpenClass = shop.isOpen ? 'status-open' : 'status-closed';
            const isOpenText = shop.isOpen ? 'Open Now' : 'Closed';
            
            homeContent += `
                <div class="shop-card rounded-lg overflow-hidden shadow-md" onclick="loadPage('detail', ${shop.id})">
                    <div class="flex">
                        <div class="w-1/3 gradient-beige relative flex items-center justify-center">
                            <i class="fas fa-store text-4xl text-primary opacity-70"></i>
                        </div>
                        <div class="w-2/3 p-4">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-gray-800">${shop.name}</h3>
                                <span class="text-sm ${isOpenClass} text-white px-2 py-1 rounded-full">${isOpenText}</span>
                            </div>
                            <p class="text-sm text-gray-600 mt-1">
                                <i class="fas fa-map-marker-alt text-accent mr-1"></i> ${shop.location.area}
                            </p>
                            <div class="mt-2 flex items-center justify-between">
                                <div class="flex text-yellow-400 text-sm mr-1">
                                    <i class="fas fa-star"></i>
                                    <span class="ml-1 text-gray-700">${shop.rating}</span>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        homeContent += `<p class="text-gray-500 text-center py-4">No featured shops available.</p>`;
    }
    
    homeContent += `
                </div>
            </div>
            
            <div class="mb-8 slide-in" style="animation-delay: 0.3s">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Browse By Area</h2>
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="filterByArea('Santa Fe')" class="gradient-beige rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <i class="fas fa-umbrella-beach text-2xl text-primary mb-2"></i>
                        <p class="font-medium text-gray-800">Santa Fe</p>
                    </button>
                    <button onclick="filterByArea('Bantayan Town')" class="gradient-beige rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <i class="fas fa-city text-2xl text-primary mb-2"></i>
                        <p class="font-medium text-gray-800">Bantayan Town</p>
                    </button>
                    <button onclick="filterByArea('Madridejos')" class="gradient-beige rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <i class="fas fa-map-marked-alt text-2xl text-primary mb-2"></i>
                        <p class="font-medium text-gray-800">Madridejos</p>
                    </button>
                    <button onclick="loadPage('directory')" class="gradient-beige rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <i class="fas fa-th-list text-2xl text-primary mb-2"></i>
                        <p class="font-medium text-gray-800">All Areas</p>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('content').innerHTML = homeContent;
}
