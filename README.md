# Zakon Czarnego Kału

Humorystyczny blog społeczności ZCK. Statyczny HTML, CSS i JavaScript; publikacja przez GitHub Pages. Artykuły inauguracyjne są fikcją redakcyjną. Projekt znaku na podstawie odręcznego szkicu udostępnionego przez użytkownika; oryginalne zdjęcie pozostaje poza repozytorium.

## Edycja

Artykuły: `entries` w `app.js`. Układ i treść: `index.html`. Wygląd: `style.css`. Wizytówki: `wizytowki.html` i `assets/wizytowka.svg`. Bez bazy danych i formularzy zbierających dane. Fonty Google mają lokalne zamienniki systemowe.

Podgląd: `python -m http.server 8193`. Publikacja następuje po push do `main`.

Wyszukiwarka łączy kategorie z wyszukiwaniem pełnej treści i ignoruje polskie znaki. Link `?wpis=<id>` otwiera konkretny artykuł. Dostępne są kopiowanie maksymy, kopiowanie linku i systemowe udostępnianie (z kopiowaniem jako zamiennikiem). Gdy schowek jest niedostępny, strona wyświetla tekst do ręcznego skopiowania. Animacje respektują ustawienie ograniczonego ruchu; przełącznik w stopce zapisuje preferencję lokalnie. Bez analityki i wysyłania wyszukiwanych haseł.

Wizytówka do WhatsAppa: `assets/zck-whatsapp.png` (1080 × 1350), zamiennie JPG. Wariant poziomy: `assets/wizytowka.png` (1700 × 1100, 508 dpi) i `assets/wizytowka.svg` (85 × 55 mm). Wszystkie warianty zawierają kod QR prowadzący bezpośrednio na stronę główną. QR generowany lokalnie, korekcja Q, margines czterech modułów; bez usługi skracania lub śledzenia linków. `assets/qr-strona.svg` zawiera sam kod.

Strona `wizytowki.html` udostępnia pobieranie plików, opcjonalne systemowe udostępnianie pliku na obsługujących je telefonach oraz osobny link do WhatsAppa (udostępnia stronę, nie załącznik). Nic nie jest wysyłane automatycznie. PNG przesłany jako dokument zachowuje jakość oryginału.

Ponowne generowanie: `npm ci`, następnie `npm run cards` (Node.js, fonty Georgia i Arial zainstalowane w systemie). Generator: `scripts/generate-cards.cjs`. Kompozycje są wektorowe, a QR deterministyczny. Logo osadzone w SVG, monochromatyczna prezentacja realizowana filtrem SVG; oryginalny plik logo pozostaje niezmieniony. Do samego działania strony Node.js i instalowanie paczek nie są potrzebne.

Wizytówkę poziomą drukować w skali 100%, bez nagłówków i stopek przeglądarki. Format netto 85 × 55 mm; wersja biurowa bez spadów. Drukarnia może wymagać osobnego przygotowania produkcyjnego.
