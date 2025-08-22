export const generalData = {
  freeCargo: false,
  freeCargoPrice: 3000,
  cargoPrice: 100,
};

// Geçici veri - Gelecekte veritabanından çekilecek
export const navLinks = [
  {
    href: "/",
    label: "Ana Sayfa",
    slug: null,
    category: null,
    isHomePage: true,
  },
  {
    href: "/askerlik-setleri",
    label: "Askerlik Setleri",
    slug: "askerlik-setleri",
    category: "Askerlik Setleri",
    filterBy: "isSet", // products.filter(p => p.isSet)
    isHomePage: false,
  },
  {
    href: "/tekstil",
    label: "Tekstil",
    slug: "tekstil",
    category: "Tekstil",
    filterBy: "category", // products.filter(p => p.category === "Tekstil" && !p.isSet)
    isHomePage: false,
  },
  {
    href: "/canta",
    label: "Çanta",
    slug: "canta",
    category: "Çanta",
    filterBy: "category", // products.filter(p => p.category === "Çanta")
    isHomePage: false,
  },
  {
    href: "/kunye-isimlik",
    label: "Künye - İsimlik",
    slug: "kunye-isimlik",
    category: "Künye - İsimlik",
    filterBy: "category", // products.filter(p => p.category === "Künye - İsimlik")
    isHomePage: false,
  },
  {
    href: "/yardimci-urunler",
    label: "Yardımcı Ürünler",
    slug: "yardimci-urunler",
    category: "Yardımcı Ürünler",
    filterBy: "category", // products.filter(p => p.category === "Yardımcı Ürünler")
    isHomePage: false,
  },
];

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
