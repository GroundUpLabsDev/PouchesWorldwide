"use client";

import { useState, useEffect } from "react";
  import { useSearchParams } from "next/navigation";
  import Image from "next/image";
  import Header from "@/components/AdminUi/Header";
  import Footer from "@/components/Footer";
  import Banner from "@/components/Banner";
  import GuidelinesSection from "@/components/AdminUi/GuidelinesSection";
  import { Trash, Plus } from "lucide-react";
  import Selector from "@/components/AdminUi/Selector";

  export default function AdminDashboard() {
    // Get product ID from URL search parameters.
    // For new product creation, ProductID might be absent.
    const searchParams = useSearchParams();
    const ProductID = searchParams.get("ProductID");

    // States to hold product data and form fields.
    // When adding a new product, product may be null.
    const [product, setProduct] = useState(null);
    const [productName, setProductName] = useState("");
    const [productStock, setProductStock] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cans, setCans] = useState(""); // Will be sent as a number
    const [isBestDeal, setIsBestDeal] = useState(false);

    // State for selector data; will be sent as JSON.
    const [selectorData, setSelectorData] = useState({});

    // States to manage image.
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState(null);

    // If ProductID exists, load product details for editing.
    useEffect(() => {
      if (!ProductID) return;
      const loadProduct = async () => {
        try {
          const res = await fetch("http://146.190.245.42:1337/api/products?populate=*");
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const json = await res.json();
          // Find the product matching the ProductID from URL.
          const apiProducts = json.data;
          const fetchedProduct = apiProducts.find((item) => item.id === Number(ProductID));
          setProduct(fetchedProduct);
          if (fetchedProduct) {
            // Set form fields.
            setProductName(fetchedProduct.Name || "");
            setProductStock(fetchedProduct.Stock || "");
            setPrice(fetchedProduct.price || "");
            setCans(fetchedProduct.cans ? String(fetchedProduct.cans) : "");
            const descriptionText =
              fetchedProduct.Description && fetchedProduct.Description.length > 0
                ? fetchedProduct.Description[0]?.children[0]?.text || ""
                : "";
            setDescription(descriptionText);
          }
          // Set image with prefix.
          if (fetchedProduct && fetchedProduct.Image) {
            const imageUrl =
              fetchedProduct.Image.formats?.medium?.url ||
              fetchedProduct.Image.url ||
              "";
            setImage(`http://146.190.245.42:1337${imageUrl}`);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      loadProduct();
    }, [ProductID]);

    // Handle image upload change.
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result); // Update preview.
        };
        reader.readAsDataURL(file);
        setImageFile(file);
      }
    };

    // Handle image deletion.
    const handleDeleteImage = () => {
      setImage("");
      setImageFile(null);
    };

    // Handler to create a new product in the backend.
    // When no ProductID exists (new product), we send a POST request.
    const handleAdd = async () => {
      const payload = {
        Name: productName,  // Text
        Stock: Number(productStock),  // Convert to Number
        price: Number(price),  // Convert to Number
        Description: [
          {
            type: "paragraph",
            children: [{ type: "text", text: description }]
          }
        ],
        Image2: image, // Base64 or URL representation of the image
        can: Number(cans), // Convert to number
        selectorj: selectorData // Send as JSON type
      };

      try {
        const res = await fetch("http://146.190.245.42:1337/api/products/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ data: payload })
        });

        if (!res.ok) {
          throw new Error("Failed to create product");
        }
        const result = await res.json();
        console.log("Product created:", result);
        setProduct(result.data);
      } catch (error) {
        console.error("Error creating product:", error);
      }
    };

    return (
      <>
        <Header />
        <Banner />
        <main className="container mx-auto px-4 py-8 max-w-9xl w-full min-h-screen">
          <div className="max-w-8xl mx-auto mb-12">
            <div className="flex w-full flex-col lg:flex-row">
              <div className="card flex-grow place-items-center">
                <div className="w-[603px] h-[525px] relative">
                  <div className="w-[603px] h-[525px] absolute left-0 top-0 bg-neutral rounded-[5px]" />
                  <div className="relative">
                    {image && (
                      <div className="absolute left-[135px] top-[91px] w-[333px] h-[342px]">
                        <Image
                          src={image}
                          alt="Uploaded Image"
                          width={333}
                          height={525}
                          priority
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {image && (
                      <div className="absolute left-[520px] top-[450px] mt-4 flex gap-2">
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteImage}>
                          <Trash />
                        </button>
                      </div>
                    )}
                    <div className="absolute left-[250px] top-[220px] mt-4 flex gap-2">
                      <label htmlFor="image-upload" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
                        <Plus />
                      </label>
                      <input type="file" id="image-upload" className="hidden" onChange={handleImageChange} />
                    </div>
                  </div>
                </div>
                <GuidelinesSection />
              </div>

              <div className="card flex-grow place-items-center">
                {/* Product Details */}
                <div className="bg-white p-8 rounded-lg">
                  <p className="opacity-50 text-black text-sm font-semibold">What Is This Product</p>
                  <div className="flex justify-between items-center text-[#3f6075]/90 text-lg font-semibold">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="text-[#3f6075] text-lg font-semibold mb-4 border placeholder-gray-500 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="divider"></div>
                  <div className="h-[44.18px] flex justify-start items-end gap-1 inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="45" viewBox="0 0 40 45" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.5294 3.01159L23.6839 4.51616L23.9004 6.62551L25.818 5.72049L26.9616 5.18081L29.0829 4.17965L28.828 6.51147L28.7151 7.54451L28.4603 9.87634L30.5816 8.87518L31.4317 8.47395L33.6427 7.43048L33.2247 9.83932L33.0596 10.7908L32.6944 12.895L34.793 12.4991L36.6675 12.1455L39.5054 11.6101L37.8289 13.9617L17.8542 41.9795L16.2851 44.1804L15.7121 41.5389L15.4519 40.3395L15.0244 38.3691L13.1241 39.0429L12.4287 39.2894L10.4225 40.0007L10.4408 37.8722L10.4462 37.2468L10.4646 35.1183L8.45837 35.8296L7.86885 36.0386L5.86264 36.7499L5.881 34.6214L5.88736 33.8836L5.90475 31.8674L3.90262 32.1057L2.68398 32.2508L0 32.5702L1.56906 30.3694L21.4628 2.4651L23.2202 0L23.5294 3.01159ZM24.7541 8.43419L26.7067 7.51264L26.4721 9.65905L26.0841 13.2093L29.3139 11.685L31.0137 10.8828L30.7239 12.553L30.2306 15.395L33.0652 14.8603L34.991 14.497L31.7783 19.0033L18.7302 9.74334L21.772 5.47669L21.9109 6.82976L22.1994 9.63987L24.7541 8.43419ZM16.9887 12.1861L8.25951 24.4302L21.1632 33.8928L30.0368 21.4461L16.9887 12.1861ZM19.4215 36.3358L6.51783 26.8732L4.25304 30.0499L5.66838 29.8815L7.92427 29.613L7.90468 31.8847L7.88721 33.9101L9.79625 33.2332L12.4891 32.2785L12.4645 35.1355L12.447 37.1609L14.3561 36.4841L16.4973 35.7249L16.979 37.9451L17.2811 39.338L19.4215 36.3358Z"
                        fill="#3F6075"
                      />
                    </svg>
                    <div>
                      <span className="text-[#39527d] text-lg font-medium font-['Poppins'] capitalize">
                        <input
                          type="text"
                          value={cans}
                          onChange={(e) => setCans(e.target.value)}
                          className="text-[#39527d] text-[28px] w-[98px] font-medium font-['Poppins'] capitalize border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#39527d]"
                        />
                      </span>
                      <span className="text-[#3e5f75] text-[28px] font-medium font-['Poppins'] capitalize">
                        {" "}
                        pouches{" "}
                      </span>
                      <span className="text-[#3e5f75] text-sm font-medium font-['Poppins'] capitalize">
                        in a can
                      </span>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <p className="opacity-50 text-black text-sm font-semibold capitalize">
                    How many items in the stock
                  </p>
                  <input
                    type="number"
                    className="text-black text-lg font-bold mt-2 mb-6 placeholder-gray-500 border rounded-lg h-[58px] p-4 w-full"
                    placeholder="Stock"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                  />
                  <div className="divider"></div>
                  <div className="space-y-4 mb-6">
                    <p className="opacity-50 text-black text-sm font-semibold">Description</p>
                    <textarea
                      className="text-primary text-[18px] mt-2 mb-6 border p-2 w-full"
                      placeholder="Add Product Description Here..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      cols="50"
                    />
                    <Selector onChange={setSelectorData} />
                  </div>
                  <div
                    className="w-[230px] h-[80px] p-[23px] mt-2 bg-gradient-to-br from-[#ffe047] to-[#ffb200] rounded-md flex items-end justify-end gap-[11.05px] cursor-pointer hover:shadow-lg transition-shadow duration-200 ml-auto"
                    onClick={handleAdd}
                  >
                    <div className="text-[#282f44] text-[26px] font-medium font-['Poppins'] capitalize leading-[39.20px]">
                      Save Product
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }