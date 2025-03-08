

'use client';
import Header from "@/components/AdminUi/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { useState, useEffect } from 'react';
 
const AddToInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    // Mock data for now, replace with API call
    const mockProducts = [
      { id: 1, name: 'Zyn Smooth 345', price: 10 },
      { id: 2, name: 'Vjva Seuama', price: 15 },
      { id: 3, name: 'Zyn 345', price: 12 },
      { id: 4, name: 'Zyn Kljjk 345', price: 14 },
    ];
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setPrice(product.price);
    setSearchTerm(product.name);
    setFilteredProducts([]);
  };

  const handleSaveProduct = () => {
    console.log('Product Saved:', { selectedProduct, price, quantity });
    alert(`Product ${selectedProduct?.name} added with quantity ${quantity}`);
  };

  return (
    <>
    <Header />
    <Banner />
    <div className="container mx-auto p-8 bg-white font-roboto">
    <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
  <div className="text-white text-base font-normal font-['Poppins'] capitalize">
  distributor account
  </div>
</div>
        <h2 className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-8">
        see <span className="text-black">'s Inventory</span>
      </h2>
      <div className="flex">
        <div className="w-1/3 relative">
          <input
            type="text"
            placeholder="Search Here ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          {filteredProducts.length > 0 && (
            <ul className="border rounded absolute w-full bg-white shadow-lg">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="p-2 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectProduct(product)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-2/3 pl-8">
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Product Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product price"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Product Quantity</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Product Quantity"
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleSaveProduct}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Save Product To Inventory
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AddToInventory;
