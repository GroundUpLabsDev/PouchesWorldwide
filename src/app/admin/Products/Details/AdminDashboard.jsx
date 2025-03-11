"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import { Trash, Plus } from "lucide-react";
import Selector from "@/components/AdminUi/Selector";

const MAX_GUIDELINES = 5;

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const ProductID = searchParams.get("ProductID");

  // States
  const [guidelines, setGuidelines] = useState([
    "Do not use PUXX if you are under 21 years old, pregnant, nursing, or have health conditions affected by nicotine use",
    "Place the pouch between your gum and lip and let it rest.",
    "Do not chew or swallow the pouch.",
  ]);
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cans, setCans] = useState("");
  const [isBestDeal, setIsBestDeal] = useState(false);
  const [selectorData, setSelectorData] = useState({});
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageId, setImageId] = useState(null); // Store the image ID
  const [brands, setBrands] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [strengthsOptions, setStrengthsOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
const [selectedFlavor, setSelectedFlavor] = useState("");

  

  // Load product details if ProductID exists
  useEffect(() => {
    if (!ProductID) return;

    const loadProduct = async () => {
      try {
        const res = await fetch("https://pouchesworldwide.com/strapi/api/products?populate=*");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await res.json();
        const apiProducts = json.data;
        const fetchedProduct = apiProducts.find((item) => item.id === Number(ProductID));
        setProduct(fetchedProduct);

        if (fetchedProduct) {
          setProductName(fetchedProduct.Name || "");
          setProductStock(fetchedProduct.Stock || "");
          setPrice(fetchedProduct.price || "");
          setCans(fetchedProduct.cans ? String(fetchedProduct.cans) : "");

          const descriptionText =
            fetchedProduct.Description && fetchedProduct.Description.length > 0
              ? fetchedProduct.Description[0]?.children[0]?.text || ""
              : "";
          setDescription(descriptionText);

          if (fetchedProduct.Image) {
            const imageUrl =
              fetchedProduct.Image.formats?.medium?.url ||
              fetchedProduct.Image.url ||
              "";
            setImage(`https://pouchesworldwide.com/strapi${imageUrl}`);
            setImageId(fetchedProduct.Image.id); // Set the image ID
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    loadProduct();
  }, [ProductID]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch brands
        const brandsRes = await fetch("https://pouchesworldwide.com/strapi/api/brands");
        const brandsData = await brandsRes.json();
        setBrands(brandsData.data);
  
        // Fetch flavors
        const flavorsRes = await fetch("https://pouchesworldwide.com/strapi/api/flavors");
        const flavorsData = await flavorsRes.json();
        setFlavors(flavorsData.data);
  
        // Fetch strengths
        const strengthsRes = await fetch("https://pouchesworldwide.com/strapi/api/strengths");
        const strengthsData = await strengthsRes.json();
        setStrengthsOptions(strengthsData.data);
  
        // Fetch categories
        const categoriesRes = await fetch("https://pouchesworldwide.com/strapi/api/categories");
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
  
    fetchOptions();
  }, []);

  const [selectedStrengths, setSelectedStrengths] = useState([]);

  const handleAddStrength = (strength) => {
    if (!selectedStrengths.includes(strength)) {
      setSelectedStrengths([...selectedStrengths, strength]);
    }
  };
  
  const handleRemoveStrength = (strength) => {
    setSelectedStrengths(selectedStrengths.filter((s) => s !== strength));
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      const uploadRes = await fetch("https://pouchesworldwide.com/strapi/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        throw new Error(`Image upload failed: ${errorText}`);
      }

      const uploadJson = await uploadRes.json();
      console.log("Upload response:", uploadJson); // Debugging

      if (uploadJson && uploadJson[0] && uploadJson[0].id) {
        const imageId = uploadJson[0].id; // Get the image ID
        const imageUrl = `https://pouchesworldwide.com/strapi${uploadJson[0].url}`; // Get the image URL
        setImage(imageUrl); // Set the image URL for display
        setImageFile(file); // Set the file (optional)
        setImageId(imageId); // Store the image ID in state
      } else {
        throw new Error("Invalid upload response");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle image deletion
  const handleDeleteImage = () => {
    setImage("");
    setImageFile(null);
    setImageId(null); // Clear the image ID
  };

  // Handle product creation/update
  const handleAdd = async () => {
  const payload = {
    Name: productName,
    Stock: Number(productStock),
    price: Number(price),
    Description: [
      {
        type: "paragraph",
        children: [{ type: "text", text: description }],
      },
    ],
    Image: imageId,
    can: Number(cans),
    selectorj: selectorData,
    Guidelines: guidelines.map((guideline) => ({
      type: "paragraph",
      children: [{ type: "text", text: guideline }],
    })),
    brand: selectedBrand, // Use selected brand
    category: selectedCategory, // Use selected category
    flavor: selectedFlavor, // Use selected flavor
    strength: selectedStrengths.map((s) => s.id), // Array of strength IDs
  };

  try {
    const res = await fetch("https://pouchesworldwide.com/strapi/api/products?populate=*", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: payload }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create product: ${errorText}`);
    }

    const result = await res.json();
    console.log("Product created:", result);
    setProduct(result.data);
   // ✅ Show success alert
   window.alert("🎉 Product added successfully!");
  } catch (error) {
    console.error("Error creating product:", error);
  }
};
  // Guideline handlers
  const handleAddGuideline = () => {
    if (guidelines.length < MAX_GUIDELINES) {
      setGuidelines([...guidelines, ""]);
    }
  };

  const handleDeleteGuideline = (index) => {
    const updatedGuidelines = guidelines.filter((_, i) => i !== index);
    setGuidelines(updatedGuidelines);
  };

  const handleChangeGuideline = (index, newText) => {
    const updatedGuidelines = [...guidelines];
    updatedGuidelines[index] = newText;
    setGuidelines(updatedGuidelines);
  };

  return (
    <>
      <Header />
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
              {/* Guidelines Section */}
              <div className="w-[607px] flex-col justify-start items-start gap-[21px] inline-flex mt-6">
                <div className="self-stretch text-[#3f6075] text-[24px] font-bold font-['Poppins'] capitalize leading-[35px]">
                  Guidelines
                </div>
                {guidelines.map((guideline, index) => (
                  <div key={index} className="self-stretch justify-start items-start inline-flex">
                    <textarea
                      className="w-[552px] text-[#3f6075] text-[20px] font-normal font-['Poppins'] capitalize leading-[35px] mt-2 mb-6"
                      value={guideline}
                      onChange={(e) => handleChangeGuideline(index, e.target.value)}
                      rows="2"
                    />
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteGuideline(index)}
                    >
                      <Trash size={24} />
                    </button>
                  </div>
                ))}
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded disabled:opacity-50"
                  onClick={handleAddGuideline}
                  disabled={guidelines.length >= MAX_GUIDELINES}
                >
                  Add New Guideline
                </button>
              </div>
            </div>

           {/* Product Details Section */}
<div className="card flex-grow place-items-center">
  <div className="bg-white p-8 rounded-lg">
    <p className="opacity-50 text-black text-sm font-semibold">What Is This Product</p>
    
    {/* Product Name Input */}
    <input
      type="text"
      placeholder="Product Name"
      value={productName}
      onChange={(e) => setProductName(e.target.value)}
      className="text-[#3f6075] text-lg font-semibold mb-4 border placeholder-gray-500 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
    />
    
    {/* Category & Brand Selectors */}
{/* Category & Brand Selectors */}
<div className="grid grid-cols-2 gap-4 mb-4">
  {/* Category Selector */}
<div className="flex flex-col">
  <label className="text-sm font-semibold text-gray-700 mb-1">Category</label>
  <div className="relative">
    <select
     value={selectedCategory}
     onChange={(e) => setSelectedCategory(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none cursor-pointer"
    >
      <option value="" disabled selected>Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.Name}
        </option>
      ))}
    </select>
    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
      ▼
    </span>
  </div>
</div>

  {/* Brand Selector */}
<div className="flex flex-col">
  <label className="text-sm font-semibold text-gray-700 mb-1">Brand</label>
  <div className="relative">
    <select
       value={selectedBrand}
       onChange={(e) => setSelectedBrand(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none cursor-pointer"
    >
      <option value="" disabled selected>Select a brand</option>
      {brands.map((brand) => (
        <option key={brand.id} value={brand.id}>
          {brand.name}
        </option>
      ))}
    </select>
    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
      ▼
    </span>
  </div>
</div>
</div>


    {/* Flavor & Strength Selectors */}
    <div className="grid grid-cols-2 gap-4 mb-4">
  {/* Flavor Selector */}
<div className="flex flex-col">
  <label className="text-sm font-semibold text-gray-700 mb-1">Flavor</label>
  <div className="relative">
    <select
      value={selectedFlavor}
      onChange={(e) => setSelectedFlavor(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none cursor-pointer"
    >
      <option value="" disabled selected>Select a flavor</option>
      {flavors.map((flavor) => (
        <option key={flavor.id} value={flavor.id}>
          {flavor.name}
        </option>
      ))}
    </select>
    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
      ▼
    </span>
  </div>
</div>

  <div className="flex flex-col">
  <label className="text-sm font-semibold text-gray-700 mb-1">Strength</label>
  <div className="flex flex-wrap gap-2">
    {selectedStrengths.map((strength) => (
      <div
        key={strength.id}
        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-2"
      >
        <span>{strength.name}</span>
        <button
          onClick={() => handleRemoveStrength(strength)}
          className="text-red-500 hover:text-red-700"
        >
          &times;
        </button>
      </div>
    ))}
  </div>
  <select
    onChange={(e) => {
      const selectedStrength = strengthsOptions.find(
        (s) => s.id === Number(e.target.value)
      );
      if (selectedStrength) handleAddStrength(selectedStrength);
    }}
    className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none cursor-pointer"
  >
    <option value="" disabled selected>Select a strength</option>
    {strengthsOptions.map((strength) => (
      <option key={strength.id} value={strength.id}>
        {strength.name}
      </option>
    ))}
  </select>
</div>

</div>


    <div className="divider"></div>

    {/* Cans & Pouches Input */}
    <div className="h-[44.18px] flex justify-start items-end gap-1 inline-flex">
      <input
        type="text"
        value={cans}
        onChange={(e) => setCans(e.target.value)}
        className="text-[#39527d] text-[28px] w-[98px] font-medium font-['Poppins'] capitalize border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#39527d]"
      />
      <span className="text-[#3e5f75] text-[28px] font-medium font-['Poppins'] capitalize">
        pouches
      </span>
      <span className="text-[#3e5f75] text-sm font-medium font-['Poppins'] capitalize">
        in a can
      </span>
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
