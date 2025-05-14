
function renderDetailPage(id) {
    const shops = JSON.parse(localStorage.getItem('shops'));
    const shop = shops.find(shop => shop.id === parseInt(id));
    
    if (!shop) {
        document.getElementById('content').innerHTML = `
            <div class="p-4 text-center fade-in">
                <h1 class="text-2xl font-bold text-gray-800 mb-4">Shop Not Found</h1>
                <p class="text-gray-600 mb-6">The shop you're looking for doesn't exist or has been removed.</p>
                <button onclick="loadPage('directory')" class="gradient-primary text-white py-2 px-6 rounded-full">Back to Directory</button>
            </div>
        `;
        return;
    }
    
    const isOpenClass = shop.isOpen ? 'status-open' : 'status-closed';
    const isOpenText = shop.isOpen ? 'Open Now' : 'Closed';
    
    // Check if shop is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorited = favorites.includes(shop.id);
    
    // Calculate business hours visualization
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    let hoursPercent = 0;
    
    // Example parsing hours like "8:00 AM - 5:00 PM"
    if (shop.contact.hours) {
        const hoursMatch = shop.contact.hours.match(/(\d+):(\d+)\s*(AM|PM)\s*-\s*(\d+):(\d+)\s*(AM|PM)/i);
        if (hoursMatch) {
            let openHour = parseInt(hoursMatch[1]);
            const openMinute = parseInt(hoursMatch[2]);
            const openPeriod = hoursMatch[3].toUpperCase();
            
            let closeHour = parseInt(hoursMatch[4]);
            const closeMinute = parseInt(hoursMatch[5]);
            const closePeriod = hoursMatch[6].toUpperCase();
            
            // Adjust for PM
            if (openPeriod === 'PM' && openHour !== 12) openHour += 12;
            if (openPeriod === 'AM' && openHour === 12) openHour = 0;
            if (closePeriod === 'PM' && closeHour !== 12) closeHour += 12;
            if (closePeriod === 'AM' && closeHour === 12) closeHour = 0;
            
            // Convert to minutes since midnight
            const openTimeMinutes = openHour * 60 + openMinute;
            const closeTimeMinutes = closeHour * 60 + closeMinute;
            const currentTimeMinutes = currentHour * 60 + currentMinute;
            
            // Calculate percentage through business day
            if (currentTimeMinutes >= openTimeMinutes && currentTimeMinutes <= closeTimeMinutes) {
                hoursPercent = ((currentTimeMinutes - openTimeMinutes) / (closeTimeMinutes - openTimeMinutes)) * 100;
            }
        }
    }
    
    let detailContent = `
        <div class="fade-in">
            <div class="relative h-40 gradient-primary">
                <div class="absolute top-0 left-0 right-0 p-4 flex justify-between">
                    <button onclick="loadPage('directory')" class="bg-white bg-opacity-90 p-2 rounded-full text-primary shadow-md">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <div class="flex space-x-2">
                        <button onclick="shareShop(${shop.id})" class="bg-white bg-opacity-90 p-2 rounded-full text-primary shadow-md">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button id="favoriteBtn" onclick="toggleFavorite(${shop.id})" class="bg-white bg-opacity-90 p-2 rounded-full ${isFavorited ? 'text-accent' : 'text-gray-600'} shadow-md">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="absolute bottom-0 w-full">
                    <div class="relative h-20 -bottom-12">
                        <div class="absolute bg-white rounded-full w-24 h-24 flex items-center justify-center border-4 border-white shadow-md left-1/2 transform -translate-x-1/2">
                            <i class="fas fa-print text-4xl text-primary"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-16 px-4">
                <div class="text-center mb-2">
                    <h1 class="text-2xl font-bold text-gray-800">${shop.name}</h1>
                    <div class="mt-1 flex items-center justify-center">
                        <span class="text-sm ${isOpenClass} text-white px-3 py-1 rounded-full mr-2">${isOpenText}</span>
                        <div class="flex text-yellow-400 text-sm">
                            <i class="fas fa-star"></i>
                            <span class="ml-1 text-gray-700">${shop.rating}</span>
                        </div>
                      
                    </div>
                </div>
                
                <div class="glass-card rounded-lg shadow-md p-4 mb-4 slide-in" style="animation-delay: 0.1s">
                    <h2 class="text-lg font-medium text-gray-800 mb-2">About</h2>
                    <p class="text-gray-600 text-sm">${shop.description}</p>
                </div>
                
                <div class="glass-card rounded-lg shadow-md p-4 mb-4 slide-in" style="animation-delay: 0.2s">
                    <h2 class="text-lg font-medium text-gray-800 mb-2">Services</h2>
                    <div class="flex flex-wrap gap-2">
                        ${shop.services.map(service => 
                            `<span class="text-sm bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full">${service}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="glass-card rounded-lg shadow-md p-4 mb-4 slide-in" style="animation-delay: 0.3s">
                    <h2 class="text-lg font-medium text-gray-800 mb-2">Hours</h2>
                    <p class="text-sm text-gray-700 mb-2">
                        <i class="fas fa-clock text-primary mr-2"></i>${shop.contact.hours}
                    </p>
                    ${shop.isOpen ? `
                        <div class="hours-timeline mt-3 mb-1 relative">
                            <div class="hours-current" style="left: ${hoursPercent}%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500">
                            <span>Open</span>
                            <span>Close</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="glass-card rounded-lg shadow-md p-4 mb-4 slide-in" style="animation-delay: 0.4s">
                    <h2 class="text-lg font-medium text-gray-800 mb-2">Contact</h2>
                    <div class="space-y-3">
                        <a href="tel:${shop.contact.phone}" class="flex items-center text-sm text-gray-700">
                            <div class="gradient-primary w-10 h-10 rounded-full flex items-center justify-center shadow-sm mr-3">
                                <i class="fas fa-phone text-white"></i>
                            </div>
                            Call: ${shop.contact.phone}
                        </a>
                        
                        <a href="mailto:${shop.contact.email}" class="flex items-center text-sm text-gray-700">
                            <div class="gradient-secondary w-10 h-10 rounded-full flex items-center justify-center shadow-sm mr-3">
                                <i class="fas fa-envelope text-white"></i>
                            </div>
                            Email: ${shop.contact.email}
                        </a>
                        
                        ${shop.contact.website ? `
                            <a href="https://${shop.contact.website}" class="flex items-center text-sm text-gray-700">
                                <div class="gradient-accent w-10 h-10 rounded-full flex items-center justify-center shadow-sm mr-3">
                                    <i class="fas fa-globe text-white"></i>
                                </div>
                                Website: ${shop.contact.website}
                            </a>
                        ` : ''}
                        
                        <a href="https://wa.me/${shop.contact.phone.replace(/[^0-9]/g, '')}" class="flex items-center text-sm text-gray-700">
                            <div class="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center shadow-sm mr-3">
                                <i class="fab fa-whatsapp text-white"></i>
                            </div>
                            WhatsApp Message
                        </a>
                    </div>
                </div>
                
                <div class="glass-card rounded-lg shadow-md p-4 mb-6 slide-in" style="animation-delay: 0.5s">
                    <h2 class="text-lg font-medium text-gray-800 mb-2">Location</h2>
                    <p class="text-sm text-gray-600 mb-3">
                        <i class="fas fa-map-marker-alt text-accent mr-2"></i>${shop.location.address}
                    </p>
                    <div id="map" class="map-container">
                        <div class="h-full w-full flex items-center justify-center bg-gray-100">
                            <div class="text-center p-4">
                                <i class="fas fa-map-marked-alt text-4xl text-primary mb-2"></i>
                                <p class="text-sm text-gray-500">Map shows location at coordinates: ${shop.location.coordinates[0]}, ${shop.location.coordinates[1]}</p>
                                <a href="https://maps.google.com/?q=${shop.location.coordinates[0]},${shop.location.coordinates[1]}" 
                                   class="mt-2 inline-block gradient-primary text-white text-sm rounded-full px-3 py-1">
                                    Open in Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex mb-6 gap-3">
                    <a href="tel:${shop.contact.phone}" class="flex-1 gradient-primary text-white py-3 rounded-lg flex items-center justify-center font-medium">
                        <i class="fas fa-phone mr-2"></i> Call Now
                    </a>
                    <a href="https://maps.google.com/?q=${shop.location.coordinates[0]},${shop.location.coordinates[1]}" 
                       class="flex-1 gradient-secondary text-white py-3 rounded-lg flex items-center justify-center font-medium">
                        <i class="fas fa-directions mr-2"></i> Directions
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('content').innerHTML = detailContent;
}
