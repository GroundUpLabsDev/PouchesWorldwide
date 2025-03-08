

"use client";

import useCartStore from "@/store/cartStore";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import OrderRequestDetails from "../../components/OrderRequestDetails";
import RequestCards from "../../components/RequestCards";
import CustomerDetailsForm from "../../components/CustomerDetailsForm";
import { Search } from "lucide-react";
import { fetchProducts } from "@/app/utils/fetchProducts";

export default function Request() {
  const searchParams = useSearchParams();
  const customAmount = searchParams.get("customAmount");
  const productId = searchParams.get("productId");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    address: '',
    road: '',
    city: '',
    district: ''
  });

  const isFormComplete = Object.values(formData).every((value) => value.trim() !== "");

  // Store requested products in state
  const [requestedProducts, setRequestedProducts] = useState([]);
  const addCustomOrder = useCartStore((state) => state.addCustomOrder); // Cart store
  const router = useRouter(); // Router instance
  
  // State to hold fetched products
  const [products, setProducts] = useState([]);

  // Fetch products when component mounts
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (productId && customAmount) {
      const foundProduct = products.find((p) => p.id == productId);
      if (foundProduct) {
        setRequestedProducts((prev) => {
          const existingProduct = prev.find((p) => p.id == productId);
          if (existingProduct) {
            return prev.map((p) =>
              p.id == productId ? { ...p, quantity: parseInt(customAmount) } : p
            );
          } else {
            return [...prev, { ...foundProduct, quantity: parseInt(customAmount) }];
          }
        });
      }
    }
  }, [productId, customAmount, products]);

  // Function to add new product to the request list
  const addToRequest = (product) => {
    setRequestedProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);
      if (existingProduct) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeProduct = (productId) => {
    setRequestedProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  // Handle adding products to the cart and redirecting to cart page
  const handleRequestSubmit = () => {
    requestedProducts.forEach((product) => {
      const customOrder = {
        id: Date.now(),
        product: product,
        quantity: product.quantity,
        requestedPrice: product.price,
        totalAmount: product.quantity * product.price,
        status: 'pending',
      };

      addCustomOrder(customOrder); // Add to cart
    });

    router.push('/cart'); // Redirect to cart page
  };

  return (
    <>
      <Header />

      <div className="w-full bg-black">
        <Image src="/logo_bar.png" alt="Banner Image" width={5120} height={500} priority className="object-cover w-full" />
      </div>

      <div className="flex items-center justify-center gap-3 p-6 text-center">
        <h1 className="text-3xl font-semibold text-black font-poppins">
          <span className="text-[#FAB12F]">Req</span>uest Custom Order
        </h1>
      </div>

      <CustomerDetailsForm formData={formData} setFormData={setFormData} />

      <div className="flex justify-center p-6">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-black font-poppins capitalize mb-6">
            Order Request Details
          </h2>

          {requestedProducts.map((product, index) => (
            <OrderRequestDetails
              key={index}
              product={product}
              noProducts={product.quantity}
              totalPrice={product.quantity * product.price}
              removeProduct={() => removeProduct(product.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center p-6 ml-[500px]">
        <div className="flex items-center space-x-[102px]">
          <div className="flex items-center space-x-4">
            <span className="text-primary font-semibold text-[28px]">Send Request For</span>
            <span className="text-primary font-semibold text-[28px]"> ${requestedProducts.reduce((sum, product) => sum + product.quantity * product.price, 0).toFixed(2)}</span>
          </div>
          <button 
            onClick={handleRequestSubmit}
            disabled={!isFormComplete}
            className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded flex items-center space-x-2"
          >
            <span className="text-[28px]">Request</span>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                <g clipPath="url(#clip0_175_2785)">
                  <path d="M7.85275 11.8088L22.5598 18.1146L7.83317 16.1562L7.85275 11.8088ZM22.5403 28.8854L7.83317 35.1912V30.8438L22.5403 28.8854ZM3.93609 5.875L3.9165 19.5833L33.2915 23.5L3.9165 27.4167L3.93609 41.125L45.0415 23.5L3.93609 5.875Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_175_2785">
                    <rect width="47" height="47" fill="black" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-[161px] mb-8">
          <h2 className="text-black text-lg font-medium whitespace-nowrap">
            Search to Add More Products
          </h2>
          <div className="flex items-center w-[419px] h-[52px] px-4 bg-white border border-black rounded-md">
            <button className="mr-2">
              <Search className="h-5 w-5 text-black" />
            </button>
            <input type="text" placeholder="Search Here..." className="flex-1 outline-none text-black" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {products.map((product) => (
            <div key={product.id} className="w-full max-w-sm">
              <RequestCards product={product} addToRequest={addToRequest} />
            </div>
          ))}
        </div> 
      </div>

      <Footer />
    </>
  );
}
