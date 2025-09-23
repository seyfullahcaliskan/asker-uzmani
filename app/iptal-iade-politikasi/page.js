"use client";

export default function IptalIadePolitikasi() {
    return (
        <div className="max-w-3xl mx-auto p-6 text-gray-800">
            <h1 className="text-2xl font-bold mb-4">İptal ve İade Politikası</h1>

            <p>Özhan Ticaret olarak müşteri memnuniyeti önceliğimizdir. Siparişlerinizi belirli şartlar altında iptal ve iade edebilirsiniz.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Sipariş İptali</h2>
            <p>Siparişiniz kargoya verilmeden önce iptal edilebilir. İptal talebi için müşteri hizmetleri ile iletişime geçmeniz yeterlidir. Kargo süreci başladıysa iptal işlemi mümkün değildir ve iade prosedürü uygulanır.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. İade Şartları</h2>
            <ul className="list-disc ml-5">
                <li>İade süresi: Ürün tesliminden itibaren 14 gündür.</li>
                <li>İade edilecek ürün, orijinal ambalajında ve kullanılmamış olmalıdır.</li>
                <li>Hasarlı, eksik veya hatalı ürünler, kargo ile satıcıya geri gönderilir ve prosedüre uygun olarak işleme alınır.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. İade Prosedürü</h2>
            <ul className="list-disc ml-5">
                <li>Alıcı, satıcıya iletilen iade kodunu kullanarak ürünü geri gönderir.</li>
                <li>İade edilen ürün satıcı tarafından kontrol edilir ve uygun bulunursa ücret iadesi başlatılır.</li>
                <li>Ücret iadesi PayTR üzerinden kargo tesliminden itibaren 1 iş günü içinde yapılır.</li>
                <li>Kargo ücreti: Ücret 3.000 TL’yi geçtiyse satıcı, altında ise alıcı tarafından karşılanır.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Hasarlı Ürünler</h2>
            <p>Hasarlı ürünler için alıcı, kargo ile satıcıya geri gönderim sağlar. Satıcı iade ve değişim sürecini yürütür ve ücret iadesi veya değişim işlemini hızlı şekilde tamamlar.</p>
        </div>
    );
}
