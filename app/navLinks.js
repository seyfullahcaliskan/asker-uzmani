import { getNavLinks } from "./utils/axiosInstance";
  const navLinks = await getNavLinks();

// Kategori bilgilerini almak için yardımcı fonksiyonlar
export const getCategoryBySlug = (slug) => {
  return navLinks.find((link) => link.slug === slug);
};

export const getNavigationLinks = () => {
  return navLinks;
};

// Ürünün kategorisine göre doğru slug'ı bul
export const getProductCategorySlug = (product) => {
  // Eğer ürün bir set ise, askerlik-setleri kategorisine yönlendir
  if (product.isSet) {
    return "askerlik-setleri";
  }

  // Değilse, ürünün category'sine göre slug bul
  const categoryLink = navLinks.find(
    (link) => link.category === product.category && link.filterBy === "category"
  );

  return categoryLink ? categoryLink.slug : null;
};

// Kategori adına göre slug bul
export const getCategorySlugByName = (categoryName) => {
  const categoryLink = navLinks.find((link) => link.category === categoryName);
  return categoryLink ? categoryLink.slug : null;
};
