"use client";

export default function MesafeliSatisSozlesmesi() {
    return (
        <div className="max-w-3xl mx-auto p-6 text-gray-800">
            <h1 className="text-2xl font-bold mb-4">Mesafeli Satış Sözleşmesi</h1>

            <p>Bu sözleşme, Özhan Ticaret tarafından işletilen e-ticaret sitesi kapsamında sunulan ürünlerin satışına ilişkin hükümleri düzenlemektedir. Alıcı, sipariş aşamasında sözleşmeyi kabul ederek, tüm şartları onaylamış sayılır.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Satıcı Bilgileri</h2>
            <ul className="list-disc ml-5">
                <li>Unvan: Özhan Ticaret</li>
                <li>Adres: Eti, Celal Bayar Blv. No:57 D:8, 06570 Çankaya/Ankara</li>
                <li>Yetkili: Talip HAN</li>
                <li>Telefon: 0312 232 39 05</li>
                {/* <li>E-posta: info@ozhanticaret.com</li> */}
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Alıcı ve Ürün Bilgileri</h2>
            <p>Alıcı, siteden sipariş edilen askeri giyim ve temel ihtiyaç ürünlerini elektronik ortam üzerinden satın alır. Sipariş esnasında ürünün adı, miktarı, birim fiyatı ve toplam tutarı açık şekilde gösterilir. Sipariş onayı alıcıya e-posta ile iletilir.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Ödeme ve Güvenli İşlem</h2>
            <ul className="list-disc ml-5">
                <li>Ödeme, PayTR güvenli ödeme sistemi üzerinden gerçekleştirilir.</li>
                <li>Kredi kartı, banka kartı veya diğer PayTR destekli ödeme yöntemleri kullanılabilir.</li>
                <li>Ödeme sırasında alınan kişisel ve finansal bilgiler, 3. şahıslarla paylaşılmaz ve yalnızca siparişin tamamlanması amacıyla kullanılır.</li>
                <li>Ödeme işlemi tamamlanmadan sipariş işleme alınmaz.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Teslimat ve Kargo</h2>
            <ul className="list-disc ml-5">
                <li>Kargo firması: MNG Kargo</li>
                <li>14:00’a kadar verilen siparişler aynı gün kargoya verilir, aksi takdirde ertesi gün gönderim yapılır (garanti edilmez).</li>
                <li>Ortalama teslim süresi 2 gündür, fakat hava, yoğunluk veya mücbir sebepler nedeniyle değişebilir.</li>
                <li>Alıcı, teslimat sırasında ürünleri kontrol etmekle yükümlüdür. Hasarlı ürün durumunda iade prosedürü uygulanır.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Cayma Hakkı</h2>
            <p>Alıcı, 14 gün içinde herhangi bir gerekçe göstermeksizin siparişi iptal edebilir. Cayma hakkının kullanımı için:</p>
            <ul className="list-disc ml-5">
                <li>Ürün orijinal ambalajında ve kullanılmamış olmalıdır.</li>
                <li>Satıcıya iletilen iade kodu ile ürün geri gönderilmelidir.</li>
                <li>Ücret iadesi, PayTR üzerinden kargo tesliminden itibaren 1 iş günü içinde başlar.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Kargo Ücreti ve Sorumluluk</h2>
            <p>Toplam sipariş bedeli 3.000 TL’nin üzerindeyse kargo ücreti satıcı tarafından karşılanır. Altında ise alıcı tarafından karşılanır.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Garanti ve Sorumluluk</h2>
            <ul className="list-disc ml-5">
                <li>Ürünler üretici garantisi kapsamında satılmaktadır.</li>
                <li>Taşıma sırasında oluşabilecek hasarlardan satıcı, kargo ile koordineli olarak sorumludur.</li>
            </ul>

            <p className="mt-4">Alıcı, siparişi onaylayarak yukarıdaki tüm şartları kabul etmiş sayılır.</p>
        </div>
    );
}
