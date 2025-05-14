// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize local storage with default data if needed
    initLocalStorage();
    
    // Load home page by default
    loadPage('home');
    
    // Update active state for navigation items
    updateActiveNav('home');
});