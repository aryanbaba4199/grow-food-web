import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Autocomplete, TextField, InputAdornment, Dialog } from '@mui/material';

import ProductDetails from '../Home/productDetails';

const Search = ({ products = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  // Function to handle search input change
  const handleSearchChange = (event, value) => {
    setSearchTerm(value);

    const foundProduct = Array.isArray(products) ? products.find((item) => item.name.toLowerCase() === value.toLowerCase()) : null;
    if (foundProduct) {
      setSelectedProduct(foundProduct);
      setOpen(true);
    }
  };

  // Filtered products based on search term
  const filteredProducts = Array.isArray(products) ? products.filter((product) =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  ) : [];

  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={filteredProducts.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              placeholder: "Search",
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch style={{ color: '#1e4426', marginLeft: 8 }} />
                </InputAdornment>
              ),
              style: {
                backgroundColor: '#f3f4f6',
                color: 'black',
                padding: 0,
              },
            }}
          />
        )}
        onInputChange={handleSearchChange}
      />
      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <ProductDetails
          product={selectedProduct}
          setOpen={setOpen}
        />
      </Dialog>
    </>
  );
};

export default Search;
