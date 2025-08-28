import { FaImage, FaPlus, FaTrash } from "react-icons/fa";
import { navLinks } from "../../navLinks";

const categories = navLinks.map(link => link.category).filter(c => c !== null);

export default function ProductManagerDetailView({
  form,
  onChange,
  handleImageUpload,
  addImage,
  removeImage,
  addSize,
  removeSize,
  nonSetProducts,
  updateSubProduct,
  addSubProduct,
  removeSubProduct,
}) {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Ürün bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sol taraf: Görsel */}
        <div>
          <label className="block font-semibold mb-2">Ana Resim</label>
          {form.mainImage ? (
            <img
              src={form.mainImage}
              alt="Ana Resim"
              className="w-full h-64 object-cover rounded border mb-3"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100 border rounded mb-3">
              <span className="text-gray-500">Henüz resim seçilmedi</span>
            </div>
          )}
          <label className="cursor-pointer bg-gray-200 px-3 py-2 rounded flex items-center gap-2">
            <FaImage /> Resim Seç
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "main")}
              className="hidden"
            />
          </label>
        </div>

        {/* Sağ taraf: Bilgi Alanları */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Ürün Adı"
            className="text-2xl font-bold w-full border-b p-1"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Ürün açıklaması..."
            className="w-full border rounded p-2"
            rows={4}
          />

          <label className="block font-semibold">Kategori</label>
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="border rounded p-2 w-full"
          >
            <option value="">Kategori Seçin</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="price"
            value={form.price}
            onChange={onChange}
            placeholder="Fiyat"
            className="border rounded p-2 w-full"
          />

          <input
            type="text"
            name="cartPrice"
            value={form.cartPrice || ""}
            onChange={onChange}
            placeholder="Sepet Fiyatı"
            className="border rounded p-2 w-full"
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={onChange}
            placeholder="Stok"
            className="border rounded p-2 w-full"
          />

          <label className="inline-flex items-center mt-2">
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

      {/* Normal ürünler: Çoklu resim + beden */}
      {!form.isSet && (
        <>
          {/* Çoklu resim */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Ek Resimler</h3>
            <div className="flex gap-2 flex-wrap">
              {form.images?.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    className="w-24 h-24 object-cover border rounded"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    type="button"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <label className="cursor-pointer bg-gray-200 px-3 py-2 rounded flex items-center gap-1">
                <FaPlus /> Resim Ekle
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => addImage(e)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Bedenler */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Bedenler</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.sizes?.map((size, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {size}
                  <button
                    onClick={() => removeSize(idx)}
                    className="text-red-600 font-bold"
                    type="button"
                  >
                    ✖
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Beden ekle ve Enter'a bas"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  addSize(e.target.value.trim());
                  e.target.value = "";
                }
              }}
              className="border rounded p-2 w-64"
            />
          </div>
        </>
      )}

      {/* Set ürünler: alt ürün seçimi */}
      {form.isSet && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">Alt Ürünler</h3>
            <button
              onClick={addSubProduct}
              className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
              type="button"
            >
              <FaPlus /> Alt Ürün Ekle
            </button>
          </div>

          <div className="space-y-4">
            {form.products.map((subProduct, index) => {
              // sadece aynı kategorideki set olmayan ürünler
              const availableProducts = nonSetProducts.filter(
                (p) => p.category === form.category
              );

              return (
                <div key={index} className="border rounded p-3 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <select
                      value={subProduct.product?.id || ""}
                      onChange={(e) => {
                        const selected = availableProducts.find(
                          (p) => p.id.toString() === e.target.value
                        );
                        updateSubProduct(index, "product", selected);
                      }}
                      className="border rounded p-2 flex-1"
                    >
                      <option value="">Ürün Seçin</option>
                      {availableProducts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>

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
                      className="border rounded p-2 w-20"
                    />

                    <button
                      onClick={() => removeSubProduct(index)}
                      className="text-red-600 hover:text-red-800"
                      type="button"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
