const clothingSizes = ['S', 'M', 'L', 'XL'];

export const products = [
  ['studio-hoodie', 'Studio Hoodie', 'Tops', 'Washed Black', 85, 'A heavyweight pullover with dropped shoulders, a roomy hood and a soft brushed interior.'],
  ['core-tee', 'Core Tee', 'Tops', 'Bone', 42, 'A dense cotton jersey tee with a boxy cut and a structured ribbed collar.'],
  ['utility-cargo', 'Utility Cargo', 'Bottoms', 'Dark Olive', 98, 'Relaxed straight-leg cargos with deep patch pockets and reinforced seams.'],
  ['flight-bomber', 'Flight Bomber', 'Outerwear', 'Black', 145, 'A matte nylon bomber with a cropped, roomy silhouette and ribbed cuffs.'],
  ['form-sweatpant', 'Form Sweatpant', 'Bottoms', 'Slate', 72, 'A wide straight-leg sweatpant with a soft loopback interior and an adjustable waist.'],
  ['field-cap', 'Field Cap', 'Accessories', 'Charcoal', 32, 'A low-profile six-panel cap with a curved brim and an adjustable back strap.'],
].map(([id, name, category, color, price, description]) => ({
  id, name, category, color, price, description,
  sizes: category === 'Accessories' ? ['One size'] : clothingSizes,
}));

export const categories = ['All', ...new Set(products.map(product => product.category))];
export function productsFor(category) {
  return category === 'All' ? products : products.filter(product => product.category === category);
}

export const cartKey = 'nova.cart.v1';
export const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format;

export function cartItems(cart) {
  return cart.flatMap(line => {
    const product = products.find(item => item.id === line?.id);
    if (!product?.sizes.includes(line?.size) || !Number.isInteger(line.quantity) || line.quantity < 1) return [];
    return [{ ...line, product }];
  });
}

export function readCart(storage) {
  try {
    const value = JSON.parse((storage ?? window.localStorage).getItem(cartKey));
    return Array.isArray(value) ? cartItems(value).map(({ id, size, quantity }) => ({ id, size, quantity })) : [];
  } catch {
    return [];
  }
}

export function updateCart(cart, id, size, change) {
  const existing = cart.find(line => line.id === id && line.size === size);
  if (!existing) return change > 0 ? [...cart, { id, size, quantity: change }] : cart;
  return cart.map(line => line === existing ? { ...line, quantity: line.quantity + change } : line)
    .filter(line => line.quantity > 0);
}

export function totalFor(items) {
  return items.reduce((total, { product, quantity }) => total + product.price * quantity, 0);
}

export function orderMessage(items) {
  const lines = items.map(({ product, size, quantity }) =>
    `• ${quantity} × ${product.name} (${product.color}, ${size}) — ${money(product.price * quantity)}`
  );
  return ['Hi NOVA! I’d like to order:', '', ...lines, '', `Total: ${money(totalFor(items))} USD`].join('\n');
}

export function whatsappLink(number, message) {
  const digits = number?.trim();
  return /^[1-9]\d{6,14}$/.test(digits ?? '') ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : '';
}
