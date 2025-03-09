'use client';
import { useState, useEffect } from 'react';

const AddToInventory = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://pouchesworldwide.com/strapi/api/products'); // Replace with actual API endpoint
        const data = await response.json();
        setProducts(data.data.map(product => ({
          id: product.id,
          name: product.Name,
          price: product.price,
        })));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
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
    <div className="container mx-auto p-8 bg-white font-roboto">
      <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
        <div className="text-white text-base font-normal font-['Poppins'] capitalize">
          distributor account
        </div>
      </div>
      <h2 className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-8">
        see <span className="text-black">'s Inventory</span>
      </h2>
      <p>User ID: {userId}</p>
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
  );
};

export default AddToInventory;
