export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    basePrice: number;
    imageUrl?: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role?: string;
}

export interface Order {
    id: number;
    date: string;
    total: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
    size?: string;
    color?: string;
}
