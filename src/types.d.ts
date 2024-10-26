export interface Category {
  id: string;
  name: string;
}

export interface QuoteChunk {
  categoryId: string;
  author: string;
  text: string;
}

export interface Identifier {
  id: string;
}

export interface Quote extends Identifier, QuoteChunk {}
