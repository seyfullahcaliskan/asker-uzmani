"use client";

export default function GizlilikSozlesmesi() {
    return (
        <div className="max-w-3xl mx-auto p-6 text-gray-800">
            <h1 className="text-2xl font-bold mb-4">Gizlilik Sözleşmesi</h1>

            <p>Özhan Ticaret olarak kullanıcılarımızın gizliliğini önemsiyoruz. Bu gizlilik sözleşmesi, siteyi kullanırken toplanan bilgiler, kullanım şekli ve saklama prosedürlerini açıklar.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Toplanan Bilgiler</h2>
            <ul className="list-disc ml-5">
                <li>Kişisel Bilgiler: İsim, soyisim, e-posta, telefon numarası, adres gibi sipariş ve teslimat için gerekli bilgiler.</li>
                <li>Ödeme Bilgileri: Kredi/banka kartı bilgileri hiçbir şekilde sunucularımızda saklanmaz; yalnızca ödeme sağlayıcı (PayTR) üzerinden güvenli olarak işlenir.</li>
                <li>İletişim Bilgileri: E-posta ve telefon ile iletişim kurmak için gerekli bilgiler.</li>
                <li>Site Kullanım Bilgileri: IP adresi, tarayıcı tipi, ziyaret tarih ve saati, ziyaret edilen sayfalar gibi anonim bilgiler.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Bilgi Kullanımı</h2>
            <ul className="list-disc ml-5">
                <li>Siparişlerin işlenmesi ve teslimatın sağlanması.</li>
                <li>Müşteri hizmetleri ve destek sağlamak.</li>
                <li>Hukuki yükümlülüklerin yerine getirilmesi.</li>
                <li>Site kullanım analizi ve hizmet kalitesini artırmak.</li>
                <li>Kullanıcılara özel kampanya ve bilgilendirme e-postaları (kullanıcı onayı ile).</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Bilgi Paylaşımı</h2>
            <p>Kullanıcı bilgileri üçüncü taraflarla paylaşılmaz, sadece aşağıdaki durumlarda paylaşılabilir:</p>
            <ul className="list-disc ml-5">
                <li>Kargo ve lojistik şirketleri (sipariş teslimatı için).</li>
                <li>Ödeme sağlayıcıları (PayTR) yalnızca ödeme işlemleri için.</li>
                <li>Hukuki zorunluluk durumunda resmi makamlar ile.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Bilgi Güvenliği</h2>
            <ul className="list-disc ml-5">
                <li>Kullanıcı bilgileri güvenli sunucularda saklanır.</li>
                <li>Veri iletimi SSL/TLS protokolü ile şifrelenir.</li>
                <li>Yetkisiz erişim, kayıp veya sızıntıya karşı güvenlik önlemleri uygulanır.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Kullanıcı Hakları</h2>
            <p>Kullanıcılar aşağıdaki haklara sahiptir:</p>
            <ul className="list-disc ml-5">
                <li>Kişisel verilerine erişim hakkı.</li>
                <li>Yanlış veya eksik bilgilerin düzeltilmesini talep etme hakkı.</li>
                <li>Verilerin silinmesini veya işlenmesinin durdurulmasını talep etme hakkı.</li>
                <li>Verilerin işlenmesine itiraz etme hakkı.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Çerezler (Cookies)</h2>
            <p>Site, kullanıcı deneyimini geliştirmek için çerezler kullanır. Çerezler sayesinde kullanıcı tercihleri, oturum bilgileri ve analiz verileri saklanır. Kullanıcı tarayıcı ayarları ile çerezleri reddedebilir veya silebilir.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Değişiklikler</h2>
            <p>Gizlilik sözleşmesi zaman zaman güncellenebilir. Güncellemeler siteye yansıtılır ve kullanıcılar en güncel sözleşmeden sorumludur.</p>

            <p className="mt-4 font-medium">Bu gizlilik sözleşmesini kabul ederek, yukarıdaki tüm maddeleri anladığınızı ve onayladığınızı beyan etmiş olursunuz.</p>
        </div>
    );
}
