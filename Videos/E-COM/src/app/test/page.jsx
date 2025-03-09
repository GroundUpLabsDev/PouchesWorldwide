"use client";

import { useState } from 'react';

// Function to fetch all documentIds from the API
async function fetchAllDocumentIds() {
    const apiUrl = 'https://pouchesworldwide.com/strapi/api/products?fields=id,documentId,Name&pagination[pageSize]=51';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.map((item) => ({ 
            documentId: item.documentId,
            name: item.Name || 'Unknown Product' 
        })); // Extract documentIds and names
    } catch (error) {
        console.error('Failed to fetch document IDs:', error);
        throw error;
    }
}

// Function to fetch user-specific product data
async function getUserProduct(documentInfo, userId) {
    const { documentId } = documentInfo;
    const apiUrl = `https://pouchesworldwide.com/strapi/api/products/${documentId}?populate[0]=wprice&populate[1]=wprice.user&populate[2]=wprice.price`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter the wprice array to find the user's product
        const userProduct = data.data.wprice.find((wp) => wp.user.id === userId);

        // Get default prices if available
        const defaultPrices = data.data.wprice.length > 0 && data.data.wprice[0].price 
            ? data.data.wprice[0].price 
            : [
                { id: 'default-1', Cans: 1, Price: '9.99' },
                { id: 'default-2', Cans: 5, Price: '45.99' },
                { id: 'default-3', Cans: 10, Price: '89.99' }
            ];

        if (userProduct) {
            return { 
                documentId, 
                name: documentInfo.name,
                product: userProduct,
                hasCustomPricing: true
            };
        } else {
            return { 
                documentId, 
                name: documentInfo.name,
                product: { 
                    price: defaultPrices 
                },
                hasCustomPricing: false
            };
        }
    } catch (error) {
        console.error('Failed to fetch product data:', error);
        throw error;
    }
}

export default function ProductPage() {
    const [userId, setUserId] = useState('');
    const [products, setProducts] = useState([]); // Store multiple products
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCans, setSelectedCans] = useState({});

    const handleFetchProducts = async () => {
        if (!userId) {
            setError('Please enter a User ID.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Step 1: Fetch all documentIds with names
            const documentInfos = await fetchAllDocumentIds();

            // Step 2: Fetch product data for all documentIds concurrently
            const productPromises = documentInfos.map((docInfo) =>
                getUserProduct(docInfo, Number(userId))
            );

            // Wait for all promises to resolve
            const fetchedProducts = await Promise.all(productPromises);

            // Initialize selected cans for each product
            const initialSelectedCans = {};
            fetchedProducts.forEach(({ documentId, product }) => {
                if (product && product.price && product.price.length > 0) {
                    initialSelectedCans[documentId] = product.price[0].Cans;
                }
            });
            setSelectedCans(initialSelectedCans);

            // Update state with all fetched products
            setProducts(fetchedProducts);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCansChange = (documentId, cans) => {
        setSelectedCans(prev => ({
            ...prev,
            [documentId]: cans
        }));
    };

    const getSelectedPrice = (product, docId) => {
        const selectedCansValue = selectedCans[docId];
        if (!selectedCansValue || !product || !product.price) return 'N/A';
        
        const priceItem = product.price.find(item => item.Cans === selectedCansValue);
        return priceItem ? priceItem.Price : 'N/A';
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Product Details</h1>

            {/* Input field for User ID */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    User ID:
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </label>
            </div>

            {/* Fetch button */}
            <button 
                onClick={handleFetchProducts} 
                disabled={loading} 
                style={{ 
                    marginBottom: '20px',
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Loading...' : 'Fetch Products'}
            </button>

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display product data for each documentId */}
            {products.length > 0 && (
                <div>
                    <h2>Product Information</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {products.map(({ documentId, name, product, hasCustomPricing }) => (
                            <div key={documentId} style={{ 
                                border: '1px solid #ccc', 
                                borderRadius: '8px',
                                padding: '15px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                <h3 style={{ marginTop: 0 }}>Product: {name}</h3>
                                <p><strong>Document ID:</strong> {documentId}</p>
                                
                                {product && product.price && product.price.length > 0 ? (
                                    <>
                                        <div style={{ 
                                            backgroundColor: hasCustomPricing ? '#e6f7ff' : '#fff8e6',
                                            padding: '10px',
                                            borderRadius: '4px',
                                            marginBottom: '10px'
                                        }}>
                                            <p style={{ margin: '0 0 5px 0' }}>
                                                <strong>Pricing Status:</strong> {hasCustomPricing ? 'Custom Pricing' : 'Default Pricing'}
                                            </p>
                                        </div>
                                        
                                        <div style={{ marginBottom: '15px' }}>
                                            <label>
                                                <strong>Select Quantity:</strong>
                                                <select 
                                                    value={selectedCans[documentId] || ''}
                                                    onChange={(e) => handleCansChange(documentId, Number(e.target.value))}
                                                    style={{ 
                                                        marginLeft: '10px', 
                                                        padding: '5px',
                                                        borderRadius: '4px',
                                                        border: '1px solid #ccc'
                                                    }}
                                                >
                                                    {product.price.map((priceItem) => (
                                                        <option key={priceItem.id} value={priceItem.Cans}>
                                                            {priceItem.Cans} Cans
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>
                                        
                                        <div style={{
                                            backgroundColor: '#f9f9f9',
                                            padding: '10px',
                                            borderRadius: '4px',
                                            textAlign: 'center'
                                        }}>
                                            <p style={{ fontSize: '18px', margin: 0 }}>
                                                <strong>Selected Price:</strong> ${getSelectedPrice(product, documentId)}
                                            </p>
                                        </div>
                                        
                                        <div style={{ marginTop: '15px' }}>
                                            <h4 style={{ marginBottom: '5px' }}>All Available Prices:</h4>
                                            <ul style={{ 
                                                listStyleType: 'none', 
                                                padding: 0,
                                                margin: 0
                                            }}>
                                                {product.price.map((priceItem) => (
                                                    <li key={priceItem.id} style={{
                                                        padding: '5px 0',
                                                        borderBottom: '1px solid #eee'
                                                    }}>
                                                        <strong>{priceItem.Cans} Cans:</strong> ${priceItem.Price || 'N/A'}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <p style={{ color: 'red' }}>No pricing information available.</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}