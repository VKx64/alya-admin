"use client";
import Header from '@/components/v1/products/Header'
import ProductList from '@/components/v1/products/ProductList'
import React, { useState } from 'react'
import { pb } from '@/lib/pocketbase';

const ProductsPage = () => {
  // State for search query that will be passed down to ProductList
  const [searchQuery, setSearchQuery] = useState("");

  // State to trigger data refresh
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Get the current user's role from PocketBase
  const userRole = pb.authStore.record?.role;

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle data changes (create/update/delete)
  const handleDataChanged = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className='h-full w-full flex-1 px-5 py-3 bg-[#EAEFF8] gap-4 flex flex-col'>
      {/* Header with Add Product button */}
      <Header
        onSearchChange={handleSearchChange}
        onProductAdded={handleDataChanged}
        onRefresh={handleDataChanged}
      />

      {/* Products Table */}
      <ProductList
        searchQuery={searchQuery}
        onDataChanged={handleDataChanged}
        userRole={userRole}
      />
    </div>
  )
}

export default ProductsPage