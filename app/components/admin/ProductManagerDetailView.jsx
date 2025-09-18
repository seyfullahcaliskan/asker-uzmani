"use client";

import { useState } from "react";
import { FaTrash, FaPlus, FaUpload, FaLink, FaImage } from "react-icons/fa";

export default function ProductManagerDetailView({
  form,
  setForm,
  onClose,
  onSave,
  products,
  nonSetProducts,
  isLoading
}) {
  const [tab, setTab] = useState("general");
  const [imageUploading, setImageUploading] = useState(false);
  const [imageInputType, setImageInputType] = useState("file"); // "file" veya "url"

  const isSet = form.isSet || false;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateSubProduct = (index, key, value) => {
    const updatedSubs = [...(form.subProducts || [])];
    updatedSubs[index] = { ...updatedSubs[index], [key]: value };
    setForm((f) => ({ ...f, subProducts: updatedSubs }));
  };

  const addSubProduct = () => {
    setForm((f) => ({
      ...f,
      subProducts: [...(f.subProducts || []), { product: "", count: 1 }],
    }));
  };

  const removeSubProduct = (index) => {
    const updated = [...(form.subProducts || [])];
    updated.splice(index, 1);
    setForm((f) => ({ ...f, subProducts: updated }));
  };

  const addSize = (value) => {
    if (!value) return;
    setForm((f) => ({ ...f, sizes: [...(f.sizes || []), { id: Date.now().toString(), value }] }));
  };

  const removeSize = (index) => {
    const updated = [...(form.sizes || [])];
    updated.splice(index, 1);
    setForm((f) => ({ ...f, sizes: updated }));
  };

  // Ana resim yükleme
  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const firebaseUrl = await uploadToFirebase(file);
      setForm((f) => ({ ...f, mainImagePath: firebaseUrl }));
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
      alert("Resim yükleme başarısız!");
    } finally {
      setImageUploading(false);
    }
  };

  const uploadToFirebase = async (file) => {
  console.log("Firebase'e yükleniyor:", file.name, file.size);
  // Simüle edilmiş upload gecikme
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Gerçek Firebase URL'i yerine mock URL döndürür
  return `https://firebase-storage-url.com/${Date.now()}_${file.name}`;
};

  // Ana resim URL ile ekleme
  const handleMainImageUrl = (url) => {
    if (url.trim()) {
      setForm((f) => ({ ...f, mainImagePath: url.trim() }));
    }
  };

  // Ek resim yükleme
  const addImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const firebaseUrl = await uploadToFirebase(file);
      setForm((f) => ({ 
        ...f, 
        images: [...(f.images || []), { 
          id: Date.now().toString(),
          path: firebaseUrl,
          is_main_image: 0
        }] 
      }));
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
      alert("Resim yükleme başarısız!");
    } finally {
      setImageUploading(false);
    }
  };

  // URL ile ek resim ekleme
  const addImageUrl = (url) => {
    if (!url.trim()) return;
    setForm((f) => ({ 
      ...f, 
      images: [...(f.images || []), { 
        id: Date.now().toString(),
        path: url.trim(),
        is_main_image: 0
      }] 
    }));
  };

  const removeImage = (index) => {
    const updated = [...(form.images || [])];
    updated.splice(index, 1);
    setForm((f) => ({ ...f, images: updated }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
          <h2 className="text-2xl font-bold">
            {form.id ? "🔄 Ürün Güncelle" : "➕ Yeni Ürün Ekle"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 text-xl transition-colors"
            disabled={isLoading}
          >
            ✖
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          {["general", "images", !isSet ? "sizes" : null, isSet ? "subproducts" : null]
            .filter(Boolean)
            .map((tabName) => (
              <button
                key={tabName}
                className={`px-6 py-4 font-medium transition-colors ${
                  tab === tabName 
                    ? "border-b-3 border-blue-500 text-blue-600 bg-white" 
                    : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                }`}
                onClick={() => setTab(tabName)}
              >
                {tabName === "general" && "📋 Genel Bilgiler"}
                {tabName === "images" && "🖼️ Görseller"}
                {tabName === "sizes" && "📏 Bedenler"}
                {tabName === "subproducts" && "📦 Alt Ürünler"}
              </button>
            ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {tab === "general" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📝 Ürün Adı *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                    placeholder="Ürün adını girin"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🏷️ Kategori
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={form.category || ""}
                    onChange={handleChange}
                    placeholder="Kategori adı"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📄 Ürün Açıklaması
                </label>
                <textarea
                  name="description"
                  value={form.description || ""}
                  onChange={handleChange}
                  placeholder="Ürün hakkında detaylı bilgi..."
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💰 Fiyat
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price || ""}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🛒 Sepet Fiyatı
                  </label>
                  <input
                    type="number"
                    name="cartPrice"
                    value={form.cartPrice || ""}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📦 Stok
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock || 0}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isSet"
                    checked={isSet}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-lg font-medium text-blue-700">
                    📦 Bu bir set ürünü mü?
                  </span>
                </label>
                <p className="text-sm text-blue-600 mt-2">
                  Set ürünleri birden fazla alt ürün içerir ve beden seçimi yoktur.
                </p>
              </div>
            </div>
          )}

          {tab === "images" && (
            <div className="space-y-8">
              {/* Ana Resim */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🖼️ Ana Resim
                </h3>
                
                <div className="mb-4">
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setImageInputType("file")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        imageInputType === "file"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <FaUpload className="inline mr-2" /> Dosya Yükle
                    </button>
                    <button
                      onClick={() => setImageInputType("url")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        imageInputType === "url"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <FaLink className="inline mr-2" /> URL Gir
                    </button>
                  </div>

                  {imageInputType === "file" ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      disabled={imageUploading}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors"
                    />
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Resim URL'sini girin"
                        className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleMainImageUrl(e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          handleMainImageUrl(input.value);
                          input.value = "";
                        }}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Ekle
                      </button>
                    </div>
                  )}
                </div>

                {form.mainImagePath && (
                  <div className="relative inline-block">
                    <img
                      src={form.mainImagePath}
                      alt="Ana resim"
                      className="w-48 h-48 object-cover rounded-lg shadow-lg border-4 border-blue-200"
                    />
                    <button
                      onClick={() => setForm((f) => ({ ...f, mainImagePath: "" }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}

                {imageUploading && (
                  <div className="text-blue-600 text-center py-4">
                    🔄 Resim yükleniyor...
                  </div>
                )}
              </div>

              {/* Ek Resimler */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  📸 Ek Resimler
                </h3>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  {form.images?.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img.path}
                        alt={`Ek resim ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded-lg shadow-md border-2 border-gray-200"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors text-xs"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  
                  <div className="flex flex-col gap-2">
                    <label className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all">
                      <FaImage /> Dosya Seç
                      <input
                        type="file"
                        accept="image/*"
                        onChange={addImage}
                        className="hidden"
                        disabled={imageUploading}
                      />
                    </label>
                    
                    <input
                      type="url"
                      placeholder="URL gir ve Enter"
                      className="border-2 border-gray-300 rounded-lg px-3 py-2 text-sm w-32"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addImageUrl(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "sizes" && !isSet && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📏 Beden Seçenekleri
              </h3>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {form.sizes?.map((s, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full border-2 border-blue-200"
                  >
                    <span className="font-medium">{s.value}</span>
                    <button
                      onClick={() => removeSize(idx)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      ✖
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Beden ekleyin (örn: XL, 42, M)"
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      addSize(e.target.value.trim());
                      e.target.value = "";
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.target.parentElement.querySelector('input');
                    if (input.value.trim()) {
                      addSize(input.value.trim());
                      input.value = "";
                    }
                  }}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <FaPlus /> Ekle
                </button>
              </div>
            </div>
          )}

          {tab === "subproducts" && isSet && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📦 Alt Ürünler
              </h3>
              
              <button
                onClick={addSubProduct}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 mb-6 hover:shadow-lg transition-all"
              >
                <FaPlus /> Alt Ürün Ekle
              </button>
              
              <div className="space-y-4">
                {form.subProducts?.map((sub, i) => {
                  const selectedId = typeof sub.product === 'object' ? sub.product?.id : sub.product;
                  let available = nonSetProducts || [];
                  
                  return (
                    <div key={i} className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <div className="flex-1">
                        <select
                          value={selectedId || ""}
                          onChange={(e) => updateSubProduct(i, "product", e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Ürün Seçin</option>
                          {available.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} - {p.price}₺
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="w-24">
                        <label className="block text-xs text-gray-600 mb-1">Adet</label>
                        <input
                          type="number"
                          min="1"
                          value={sub.count || 1}
                          onChange={(e) => updateSubProduct(i, "count", parseInt(e.target.value) || 1)}
                          className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <button
                        onClick={() => removeSubProduct(i)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })}
                
                {(!form.subProducts || form.subProducts.length === 0) && (
                  <div className="text-center py-12 text-gray-500">
                    <FaPlus className="mx-auto mb-3 text-4xl" />
                    <p>Henüz alt ürün eklenmemiş</p>
                    <p className="text-sm">Yukarıdaki butona tıklayarak alt ürün ekleyebilirsiniz</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            ❌ İptal
          </button>
          <button
            onClick={onSave}
            disabled={isLoading || !form.name?.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? "⏳ Kaydediliyor..." : "💾 Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
};
