// src/pages/CartPage.tsx
import React, { useState } from 'react';
import type { Product } from '../types';
import "./CartPages.css";  // ← правильно

interface CartItem {
  id: Product['id'];
  quantity: number;
} 

interface CartPageProps {
  cart: CartItem[];
  products: Product[];
  onAddToCart: (id: Product['id']) => void;
  onRemoveFromCart: (id: Product['id']) => void;
  onClearFromCart: (id: Product['id']) => void;
  setPage: (page: string) => void;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  image: string;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  products,
  onAddToCart,
  onRemoveFromCart,
  onClearFromCart,
  setPage,
}) => {
  // Состояния для формы оформления заказа
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Собираем полную информацию о товарах, которые лежат в корзине
  const cartProducts = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;

      return {
        id: product.id,
        title: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
        totalPrice: product.price * item.quantity,
      };
    })
    .filter((product): product is CartProduct => product !== null);

  // Считаем общую сумму заказа
  const totalOrderSum = cartProducts.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Пожалуйста, заполните все поля для доставки!');
      return;
    }

    // Логика отправки данных (в будущем полетит на NestJS)
    const orderData = {
      customer: { name, phone, address },
      items: cart,
      totalSum: totalOrderSum,
    };

    console.log('Данные отправлены на сервер:', orderData);
    alert(`Спасибо за заказ, ${name}! Наши менеджеры свяжутся с вами по телефону ${phone}.`);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-state">
        <div className="empty-icon">🛒</div>
        <h2>Ваша корзина пуста</h2>
        <p>Похоже, вы ещё не добавили ни одного товара в корзину.</p>
        <button onClick={() => setPage('main')} className="back-to-store-btn">
          Перейти к покупкам
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="cart-page-title">Оформление заказа</h1>

      <div className="cart-grid-layout">
        {/* ЛЕВАЯ ЧАСТЬ: Список товаров */}
        <div className="cart-items-list">
          <h2>Выбранные товары</h2>
          {cartProducts.map((product) => (
            <div key={product.id} className="cart-item-card">
              <img src={product.image} alt={product.title} className="cart-item-img" />
              
              <div className="cart-item-info">
                <span className="cart-item-brand">{product.brand}</span>
                <span className="cart-item-price-each">
                  {product.price.toLocaleString('ru-RU')} сом / шт.
                </span>
              </div>

              {/* Управление количеством */}
              <div className="cart-item-actions">
                <div className="quantity-counter-container">
                  <button className="counter-btn minus" onClick={() => onRemoveFromCart(product.id)}>−</button>
                  <span className="counter-value">{product.quantity}</span>
                  <button className="counter-btn plus" onClick={() => onAddToCart(product.id)}>+</button>
                </div>
                <button className="cart-item-delete-btn" onClick={() => onClearFromCart(product.id)}>
                  🗑️
                </button>
              </div>

              <div className="cart-item-total-price">
                {product.totalPrice.toLocaleString('ru-RU')} сом
              </div>
            </div>
          ))}

          <button onClick={() => setPage('main')} className="continue-shopping-btn">
            ← Продолжить покупки
          </button>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Форма оформления и чек */}
        <div className="cart-checkout-sidebar">
          <div className="order-summary-box">
            <h2>Итого к оплате</h2>
            <div className="summary-row">
              <span>Количество моделей:</span>
              <strong>{cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</strong>
            </div>
            <div className="summary-row total">
              <span>Сумма:</span>
              <span className="final-sum">{totalOrderSum.toLocaleString('ru-RU')} сом</span>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="checkout-form">
            <h2>Данные доставки</h2>
            
            <div className="form-group">
              <label>Ваше имя *</label>
              <input
                type="text"
                placeholder="Иван Иванов"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Телефон *</label>
              <input
                type="tel"
                placeholder="+996 (555) 00-00-00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Адрес доставки *</label>
              <textarea
                placeholder="Город, улица, дом, квартира"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-order-btn">
              Подтвердить заказ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};