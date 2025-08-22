"use client";

import products from "../../components/layout/data/products";
import ProductDetailPage from "../../components/layout/ProductDetailPage";
import { getCategoryBySlug } from "../../navLinks";

export default function ProductDetailClient({ params }) {
  // params.value içindeki stringi JSON'a çevir
  const parsedParams = JSON.parse(params.value);
  const { slug, productSlug } = parsedParams;

  const categoryInfo = getCategoryBySlug(slug);
  const product = products.find((p) => p.slug === productSlug);

  if (!categoryInfo || !product) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1>Ürün veya kategori bulunamadı</h1>
      </div>
    );
  }

  const belongsToCategory = () => {
    if (categoryInfo.filterBy === "isSet") return product.isSet;
    if (categoryInfo.filterBy === "category")
      return product.category === categoryInfo.category && !product.isSet;
    return false;
  };

  if (!belongsToCategory()) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1>Bu ürün seçilen kategoriye ait değil</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <ProductDetailPage
        productData={product}
        isSet={categoryInfo.filterBy === "isSet"}
        categoryInfo={categoryInfo}
      />
    </div>
  );
}
