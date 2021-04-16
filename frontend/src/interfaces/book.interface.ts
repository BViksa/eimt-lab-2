import { Author } from '.';
import { Category } from '../enums';

export interface Book {
  id: number;
  name: string;
  category: Category;
  author: Author;
  availableCopies: number;
}
