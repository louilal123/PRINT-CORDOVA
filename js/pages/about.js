
function renderAboutPage() {
    let aboutContent = `
        <div class="p-4 fade-in">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">About Print Bantayan Island</h1>
            
            <div class="glass-card rounded-lg shadow-md p-4 mb-4 slide-in" style="animation-delay: 0.1s">
                <h2 class="text-lg font-medium text-gray-800 mb-2">Our Purpose</h2>
                <p class="text-gray-600 text-sm">
                    Print Bantayan Island helps locals and tourists find printing services and graphic design solutions across Bantayan Island, Philippines. This app works offline to ensure you can find services even with limited connectivity.
                </p>
            </div>
            
            <div class="glass-card rounded-lg shadow-md p-4 mb-4 slide-in" style="animation-delay: 0.2s">
                <h2 class="text-lg font-medium text-gray-800 mb-2">How to Use</h2>
                <div class="space-y-3 text-sm text-gray-600">
                    <p><span class="font-medium text-primary">Browse:</span> Use the Directory to see all print shops or filter by area.</p>
                    <p><span class="font-medium text-primary">Search:</span> Find services by name, location, or service type.</p>
                    <p><span class="font-medium text-primary">Favorites:</span> Save shops you frequently visit for easy access.</p>
                    <p><span class="font-medium text-primary">Recently Viewed:</span> See shops you've recently checked out.</p>
                    <p><span class="font-medium text-primary">Share:</span> Share shop details with friends and family.</p>
                    <p><span class="font-medium text-primary">Dark Mode:</span> Toggle between light and dark themes.</p>
                    <p><span class="font-medium text-primary">Offline Access:</span> All data is stored on your device for offline use.</p>
                </div>
            </div>
            
            <div class="glass-card rounded-lg shadow-md p-4 mb-6 slide-in" style="animation-delay: 0.3s">
                <h2 class="text-lg font-medium text-gray-800 mb-2">Data & Privacy</h2>
                <p class="text-gray-600 text-sm mb-3">
                    This app stores data locally on your device and does not collect any personal information. Your favorites and search history are only saved on your device.
                </p>
                <button onclick="clearLocalData()" class="text-accent text-sm font-medium">
                    Clear Saved Data
                </button>
            </div>
            
            <div class="gradient-beige rounded-lg p-4 text-center mb-6 slide-in" style="animation-delay: 0.4s">
                <h3 class="font-medium text-gray-800 mb-2">Have a print shop on Bantayan Island?</h3>
                <p class="text-sm text-gray-600 mb-3">
                    Contact us to add your business to our directory!
                </p>
                <a href="mailto:contact@printbantayanisland.com" class="gradient-primary text-white py-2 px-6 rounded-full text-sm inline-block">
                    Contact Us
                </a>
            </div>
            
            <div class="text-center text-gray-500 text-sm fade-in" style="animation-delay: 0.5s">
                <p>Print Bantayan Island</p>
                <p>Version 2.0.0</p>
            </div>
        </div>
    `;
    
    document.getElementById('content').innerHTML = aboutContent;
}
