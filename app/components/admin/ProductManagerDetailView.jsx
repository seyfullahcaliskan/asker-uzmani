"use client";

import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function ProductManagerDetailView({
  form,
  setForm,
  onClose,
  onSave,
  products,
  nonSetProducts,
}) {
  const [tab, setTab] = useState("general"); // general | images | sizes | subproducts

  const isSet = form.isSet || false;

  // Genel input değişimi
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Alt ürün güncelleme
  const updateSubProduct = (index, key, value) => {
    const updatedSubs = [...(form.subProducts || [])];
    updatedSubs[index] = { ...updatedSubs[index], [key]: value };
    setForm((f) => ({ ...f, subProducts: updatedSubs }));
  };

  // Alt ürün ekleme
  const addSubProduct = () => {
    setForm((f) => ({
      ...f,
      subProducts: [...(f.subProducts || []), { product: "", count: 1 }],
    }));
  };

  // Alt ürün silme
  const removeSubProduct = (index) => {
    const updated = [...(form.subProducts || [])];
    updated.splice(index, 1);
    setForm((f) => ({ ...f, subProducts: updated }));
  };

  // Beden ekleme
  const addSize = (value) => {
    if (!value) return;
    setForm((f) => ({ ...f, sizes: [...(f.sizes || []), { value }] }));
  };

  const removeSize = (index) => {
    const updated = [...(form.sizes || [])];
    updated.splice(index, 1);
    setForm((f) => ({ ...f, sizes: updated }));
  };

  // Görsel ekleme
  const addImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const path = URL.createObjectURL(file);
    setForm((f) => ({ ...f, images: [...(f.images || []), { path }] }));
  };

  const removeImage = (index) => {
    const updated = [...(form.images || [])];
    updated.splice(index, 1);
    setForm((f) => ({ ...f, images: updated }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal arka plan */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal içerik */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Başlık */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {form.id ? "Ürün Güncelle" : "Yeni Ürün Ekle"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg"
          >
            ✖
          </button>
        </div>

        {/* Tablar */}
        <div className="flex border-b gap-4 px-4 py-2">
          <button
            className={`pb-2 ${tab === "general" && "border-b-2 border-blue-600 font-semibold"}`}
            onClick={() => setTab("general")}
          >
            Genel
          </button>
          <button
            className={`pb-2 ${tab === "images" && "border-b-2 border-blue-600 font-semibold"}`}
            onClick={() => setTab("images")}
          >
            Görseller
          </button>
          {!isSet && (
            <button
              className={`pb-2 ${tab === "sizes" && "border-b-2 border-blue-600 font-semibold"}`}
              onClick={() => setTab("sizes")}
            >
              Bedenler
            </button>
          )}
          {isSet && (
            <button
              className={`pb-2 ${tab === "subproducts" && "border-b-2 border-blue-600 font-semibold"}`}
              onClick={() => setTab("subproducts")}
            >
              Alt Ürünler
            </button>
          )}
        </div>

        {/* İçerik */}
        <div className="p-4 space-y-4">
          {tab === "general" && (
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                placeholder="Ürün Adı"
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                placeholder="Ürün açıklaması..."
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
              <input
                type="text"
                name="price"
                value={form.price || ""}
                onChange={handleChange}
                placeholder="Fiyat"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="cartPrice"
                value={form.cartPrice || ""}
                onChange={handleChange}
                placeholder="Sepet Fiyatı"
                className="w-full border rounded px-3 py-2"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isSet"
                  checked={isSet}
                  onChange={handleChange}
                />
                Set Ürünü mü?
              </label>
            </div>
          )}

          {tab === "images" && (
            <div className="space-y-3">
              <h3 className="font-semibold">Ana Resim</h3>
              {form.mainImagePath && (
                <img src={form.mainImagePath} className="w-32 h-32 object-cover rounded" />
              )}
              <input type="file" onChange={(e) => setForm((f) => ({ ...f, mainImagePath: URL.createObjectURL(e.target.files[0]) }))} />

              <h3 className="font-semibold">Ek Resimler</h3>
              <div className="flex flex-wrap gap-2">
                {form.images?.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img.path} className="w-20 h-20 object-cover rounded" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <label className="cursor-pointer bg-gray-200 px-3 py-2 rounded flex items-center gap-1">
                  <FaPlus /> Resim Ekle
                  <input type="file" accept="image/*" onChange={addImage} className="hidden" />
                </label>
              </div>
            </div>
          )}

          {tab === "sizes" && (
            <div>
              <h3 className="font-semibold mb-2">Bedenler</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.sizes?.map((s, idx) => (
                  <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {s.value}
                    <button
                      onClick={() => removeSize(idx)}
                      className="text-red-600"
                    >
                      ✖
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Beden ekle ve Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    addSize(e.target.value.trim());
                    e.target.value = "";
                  }
                }}
                className="border rounded px-3 py-2 w-64"
              />
            </div>
          )}

          {tab === "subproducts" && (
            <div>
              <h3 className="font-semibold mb-2">Alt Ürünler</h3>
              <button
                onClick={addSubProduct}
                className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 mb-3"
              >
                <FaPlus /> Alt Ürün Ekle
              </button>
              <div className="space-y-3">
                {form.subProducts?.map((sub, i) => {
                  const selectedId = sub.product || "";
                  let available = nonSetProducts || [];
                  if (selectedId && !available.find((p) => p.id === selectedId)) {
                    const found = products.find((p) => p.id === selectedId);
                    if (found) available = [found, ...available];
                  }
                  return (
                    <div key={i} className="flex gap-2 items-center">
                      <select
                        value={selectedId}
                        onChange={(e) =>
                          updateSubProduct(
                            i,
                            "product",
                            e.target.value
                          )
                        }
                        className="border p-2 flex-1 rounded"
                      >
                        <option value="">Ürün Seçin</option>
                        {available.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="1"
                        value={sub.count}
                        onChange={(e) =>
                          updateSubProduct(i, "count", parseInt(e.target.value) || 1)
                        }
                        className="border p-2 w-20 rounded"
                      />
                      <button
                        onClick={() => removeSubProduct(i)}
                        className="text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Alt butonlar */}
        <div className="flex justify-end gap-3 p-4 border-t sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            İptal
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
