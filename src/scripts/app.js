

document.addEventListener('DOMContentLoaded', () => {
  // Create UI manager
  const uiManager = new UIManager(dataManager);
  
  // Initialize
  uiManager.initialize();

  // Theme management
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply stored theme
  if (storedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.setAttribute('data-active', 'dark');
  }
  
  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    themeToggle.setAttribute('data-active', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // Drawer functionality
  const menuButton = document.getElementById('menuButton');
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  
  // Open drawer
  menuButton.addEventListener('click', () => {
    drawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close drawer functions
  const closeDrawer = () => {
    drawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  
  // Tab navigation
  const tabButtons = document.querySelectorAll('.tab');
  tabButtons.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      uiManager.switchTab(tabId, index);
    });
  });
  
  // Footer navigation
  const footerNavItems = document.querySelectorAll('.footer-nav-item');
  footerNavItems.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const tabId = item.getAttribute('data-tab');
      uiManager.switchTab(tabId, index);
    });
  });
  
  // Preload placeholder images to prevent flashing
  const preloadImages = () => {
    const imageUrls = [
      'src/assets/images/printing1.jpg',
      'src/assets/images/printing2.jpg',
      'src/assets/images/printing3.jpg',
      'src/assets/images/printing4.jpg',
      'src/assets/images/printing5.jpg',
      'src/assets/images/printing6.jpg',
      'src/assets/images/printing7.jpg',
      'src/assets/images/printing8.jpg'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  };
  
  preloadImages();
  
  // Create image directory if it doesn't exist
  const createImagesDirectory = async () => {
    // Create placeholder images for demonstration purposes
    const imageUrls = [
      'https://images.unsplash.com/photo-1598595471874-7295a7a9f1db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576153192621-7a3be10b356e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530435460869-d13625c69bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508532566027-b2032cd8a715?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ];
    
    // For demonstration, if images don't load, we could use these as fallbacks
    console.log('Placeholder image URLs are available if needed:', imageUrls);
  };
  
  createImagesDirectory();
});
