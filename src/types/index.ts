export interface HighlightsType {
  id: string;
  base: string;
  title: string;
  name: string;
  image: string;
  color: string;
  buttonTitle: string;
}

export interface CategoryProps {
  id: string;
  imageUrl: string;
  name: string;
  base: string;
  description: string;
}
export interface ProductDetailProps {
  id: string;
  name: string;
  description: string;
  vendorId: string;
  shopId: string;
  categoryId: string;
  thumbnailUrl: string;
  imageUrls: string[];
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  variants: Variant[];
}
export interface ProductProps {
  id: string;
  name: string;
  description: string;
  vendorId: string;
  shopId: string;
  categoryId: string;
  thumbnailUrl: string;
  imageUrls: string[];
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
}

export interface BlogProps {
  _id: number;
  image: string;
  title: string;
  description: string;
  _base: string;
}

export interface UserTypes {
  currentUser: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    id: string;
  };
}

export interface OrderTypes {
  orderItems: [ProductProps];
  paymentId: string;
  paymentMethod: string;
  userEmail: string;
}
export interface Variant {
  id: string;
  productId: string;
  size: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  vendorId: string;
  shopId: string;
  categoryId: string;
  thumbnailUrl: string;
  imageUrls: string[];
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  variants: Variant[];
}

export interface Shop {
  id: string;
  name: string;
  vendorId: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  status: string; // You can replace with a union type if you have fixed statuses like 'PENDING' | 'APPROVED'
  addresses: any[]; // Define a proper Address type if needed
  products: Product[];
}

export interface CreatePromotionDto {
  code: string;
  type: "PERCENTAGE" | "FIXED" | "BOGO";
  value: number;
  description: string;
  startDate: Date; // ISO date string
  endDate: Date; // ISO date string
  minOrderAmount?: number;
  maxUses?: number;
  shopId?: string;
  productId?: string;
}

export type Discount = {
  id: string;
  code: string;
  type: "FIXED" | "PERCENTAGE"; // Adjust if there are other types
  value: number;
  description: string;
  startDate: string; // ISO format
  endDate: string; // ISO format
  minOrderAmount: number;
  maxUses: number;
  shopId: string;
  productId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  shop: {
    id: string;
    name: string;
    vendorId: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    averageRating: number;
    status: "PENDING" | "APPROVED" | "REJECTED"; // Add more if applicable
  };
  product: {
    id: string;
    name: string;
    description: string;
    vendorId: string;
    shopId: string;
    categoryId: string;
    thumbnailUrl: string;
    imageUrls: string[];
    stockQuantity: number;
    createdAt: string;
    updatedAt: string;
    averageRating: number;
  };
};
