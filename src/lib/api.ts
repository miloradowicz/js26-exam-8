import axios from 'axios';
import { Category, Identifier, Quote, QuoteChunk } from '../types';

const baseUrl = 'https://js26-exam-8-default-rtdb.europe-west1.firebasedatabase.app/';

interface CategoriesCollection {
  [name: string]: Category;
}

interface QuoteChunksCollection {
  [name: string]: QuoteChunk;
}

export const getCategories = async () => {
  const endpoint = 'categories.json';

  const url = new URL(endpoint, baseUrl);
  const { data, status } = await axios.get<CategoriesCollection | null>(url.href);

  if (status < 200 || status > 299) {
    throw new Error(`${status}`);
  }

  const _data: Category[] = [];

  if (data) {
    for (const id in data) {
      _data.push({ id: data[id].id, name: data[id].name });
    }
  }

  return _data;
};

export const getQuotes = async () => {
  const endpoint = 'quotes.json';

  const url = new URL(endpoint, baseUrl);
  const { data, status } = await axios.get<QuoteChunksCollection | null>(url.href);

  if (status < 200 || status > 299) {
    throw new Error(`${status}`);
  }

  const _data: Quote[] = [];

  if (data) {
    for (const id in data) {
      _data.push({ id, ...data[id] });
    }
  }

  return _data;
};

export const getQuotesByCategory = async (categoryId: string) => {
  const endpoint = `quotes.json?orderBy="categoryId"&equalTo="${categoryId}"`;

  const url = new URL(endpoint, baseUrl);
  const { data, status } = await axios.get<QuoteChunksCollection | null>(url.href);

  if (status < 200 || status > 299) {
    throw new Error(`${status}`);
  }

  const _data: Quote[] = [];

  if (data) {
    for (const id in data) {
      _data.push({ id, ...data[id] });
    }
  }

  return _data;
};

export const getQuote = async (id: string) => {
  const endpoint = `quotes/${id}.json`;

  const url = new URL(endpoint, baseUrl);
  const { data, status } = await axios.get<QuoteChunk | null>(url.href);

  if (status < 200 || status > 299) {
    throw new Error(`${status}`);
  }

  let _data: Quote | null = null;

  if (data) {
    _data = { id, ...data };
  }

  return _data;
};

export const createQuote = async (quote: QuoteChunk) => {
  const endpoint = 'quotes.json';

  const url = new URL(endpoint, baseUrl);
  const { data, status } = await axios.post<Identifier | null>(url.href, quote);

  if (status < 200 || status > 299) {
    throw new Error(`${status}`);
  }

  if (!data) {
    throw new Error('Server responded with null');
  }

  return data;
};

export const updateQuote = async (id: string, quote: QuoteChunk) => {
  const endpoint = `quotes/${id}.json`;

  const url = new URL(endpoint, baseUrl);
  const { data, status } = await axios.put<QuoteChunk | null>(url.href, quote);

  if (status < 200 || status > 299) {
    throw new Error(`${status}`);
  }

  if (!data) {
    throw new Error('Server responded with null');
  }

  return { id, ...data } as Quote;
};

export const deleteQuote = async (id: string) => {
  const endpoint = `quotes/${id}.json`;

  const url = new URL(endpoint, baseUrl);
  const { data, status } = await axios.delete<null>(url.href);

  if (status < 200 || status > 299) {
    throw new Error(`${status}`);
  }

  return data;
};
