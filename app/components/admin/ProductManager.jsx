"use client";

import { useState } from "react";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import ProductManagerDetailView from "./ProductManagerDetailView";
import Modal from "../layout/ui/Modal";

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
  console.log(products)
  const [form, setForm] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nonSetProducts = allProducts?.filter((p) => !p.isSet) || [];

  const openAddModal = () => {
    setForm({ ...emptyProduct });
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const openEditModal = (i) => {
    setForm({ ...products[i] });
    setEditIndex(i);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setForm(null);
    setEditIndex(null);
    setIsModalOpen(false);
  };

  const onSave = () => {
    if (!form.name) {
      alert("Ürün ismi boş olamaz");
      return;
    }

    const slug = slugify(form.name);
    const newProduct = { ...form, slug };

    if (editIndex === null) {
      newProduct.id = Date.now().toString();
      setProducts((p) => [...p, newProduct]);
      console.log("Yeni ürün eklendi:", newProduct);
    } else {
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
      console.log("Ürün güncellendi:", newProduct);
    }

    closeModal();
  };

  const onDelete = (i) => {
    const deleted = products[i];
    setProducts((p) => p.filter((_, idx) => idx !== i));
    console.log("Ürün silindi:", deleted);
  };

  return (
    <div className="space-y-4">
      {/* Üst buton */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Ürün Yönetimi</h2>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Yeni Ürün Ekle
        </button>
      </div>

      {/* Ürün tablosu */}
      <table className="w-full border-collapse border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Güncelle</th>
            <th className="border p-2">Sil</th>
            <th className="border p-2">Adı</th>
            <th className="border p-2">Kategori</th>
            <th className="border p-2">Fiyat</th>
            <th className="border p-2">Stok</th>
            <th className="border p-2">Tip</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">
                <button
                  onClick={() => openEditModal(i)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => onDelete(i)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2">{p.isSet ? "Set" : "Ürün"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {form && (
          <ProductManagerDetailView
            form={form}
            setForm={setForm}
            nonSetProducts={nonSetProducts}
            products={products}
            onClose={closeModal}
            onSave={onSave}
          />
        )}
      </Modal>
    </div>
  );
}
