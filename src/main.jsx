import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { cartItems, cartKey, categories, money, orderMessage, productsFor, readCart, totalFor, updateCart, whatsappLink } from './store.js';
import './styles.css';

const number = import.meta.env.VITE_WHATSAPP_NUMBER ?? '';
const contactLink = whatsappLink(number, 'Hi NOVA! I have a question about the Core Collection.');
const imageFor = product => `/images/${product.id}.webp`;

function BagIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>;
}

function Modal({ children, onClose, drawer = false }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement;
    element.showModal();
    document.body.classList.add('modal-open');
    return () => {
      element.close();
      document.body.classList.remove('modal-open');
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialog} className={drawer ? 'drawer' : 'product-dialog'} aria-labelledby="dialog-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === dialog.current) onClose(); }}>
    <div className="dialog-content">
      <button className="close" type="button" onClick={onClose} aria-label="Close dialog">×</button>
      {children}
    </div>
  </dialog>;
}

function ProductDetail({ product, onAdd }) {
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '');
  return <div className="detail">
    <img src={imageFor(product)} alt={`${product.name} in ${product.color}`} />
    <div className="detail-info">
      <p className="eyebrow">{product.category}</p>
      <h2 id="dialog-title">{product.name}</h2>
      <p>{product.color} · {money(product.price)}</p>
      <p className="muted">{product.description}</p>
      <fieldset>
        <legend>Select size</legend>
        <div className="sizes">{product.sizes.map(option => (
          <label key={option}><input type="radio" name="size" checked={size === option} onChange={() => setSize(option)} /><span>{option}</span></label>
        ))}</div>
      </fieldset>
      <button className="button dark" disabled={!size} onClick={() => onAdd(product.id, size)}>Add to bag</button>
    </div>
  </div>;
}

function Cart({ items, onUpdate, onClose }) {
  const [showMessage, setShowMessage] = useState(false);
  const message = orderMessage(items);
  const link = whatsappLink(number, message);
  return <div className="cart">
    <h2 id="dialog-title">Your bag</h2>
    {items.length === 0 ? <div className="empty"><BagIcon /><p>Your bag is empty.</p><button className="button dark" onClick={onClose}>Continue shopping</button></div> : <>
      <ul className="cart-list">
        {items.map(({ product, size, quantity }) => <li key={`${product.id}-${size}`}>
          <img src={imageFor(product)} alt="" />
          <div>
            <strong>{product.name}</strong>
            <p className="muted">{product.color} · {size}</p>
            <div className="quantity">
              <button aria-label={`Decrease ${product.name}, ${size} quantity`} disabled={quantity === 1} onClick={() => onUpdate(product.id, size, -1)}>−</button>
              <span aria-live="polite">{quantity}</span>
              <button aria-label={`Increase ${product.name}, ${size} quantity`} onClick={() => onUpdate(product.id, size, 1)}>+</button>
            </div>
            <button className="remove" aria-label={`Remove ${product.name}, ${size}`} onClick={() => onUpdate(product.id, size, -quantity)}>Remove</button>
          </div>
          <strong>{money(product.price * quantity)}</strong>
        </li>)}
      </ul>
      <div className="cart-summary">
        <div className="total"><strong>Total</strong><strong aria-live="polite">{money(totalFor(items))} USD</strong></div>
        {link ? <a className="button dark" href={link} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a> : <>
          <button className="button dark" disabled>Order on WhatsApp</button>
          <p className="muted">WhatsApp ordering is unavailable until a contact number is configured.</p>
        </>}
        <button className="remove" aria-expanded={showMessage} aria-controls="order-preview" onClick={() => setShowMessage(!showMessage)}>
          {showMessage ? 'Hide' : 'Preview'} order message
        </button>
        <pre id="order-preview" hidden={!showMessage}>{message}</pre>
      </div>
    </>}
  </div>;
}

function App() {
  const [category, setCategory] = useState('All');
  const [active, setActive] = useState(null);
  const [cart, setCart] = useState(readCart);
  const bag = useRef(null);
  const openBagAfterAdd = useRef(false);
  const visible = productsFor(category);
  const items = cartItems(cart);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch { /* The bag remains available for this visit. */ }
  }, [cart]);
  const update = (id, size, change) => setCart(current => updateCart(current, id, size, change));
  const close = () => {
    setActive(null);
    if (openBagAfterAdd.current) {
      openBagAfterAdd.current = false;
      requestAnimationFrame(() => bag.current?.focus());
    }
  };

  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="header">
      <a className="wordmark" href="#" aria-label="NOVA home">NOVA<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#collection">Collection</a><a href="#contact">Contact</a></nav>
      <button className="bag" ref={bag} aria-label={`Open bag, ${count} ${count === 1 ? 'item' : 'items'}`} onClick={() => setActive('cart')}><BagIcon /><span>Bag ({count})</span></button>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <p className="eyebrow"><span className="accent-line" /> The Core Collection</p>
          <h1 id="hero-title">Streetwear<br />in its element.</h1>
          <p>Relaxed silhouettes. A muted palette.<br className="desktop-break" /> Six pieces made to wear on repeat.</p>
          <a className="button light" href="#collection">Shop the collection</a>
        </div>
      </section>
      <section id="collection" className="collection wrap" aria-labelledby="collection-title">
        <div className="collection-heading">
          <h2 id="collection-title">The collection</h2>
          <p className="count" role="status">{visible.length} {visible.length === 1 ? 'piece' : 'pieces'}</p>
        </div>
        <div className="filters" role="group" aria-label="Filter products">
          {categories.map(option => <button key={option} aria-pressed={category === option} onClick={() => setCategory(option)}>{option === 'All' ? 'All pieces' : option}</button>)}
        </div>
        <div className="grid">
          {visible.map(product => <button className="product" key={product.id} onClick={() => setActive(product)}>
            <span className="product-image"><img src={imageFor(product)} alt="" loading="lazy" /><span className="view" aria-hidden="true">+</span></span>
            <span className="product-title"><strong>{product.name}</strong><strong>{money(product.price)}</strong></span>
            <span className="muted">{product.color}</span>
          </button>)}
        </div>
      </section>
      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="wrap contact-inner">
          <div><p className="eyebrow">Contact</p><h2 id="contact-title">Get in touch.</h2></div>
          <div><p>Questions about sizing or placing an order?</p>
          {contactLink ? <a className="button light" href={contactLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a> : <p className="contact-status">WhatsApp contact is currently unavailable.</p>}</div>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="wrap"><a href="#" className="wordmark" aria-label="NOVA home">NOVA<span>.</span></a><p>Fictional storefront · Prices in USD</p></div></footer>
    {active && <Modal onClose={close} drawer={active === 'cart'}>
      {active === 'cart' ? <Cart items={items} onUpdate={update} onClose={close} /> : <ProductDetail product={active} onAdd={(id, size) => { update(id, size, 1); openBagAfterAdd.current = true; setActive('cart'); requestAnimationFrame(() => document.querySelector('dialog .close')?.focus()); }} />}
    </Modal>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
