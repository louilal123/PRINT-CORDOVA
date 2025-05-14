// Initialize the app
function initLocalStorage() {
    // Check local storage for shops data or store the default data
    if (!localStorage.getItem('shops')) {
        localStorage.setItem('shops', JSON.stringify(shopData));
    }
    
    // Check if there's favorites data in localStorage
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }
    
    // Check for recently viewed shops
    if (!localStorage.getItem('recentlyViewed')) {
        localStorage.setItem('recentlyViewed', JSON.stringify([]));
    }
    
 
}



// Toggle theme



// Update active navigation state with improved active tab indication
function updateActiveNav(activePage) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        const pages = ['home', 'directory', 'favorites', 'about'];
        const iconElement = item.querySelector('i');
        const textElement = item.querySelector('span');
        
        if (pages[index] === activePage) {
            // Apply active styling
            item.classList.add('nav-active');
            iconElement.classList.add('text-primary');
            textElement.classList.add('text-primary', 'font-medium');
            
            // Remove inactive styling
            item.classList.remove('text-gray-500');
            iconElement.classList.remove('text-gray-500');
            textElement.classList.remove('text-gray-500');
        } else {
            // Apply inactive styling
            item.classList.remove('nav-active');
            iconElement.classList.add('text-gray-500');
            textElement.classList.add('text-gray-500');
            
            // Remove active styling
            iconElement.classList.remove('text-primary');
            textElement.classList.remove('text-primary', 'font-medium');
        }
    });
}
// Function to load different pages
function loadPage(page, id = null) {
    const contentElement = document.getElementById('content');
    
    // Update active navigation item
    updateActiveNav(page);
    
    // Show skeleton loading instead of spinner
    contentElement.innerHTML = renderSkeletonLoader(page);
    
    // Simulate loading delay (can be removed in production)
    setTimeout(() => {
        switch(page) {
            case 'home':
                renderHomePage();
                break;
            case 'directory':
                renderDirectoryPage();
                break;
            case 'detail':
                // Add to recently viewed
                if (id) {
                    addToRecentlyViewed(parseInt(id));
                }
                renderDetailPage(id);
                break;
            case 'favorites':
                renderFavoritesPage();
                break;
            case 'about':
                renderAboutPage();
                break;
            default:
                renderHomePage();
        }
    }, 500);
}

// Add to recently viewed
function addToRecentlyViewed(shopId) {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    
    // Remove if already exists
    const filteredRecent = recentlyViewed.filter(id => id !== shopId);
    
    // Add to start of array (most recent first)
    filteredRecent.unshift(shopId);
    
    // Keep only 5 most recent
    const limitedRecent = filteredRecent.slice(0, 5);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(limitedRecent));
}

