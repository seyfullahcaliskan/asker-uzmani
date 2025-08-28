// components/ProductManager.js
"use client";

import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import ProductManagerDetailView from "./ProductManagerDetailView";

const emptyProduct = {
  id: "",
  name: "",
  slug: "",
  category: "",
  price: "",
  cartPrice: "",
  description: "",
  mainImage: "",
  images: [],   // çoklu resimler için
  stock: 0,
  isSet: false,
  sizes: [],    // bedenler için
  products: [], // alt ürünler için
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

  // === RESİM YÖNETİMİ ===
  const handleImageUpload = (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;

      if (type === "main") {
        setForm((f) => ({ ...f, mainImage: imageUrl }));
        setImagePreviews((prev) => ({ ...prev, main: imageUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setForm((f) => ({
        ...f,
        images: [...(f.images || []), imageUrl],
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    setForm((f) => {
      const newImages = [...(f.images || [])];
      newImages.splice(index, 1);
      return { ...f, images: newImages };
    });
  };

  // === BEDEN YÖNETİMİ ===
  const addSize = (size) => {
    setForm((f) => ({
      ...f,
      sizes: [...(f.sizes || []), size],
    }));
  };

  const removeSize = (index) => {
    setForm((f) => {
      const newSizes = [...(f.sizes || [])];
      newSizes.splice(index, 1);
      return { ...f, sizes: newSizes };
    });
  };

  // === ALT ÜRÜN YÖNETİMİ ===
  const addSubProduct = () => {
    setForm((f) => ({
      ...f,
      products: [...(f.products || []), { ...emptySubProduct }],
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
            <ProductManagerDetailView
              form={form}
              onChange={onChange}
              handleImageUpload={handleImageUpload}
              addImage={addImage}
              removeImage={removeImage}
              addSize={addSize}
              removeSize={removeSize}
              nonSetProducts={nonSetProducts}
              addSubProduct={addSubProduct}
              removeSubProduct={removeSubProduct}
              updateSubProduct={updateSubProduct}
            />

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
