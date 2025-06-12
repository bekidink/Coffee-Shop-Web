
// import { convertIsoDateToNormal } from '@/lib/convertIsoDateToNormal';
// import { generateSlug } from '@/lib/generateSlug';
import Link from 'next/link';
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

export default function OrderCard({ order }: { order: Order }) {
//   const orderDate = convertIsoDateToNormal(order.createdAt);
  const subtotal = order.orderItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  if (order.orderItems.length === 0) {
    return null;
  }

  return (
    <li className="overflow-hidden bg-white border border-gray-200 rounded-md">
      <div className="lg:flex">
        <div className="w-full border-b border-gray-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
          <div className="px-4 py-6 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
              <div>
                <p className="text-sm font-medium text-gray-500">Order Number</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">#{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">${subtotal}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Order Status</p>
                <div className="mt-0.5 flex items-center">
                  <div
                    className={`inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white mr-1.5 ${
                      order.orderStatus === 'PENDING'
                        ? 'bg-yellow-500'
                        : order.orderStatus === 'COMPLETED'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {order.orderStatus === 'PENDING' ? (
                      <svg
                        className="w-2 h-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-2 h-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{order.orderStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8">
          <ul className="space-y-7">
            {order.orderItems.map((item, i) => {
            //   const slug = generateSlug(item.title || 'product');
              return (
                <li key={i} className="relative flex pb-10 sm:pb-0">
                  <div className="flex-shrink-0">
                    <img
                      className="object-cover rounded-lg w-28 h-28"
                      src={item.imageUrl}
                      alt={item.title || 'Product image'}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 ml-5">
                    <div className="sm:grid sm:grid-cols-2 sm:gap-x-5">
                      <div>
                        <p className="text-base font-bold text-gray-900">{item.title}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center justify-between">
                        <p className="text-base font-bold text-left text-gray-900 sm:text-right">
                          {item.quantity}
                        </p>
                        <p className="text-base font-bold text-left text-gray-900 sm:text-right">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 sm:relative">
                      <div className="flex space-x-5">
                        <Link
                          href={`/product/${item.productId}`}
                          className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                          View Product
                        </Link>
                        <span className="text-gray-200"> | </span>
                        <Link
                          href={`/dashboard/customer/orders/${order.id}`}
                          className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                          Similar Product
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <hr className="mt-8 border-gray-200" />
          <div className="flex items-center mt-8 space-x-5">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
            >
              View Order
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
            >
              View Invoice
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
