export interface ProductsQuery {
    skip?: number;
    limit?: number;
    color?: string;
    category?: string;
    price?: number;
}