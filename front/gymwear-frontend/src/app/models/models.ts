// ==================== CATEGORÍAS ====================
export interface Category {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;
    active?: boolean;
}

// ==================== PRODUCTOS ====================
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;              // Puede ser calculado
    basePrice: number;          // Precio base
    imageUrl?: string;
    category: Category;         // CRÍTICO - Relación con categoría
    active: boolean;            // CRÍTICO - Si está disponible
    stock?: number;
    createdAt?: string;
    updatedAt?: string;
    brand?: string;
    material?: string;
    sizes?: string[];
    colors?: string[];
    rating?: number;            // Promedio de calificaciones
    reviewCount?: number;       // Número de reseñas
}

// ==================== USUARIOS ====================
export interface User {
    id: number;
    name: string;               // CRÍTICO - Nombre completo
    username: string;
    email: string;
    phone?: string;             // CRÍTICO - Para checkout
    password?: string;          // Para registro/login
    role?: string;              // "admin" | "user"
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    createdAt?: string;
    avatar?: string;
    isActive?: boolean;
}

// ==================== ÓRDENES ====================
export interface Order {
    id?: number;
    userId?: number;
    date: string;               // Mantener por compatibilidad
    createdAt: string;          // CRÍTICO - Fecha de creación
    updatedAt?: string;
    status: string;             // CRÍTICO - "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    total: number;              // Mantener por compatibilidad
    subtotal?: number;
    tax?: number;
    shipping?: number;
    grandTotal: number;         // CRÍTICO - Total final
    items?: OrderItem[];        // CRÍTICO - Productos en la orden
    shippingAddress?: string;
    billingAddress?: string;
    paymentMethod?: string;
    trackingNumber?: string;
    notes?: string;
}

export interface OrderItem {
    id?: number;
    orderId?: number;
    productId: number;
    productName: string;
    productImageUrl?: string;
    quantity: number;
    price: number;              // Precio unitario en el momento de la compra
    subtotal: number;           // price * quantity
    size?: string;
    color?: string;
}

// ==================== CARRITO ====================
export interface CartItem {
    id?: string;                // ID único en el carrito
    product: Product;
    quantity: number;
    size?: string;
    color?: string;
    addedAt?: Date;
}

// ==================== DIRECCIONES ====================
export interface Address {
    id?: number;
    userId: number;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault?: boolean;
    label?: string;             // "Casa", "Trabajo", etc.
}

// ==================== MÉTODOS DE PAGO ====================
export interface PaymentMethod {
    id?: number;
    userId: number;
    type: string;               // "card", "paypal", "bank_transfer"
    cardType?: string;          // "visa", "mastercard", etc.
    last4?: string;
    expiryMonth?: string;
    expiryYear?: string;
    holderName?: string;
    isDefault?: boolean;
}

// ==================== RESEÑAS ====================
export interface Review {
    id?: number;
    productId: number;
    userId: number;
    userName: string;
    userAvatar?: string;
    rating: number;             // 1-5
    title?: string;
    comment: string;
    createdAt: string;
    updatedAt?: string;
    verified?: boolean;         // Compra verificada
    helpful?: number;           // Número de "útil"
}

// ==================== RESPUESTAS API ====================
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
    timestamp?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

// ==================== FILTROS Y BÚSQUEDA ====================
export interface ProductFilter {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
    inStock?: boolean;
    sizes?: string[];
    colors?: string[];
    brands?: string[];
}

// ==================== ESTADÍSTICAS (Para Admin) ====================
export interface DashboardStats {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
    salesByMonth?: { month: string; total: number }[];
    topProducts?: { product: Product; sales: number }[];
    recentOrders?: Order[];
}