export interface Book {
  id: string | number;
  title: string;
  author: string;
  category: string;
  description?: string;
  coverImage?: string;
  price?: number;
  rating?: number;
  publishedDate?: string;
  pageCount?: number;
  isbn?: string;
  language?: string;
  publisher?: string;
  stock?: number;
  featured?: boolean;
}

// If your book data has additional fields, add them here
// This interface should match the structure of your book.json data