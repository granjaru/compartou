import axios from 'axios';
import { Product, Offer } from '../types';

const api = axios.create({
  baseURL: '/api'
});

// Configuration des APIs externes
const APIs = {
  amazon: {
    baseURL: process.env.AMAZON_API_URL,
    key: process.env.AMAZON_API_KEY
  },
  aliexpress: {
    baseURL: process.env.ALIEXPRESS_API_URL,
    key: process.env.ALIEXPRESS_API_KEY
  },
  temu: {
    baseURL: process.env.TEMU_API_URL,
    key: process.env.TEMU_API_KEY
  }
};

export const searchProducts = async (
  query: string,
  filters: any
): Promise<Product[]> => {
  // Recherche parallèle sur toutes les plateformes
  const [amazonResults, aliexpressResults, temuResults] = await Promise.all([
    searchAmazon(query, filters),
    searchAliexpress(query, filters),
    searchTemu(query, filters)
  ]);

  // Fusion et déduplication des résultats
  return mergeResults([...amazonResults, ...aliexpressResults, ...temuResults]);
};

export const getProductDetails = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getPriceHistory = async (
  productId: string
): Promise<{ date: string; price: number }[]> => {
  const response = await api.get(`/products/${productId}/price-history`);
  return response.data;
};

export const createPriceAlert = async (
  productId: string,
  targetPrice: number,
  email: string
): Promise<void> => {
  await api.post(`/price-alerts`, {
    productId,
    targetPrice,
    email
  });
};

const searchAmazon = async (query: string, filters: any): Promise<Product[]> => {
  const response = await axios.get(`${APIs.amazon.baseURL}/search`, {
    headers: { 'x-api-key': APIs.amazon.key },
    params: {
      query,
      ...filters
    }
  });
  return response.data;
};

const searchAliexpress = async (query: string, filters: any): Promise<Product[]> => {
  const response = await axios.get(`${APIs.aliexpress.baseURL}/search`, {
    headers: { 'x-api-key': APIs.aliexpress.key },
    params: {
      query,
      ...filters
    }
  });
  return response.data;
};

const searchTemu = async (query: string, filters: any): Promise<Product[]> => {
  const response = await axios.get(`${APIs.temu.baseURL}/search`, {
    headers: { 'x-api-key': APIs.temu.key },
    params: {
      query,
      ...filters
    }
  });
  return response.data;
};

const mergeResults = (results: Product[]): Product[] => {
  // Déduplication basée sur l'EAN/UPC
  const uniqueProducts = new Map();
  
  results.forEach(product => {
    if (!uniqueProducts.has(product.id)) {
      uniqueProducts.set(product.id, product);
    } else {
      // Fusion des offres si le produit existe déjà
      const existing = uniqueProducts.get(product.id);
      existing.offers = [...existing.offers, ...product.offers];
    }
  });

  return Array.from(uniqueProducts.values());
};