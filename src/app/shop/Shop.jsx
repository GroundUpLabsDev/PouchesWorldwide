"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProducts } from "@/app/utils/fetchProducts";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedStrength, setSelectedStrength] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search");

  useEffect(() => {
    const getProductsAndFilters = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);

      const brandsRes = await fetch("https://pouchesworldwide.com/strapi/api/brands");
      const brandsData = await brandsRes.json();
      setBrands(brandsData.data);

      const categoriesRes = await fetch("https://pouchesworldwide.com/strapi/api/categories");
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData.data);

      const flavorsRes = await fetch("https://pouchesworldwide.com/strapi/api/flavors");
      const flavorsData = await flavorsRes.json();
      setFlavors(flavorsData.data);

      const strengthsRes = await fetch("https://pouchesworldwide.com/strapi/api/strengths");
      const strengthsData = await strengthsRes.json();
      setStrengths(strengthsData.data);
    };

    getProductsAndFilters();
  }, []);

  useEffect(() => {
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery
      ? product.Name && product.Name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesBrand = selectedBrand
      ? product.brand && product.brand.id === Number(selectedBrand)
      : true;

    const matchesCategory = selectedCategory
      ? product.category && product.category.id === Number(selectedCategory)
      : true;

    const matchesFlavor = selectedFlavor
      ? product.flavor && product.flavor.id === Number(selectedFlavor)
      : true;

    const matchesStrength = selectedStrength
      ? product.strength && product.strength.some((s) => s.id === Number(selectedStrength))
      : true;

    return matchesSearch && matchesBrand && matchesCategory && matchesFlavor && matchesStrength;
  });

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <div className="mt-4"></div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Brand Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none cursor-pointer"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.Name}
                </option>
              ))}
            </select>
          </div>

          {/* Flavor Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Flavor</label>
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none cursor-pointer"
            >
              <option value="">All Flavors</option>
              {flavors.map((flavor) => (
                <option key={flavor.id} value={flavor.id}>
                  {flavor.name}
                </option>
              ))}
            </select>
          </div>

          {/* Strength Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Strength</label>
            <select
              value={selectedStrength}
              onChange={(e) => setSelectedStrength(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none cursor-pointer"
            >
              <option value="">All Strengths</option>
              {strengths.map((strength) => (
                <option key={strength.id} value={strength.id}>
                  {strength.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 justify-items-center">
            {filteredProducts.map((product) => (
              <div key={product.id} className="w-full max-w-sm flex justify-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
