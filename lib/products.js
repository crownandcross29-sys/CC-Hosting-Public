import fs from 'fs';
import path from 'path';

export function getCatalogData() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
    if (!fs.existsSync(filePath)) {
      return { brand: {}, categories: [], subCategories: [], products: [] };
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading catalog data:', error);
    return { brand: {}, categories: [], subCategories: [], products: [] };
  }
}

export function getAllProducts() {
  const data = getCatalogData();
  return data.products || [];
}

export function getProductByIdOrSlug(identifier) {
  const products = getAllProducts();
  return (
    products.find((p) => p.id === identifier || p.slug === identifier) || null
  );
}

export function getBrandConfig() {
  const data = getCatalogData();
  return data.brand || {
    name: 'Crown & Cross',
    tagline: 'Some wear fashion. We wear football.',
    subTagline: 'Wear Your Club. Wear Your Story.',
    phone: '+917695924602',
    email: 'crownandcross29@gmail.com',
    location: 'Chennai, Tamil Nadu',
    upiId: 'jasonclement.jm-1@okhdfcbank',
    payeeName: 'Jason Clement',
    currencySymbol: '₹',
    shipping: {
      standardFee: 80,
      freeShippingThreshold: 1499
    }
  };
}
