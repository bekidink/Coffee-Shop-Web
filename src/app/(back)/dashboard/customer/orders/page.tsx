
import OrderCard from '@/components/shared/dashboard/orders/OrderCard';
import { authOptions } from '@/lib/auth';
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth';
import React from 'react';

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  productVariantId: string;
  title?: string;
  imageUrl?: string;
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
  orderStatus?: string;
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

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Order Details</h1>
            <p className="mt-2 text-sm font-normal text-gray-600">Please sign in to view your orders.</p>
          </div>
        </div>
      </section>
    );
  }

  const orders: Order[] = await getData(`orders?customerId=${session.user.id}`);
  const products: Product[] = await getData('products'); // Assuming an endpoint to fetch all products

  const enrichedOrders: Order[] = orders.map((order) => ({
    ...order,
    orderNumber: order.id.slice(-6), // Derive orderNumber from id
    orderStatus: order.status, // Map status to orderStatus
    orderItems: order.orderItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.id === item.productVariantId);
      return {
        ...item,
        title: product ? `${product.name} (${variant?.size || ''})` : 'Unknown Product',
        imageUrl: product?.thumbnailUrl || product?.imageUrls[0] || '/placeholder.jpg',
      };
    }),
  }));

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Order Details</h1>
            <p className="mt-2 text-sm font-normal text-gray-600">
              Check the status of recent and old orders & discover more products
            </p>
          </div>
          <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
            {enrichedOrders.length > 0 ? (
              enrichedOrders.map((order, i) => <OrderCard order={order} key={i} />)
            ) : (
              <li className="text-sm text-gray-600">No orders found.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
