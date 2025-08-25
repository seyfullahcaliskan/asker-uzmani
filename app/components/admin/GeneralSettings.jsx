import { useState } from "react";

const BANKS = [
  "Akbank",
  "Garanti BBVA",
  "İş Bankası",
  "Yapı Kredi",
  "Halkbank",
  "Vakıfbank",
  "Denizbank",
  "QNB",
  "TEB",
  "ING BANK",
  "HSBC",
  "Ziraat Bankası",
];

const BANK_LOGOS = {
  Akbank: "https://www.akbanklab.com/uploads/20170905160844774.jpg",
  "Garanti BBVA":
    "https://vectorseek.com/wp-content/uploads/2024/06/Garanti-Bankasi-BBVA-Logo-Vector.svg-.png",
  "İş Bankası":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/T%C3%BCrkiye_%C4%B0%C5%9F_Bankas%C4%B1_logo.svg/1280px-T%C3%BCrkiye_%C4%B0%C5%9F_Bankas%C4%B1_logo.svg.png",
  "Yapı Kredi":
    "https://1000logos.net/wp-content/uploads/2021/05/Yapi-Kredi-logo.png",
  Halkbank:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbxZYEqWS3iavdAUQsm60o6SC28YFG5JLug&s",
  Vakıfbank:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Vak%C4%B1fbank_logo.svg/2560px-Vak%C4%B1fbank_logo.svg.png",
  Denizbank:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBmA02Fu3CIItTIi00zZlxQf6pIpiUI7zIwA&s",
  QNB: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYUAAACBCAMAAAAYG1bYAAAAzFBMVEX///8AJFrHAVAAIFgAIlkAF1QAGVUAHlbh5u3q7vLx9Pc4UnwAKF8ZN2lebo8AHFZqfJvc4ekfPGsAF1eDk6wKMWbGAEqotMYACE8AElOgq74rSHazvMv2+PoAJF4AH1vO1eC+x9XLAFjvvM/Hz9v76/H+9/qTobdzhaLFAEdDW4JOZIowS3f43OfomrjjhKiHlq/onLnhgKRLYoh7i6c/V3+hrsHsqcOXo7jdcpnVTX7TQHb0zt7PImfZW4vRLW3aWovutcvfb5sAAFGA5hdpAAARfklEQVR4nO2de3vauBLGTSwbbLCNcYhxwFxSGmigLachaXrds93v/52Or2BpRrIMpu2e+v1jn20AX/TzjKSZkawojRo1atSoUaNGjRo1atSoUaNGjRo1atSoUaNGP1X39/e/+hL+dN2/+vT5y+dPr371dfxBuv/K/uXt55tUn9+WfrdRLXr15eod/Ze3326uUt18Y1r909X3hkP9+ho99lc3FIb7LzmECMNfr4sffXhzdXP1gzWQWhQanY4bqdMxwksc/zfW6/d3SYtTGD4eIVxdvXlf+ORD+uW7d7V23KGxfFnbD+PBsDedTofW+Mlevyz/HBav/nqTP/MFDN+LFK4KxvD+4Ki+1OaWjMn109TTNN1RVZJIVR1d07zew27xJ4C4f39VcD0HDK+/FSFc3R0a/H3h23f/qeMKzIk91D2HtBARJ5gN9ssSEGYfqlN21j3zg7WRfhDukKMhWq/31y/+ZOka5zfB289viq19wPD6jqJwkw9X31EmcvPjNe/Asursxp6GEsilBrMn3xQdw4jMhtGoX3ZeK6B+EAwzbuY2AEfjKAhGwWw4flj77lkG+/Ub1apRu2Y9AIfCO+brb76c10l39lagihDkFjG+Fdyn0QMYiTcpOfOAPq9q5RS67dILos6kOtpo+nQ9PxnExzumVQ/WgFNgIcSj2DMmdeHK8soZJLfaDroL7nEQCi1nKzSf+iik1+do2sY/jcP9f9+wrZpbA0rhP/Db9PCpmpZdCTso3CfX12MUWsFOePJ6KcQXqHuCB0Wk++88DBiFjxiEDyedWIl7waku7A/AbWoDzl2iFMhwLjp97RQiOfr6pK76/jvwMSkGhAIG4eZkCIYdVGKQ3OVshR8Lo9DSNqLzX4JCiwTdebVm8PexG+NZA6SAWkLijsx+dUt0u9pJd7nGfC9OoRX4ggu4CIVWSx/MqzTDYjpapxhQawAU/sYsIYVgjyy3yqkjuQP9tLsMbKTT5VBojwX+4UIUWs6gbKZS0Nxqt4J1/H+4NfygKVyx/y5C8Fp6t5o/dAfOqXeJYeBQaHl7/iVcikLkCKWHSmY3fhYDgTWU/PsIYRP7d82uAqGzFVoCEXYYAZyP8SiQ2fLnU2gFt7LtsA7SH6y5fUOpihCiI73IQzAfeX0Caeue52la9B+9zWMBh6A8Ci39kftcXo6COpB0DH4+RhRYgxQEY+OlRyI9/mPHao2PjuKYUdfer259/3Z1bXdnASe2pLO9LpdCy+M+l5ejIPtEdqzDiYJ+guFHVWvILcHL719/kHWHPjpNIF5v8+wWfL7p+vYQndapQ2YwwKegDnl9ZQUKzghREGgOx1ydrlQ79L0CuAxDNWvILeH4VJMAH8vD27ewZ00f9pFxlruzMOelMx0gn0JL40X15Cm07YkPdLvarTdba4ZFYIg6l2iHBfUwnmINabDJfPQKBwJPKEd9pF1JsOFcuNvHzIHpAAUUiM6Zy8hT0PihkM5iP0QCwnw/eFTYpYeJ1a0hhWBQEASPHaUFctXq7IXvzvwetJ1Dk6USUIjcAx7Vq0DhWnQ/xvUMnFymJXyP+ZFX0RpyCEx7isaFRz3CQWq7J4xCLyw4uQiomYCIQovjKeuiELUnwODwh2a5zDG4qdQaFFlryCAE7GFYd41pwj4C0f33SgIgyyFwSoRyf0IKHE9ZHwVlz96TOhZH1SO5Q+TRqmANmSU8QPeucYy/KGgKxBOFexJNPNDK1LRYSKGlozPKGim4Q+b0qlU+Y5hjFt5PGlDGGjII8JnWuuURlCUYpRKv7CYV5GlrkWnhRsUUWgHm8GqkoDwyDUp6EvM2DINnJ9bwqcwaBJawlQhjrcHvynJiiRAv6hWmRiUU2lukUeqk0GcMnAxlZs+oNaRRsk8l1pBA6CCWoEtYgmIAD09mUlFx2J04T8dOqIQC05enqpPCmqGgWhJPFg9DclsfRBhuktIX4wnrE2QCuj6IXejCVMxB4RM0hvnhU0hBpf5ApnNwxEvaQru8d040h6FlklmDCEMCoXMyBMUGfbMnmSCC/AqNw1Iglk3fHhLVq5PChmlM3ZaM5mAYvDJrONMSFGPAOiSnK3m9yE+PLglQGC639O15z+wBa6QArk2U16CFJFrKrOFjcvUYhCe5/NISTDEE0QFGoF8nvcM8AFDodZiOBEb1aqQA7FQvqYUqCEk6ijEkEAwkXywLQVmxFIgunSqFc4bR4V4hBVex6evU1szx6qPQGTM/kBqo5kIxbLgYUktAIciedMOeUNohYT3wceSDUXDp4RiI6tVGofPA3lXAEhfKHUMMWorhPcAggCCb7g7HrG/XpB2oEj6wHtR5zD/DKESGR/2RBV4TBeMWPMtqr1otBIYh2CRPNouBD+FB2vzATJ9opcGLo65Zd6YO8nZFKTChYzb/IU9B3xsdVO5iZQ9g4F020XJsFwSDh2EQQJAv/FjM2HOp8mlS5ZmduB0jeiiF6HTUX5moXoVc29DCNOxpgafD5IcnO0wtXMsWBO+hNdzwITiPFTqiCeicq3RjkOE0Z4hTYIdVdJ1IBQpExURIC5uxZz2rSMmasaI6EwspOk+b9l1W/vLm7u/kt1sIQR0v2CMKFlW8QJ8iDwH6s5aWD5I4FDpMvIQqpr9M9l9Fq9ZomQ+9ISNrCA+VW8PX798iEN8+JUsUXARCbKzsAXv8PBOIjDpPFSgYgEKQT8U4FFgn5hSjehehoPck+gRj6BBW6NEya1Devnr1NV2twyvkAsfT+S3Lhls4kX+OQjB7PlSc8CiETDYjKIx2LkCBzHjZc0od6QrdgOlisMkaLkGeCUSRwFRKKNCFHQYjPArKfEpH9XrHVroABRlDiC8KRBC4YoZbfRjK5ohJzBfFJkMqxFtigdY5FOlxKbDD20JO9hIeadCXGfMtYOaQJ5VKVDDPlEiEXxAD5l2BRJrtKBDclqBgjHlRvUtQINrMLp+xIflbrqg04e1I/kr4S2j4zSglCLGcAjs6PmaELzNGItqwtBbJr0DBK7qkvfySj6LvLW3GSrYAPVJpvxCJiep5eVd0qTpVNdiXzNpOpgDTxVwd51JAoF+o1juDKNQof+xEFNioXl40dbFqYc56o5Mo0OuFXyp4JL4twDGSVDVfptACI9U8CiWiAKJ6WXLokjXbYhOv0C+QGdU7wypA7g/5/QKoUJVMOqfqgFigVzJ3TgWiei9VKThegEvjlPaLV7wvpcebbIycu+4DSDBSBVHRtlyJeao5SDAcyjeEFDhRvQo125vnW0Qvq13/oedpSDGzI1pQp3SkKThjui3nQ1kzFczawEhLtSqEHycgmnfwfWIKIKrXr0ZBkJUNzcXaQsqfhYM/GIrhyMndimlkbTqZSmIQxIYmbH6W9Cqsh7wFEdmD1ZVQMCwkqldfrm0NV8UIF1WZXbmllY6VDCRC3+6Ou9li5glSwI5JEBtagrlfaUlYwVbAOE0dH5pZTAGN6tWY/X+GvaZoqXVojzxG2IolZ5hAcJ8Cva06mtdPwE6m6Oom9oD/8K/ZBVF0r2QF2Msxm8quuij27WUUQibhHTuMOuuRVmDUI4xTmmzSzlgMAEfHmsffXVrZpZMgzach1qBu5yAbyHf1IYjHlQRVV542nmf/3wEP3HFAWEYBi+rVSQFWDkqv80wvD5bhZu5oWSiizBL8CAZHrhwsE5gwiAs6d9Ejpg+yWdZzxUoYWszwTNvUSkG5ZXtowdwVClkm46QbOSypVQ5Z7d0CYtDHFQoOQLJNVCAZ7pPO3MkW+gCCZCqoCmMvymBr9Xy2oO4sCjDaOZIvDFv0EEuYx58smaUmAgwVtt+Yg5Eyf/Yc5qui1WkcB3XBbKG95VdIwloUJqrXHs/rpBDCYinpVfg+7G9RS0gupZvcGIIh68tlZLBVbPw5Xtg/NJvq7bB1JPoRoAQFNqrn2GP6N+dRgNEV2dTJMwIBt4TkWrYZBmg+Q+mNeUDOk/fMFCDEEYG9C9KdpBB6l6HgwsVxlM6ioMDKBMlA5QuspcksYYFAOGKAH5as0SwILgbBS/1Nm3IgRAfxVGrtmAyFqFOix0ngeGdQMIFHkqSwg5G9zBJwCJEL4FqDOpWssTOB5RIPSdaa7PpRAp/jYo8iRQFOOOh7qLd3lkqdZAMQSkJLiJWNh5AvqLpkVSB071hVZ3R1pdsaBgU3KEVBWQoDw2dR8EEsSaZMMkS2ZdHLIIisgUguREBC5Ogq6RVSekjJ2RZ+JUdBWYuCmWdRgP3dqNw7mH1YjFFqCbH41kAks5dwTRU+nPDF0UNCLc6RpGAMBMc8hwJSHFG+aDK0IQTd4o1E6a+NudYgV9aygMZANMx6xY8D3alLUoAFxwWdQSGEjxYp3UnQ3CAQxlIQ4i/O4y8iY9nSfGsqxBiIjrmzOawnP4qOWcpSgMtYjjqdAubeS2s/zQ1MS0hDOHx1Ca2hJYUBS54SD9sN1u1yd1xltsSSpgDzdQedTGG+QfKQpTU+BtwlKmtZuRRC1osvYQhKsEtdQXCYFF/1GPGjhs25HpWpMJCmoOy41Ymn5do6ExvbIZnoc+5vMt2CJYm5Jcjteq3zohxya5fZcrlUjm7DQAhMSKRih4HyFPCTxxLtFQa3CvP95yTvPAzQ7edktuZhpi/Z+FM6p3lMQDARP8kKbKSDTi7D266WhT7X9fs9/Pw6GwKUp6AseGUMghqMtsamsjJpDqfmXbircSY6jpC7IzSVhguN+WHbHODiuQUnmA4e1rvb59vVfjMe8l6OoYL9SypQYKN6x6MK6pHA8gDeioNMcq65eCUHS5CHEI9rUwxFa5AvOg1tXl1U/EaJ+AUf8YIxlXujPfZMVSi4IIiSqsaqMMkUTyG+qKclL9UgYE5JaoedvNWQjX2q3CU7GKtCgY3q5aqzNk/yebzNfVK2nw6SaSgRmxdV5XbYyYQtVKx0nxtqZFuJAlw4nd5AfXWq0os8s1Uh+pZnCWLH1zpYQ77HT7Ui+AiDfJkgJu1JtG+ekAInqlcbBYlFnofrTvKwfEsgbebG4Cg2s4Z0cxmZjQvpCzjhJRhFUYnWahTwGUtNFCJLqFB9sYyaNbMEfwYhePst9Uf9mlusEVtDpZcOpAr3ki9G4sixquXaCkKjevW8i8TRrys9jhM96PIhrEyawmiCbC+WpTrnA41fLS+Qj+7eLK327BBWrUgB7ijbqoeCKnqRFq4XPoRobmqOGQpYAC/HMJYv+yjKtT35l2GoYJKq6hIrqnAhUb3z31HlBIOV/DgxV/IL3BIUhIKygHXbGYaT36E46cpxIGqw7YPeK8gn65UpIFG9sygQ0g5m3ZdT24EHAaOgLJCiDfn6C1ShP9bK3xfW9qyVARI/2Y7IygkUoum7fPZfqOgw0UxTm45LXzbK1zNcA5Gl4zEK2IjWKdueuUzhxJ5x1sRkzaMH41XylFGJH1JY52LMNL0obVqaY9kGOi2t8B5PXUrJqzw9z7Me9s9V3w5F6XkG9j/JaiJQCojpnGsMsdzdY2+kO0jIgjjaaGhPcm9bSPxQGVbTZlXqGxbgJ/38nbZ78BGq+K221yt/2THPfvXxwqL7KZIXU+AUQKn+sab6LIXupN+1pnH8yHHa7bbjOLoXjGZWtz8pjoHdfOtE4lWbJf7mmlMJLXJYUMChoLwUA3HRFKXyPIGvznLysrcfn7bbbffp0d6vJktg6EaarSVlCx/+bTLXx9lT4eZ4FIrVZM5099PfQ54kedWZ9Mu4/jXy8/VxpPAmEy6Fw/CCoFnKy2un67KlgP8qdfozJ+kTCmbOp6BcJ9agT69reNX6KXq2Tpsk/vZaRLMnVS+auYCCch0QR5fakOkyqrEv+r0U+lv6xUoiCsp+9PB/+jj+apl0lk5IQTl9ntioisQUGv0cNRR+B5njQq0NUf9pKPwKhbY1HeU70PQG3QrLdxvVJ9Nw54uJ/+xPFvOO0fTGjRo1atSoUaNGjRo1atSoUaNGjRo1atToJ+l/vrGqcPVy1vYAAAAASUVORK5CYII=",
  TEB: "https://www.netkurumsal.com/wp-content/uploads/2018/07/teb-logo.png",
  "ING BANK":
    "https://cdn.uc.assets.prezly.com/54e22cdb-1eed-4dd8-8b7b-a0e27e0f9199/",
  HSBC: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8vCHBp23PRI1Awwg4T1PZEq31q7aTKFdHlQ&s",
  "Ziraat Bankası":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ziraat_Bankas%C4%B1_logo.svg/1024px-Ziraat_Bankas%C4%B1_logo.svg.png",
};

