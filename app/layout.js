import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.css";
import RootClient from "./RootClient";

export const metadata = {
  title: "Asker Uzmanı - Özhan Asker Malzemeleri",
  description: "Özhan Asker Malzemeleri dijitalde! Güvenilir askeri malzeme tedariki ve hızlı sipariş için online mağazamızı keşfedin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}
