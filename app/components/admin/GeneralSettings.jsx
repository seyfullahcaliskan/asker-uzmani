// GeneralSettings.js
"use client";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";

function turkishToEnglish(str) {
  const map = { ç: "c", Ç: "C", ğ: "g", Ğ: "G", ı: "i", İ: "I", ö: "o", Ö: "O", ş: "s", Ş: "S", ü: "u", Ü: "U" };
  return str.split("").map(ch => map[ch] || ch).join("");
}

function slugify(text) {
  return turkishToEnglish(text).toLowerCase().trim().replace(/[\s\W-]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function GeneralSettings({
  generalData,
  setGeneralData,
  navLinks,
  setNavLinks,
  onlinePayment,
  setOnlinePayment,
  banks,
  bankAccounts,
  setBankAccounts,
}) {
  const [newNavLabel, setNewNavLabel] = useState("");
  const [newBankAccount, setNewBankAccount] = useState({ holder: "", displayIban: "", bankId: banks[0]?.id || null });

  // NavLink işlemleri
  const addNavLink = () => {
    if (!newNavLabel.trim()) return alert("Label boş olamaz");
    const slug = slugify(newNavLabel);
    const href = "/" + slug;
    if (navLinks.some((l) => l.slug === slug)) return alert("Bu slug zaten mevcut");
    const newLink = { href, label: newNavLabel.trim(), slug, category: newNavLabel.trim(), filterBy: "category", isHomePage: false };
    setNavLinks((prev) => [...prev, newLink]);
    setNewNavLabel("");
  };

  const removeNavLink = (slug) => {
    if (slug === null) return alert("Ana Sayfa silinemez");
    setNavLinks((prev) => prev.filter((l) => l.slug !== slug));
  };

  const updateNavLabel = (slug, newLabel) => {
    if (slug === null) return;
    const newSlug = slugify(newLabel);
    const newHref = "/" + newSlug;
    setNavLinks((prev) =>
      prev.map((l) => l.slug === slug ? { ...l, label: newLabel, slug: newSlug, href: newHref, category: newLabel } : l)
    );
  };

  // Banka hesapları işlemleri
  const addBankAccount = () => {
    const { holder, displayIban, bankId } = newBankAccount;
    if (!holder.trim() || !displayIban.trim()) return alert("İsim ve IBAN boş olamaz");
    const iban = displayIban.replace(/\s+/g, "").toUpperCase();
    if (bankAccounts.some((acc) => acc.iban === iban)) return alert("Bu IBAN zaten mevcut");
    setBankAccounts((prev) => [...prev, { holder: holder.trim(), displayIban: displayIban.trim(), iban, bankId }]);
    setNewBankAccount({ holder: "", displayIban: "", bankId: banks[0]?.id || null });
  };

  const removeBankAccount = (iban) => {
    setBankAccounts((prev) => prev.filter((acc) => acc.iban !== iban));
  };

  const onGeneralDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value }));
  };

  const onOnlinePaymentChange = (e) => {
    setOnlinePayment(e.target.value === "true");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Kopyalandı: ${text}`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      {/* Genel Ayarlar */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300">Genel Ayarlar</h2>
        <div className="flex justify-between gap-6 items-center">
          <label className="inline-flex items-center space-x-2 text-gray-700 font-medium">
            <input type="checkbox" name="freeCargo" checked={generalData.freeCargo} onChange={onGeneralDataChange} className="form-checkbox h-5 w-5 text-blue-600" />
            <span>Ücretsiz Kargo</span>
          </label>
          <label className="flex flex-col text-gray-700 font-medium">
            Ücretsiz Kargo Fiyatı:
            <input type="number" name="freeCargoPrice" value={generalData.freeCargoPrice} onChange={onGeneralDataChange} className="mt-1 border border-gray-300 rounded-md p-2 w-36 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </label>
          <label className="flex flex-col text-gray-700 font-medium">
            Kargo Ücreti:
            <input type="number" name="cargoPrice" value={generalData.cargoPrice} onChange={onGeneralDataChange} className="mt-1 border border-gray-300 rounded-md p-2 w-36 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </label>
          <label className="flex flex-col text-gray-700 font-medium">
            Online Ödeme:
            <select value={onlinePayment.id === 1 ? "true" : "false"} onChange={onOnlinePaymentChange} className="mt-1 border border-gray-300 rounded-md p-2 w-36 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="true">Aktif</option>
              <option value="false">Pasif</option>
            </select>
          </label>
        </div>
      </div>

      {/* Banka Hesapları */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">Banka Hesapları</h3>
        <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-3 text-left text-gray-700">Hesap Sahibi</th>
              <th className="border border-gray-300 p-3 text-left text-gray-700">IBAN (Gösterim)</th>
              <th className="border border-gray-300 p-3 text-left text-gray-700">IBAN (Boşluksuz)</th>
              <th className="border border-gray-300 p-3 text-left text-gray-700">Banka</th>
              <th className="border border-gray-300 p-3 text-center text-gray-700">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((acc) => {
              const bank = banks.find((b) => b.id === acc.bankId);
              return (
                <tr key={acc.iban} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="border border-gray-300 p-3">{acc.holder}</td>
                  <td className="border border-gray-300 p-3">{acc.displayIban}</td>
                  <td className="border border-gray-300 p-3">{acc.iban}</td>
                  <td className="border border-gray-300 p-3 flex items-center gap-2">
                    {bank?.logoUrl && <img src={bank.logoUrl} alt={bank.name} className="w-14 h-14 object-contain" />}
                    <span>{bank?.name}</span>
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    <button className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-200" onClick={() => removeBankAccount(acc.iban)} type="button">Sil</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Yeni Banka Hesabı Formu */}
        <form className="space-y-4 mt-6" onSubmit={(e) => { e.preventDefault(); addBankAccount(); }}>
          <input type="text" placeholder="Hesap Sahibi (İsim Soyisim)" value={newBankAccount.holder} onChange={(e) => setNewBankAccount(prev => ({ ...prev, holder: e.target.value }))} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input type="text" placeholder="IBAN (Boşluklu Gösterim)" value={newBankAccount.displayIban} onChange={(e) => setNewBankAccount(prev => ({ ...prev, displayIban: e.target.value }))} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <select value={newBankAccount.bankId} onChange={(e) => setNewBankAccount(prev => ({ ...prev, bankId: e.target.value }))} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 h-12" required>
            {banks.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200">Hesap Ekle</button>
        </form>
      </section>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <button className="mb-12 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md" onClick={() => {
          console.log("Genel Ayarlar Kaydedildi:", { generalData, navLinks, onlinePayment, bankAccounts });
          alert("Genel ayarlar console.log ile kaydedildi.");
        }} type="button">Kaydet</button>
      </div>
    </div>
  );
}
