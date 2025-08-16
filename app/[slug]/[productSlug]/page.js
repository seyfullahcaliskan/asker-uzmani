import products from "../../components/layout/data/products";
import ProductDetailPage from "../../components/layout/ProductDetailPage";
import { getCategoryBySlug } from "../../navLinks";

export default async function ProductDetail({ params }) {
    const { slug, productSlug } = await params;

    const categoryInfo = getCategoryBySlug(slug);

    const product = products.find((p) => p.slug === productSlug);

    if (!categoryInfo) {
        return (
            <div className="container mx-auto py-12 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Kategori bulunamadı
                    </h1>
                    <p className="text-gray-600">Aradığınız kategori mevcut değil.</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto py-12 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Ürün bulunamadı
                    </h1>
                    <p className="text-gray-600">Aradığınız ürün mevcut değil.</p>
                </div>
            </div>
        );
    }

    const belongsToCategory = () => {
        if (categoryInfo.filterBy === "isSet") {
            return product.isSet;
        } else if (categoryInfo.filterBy === "category") {
            return product.category === categoryInfo.category && !product.isSet;
        }
        return false;
    };

    if (!belongsToCategory()) {
        return (
            <div className="container mx-auto py-12 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Ürün bu kategoride bulunamadı
                    </h1>
                    <p className="text-gray-600">Bu ürün seçilen kategoriye ait değil.</p>
                </div>
            </div>
        );
    }

    return (
        <ProductDetailPage
            productData={product}
            isSet={categoryInfo.filterBy === "isSet"}
            categoryInfo={categoryInfo}
        />
    );
}