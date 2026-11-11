# Zakon Czarnego Kału

Humorystyczny blog społeczności ZCK. Statyczny HTML, CSS i JavaScript; publikacja przez GitHub Pages. Artykuły inauguracyjne są fikcją redakcyjną. Projekt znaku na podstawie odręcznego szkicu udostępnionego przez użytkownika; oryginalne zdjęcie pozostaje poza repozytorium.

## Edycja

Treści źródłowe: `i18n/pl.json`; metadane artykułów: `i18n/posts.json`. Tłumaczenia: `i18n/<kod>.json`. Szablony: `i18n/index.html.template` i `i18n/wizytowki.html.template`. Po zmianach wykonaj `python scripts/build-languages.py` — generuje stronę polską, pozostałe wersje językowe i pliki `locale.js`. Nie edytuj osobno wygenerowanych stron. Wygląd: `style.css`; wyłącznie dostosowanie wyboru języka i dłuższych napisów: `languages.css`. Bez bazy danych i formularzy zbierających dane. Fonty Google mają lokalne zamienniki systemowe.

Podgląd: `python -m http.server 8193`. Publikacja następuje po push do `main`.

Wyszukiwarka łączy kategorie z wyszukiwaniem pełnej treści i ignoruje polskie znaki. Link `?wpis=<id>` otwiera konkretny artykuł. Dostępne są kopiowanie maksymy, kopiowanie linku i systemowe udostępnianie (z kopiowaniem jako zamiennikiem). Gdy schowek jest niedostępny, strona wyświetla tekst do ręcznego skopiowania. Animacje respektują ustawienie ograniczonego ruchu; przełącznik w stopce zapisuje preferencję lokalnie. Bez analityki i wysyłania wyszukiwanych haseł.

## Wersje językowe

21 wersji: polska (domyślna), angielska, tajska oraz czeska, słowacka, słoweńska, chorwacka, bośniacka, serbska (cyrylica), czarnogórska (łacinka), bułgarska, macedońska, rosyjska, ukraińska, białoruska, kaszubska, śląska, górnołużycka, dolnołużycka, rusińska karpacka i rusińska panońska. Lista i nazwy własne języków: `i18n/languages.json`.

Zakres „wszystkie słowiańskie” oznacza współczesne języki, w tym regionalne i mniejszościowe oraz odrębne standardy bośniacki, chorwacki, serbski i czarnogórski. Nie obejmuje rekonstrukcji prasłowiańskiego, języków wymarłych, języków liturgicznych ani każdego dialektu. Kontekst klasyfikacyjny: [Cambridge, The Slavic Languages](https://assets.cambridge.org/97805212/23157/excerpt/9780521223157_excerpt.htm); odrębny kod rusińskiego panońskiego `rsk`: [IETF Language Subtag Registry discussion](https://mailarchive.ietf.org/arch/msg/ietf-languages/-Pml_LyahUzjayrvIwugu5AeGxc/).

Każda wersja ma osobny adres, np. `/en/`, `/th/`, `/csb/`, `/rsk/`, pełne pięć artykułów, interfejs, opisy dostępności, komunikaty oraz istniejącą podstronę wizytówek. Przełączenie języka zachowuje parametry linku do artykułu i kotwicę sekcji. Polska nazwa marki ZCK i maksyma „O to słowo z Gdańska!” pozostają w oryginale. Grafiki i zewnętrzne materiały wizytówki nie są przebudowywane. Tłumaczenia działają lokalnie z plików strony, bez wywołań usług tłumaczeniowych przez odwiedzających.

Tłumaczenia są robocze (przygotowanie maszynowe i redakcja), nie po korekcie rodzimych użytkowników języka; szczególnie warianty regionalne wymagają takiej korekty. Informacja o wersji roboczej widoczna jest na przetłumaczonych stronach. Testy techniczne sprawdzają kompletność 162 pól na język, pięć artykułów i interakcje; nie stanowią certyfikacji jakości językowej. Generator przerywa pracę przy brakującym polu lub uszkodzonym znaczniku parametrów.

Wizytówki drukować w skali 100%, bez nagłówków i stopek przeglądarki, z włączonym drukowaniem tła. Format netto 85 × 55 mm; wersja biurowa bez spadów. Drukarnia może wymagać osobnego przygotowania produkcyjnego.
