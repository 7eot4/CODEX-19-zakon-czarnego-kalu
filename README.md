# Zakon Czarnego Kału

Humorystyczny blog społeczności ZCK. Statyczny HTML, CSS i JavaScript; publikacja przez GitHub Pages. Artykuły inauguracyjne są fikcją redakcyjną. Projekt znaku na podstawie odręcznego szkicu udostępnionego przez użytkownika; oryginalne zdjęcie pozostaje poza repozytorium.

## Edycja

Artykuły: `entries` w `app.js`. Układ i treść: `index.html`. Wygląd: `style.css`. Wizytówki: `wizytowki.html` i `assets/wizytowka.svg`. Bez bazy danych i formularzy zbierających dane. Fonty Google mają lokalne zamienniki systemowe.

Podgląd: `python -m http.server 8193`. Publikacja następuje po push do `main`.

Wyszukiwarka łączy kategorie z wyszukiwaniem pełnej treści i ignoruje polskie znaki. Link `?wpis=<id>` otwiera konkretny artykuł. Dostępne są kopiowanie maksymy, kopiowanie linku i systemowe udostępnianie (z kopiowaniem jako zamiennikiem). Gdy schowek jest niedostępny, strona wyświetla tekst do ręcznego skopiowania. Animacje respektują ustawienie ograniczonego ruchu; przełącznik w stopce zapisuje preferencję lokalnie. Bez analityki i wysyłania wyszukiwanych haseł.

Wizytówki drukować w skali 100%, bez nagłówków i stopek przeglądarki, z włączonym drukowaniem tła. Format netto 85 × 55 mm; wersja biurowa bez spadów. Drukarnia może wymagać osobnego przygotowania produkcyjnego.
