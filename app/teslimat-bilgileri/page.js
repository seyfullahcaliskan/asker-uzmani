"use client";

export default function TeslimatBilgileri() {
    return (
        <div className="max-w-3xl mx-auto p-6 text-gray-800">
            <h1 className="text-2xl font-bold mb-4">Teslimat Bilgileri</h1>

            <ul className="list-disc ml-5">
                <li>Kargo firması: MNG Kargo</li>
                <li>14:00’a kadar verilen siparişler aynı gün kargoya verilir. Aksi takdirde ertesi gün gönderim yapılır (garanti edilmez).</li>
                <li>Ortalama teslim süresi 2 gündür; yoğunluk ve mücbir sebepler nedeniyle değişiklik gösterebilir.</li>
                <li>Hasarlı ürün durumunda alıcı, satıcıya iletilen kod ile geri gönderim yapar. Satıcı, geri gönderim ve iade sürecini yönetir.</li>
                <li>Ücret iadesi, PayTR üzerinden kargo tesliminden 1 iş günü içinde başlar.</li>
                <li>Alıcı, teslimat sırasında ürünü kontrol etmekle yükümlüdür ve hasarlı ürünleri tespit ederek iade sürecini başlatmalıdır.</li>
            </ul>
        </div>
    );
}
