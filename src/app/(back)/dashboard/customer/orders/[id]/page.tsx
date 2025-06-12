
import SalesInvoice from '@/components/shared/dashboard/orders/SalesInvoice';
import { getData } from '@/lib/getData';
import React from 'react';

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  productVariantId: string;
  title?: string;
}

interface Order {
  id: string;
  customerId: string;
  shopId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  orderNumber?: string;
  firstName?: string;
  lastName?: string;
  streetAddress?: string;
  district?: string;
  city?: string;
  country?: string;
  email?: string;
}

interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface Product {
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
  variants: ProductVariant[];
  shop: {
    id: string;
    name: string;
    vendorId: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    averageRating: number;
    status: string;
  };
  category: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    parentId: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  streetAddress?: string;
  district?: string;
  city?: string;
  country?: string;
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const order: Order = await getData(`orders/${id}`);
  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-sm text-gray-600">Order not found.</p>
      </div>
    );
  }

  // Fetch products and customer data
  const products: Product[] = await getData('products'); // Assuming an endpoint to fetch all products
  const customer: Customer = await getData(`users/${order.customerId}`); // Assuming an endpoint to fetch customer data

  // Enrich order with product and customer details
  const enrichedOrder: Order = {
    ...order,
    orderNumber: order.id.slice(-6), // Derive orderNumber from id
    firstName: customer?.firstName || 'Unknown',
    lastName: customer?.lastName || 'Customer',
    email: customer?.email || 'N/A',
    streetAddress: customer?.streetAddress || 'N/A',
    district: customer?.district || '',
    city: customer?.city || 'N/A',
    country: customer?.country || 'N/A',
    orderItems: order.orderItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.id === item.productVariantId);
      return {
        ...item,
        title: product ? `${product.name} (${variant?.size || ''})` : 'Unknown Product',
      };
    }),
  };

  return <SalesInvoice order={enrichedOrder} />;
}
