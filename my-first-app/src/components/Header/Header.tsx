// src/components/Header/Header.tsx
import React from 'react';
import './Header.css';
// Импортируем твой существующий логотип, чтобы он точно отобразился
import logoImg from '../../assets/MegaSport.jpg'; 

interface HeaderProps {
  cartCount: number;
  currentPage: string;
  setPage: (page: string) => void;
  onCategorySelect: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  currentPage,
  setPage,
  onCategorySelect,
}) => {
 const categories = [
  { id: 'all', name: 'Все товары' },
  { id: 'shoes', name: 'Обувь' },
  { id: 'running', name: 'Бег' },
  { id: 'fitness', name: 'Фитнес' },
];
  return (
    <header className="header">
      <div className="header-container">
        {/* Клик по логотипу возвращает на главную */}
        <div className="logo-block" onClick={() => { setPage('main'); onCategorySelect('all'); }}>
          <img className="logo-img" src={logoImg} alt="MegaSport" />
          <span className="logo-text">MegaSport</span>
        </div>

        {/* Навигация — теперь все кнопки поместятся */}
        <nav className="navigation">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`nav-link ${currentPage === 'main' && cat.id === 'all' ? 'active' : ''}`}
              onClick={() => {
                setPage('main');
                onCategorySelect(cat.id);
              }}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* Поиск и Корзина на одной линии */}
        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Поиск товаров..." />
            <button className="search-btn">🔍</button>
          </div>
          
          <button className="cart-btn" onClick={() => setPage('cart')}>
            🛒 <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};