function turkishToEnglish(str) {
  const map = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };
  return str
    .split("")
    .map((ch) => map[ch] || ch)
    .join("");
}

function slugify(text) {
  let slug = turkishToEnglish(text)
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug;
}

export default function GeneralSettings({
  generalData,
  setGeneralData,
  navLinks,
  setNavLinks,
  onlinePayment,
  setOnlinePayment,
  bankAccounts,
  setBankAccounts,
  bankLogo,
  setBankLogo,
}) {
  const [newNavLabel, setNewNavLabel] = useState("");
  const [newBank, setNewBank] = useState({
    holder: "",
    displayIban: "",
    bank: BANKS[0],
  });

  // NavLink işlemleri
  const addNavLink = () => {
    if (!newNavLabel.trim()) return alert("Label boş olamaz");
    const slug = slugify(newNavLabel);
    const href = "/" + slug;
    if (navLinks.some((l) => l.slug === slug)) {
      return alert("Bu slug zaten mevcut");
    }
    const newLink = {
      href,
      label: newNavLabel.trim(),
      slug,
      category: newNavLabel.trim(),
      filterBy: "category",
      isHomePage: false,
    };
    setNavLinks((prev) => [...prev, newLink]);
    setNewNavLabel("");
    console.log("NavLink eklendi:", newLink);
  };

  const removeNavLink = (slug) => {
    if (slug === null) return alert("Ana Sayfa silinemez");
    setNavLinks((prev) => prev.filter((l) => l.slug !== slug));
    console.log("NavLink silindi:", slug);
  };

  const updateNavLabel = (slug, newLabel) => {
    if (slug === null) return;
    const newSlug = slugify(newLabel);
    const newHref = "/" + newSlug;
    setNavLinks((prev) =>
      prev.map((l) =>
        l.slug === slug
          ? {
              ...l,
              label: newLabel,
              slug: newSlug,
              href: newHref,
              category: newLabel,
            }
          : l
      )
    );
    console.log("NavLink güncellendi:", newLabel);
  };

  // Banka hesapları işlemleri
  const addBankAccount = () => {
    const { holder, displayIban, bank } = newBank;
    if (!holder.trim() || !displayIban.trim()) {
      return alert("İsim ve IBAN boş olamaz");
    }
    const iban = displayIban.replace(/\s+/g, "").toUpperCase();
    if (bankAccounts.some((acc) => acc.iban === iban)) {
      return alert("Bu IBAN zaten mevcut");
    }
    const newAccount = {
      holder: holder.trim(),
      displayIban: displayIban.trim(),
      iban,
      bank,
    };
    setBankAccounts((prev) => [...prev, newAccount]);
    setNewBank({ holder: "", displayIban: "", bank: BANKS[0] });
    console.log("Banka hesabı eklendi:", newAccount);
  };

  const removeBankAccount = (iban) => {
    setBankAccounts((prev) => prev.filter((acc) => acc.iban !== iban));
    console.log("Banka hesabı silindi:", iban);
  };

  // Genel data değişimi
  const onGeneralDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  // Online payment değişimi
  const onOnlinePaymentChange = (e) => {
    setOnlinePayment(e.target.value === "true");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      {/* Genel Ayarlar Bölümü */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300">
          Genel Ayarlar
        </h2>
        <div className="flex justify-between gap-6 items-center">
          <label className="inline-flex items-center space-x-2 text-gray-700 font-medium">
            <input
              type="checkbox"
              name="freeCargo"
              checked={generalData.freeCargo}
              onChange={onGeneralDataChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Ücretsiz Kargo</span>
          </label>
          <label className="flex flex-col text-gray-700 font-medium">
            Ücretsiz Kargo Fiyatı:
            <input
              type="number"
              name="freeCargoPrice"
              value={generalData.freeCargoPrice}
              onChange={onGeneralDataChange}
              className="mt-1 border border-gray-300 rounded-md p-2 w-36 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col text-gray-700 font-medium">
            Kargo Ücreti:
            <input
              type="number"
              name="cargoPrice"
              value={generalData.cargoPrice}
              onChange={onGeneralDataChange}
              className="mt-1 border border-gray-300 rounded-md p-2 w-36 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          {/* <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Online Payment
          </h3>
          <select
            value={onlinePayment ? "true" : "false"}
            onChange={onOnlinePaymentChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="true">Aktif</option>
            <option value="false">Pasif</option>
          </select>
           */}
          <label className="flex flex-col text-gray-700 font-medium">
            Online Ödeme:
            <select
              value={onlinePayment ? "true" : "false"}
              onChange={onOnlinePaymentChange}
              className="mt-1 border border-gray-300 rounded-md p-2 w-36 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="true">Aktif</option>
              <option value="false">Pasif</option>
            </select>
          </label>
        </div>
      </div>

      {/* Navigasyon Linkleri Bölümü */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
          Navigasyon Linkleri - Kategoriler
        </h3>
        <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-3 text-left text-gray-700">
                Label
              </th>
              <th className="border border-gray-300 p-3 text-left text-gray-700">
                Slug
              </th>
              <th className="border border-gray-300 p-3 text-left text-gray-700">
                Href - Url
              </th>
              <th className="border border-gray-300 p-3 text-center text-gray-700">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody>
            {navLinks.map((link) => (
              <tr
                key={link.slug ?? "homepage"}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="border border-gray-300 p-3">
                  {link.isHomePage ? (
                    <span className="font-semibold text-gray-600">
                      {link.label} (Değiştirilemez)
                    </span>
                  ) : (
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) =>
                        updateNavLabel(link.slug, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                </td>
                <td className="border border-gray-300 p-3 text-gray-700">
                  {link.slug ?? "-"}
                </td>
                <td className="border border-gray-300 p-3 text-gray-700">
                  {link.href ?? "-"}
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  {!link.isHomePage && (
                    <button
                      className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-200"
                      onClick={() => removeNavLink(link.slug)}
                      type="button"
                      aria-label={`Sil ${link.label}`}
                    >
                      Sil
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-3 mt-4">
          <input
            type="text"
            placeholder="Yeni link label"
            value={newNavLabel}
            onChange={(e) => setNewNavLabel(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addNavLink}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
            type="button"
          >
            Ekle
          </button>
        </div>
      </section>

      {/* Banka Hesapları Bölümü */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
          Banka Hesapları
        </h3>
        <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-3 text-left text-gray-700">
                Hesap Sahibi
              </th>
              <th className="border border-gray-300 p-3 text-left text-gray-700">
                IBAN (Gösterim)
              </th>
              <th className="border border-gray-300 p-3 text-left text-gray-700">
                IBAN (Boşluksuz)
              </th>
              <th className="border border-gray-300 p-3 text-left text-gray-700">
                Banka
              </th>
              <th className="border border-gray-300 p-3 text-center text-gray-700">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((acc) => (
              <tr
                key={acc.iban}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="border border-gray-300 p-3">{acc.holder}</td>
                <td className="border border-gray-300 p-3">
                  {acc.displayIban}
                </td>
                <td className="border border-gray-300 p-3">{acc.iban}</td>
                <td className="border border-gray-300 p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={BANK_LOGOS[acc.bank]}
                      alt={acc.bank}
                      width={24}
                      height={16}
                      className="object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <span>{acc.bank}</span>
                  </div>
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <button
                    className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-200"
                    onClick={() => removeBankAccount(acc.iban)}
                    type="button"
                    aria-label={`Sil ${acc.holder} hesabı`}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
          className="space-y-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            addBankAccount();
          }}
        >
          <input
            type="text"
            placeholder="Hesap Sahibi (İsim Soyisim)"
            value={newBank.holder}
            onChange={(e) =>
              setNewBank((prev) => ({ ...prev, holder: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="IBAN (Boşluklu Gösterim)"
            value={newBank.displayIban}
            onChange={(e) =>
              setNewBank((prev) => ({ ...prev, displayIban: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="grid grid-cols-2 items-center gap-3">
            <select
              value={newBank.bank}
              onChange={(e) =>
                setNewBank((prev) => ({ ...prev, bank: e.target.value }))
              }
              className="flex-grow border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 h-12"
              required
            >
              {BANKS.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            <div className="h-12 flex items-center justify-start rounded-md">
              <img
                src={BANK_LOGOS[newBank.bank]}
                alt={newBank.bank}
                style={{ maxHeight: "3rem", width: "auto" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Hesap Ekle
          </button>
        </form>
      </section>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <button
          className="mb-12 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
          onClick={() => {
            console.log("Genel Ayarlar Kaydedildi:", {
              generalData,
              navLinks,
              onlinePayment,
              bankAccounts,
              bankLogo,
            });
            alert("Genel ayarlar console.log ile kaydedildi.");
          }}
          type="button"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}
