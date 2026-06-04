// src/App.tsx
import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MainPage } from './Pages/MainPages'; 
import { CartPage } from './Pages/CartPages'; // Импортируем нашу новую страницу корзины
import './App.css';
import './index.css';
import './components/Header/Header.css';
import './components/Footer/Footer.css';
import './Pages/CartPages.css';
import './Pages/MainPages.css';
import './components/Products/product.css';

// Интерфейс для товара в корзине
interface CartItem {
  id: string;
  quantity: number;
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('main');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Храним товары в корзине как массив объектов { id, quantity }
  const [cart, setCart] = useState<CartItem[]>([]);

  // Вычисляем общее количество товаров для шапки
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('main');
  };

  // Функция добавления / увеличения количества товара
  const handleAddToCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: productId, quantity: 1 }];
    });
  };

  // Функция уменьшения количества товара
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          return prevCart.filter((item) => item.id !== productId);
        }
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart;
    });
  };

  // Функция полного удаления товара из корзины (для кнопки 🗑️)
  const handleClearFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        const mainPageProps: any = {
          selectedCategory,
          cart,
          onAddToCart: handleAddToCart,
          onRemoveFromCart: handleRemoveFromCart, 
          onClearFromCart: handleClearFromCart,
          setPage: setCurrentPage,
        };

        return (
          <div>
            <MainPage {...mainPageProps} />
          </div>
        );
      case 'cart':
        return (
          <CartPage 
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearFromCart={handleClearFromCart}
            setPage={setCurrentPage}
          />
        );
      default:
        return <h2>Страница не найдена (404)</h2>;
    }
  };

  return (
    <div className="app">
      <Header 
        cartCount={totalCartCount} 
        currentPage={currentPage} 
        setPage={setCurrentPage} 
        onCategorySelect={handleCategoryChange} 
      />
      <main className="main-content">
        {renderPage()}
      </main>
        <Footer />
    </div>
  );
};

export default App;