// Show toast message
function showToast(message) {
    // Remove any existing toast
    const existingToast = document.querySelector('.message-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'message-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Auto-remove after 2.5 seconds
    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// Share shop details
function shareShop(shopId) {
    const shops = JSON.parse(localStorage.getItem('shops'));
    const shop = shops.find(shop => shop.id === parseInt(shopId));
    
    if (!shop) return;
    
    if (navigator.share) {
        navigator.share({
            title: `Check out ${shop.name} on Print Bantayan Island`,
            text: `${shop.name} - ${shop.description}. Located at: ${shop.location.address}`,
            url: window.location.href
        })
        .then(() => showToast('Shared successfully'))
        .catch(() => showToast('Sharing canceled'));
    } else {
        // Fallback for browsers that don't support Web Share API
        const dummyInput = document.createElement('input');
        const shareText = `Check out ${shop.name} on Print Bantayan Island. Located at: ${shop.location.address}`;
        
        document.body.appendChild(dummyInput);
        dummyInput.value = shareText;
        dummyInput.select();
        document.execCommand('copy');
        document.body.removeChild(dummyInput);
        
        showToast('Shop info copied to clipboard');
    }
}

// Filter shops by service
function filterByService(service) {
    loadPage('directory', { type: 'service', value: service });
}

// Filter shops by area
function filterByArea(area) {
    loadPage('directory', { type: 'area', value: area });
}

// Search in directory
function searchDirectory() {
    const keyword = document.getElementById('directorySearchInput').value.trim();
    if (keyword.length > 0) {
        renderDirectoryPage(null, keyword);
    }
}

// Quick search from home page
function quickSearch() {
    const keyword = document.getElementById('searchInput').value.trim();
    if (keyword.length > 0) {
        loadPage('directory');
        setTimeout(() => {
            document.getElementById('directorySearchInput').value = keyword;
            searchDirectory();
        }, 500);
    }
}

// Toggle favorite
function toggleFavorite(shopId, isOnFavoritesPage = false) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.includes(shopId)) {
        // Remove from favorites
        const newFavorites = favorites.filter(id => id !== shopId);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        
        if (isOnFavoritesPage) {
            // Refresh favorites page to reflect changes
            renderFavoritesPage();
        } else {
            // Update heart icon
            const favoriteBtn = document.getElementById('favoriteBtn');
            if (favoriteBtn) {
                favoriteBtn.classList.remove('text-accent');
                favoriteBtn.classList.add('text-gray-600');
            }
        }
        
        showToast('Removed from favorites');
    } else {
        // Add to favorites
        favorites.push(shopId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Update heart icon
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (favoriteBtn) {
            favoriteBtn.classList.remove('text-gray-600');
            favoriteBtn.classList.add('text-accent');
        }
        
        showToast('Added to favorites');
    }
}

// Clear local data
function clearLocalData() {
    if (confirm('This will clear all your saved favorites and reset the app. Continue?')) {
        localStorage.removeItem('favorites');
        localStorage.removeItem('shops');
        localStorage.removeItem('recentlyViewed');
        localStorage.setItem('shops', JSON.stringify(shopData));
        localStorage.setItem('favorites', JSON.stringify([]));
        localStorage.setItem('recentlyViewed', JSON.stringify([]));
        
        // Show feedback
        showToast('Data cleared successfully');
        
        // Reload about page
        setTimeout(() => {
            loadPage('about');
        }, 1000);
    }
}

// Render skeleton loader
function renderSkeletonLoader(page) {
    switch(page) {
        case 'directory':
        case 'favorites':
            return `
                <div class="p-4">
                    <div class="skeleton h-8 w-3/4 rounded-lg mb-6"></div>
                    <div class="skeleton h-10 w-full rounded-lg mb-6"></div>
                    <div class="skeleton h-8 w-full rounded-full mb-6"></div>
                    <div class="space-y-4">
                        ${[1,2,3].map(() => `
                            <div class="skeleton rounded-lg h-32"></div>
                        `).join('')}
                    </div>
                </div>
            `;
        case 'detail':
            return `
                <div>
                    <div class="skeleton h-40 w-full"></div>
                    <div class="flex justify-center relative -mt-12">
                        <div class="skeleton h-24 w-24 rounded-full border-4 border-white"></div>
                    </div>
                    <div class="p-4 space-y-4 mt-4">
                        <div class="skeleton h-8 w-2/3 rounded mx-auto"></div>
                        <div class="skeleton h-4 w-1/3 rounded mx-auto"></div>
                        <div class="skeleton h-32 rounded-lg"></div>
                        <div class="skeleton h-24 rounded-lg"></div>
                        <div class="skeleton h-40 rounded-lg"></div>
                        <div class="skeleton h-24 rounded-lg"></div>
                    </div>
                </div>
            `;
        default:
            return `
                <div class="p-4">
                    <div class="skeleton h-40 w-full rounded-lg mb-6"></div>
                    <div class="skeleton h-8 w-1/2 rounded-lg mb-4"></div>
                    <div class="skeleton h-12 w-full rounded-lg mb-6"></div>
                    <div class="skeleton h-8 w-1/2 rounded-lg mb-4"></div>
                    <div class="space-y-4 mb-6">
                        ${[1,2].map(() => `
                            <div class="skeleton rounded-lg h-24"></div>
                        `).join('')}
                    </div>
                    <div class="skeleton h-8 w-1/2 rounded-lg mb-4"></div>
                    <div class="grid grid-cols-2 gap-3">
                        ${[1,2,3,4].map(() => `
                            <div class="skeleton rounded-lg h-24"></div>
                        `).join('')}
                    </div>
                </div>
            `;
    }
}