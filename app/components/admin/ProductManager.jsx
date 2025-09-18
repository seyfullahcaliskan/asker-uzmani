"use client";

import { useState } from "react";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import ProductManagerDetailView from "./ProductManagerDetailView";

const productAPI = {
  create: async (productData) => {
    console.log("🆕 ÜRÜN EKLEME API ÇAĞRISI");
    console.log("Endpoint: POST /api/products");
    console.log("Gönderilen veri:", productData);
    return { success: true, id: Date.now().toString() };
  },
  
  update: async (id, productData) => {
    console.log("📝 ÜRÜN GÜNCELLEME API ÇAĞRISI");
    console.log(`Endpoint: PUT /api/products/${id}`);
    console.log("Gönderilen veri:", productData);
    return { success: true };
  },
  
  delete: async (id) => {
    console.log("🗑️ ÜRÜN SİLME API ÇAĞRISI");
    console.log(`Endpoint: DELETE /api/products/${id}`);
    console.log("Silinecek ID:", id);
    return { success: true };
  }
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductManager({ initialProducts = [] })  {
  const [products, setProducts] = useState(() => {
    // JSON verilerini işleyerek uyumlu hale getir
    return initialProducts.map(product => ({
      ...product,
      isSet: product.isSet?.value === "Evet" || product.isSet === true,
      // API formatından component formatına dönüştür
      subProducts: product.subProducts?.map(sub => ({
        product: typeof sub.product === 'object' ? sub.product.id : sub.product,
        count: sub.count
      })) || []
    }));
  });
  
  const [form, setForm] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyProduct = {
    id: "",
    name: "",
    slug: "",
    category: "",
    price: "",
    cartPrice: "",
    description: "",
    mainImagePath: "",
    images: [],
    stock: 0,
    isSet: false,
    sizes: [],
    subProducts: [],
  };

  const nonSetProducts = products.filter((p) => !p.isSet);

  const openAddModal = () => {
    setForm({ ...emptyProduct });
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const openEditModal = (i) => {
    const product = { ...products[i] };
    // Edit modunda alt ürünleri düzgün formatla
    if (product.subProducts) {
      product.subProducts = product.subProducts.map(sub => ({
        product: typeof sub.product === 'object' ? sub.product.id : sub.product,
        count: sub.count
      }));
    }
    setForm(product);
    setEditIndex(i);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setForm(null);
    setEditIndex(null);
    setIsModalOpen(false);
  };

  const onSave = async () => {
    if (!form.name?.trim()) {
      alert("❌ Ürün ismi boş olamaz!");
      return;
    }

    setIsLoading(true);
    
    try {
      const slug = slugify(form.name);
      const productData = { 
        ...form, 
        slug,
        price: parseFloat(form.price) || 0,
        cartPrice: parseFloat(form.cartPrice) || 0,
        stock: parseInt(form.stock) || 0
      };

      if (editIndex === null) {
        // Yeni ürün ekleme
        const response = await productAPI.create(productData);
        if (response.success) {
          const newProduct = { ...productData, id: response.id };
          setProducts((p) => [...p, newProduct]);
          alert("✅ Ürün başarıyla eklendi!");
        }
      } else {
        // Ürün güncelleme
        const response = await productAPI.update(form.id, productData);
        if (response.success) {
          const updated = [...products];
          updated[editIndex] = productData;
          setProducts(updated);
          alert("✅ Ürün başarıyla güncellendi!");
        }
      }

      closeModal();
    } catch (error) {
      console.error("İşlem hatası:", error);
      alert("❌ Bir hata oluştu!");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (index) => {
    const product = products[index];
    
    if (!confirm(`"${product.name}" adlı ürünü silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      const response = await productAPI.delete(product.id);
      if (response.success) {
        setProducts((p) => p.filter((_, idx) => idx !== index));
        alert("✅ Ürün başarıyla silindi!");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("❌ Ürün silinirken bir hata oluştu!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🛍️ Ürün Yönetim Paneli
              </h1>
              <p className="text-gray-600">
                Toplam {products.length} ürün • {products.filter(p => p.isSet).length} set • {products.filter(p => !p.isSet).length} tekil ürün
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:shadow-lg transition-all transform hover:scale-105"
            >
              <FaPlus className="text-lg" /> Yeni Ürün Ekle
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    İşlemler
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Resim
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Ürün Bilgileri
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Stok
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <FaPlus className="text-6xl mb-4 text-gray-300" />
                        <h3 className="text-xl font-medium mb-2">Henüz ürün yok</h3>
                        <p className="text-gray-400 mb-4">İlk ürününüzü ekleyerek başlayın</p>
                        <button
                          onClick={openAddModal}
                          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Ürün Ekle
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(index)}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-all"
                            title="Düzenle"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => onDelete(index)}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-all"
                            title="Sil"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        {product.mainImagePath ? (
                          <img
                            src={product.mainImagePath}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FaImage className="text-gray-400" />
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            📂 {product.category || "Kategori yok"}
                          </p>
                          {product.description && (
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {product.description.substring(0, 60)}
                              {product.description.length > 60 ? "..." : ""}
                            </p>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-semibold text-gray-900">
                            💰 {product.price || 0}₺
                          </div>
                          {product.cartPrice && product.cartPrice !== product.price && (
                            <div className="text-sm text-green-600">
                              🛒 {product.cartPrice}₺
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          product.stock > 10 
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0 
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          📦 {product.stock || 0}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          product.isSet
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {product.isSet ? "📦 Set" : "🔧 Tekil"}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {product.isSet ? (
                            <div className="text-sm text-gray-600">
                              🔗 {product.subProducts?.length || 0} alt ürün
                            </div>
                          ) : (
                            <div className="text-sm text-gray-600">
                              📏 {product.sizes?.length || 0} beden
                            </div>
                          )}
                          <div className="text-xs text-gray-500">
                            🖼️ {(product.images?.length || 0) + (product.mainImagePath ? 1 : 0)} resim
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && form && (
          <ProductManagerDetailView
            form={form}
            setForm={setForm}
            nonSetProducts={nonSetProducts}
            products={products}
            onClose={closeModal}
            onSave={onSave}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
