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
  
});
