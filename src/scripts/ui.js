class UIManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.currentTab = 'shops';

    this.shopListElement = document.getElementById('shopList');
    this.favoritesListElement = document.getElementById('favoritesList');
    this.noFavoritesElement = document.getElementById('noFavorites');
    this.toastElement = document.getElementById('toast');
    this.searchInput = document.getElementById('searchInput');
    this.shopDetailContainer = document.getElementById('shopDetailContainer');

    this.tabIndicator = document.querySelector('.tab-indicator');
    this.tabs = document.querySelectorAll('.tab');
    this.positionTabIndicator(0);
  }

  async initialize() {
    await this.dataManager.loadShops();
    this.renderShops();
    this.renderFavorites();

    this.searchInput.addEventListener('input', () => {
      this.renderShops(this.searchInput.value);
    });

    document.getElementById('backButton').addEventListener('click', () => {
      this.switchTab('shops', 0);
    });
  }

  renderShops(searchQuery = '') {
    const shops = searchQuery 
      ? this.dataManager.searchShops(searchQuery)
      : this.dataManager.shops;

    this.shopListElement.innerHTML = '';

    if (shops.length === 0) {
      this.shopListElement.innerHTML = `
        <div class="no-results">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <p>No print shops found</p>
        </div>
      `;
      return;
    }

    shops.forEach(shop => {
      const shopCard = this.createShopCard(shop);
      this.shopListElement.appendChild(shopCard);
    });
  }

  renderFavorites() {
    const favorites = this.dataManager.getFavorites();
    this.favoritesListElement.innerHTML = '';

    if (favorites.length === 0) {
      this.noFavoritesElement.style.display = 'block';
      return;
    }

    this.noFavoritesElement.style.display = 'none';

    favorites.forEach(shop => {
      const shopCard = this.createShopCard(shop);
      this.favoritesListElement.appendChild(shopCard);
    });
  }

  createShopCard(shop) {
    const isFavorite = this.dataManager.isFavorite(shop.id);
    const card = document.createElement('div');
    card.className = 'shop-card';

    const serviceTags = shop.services
      .slice(0, 3)
      .map(service => `<span class="service-tag">${service}</span>`)
      .join('');

    const moreServices = shop.services.length > 3 
      ? `<span class="service-tag">+${shop.services.length - 3} more</span>` 
      : '';

    card.innerHTML = `
      <div class="shop-card-image" style="background-image: url('${shop.image}')">
        <button class="shop-card-favorite ${isFavorite ? 'active' : ''}" data-shop-id="${shop.id}" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div class="shop-card-content">
        <h2 class="shop-card-title">${shop.name}</h2>
        <div class="shop-card-location">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          ${shop.location}
        </div>
        <div class="shop-card-contact">
          <a href="mailto:${shop.email}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            ${shop.email}
          </a>
          <a href="tel:${shop.phone}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            ${shop.phone}
          </a>
        </div>
        <div class="shop-card-services">
          ${serviceTags}
          ${moreServices}
        </div>
      </div>
    `;

    const favoriteButton = card.querySelector('.shop-card-favorite');
    favoriteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const shopId = parseInt(favoriteButton.getAttribute('data-shop-id'));
      const newState = this.dataManager.toggleFavorite(shopId);
      favoriteButton.classList.toggle('active', newState);
      favoriteButton.setAttribute('aria-label', newState ? 'Remove from favorites' : 'Add to favorites');
      this.renderFavorites();
      this.showToast(newState ? 'Added to favorites' : 'Removed from favorites');
    });

    card.addEventListener('click', () => {
      this.showShopDetail(shop);
    });

    return card;
  }

  showShopDetail(shop) {
    this.shopDetailContainer.innerHTML = `
      <div class="shop-detail-header">
        <img src="${shop.image}" alt="${shop.name}" class="shop-detail-image">
        <h1 class="shop-detail-title">${shop.name}</h1>
        <div class="shop-detail-location">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          ${shop.location}
        </div>
      </div>
      <div class="shop-detail-contact">
        <a href="mailto:${shop.email}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          ${shop.email}
        </a>
        <a href="tel:${shop.phone}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          ${shop.phone}
        </a>
      </div>
      <div class="shop-detail-services">
        <h3>Services Offered</h3>
        ${shop.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
      </div>
      ${shop.description ? `
        <div class="shop-detail-description">
          <h3>About</h3>
          <p>${shop.description}</p>
        </div>
      ` : ''}
      ${shop.hours ? `
        <div class="shop-detail-hours">
          <h3>Business Hours</h3>
          <table>
            ${Object.entries(shop.hours).map(([day, time]) => `
              <tr>
                <td>${day}</td>
                <td>${time}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      ` : ''}
    `;
    
    this.showDetailView();
    this.switchTab('shop-detail', -1); // -1 to hide tab indicator
  }

  showToast(message) {
    this.toastElement.textContent = message;
    this.toastElement.classList.add('active');
    setTimeout(() => {
      this.toastElement.classList.remove('active');
    }, 3000);
  }

  showDetailView() {
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById('shop-detail-section').classList.add('active');
    document.querySelector('.footer-nav').style.display = 'none';
  }

  switchTab(tabId, index) {
    if (this.currentTab === tabId) return;
    this.currentTab = tabId;

    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.footer-nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.toggle('active', section.id === `${tabId}-section`);
    });

    document.querySelector('.footer-nav').style.display = 
      tabId === 'shops' || tabId === 'favorites' ? 'flex' : 'none';

    this.positionTabIndicator(index);
  }

  positionTabIndicator(index) {
    if (!this.tabIndicator || !this.tabs[index]) return;
    const activeTab = this.tabs[index];
    const tabWidth = activeTab.offsetWidth;
    this.tabIndicator.style.width = `${tabWidth}px`;
    this.tabIndicator.style.transform = `translateX(${index * tabWidth}px)`;
  }
}