
function renderDirectoryPage(filter = null, keyword = null) {
    let shops = JSON.parse(localStorage.getItem('shops'));
    
    // Apply filters if provided
    if (filter && filter.type === 'service') {
        shops = shops.filter(shop => 
            shop.services.some(service => service.toLowerCase().includes(filter.value.toLowerCase()))
        );
    } else if (filter && filter.type === 'area') {
        shops = shops.filter(shop => 
            shop.location.area.toLowerCase() === filter.value.toLowerCase()
        );
    }
    
    // Apply keyword search if provided
    if (keyword) {
        shops = shops.filter(shop => 
            shop.name.toLowerCase().includes(keyword.toLowerCase()) ||
            shop.services.some(service => service.toLowerCase().includes(keyword.toLowerCase())) ||
            shop.location.area.toLowerCase().includes(keyword.toLowerCase()) ||
            shop.description.toLowerCase().includes(keyword.toLowerCase())
        );
    }
    
    // Sort options - default by rating
    shops.sort((a, b) => b.rating - a.rating);
    
    let directoryContent = `
        <div class="p-4 fade-in">
            <div class="flex items-center justify-between mb-4">
                <h1 class="text-2xl font-bold text-gray-800">Print Services Directory</h1>
            </div>
            
            <div class="relative mb-6">
                <input type="text" id="directorySearchInput" 
                       value="${keyword || ''}"
                       placeholder="Search by name, service, or location..." 
                       class="w-full py-3 px-4 rounded-lg shadow-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                       onkeyup="if(event.key === 'Enter') searchDirectory()">
                <button onclick="searchDirectory()" class="absolute right-2 top-2 gradient-primary text-white p-1 rounded-full w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            
            <div class="mb-4 overflow-x-auto flex space-x-2 pb-2 no-scrollbar">
                <button onclick="loadPage('directory')" class="filter-btn whitespace-nowrap flex-shrink-0 ${!filter ? 'tab-active' : 'bg-gray-100 text-gray-700'} py-2 px-4 rounded-full text-sm font-medium shadow-sm">
                    All Services
                </button>
                <button onclick="filterByArea('Santa Fe')" class="filter-btn whitespace-nowrap flex-shrink-0 ${filter && filter.type === 'area' && filter.value === 'Santa Fe' ? 'tab-active' : 'bg-gray-100 text-gray-700'} py-2 px-4 rounded-full text-sm font-medium shadow-sm">
                    Santa Fe
                </button>
                <button onclick="filterByArea('Bantayan Town')" class="filter-btn whitespace-nowrap flex-shrink-0 ${filter && filter.type === 'area' && filter.value === 'Bantayan Town' ? 'tab-active' : 'bg-gray-100 text-gray-700'} py-2 px-4 rounded-full text-sm font-medium shadow-sm">
                    Bantayan Town
                </button>
                <button onclick="filterByArea('Madridejos')" class="filter-btn whitespace-nowrap flex-shrink-0 ${filter && filter.type === 'area' && filter.value === 'Madridejos' ? 'tab-active' : 'bg-gray-100 text-gray-700'} py-2 px-4 rounded-full text-sm font-medium shadow-sm">
                    Madridejos
                </button>
            </div>
            
            <div class="space-y-4 pb-4">
    `;
    
    // Filter message
    if (filter || keyword) {
        let filterMessage = 'Showing results for ';
        if (filter && filter.type === 'service') {
            filterMessage += `"${filter.value}" services`;
        } else if (filter && filter.type === 'area') {
            filterMessage += `${filter.value} area`;
        }
        
        if (keyword) {
            filterMessage += filter ? ' with keyword ' : '';
            filterMessage += `"${keyword}"`;
        }
        
        directoryContent += `
            <div class="gradient-beige bg-opacity-50 rounded-lg p-3 text-sm flex justify-between items-center mb-2">
                <span>${filterMessage} (${shops.length} results)</span>
                <button onclick="loadPage('directory')" class="text-accent">
                    <i class="fas fa-times-circle"></i> Clear
                </button>
            </div>
        `;
    }
    
    // List all shops
    if (shops.length > 0) {
        shops.forEach((shop, index) => {
            const isOpenClass = shop.isOpen ? 'status-open' : 'status-closed';
            const isOpenText = shop.isOpen ? 'Open Now' : 'Closed';
            
            directoryContent += `
                <div class="shop-card rounded-lg overflow-hidden shadow-md slide-in" style="animation-delay: ${0.1 * index}s" onclick="loadPage('detail', ${shop.id})">
                    <div class="p-4">
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
                                `<span class="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded-full border border-gray-100">${service}</span>`
                            ).join('')}
                            ${shop.services.length > 3 ? `<span class="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded-full border border-gray-100">+${shop.services.length - 3} more</span>` : ''}
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
    } else {
        directoryContent += `
            <div class="text-center py-8 fade-in">
                <i class="fas fa-search text-4xl text-gray-300 mb-3"></i>
                <p class="text-gray-500">No print services found matching your criteria.</p>
                <button onclick="loadPage('directory')" class="mt-4 gradient-primary text-white rounded-full px-4 py-2 text-sm">View All Services</button>
            </div>
        `;
    }
    
    directoryContent += `
            </div>
        </div>
    `;
    
    document.getElementById('content').innerHTML = directoryContent;
}
