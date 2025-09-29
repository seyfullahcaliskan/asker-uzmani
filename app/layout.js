import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.css";
import RootClient from "./RootClient";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}
