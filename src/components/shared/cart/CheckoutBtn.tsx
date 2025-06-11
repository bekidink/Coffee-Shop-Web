import { loadStripe } from "@stripe/stripe-js";
import { ProductProps } from "@/types";
import { store } from "@/lib/store";
import { config } from "@/utils/config";
import { useSession } from "next-auth/react";

const CheckoutBtn = ({ products }: { products: ProductProps[] }) => {
   const {data:session,status}=useSession()
    const user=session?.user;
  const { currentUser } = store();
  // const items=products.map((item)=>({
  //   productId:item.id,
  //   quantity:item.
  // }))
  const publishableKey = "";
  const stripePromise = loadStripe(publishableKey);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch(`${config?.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: products,
        email: user?.email,
        customerId: user?.id,
      }),
    });
    const checkoutSession = await response?.json();
    const result: any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    if (result.error) {
      window.alert(result?.error?.message);
    }
  };
  return (
    <div className="mt-6">
      {user ? (
        <button
          onClick={handleCheckout}
          type="submit"
          className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200"
        >
          Checkout
        </button>
      ) : (
        <button className="w-full text-base text-white text-center rounded-md border border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed">
          Checkout
        </button>
      )}
      {!currentUser && (
        <p className="mt-2 text-sm font-medium text-red-500 text-center">
          Need to sign in to make checkout
        </p>
      )}
    </div>
  );
};

export default CheckoutBtn;
