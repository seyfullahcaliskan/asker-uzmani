import products from "../../components/layout/data/products";
import ProductDetailPage from "../../components/layout/ProductDetailPage";

export default function SetDetail({ params }) {
  const slug = params?.slug;
  const set = products.find((s) => s.slug === slug);

  if (!set) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Set bulunamadı
          </h1>
          <p className="text-gray-600">Aradığınız set mevcut değil.</p>
        </div>
      </div>
    );
  }

  return <ProductDetailPage productData={set} isSet={true} />;
}
