# Lubię Placki 
Portal do dzielenia się przepisami na ciasta

## Jak otworzyć?

Otwarcie strony internetowej składa się z czterech części:
- pobranie repozytorium
- utworzenie bazy danych
- uruchomienie serwera
- uruchomienie strony

### Pobranie repozytorium

Pobierz to repozytorium na swój lokalny komputer (pobierz lub sklonuj):

![repozytorium na GitHubie](https://pics.tinypic.pl/i/00994/jntcj5e1sc6h.png)

Zapisz w wybranym przez siebie miejscu:

![klonowanie w terminalu](https://pics.tinypic.pl/i/00994/3zkj10wohx2a.png)


### Utworzenie bazy danych
`(pgAdmin 4)`


Baza danych została stworzona na platformie PostgreSQL. Jeśli nie masz tego systemu, możesz go pobrać [TUTAJ](https://www.postgresql.org/download/)

Otwieramy program *pgAdmin 4*:

![program pgAdmin 4](https://pics.tinypic.pl/i/00994/dfv3m1rgxj51.png)

Tworzymy nową bazę danych:

![tworzenie bazy danych](https://pics.tinypic.pl/i/00994/albzeac4p7jp.png)

Nazywamy bazę danych: *lubie-placki*:

![nazywanie bazy danych](https://pics.tinypic.pl/i/00994/92lp38vibqzl.png)

Podczas uruchomienia serwera tabele zostaną utworzone automatycznie.

### Uruchomienie serwera
`(IntelliJ)`

Otwieramy folder *lubie-placki/backend*:

Klikamy prawym przyciskiem myszy na plik *LubiePlackiBackendApplication* w drzewie projektu i wybieramy opcję *Run...*:

![uruchamianie serwera](https://pics.tinypic.pl/i/00994/6rsv2dhgmglq.png)

W ten sposób uruchomiliśmy serwer:

![uruchomienie serwera](https://pics.tinypic.pl/i/00994/281i0krbrnem.png)

### Uruchomienie strony
`(Visual Studio Code)`

Otwieramy folder *lubie-placki*

Włączamy terminal (można utworzyć skrótu klawiszowego `` Ctrl + ` ``  ).

W terminalu wpisujemy `npm install`, by zainstalować wszystkie dependencje.

![wpisanie npm install](https://pics.tinypic.pl/i/00994/35g2dgldvbwd.png)

A następnie `npm start`, by włączyć stronę

![wpisanie npm start](https://pics.tinypic.pl/i/00994/9pogvbvi61f2.png)

Ostatecznie możemy cieszyć się naszą piękną stroną :)

![widok strony internetowej](https://images.tinypic.pl/i/00994/pmr4uqyi89qr.png)
