"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TbMinus, TbPlus, TbTrash } from "react-icons/tb";
import { MdOutlineTrendingDown } from "react-icons/md";
import { useCart } from "../hooks/useCart";
import { getProducts } from "../utils/axiosInstance";

export default function CustomSetPage() {
  const [groupedProducts, setGroupedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [discountRate, setDiscountRate] = useState(0.1); // %10
  const [discountThreshold, setDiscountThreshold] = useState(1000); // 5000 TL
  const [errorMessage, setErrorMessage] = useState("");
  const [hasMissingSize, setHasMissingSize] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productData = await getProducts();

        const filtered = productData
          .filter((p) => p.isSet?.id === 0)
          .map((p) => ({
            ...p,
            quantity: 1,
            selectedSize: p.sizes?.length > 0 ? "" : null,
          }));

        // Gruplama
        const groups = {};
        filtered.forEach((p) => {
          const category = p.category || "Diğer";
          if (!groups[category]) groups[category] = [];
          groups[category].push(p);
        });

        const categoryOrder = ["Tekstil", "Çanta", "Yardımcı Ürünler"];
        const orderedGroups = categoryOrder
          .filter((cat) => groups[cat])
          .map((cat) => ({
            category: cat,
            products: groups[cat],
          }));

        Object.keys(groups).forEach((cat) => {
          if (!categoryOrder.includes(cat)) {
            orderedGroups.push({ category: cat, products: groups[cat] });
          }
        });

        setGroupedProducts(orderedGroups);
      } catch (err) {
        console.error("Ürünler çekilirken hata:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateQuantity = (id, newQty) => {
    setGroupedProducts((prev) =>
      prev.map((group) => ({
        ...group,
        products: group.products.map((p) =>
          p.id === id ? { ...p, quantity: Math.max(0, newQty) } : p
        ),
      }))
    );
  };

  const updateSize = (id, size) => {
    setGroupedProducts((prev) =>
      prev.map((group) => ({
        ...group,
        products: group.products.map((p) =>
          p.id === id ? { ...p, selectedSize: size } : p
        ),
      }))
    );
  };

  const removeProduct = (id) => {
    setGroupedProducts((prev) =>
      prev.map((group) => ({
        ...group,
        products: group.products.filter((p) => p.id !== id),
      }))
    );
  };

  const selectedProducts = groupedProducts
    .flatMap((group) => group.products)
    .filter((p) => p.quantity > 0);

  const totalPrice = selectedProducts.reduce((sum, p) => {
    const price = p.cartPrice || p.price || 0;
    return sum + price * p.quantity;
  }, 0);

  const discountedTotal =
    totalPrice >= discountThreshold
      ? totalPrice - totalPrice * discountRate
      : totalPrice;

  useEffect(() => {
    // ❗ sürekli beden seçimi kontrolü
    const missingSize = selectedProducts.find(
      (p) => p.sizes?.length > 0 && !p.selectedSize
    );
    setHasMissingSize(!!missingSize);
    if (missingSize) {
      setErrorMessage(`Lütfen beden seçmeniz gereken ürünler için beden seçiniz !`);
    } else {
      setErrorMessage("");
    }
  }, [groupedProducts]);

  const handleAddToCart = () => {
    if (hasMissingSize || selectedProducts.length === 0) return;

    addToCart(
      {
        id: `manual-set-${Date.now()}`,
        slug: "kendi-setin",
        name: "Kendi Oluşturduğun Set",
        isSet: { id: 1 },
        subProducts: selectedProducts.map((p) => ({
          product: p,
          quantity: p.quantity,
          selectedSize: p.selectedSize,
        })),
        price: discountedTotal,
        mainImagePath: "/images/kendi-setin.png",
        isCustomSet: true,
      },
      null,
      1
    );
  };

  if (isLoading) {
    return <div className="text-center p-10">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* <h2 className="text-lg md:text-2xl font-bold mb-3">
        Kendi Askerlik Setini Hazırla
      </h2> */}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-center text-sm mb-4">
          {errorMessage}
        </div>
      )}

      {/* Web: kolonlar, mobil: tek sütun */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {groupedProducts.map((group) => (
          <div key={group.category} className="space-y-2">
            <h2 className="uppercase text-center text-lg font-bold text-gray-700 border-b border-gray-200 pb-1">
              {group.category}
            </h2>

            {/* Ürünler 3 satır görünür, scrollable */}
            <div className="max-h-[24rem] overflow-y-auto space-y-3">
              {group.products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-wrap items-center bg-white rounded-xl shadow-sm border border-gray-300 py-1 px-2 gap-2 hover:shadow-md transition"
                >
                  <Image
                    src={product.mainImagePath || product.images?.[0]?.path || "/images/no_image.jpg"}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                  />


                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {(product.cartPrice || product.price).toLocaleString("tr-TR")} ₺
                    </p>

                    {product.sizes?.length > 0 && (
                      <select
                        value={product.selectedSize || ""}
                        onChange={(e) => updateSize(product.id, e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-orange-300"
                      >
                        <option value="">Beden Seç</option>
                        {product.sizes.map((size) => (
                          <option key={size.id} value={size.value}>
                            {size.value}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <TbMinus size={16} />
                    </button>
                    <span className="w-6 text-center font-medium">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <TbPlus size={16} />
                    </button>

                    <button
                      onClick={() => removeProduct(product.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <TbTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Toplam ve Sepete Ekle */}
      <div className="bg-white border-t border-gray-200 p-4 rounded-xl shadow-md sticky bottom-0 left-0 right-0 z-10 mt-6">
        {totalPrice >= discountThreshold ? (
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col">
              <span className="text-sm text-gray-400 line-through">
                {totalPrice.toLocaleString("tr-TR")} ₺
              </span>
              <span className="text-lg font-bold text-gray-900">
                {discountedTotal.toLocaleString("tr-TR")} ₺
              </span>
            </div>
            <div className="flex items-center gap-1 text-red-500 font-medium">
              %{Math.round(discountRate * 100)}
              <MdOutlineTrendingDown />
            </div>
          </div>
        ) : (
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700">Toplam</span>
            <span className="font-bold text-gray-900">{totalPrice.toLocaleString("tr-TR")} ₺</span>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={hasMissingSize || selectedProducts.length === 0}
          className={`w-full py-3 rounded-xl font-bold text-lg shadow-md transition 
        ${hasMissingSize || selectedProducts.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"}`}
        >
          {hasMissingSize ? "Beden seçimi yapılmayan ürünleriniz var !" : "Sepete Ekle"}
        </button>
      </div>
    </div>


  );
}
