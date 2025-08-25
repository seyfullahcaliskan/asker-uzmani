// components/ProductManager.js
"use client";

import { useState } from "react";
import { FaTrash, FaPlus, FaImage } from "react-icons/fa";

const emptyProduct = {
  id: "",
  name: "",
  slug: "",
  category: "",
  price: "",
  cartPrice: "",
  description: "",
  mainImage: "",
  stock: 0,
  isSet: false,
  products: [],
};

const emptySubProduct = {
  product: null,
  count: 1,
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

export default function ProductManager({ products, setProducts, allProducts }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({});

  // Set olmayan ürünler (alt ürün seçimi için)
  const nonSetProducts = allProducts?.filter((p) => !p.isSet) || [];

  const onSelect = (i) => {
    setSelectedIndex(i);
    const selectedProduct = { ...products[i] };
    setForm(selectedProduct);

    // Resim önizlemelerini ayarla
    if (selectedProduct.mainImage) {
      setImagePreviews({ main: selectedProduct.mainImage });
    }
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onAdd = () => {
    setForm({ ...emptyProduct });
    setSelectedIndex(null);
    setImagePreviews({});
  };

  const onSave = () => {
    if (!form.name) {
      alert("Ürün ismi boş olamaz");
      return;
    }

    const slug = slugify(form.name);
    const newProduct = { ...form, slug };

    if (selectedIndex === null) {
      newProduct.id = Date.now().toString();
      setProducts((p) => [...p, newProduct]);
      console.log("Yeni ürün eklendi:", newProduct);
    } else {
      const updated = [...products];
      updated[selectedIndex] = newProduct;
      setProducts(updated);
      console.log("Ürün güncellendi:", newProduct);
    }

    setForm(null);
    setSelectedIndex(null);
    setImagePreviews({});
  };

  const onDelete = () => {
    if (selectedIndex === null) return;
    const deleted = products[selectedIndex];
    setProducts((p) => p.filter((_, i) => i !== selectedIndex));
    setForm(null);
    setSelectedIndex(null);
    setImagePreviews({});
    console.log("Ürün silindi:", deleted);
  };

  const handleImageUpload = (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;

      if (type === "main") {
        setForm((f) => ({ ...f, mainImage: imageUrl }));
        setImagePreviews((prev) => ({ ...prev, main: imageUrl }));
      } else if (type === "sub" && index !== null) {
        setForm((f) => {
          const updatedProducts = [...f.products];
          updatedProducts[index] = {
            ...updatedProducts[index],
            product: {
              ...updatedProducts[index].product,
              mainImage: imageUrl,
            },
          };
          return { ...f, products: updatedProducts };
        });
        setImagePreviews((prev) => ({
          ...prev,
          [`sub-${index}`]: imageUrl,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addSubProduct = () => {
    setForm((f) => ({
      ...f,
      products: [...f.products, { ...emptySubProduct }],
    }));
  };

  const removeSubProduct = (index) => {
    setForm((f) => {
      const updatedProducts = [...f.products];
      updatedProducts.splice(index, 1);
      return { ...f, products: updatedProducts };
    });
  };

  const updateSubProduct = (index, field, value) => {
    setForm((f) => {
      const updatedProducts = [...f.products];
      if (field === "product") {
        updatedProducts[index] = {
          ...updatedProducts[index],
          product: value,
          count: 1,
        };
      } else {
        updatedProducts[index] = {
          ...updatedProducts[index],
          [field]: value,
        };
      }
      return { ...f, products: updatedProducts };
    });
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/3 border p-4 rounded max-h-[600px] overflow-auto">
        <button
          onClick={onAdd}
          className="mb-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-2"
          type="button"
        >
          <FaPlus /> Yeni Ürün Ekle
        </button>
        {products.map((p, i) => (
          <div
            key={p.id}
            onClick={() => onSelect(i)}
            className={`cursor-pointer p-2 rounded mb-1 ${
              selectedIndex === i ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            <strong>{p.name}</strong> <br />
            <small>
              {p.category} - {p.price} {p.isSet && "(Set)"}
            </small>
          </div>
        ))}
      </div>

      <div className="flex-1 border p-4 rounded max-h-[600px] overflow-auto">
        {form ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mt-2">
                  İsim
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="w-full border rounded p-2"
                  />
                </label>
                <label className="block font-semibold mt-2">
                  Slug (otomatik)
                  <input
                    type="text"
                    name="slug"
                    value={slugify(form.name)}
                    readOnly
                    className="w-full border rounded p-2 bg-gray-100"
                  />
                </label>
                <label className="block font-semibold mt-2">
                  Kategori
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    className="w-full border rounded p-2"
                  />
                </label>
                <label className="block font-semibold mt-2">
                  Fiyat
                  <input
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={onChange}
                    className="w-full border rounded p-2"
                  />
                </label>
                <label className="block font-semibold mt-2">
                  Sepet Fiyatı
                  <input
                    type="text"
                    name="cartPrice"
                    value={form.cartPrice || ""}
                    onChange={onChange}
                    className="w-full border rounded p-2"
                  />
                </label>
                <label className="block font-semibold mt-2">
                  Stok
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={onChange}
                    className="w-full border rounded p-2"
                  />
                </label>
              </div>

              <div>
                <label className="block font-semibold mt-2">
                  Ana Resim
                  <div className="mt-1 flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "main")}
                      className="hidden"
                      id="mainImageUpload"
                    />
                    <label
                      htmlFor="mainImageUpload"
                      className="cursor-pointer bg-gray-200 rounded p-2 flex items-center gap-2"
                    >
                      <FaImage /> Resim Seç
                    </label>
                    {imagePreviews.main && (
                      <img
                        src={imagePreviews.main}
                        alt="Önizleme"
                        className="w-16 h-16 object-cover rounded border"
                      />
                    )}
                  </div>
                </label>

                <label className="inline-flex items-center mt-4">
                  <input
                    type="checkbox"
                    name="isSet"
                    checked={form.isSet}
                    onChange={onChange}
                    className="mr-2"
                  />
                  Set Ürünü mü?
                </label>
              </div>
            </div>

            <label className="block font-semibold mt-4">
              Açıklama
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                className="w-full border rounded p-2"
                rows={4}
              />
            </label>

            {/* Alt Ürünler Bölümü - Sadece set ürünlerde görünür */}
            {form.isSet && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">Alt Ürünler</h3>
                  <button
                    onClick={addSubProduct}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                    type="button"
                  >
                    <FaPlus /> Alt Ürün Ekle
                  </button>
                </div>

                <div className="space-y-4">
                  {form.products.map((subProduct, index) => (
                    <div key={index} className="border rounded p-3 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Ürün Seçin
                            </label>
                            <select
                              value={subProduct.product?.id || ""}
                              onChange={(e) => {
                                const selectedProduct = nonSetProducts.find(
                                  (p) => p.id.toString() === e.target.value
                                );
                                updateSubProduct(
                                  index,
                                  "product",
                                  selectedProduct
                                );
                              }}
                              className="w-full border rounded p-2"
                            >
                              <option value="">Ürün Seçin</option>
                              {nonSetProducts.map((product) => (
                                <option key={product.id} value={product.id}>
                                  {product.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Adet
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={subProduct.count}
                              onChange={(e) =>
                                updateSubProduct(
                                  index,
                                  "count",
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-full border rounded p-2"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Resim (Opsiyonel)
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageUpload(e, "sub", index)
                                }
                                className="hidden"
                                id={`subImageUpload-${index}`}
                              />
                              <label
                                htmlFor={`subImageUpload-${index}`}
                                className="cursor-pointer bg-gray-200 rounded p-2 text-sm"
                              >
                                <FaImage /> Resim Seç
                              </label>
                              {imagePreviews[`sub-${index}`] && (
                                <img
                                  src={imagePreviews[`sub-${index}`]}
                                  alt="Önizleme"
                                  className="w-10 h-10 object-cover rounded border"
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removeSubProduct(index)}
                          className="text-red-600 hover:text-red-800 ml-3 mt-6"
                          type="button"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      {subProduct.product && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p>
                            <strong>Fiyat:</strong> {subProduct.product.price}
                          </p>
                          <p>
                            <strong>Stok:</strong> {subProduct.product.stock}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={onSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                type="button"
              >
                Kaydet
              </button>
              {selectedIndex !== null && (
                <button
                  onClick={onDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
                  type="button"
                >
                  <FaTrash /> Sil
                </button>
              )}
            </div>
          </>
        ) : (
          <p>Bir ürün seçin veya yeni ürün ekleyin.</p>
        )}
      </div>
    </div>
  );
}
