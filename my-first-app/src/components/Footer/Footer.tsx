// src/components/Footer/Footer.tsx
import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Колонка 1: О Бренде */}
        <div className="footer-section section-about">
          <h3>SPORT<span>SHOP</span></h3>
          <p>Твой надежный гид в мире спортивной экипировки и одежды. Лучшие бренды для твоих новых побед.</p>
        </div>

        {/* Колонка 2: Покупателям */}
        <div className="footer-section">
          <h4>Покупателям</h4>
          <ul>
            <li><a href="#delivery">Доставка и оплата</a></li>
            <li><a href="#returns">Обмен и возврат</a></li>
            <li><a href="#sizes">Таблица размеров</a></li>
          </ul>
        </div>

        {/* Колонка 3: Контакты */}
        <div className="footer-section">
          <h4>Контакты</h4>
          <ul>
            <li>Телефон: +996 (555) 00-11-22</li>
            <li>Email: info@sportshop.kg</li>
            <li>Адрес: г. Бишкек, ул. Киевская</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sport-Shop. Все права защищены.</p>
        <div className="payment-methods">
          {/* Иконки можно заменить на реальные картинки или эмодзи */}
          <span>💳 Visa</span>
          <span>💳 MasterCard</span>
          <span>💳 Элкарт</span>
        </div>
      </div>
    </footer>
  );
};