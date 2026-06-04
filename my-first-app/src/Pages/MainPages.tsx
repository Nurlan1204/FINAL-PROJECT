import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';
import { getProducts } from '../API/products'; // или '../api/productsApi'
import type { Product } from '../types';
import './MainPages.css';
import '../components/Products/product.css';




interface MainPageProps {
  selectedCategory: string;
  cart: any[];
  onAddToCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
  onClearFromCart: (id: string) => void;
}

export const MainPage: React.FC<MainPageProps> = ({
  selectedCategory,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearFromCart,
}) => {
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [products, setProducts] =
    useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(
          'Ошибка загрузки товаров:',
          error,
        );
      }
    };

    loadProducts();
  }, []);

  const [selectedBrand, setSelectedBrand] =
    useState<string>('all');

  const [maxPrice, setMaxPrice] =
    useState<number>(15000);

  const [sortBy, setSortBy] =
    useState<string>('default');

  const availableBrands = useMemo(() => {
    const brands = products
      .filter(
        (p) =>
          selectedCategory === 'all' ||
          p.category === selectedCategory,
      )
      .map((p) => p.brand);

    return [
      'all',
      ...Array.from(new Set(brands)),
    ];
  }, [products, selectedCategory]);
  const processedProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory);
    if (selectedBrand !== 'all') result = result.filter(p => p.brand === selectedBrand);
    result = result.filter(p => p.price <= maxPrice);

    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [
  products,
  selectedCategory,
  selectedBrand,
  maxPrice,
  sortBy,
]);

  const getProductQuantity = (productId: Product['id']) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="main-page-container">
      {/* Баннер сверху */}
      <div className="hero-banner">
        <div className="banner-content">
          <span className="banner-badge">Коллекция 2026</span>
          <h1>ЗАРЯДИ СВОЙ ТРЕНИНГ НА МАКСИМУМ</h1>
          <p>Профессиональная экипировка мировых брендов с доставкой по городу.</p>
          <button className="banner-btn" onClick={() => setMaxPrice(15000)}>Смотреть всё</button>
        </div>
      </div>

      <div className="store-layout">
        {/* Сайдбар */}
        <aside className="filters-sidebar">
          <div className="filter-block">  
            <h3>Фильтр по цене</h3>
            <div className="price-range-box">
              <input 
                type="range" min="1000" max="15000" step="500"
                value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
              <div className="price-labels"><span>до {maxPrice.toLocaleString('ru-RU')} сом</span></div>
            </div>
          </div>

          <div className="filter-block">
            <h3>Бренды</h3>
            <div className="brand-options">
              {availableBrands.map(brand => (
                <button
                  key={brand}
                  className={`brand-filter-btn ${selectedBrand === brand ? 'active' : ''}`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand === 'all' ? 'Все бренды' : brand}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Каталог */}
        <div className="catalog-content">
          <div className="catalog-header-actions">
            <p className="products-count">Найдено моделей: <strong>{processedProducts.length}</strong></p>
            <div className="sort-box">
              <label>Сортировка:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешевые</option>
                <option value="price-desc">Сначала дорогие</option>
                <option value="rating">По рейтингу ★</option>
              </select>
            </div>
          </div>

          {processedProducts.length === 0 ? (
            <div className="empty-catalog">
              <p>Товаров не найдено. Попробуйте сбросить фильтры.</p>
              <button onClick={() => { setMaxPrice(15000); setSelectedBrand('all'); }} className="reset-btn">Сбросить</button>
            </div>
          ) : (
            <div className="products-grid">
              {processedProducts.map((product) => {
                const quantityInCart = getProductQuantity(product.id);

                return (
                  <div key={product.id} className="product-card" onClick={() => setSelectedProduct({ ...product, title: (product as any).title ?? (product as any).name, description: '', inStock: 1, category: product.category as 'clothing' | 'shoes' | 'equipment' | 'accessories' })}>
                    <div className="product-image-wrapper">
                      <img src={product.image} alt={(product as any).title ?? (product as any).name} className="product-img" />
                      <span className="product-rating">★ {product.rating}</span>
                    </div>
                    
                    <div className="product-info">
                      <span className="product-brand-badge">{product.brand}</span>
                      <h3 className="product-title">{(product as any).title ?? (product as any).name}</h3>
                      
                      <div className="product-footer">
                        <span className="product-price">{product.price.toLocaleString('ru-RU')} сом</span>
                        
                        {/* Кнопки управления со встроенной кнопкой удаления */}
                        {quantityInCart > 0 ? (
                          <div className="cart-controls-wrapper" onClick={(e) => e.stopPropagation()}>
                            <div className="quantity-counter-container">
                              <button className="counter-btn minus" onClick={() => onRemoveFromCart(product.id)}>−</button>
                              <span className="counter-value">{quantityInCart}</span>
                              <button className="counter-btn plus" onClick={() => onAddToCart(product.id)}>+</button>
                            </div>
                            <button className="delete-product-btn" onClick={() => onClearFromCart(product.id)} title="Удалить из корзины">
                              🗑️
                            </button>
                          </div>
                        ) : (
                          <button 
                            className="add-to-cart-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(product.id);
                            }}
                          >
                            В корзину
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно */}
    {selectedProduct && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedProduct(null)}
  >
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal-close-btn"
        onClick={() => setSelectedProduct(null)}
      >
        ×
      </button>

      <div className="modal-body">
        <div className="modal-image-side">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.brand}
          />
        </div>

        <div className="modal-info-side">
          <span className="modal-brand">
            {selectedProduct.brand}
          </span>

          <h3 className="modal-title">
            {selectedProduct.id}
          </h3>

          <div className="modal-rating">
            ⭐ {selectedProduct.rating}
          </div>

          <p className="modal-description">
            Оригинальная спортивная обувь бренда{' '}
            {selectedProduct.brand}.
          </p>

          <div className="modal-footer">
            <span className="modal-price">
              {selectedProduct.price.toLocaleString('ru-RU')} сом
            </span>

            {getProductQuantity(selectedProduct.id) > 0 ? (
              <div className="cart-controls-wrapper modal-controls">
                <div className="quantity-counter-container modal-counter">
                  <button
                    className="counter-btn minus"
                    onClick={() =>
                      onRemoveFromCart(selectedProduct.id)
                    }
                  >
                    −
                  </button>

                  <span className="counter-value">
                    {getProductQuantity(selectedProduct.id)}
                  </span>

                  <button
                    className="counter-btn plus"
                    onClick={() =>
                      onAddToCart(selectedProduct.id)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="delete-product-btn modal-delete"
                  onClick={() =>
                    onClearFromCart(selectedProduct.id)
                  }
                >
                  🗑️ Удалить
                </button>
              </div>
            ) : (
              <button
                className="modal-buy-btn"
                onClick={() =>
                  onAddToCart(selectedProduct.id)
                }
              >
                Добавить в корзину
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};
// keep MainPage as a named export