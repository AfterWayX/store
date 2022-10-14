import axios from 'axios';
import { ProductsQuery } from '../interfaces/Query.interface';

const instance = axios.create({
  baseURL: `${process.env.API}/products`,
});

export class SearchService {
  static products(query: ProductsQuery) {
    return instance.get('', {
      params: {
        ...query,
        limit: query.limit || 10,
        skip: query.skip || 0,
      }
    });
  }
  static fields() {
    return instance.get('fields');
  }
}
