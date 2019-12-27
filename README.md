# Lubię Placki 
Portal do dzielenia się przepisami na ciasta

## Jak otworzyć?
Pobierz to repozytorium na swój lokalny komputer (pobierz lub sklonuj):

![repozytorium na GitHubie](https://pics.tinypic.pl/i/00994/jntcj5e1sc6h.png)

Zapisz w wybranym przez siebie miejscu:

![klonowanie w terminalu](https://pics.tinypic.pl/i/00994/3zkj10wohx2a.png)

Otwarcie portalu składa się z trzech części:
- utworzenie bazy danych
- uruchomienie serwera
- włączenie strony

### Utworzenie bazy danych
`(pgAdmin 4)`

W folderze *lubie-placki/backend* powinien znajdować się plik *database.backup*:

![plik database.backup](https://pics.tinypic.pl/i/00994/4dy8d4u0jxnq.png)

Baza danych została stworzona na platformie PostgreSQL. Jeśli nie masz tego systemu, możesz go pobrać [TUTAJ](https://www.postgresql.org/download/)

Otwieramy program *pgAdmin 4*:

![program pgAdmin 4](https://pics.tinypic.pl/i/00994/dfv3m1rgxj51.png)

Tworzymy nową bazę danych:

![tworzenie bazy danych](https://pics.tinypic.pl/i/00994/albzeac4p7jp.png)

Nazywamy bazę danych: *lubie-placki*:

![nazywanie bazy danych](https://pics.tinypic.pl/i/00994/92lp38vibqzl.png)

Wybieramy opcję *Restore*:

![przywracanie z pliku](https://pics.tinypic.pl/i/00994/urww0qryjc0d.png)

Wybieramy plik *database.backup* z zapisaną bazą danych i zaznaczamy opcję *Clean before restore*:

![wybieranie pliku](https://pics.tinypic.pl/i/00994/xksbzjpmisnt.png)
![zaznaczanie opcji](https://pics.tinypic.pl/i/00994/wwgkpi8vgcm7.png)

Może wystąpić błąd, ale mimo wszystko baza danych powinna zostać zaktualizowana.

### Uruchomienie serwera
`(IntelliJ)`

Otwieramy folder *lubie-placki/backend*:

Klikamy prawym przyciskiem myszy na plik *LubiePlackiBackendApplication* w drzewie projektu i wybieramy opcję *Run...*:

![uruchamianie serwera](https://pics.tinypic.pl/i/00994/6rsv2dhgmglq.png)

W ten sposób uruchomiliśmy serwer:

![uruchomienie serwera](https://pics.tinypic.pl/i/00994/281i0krbrnem.png)

### Włączenie strony
`(Visual Studio Code)`

Otwieramy folder *lubie-placki*

Włączamy terminal (można utworzyć skrótu klawiszowego `` Ctrl + ` ``  ).

W terminalu wpisujemy `npm install`, by zainstalować wszystkie dependencje.

![wpisanie npm install](https://pics.tinypic.pl/i/00994/35g2dgldvbwd.png)

A następnie `npm start`, by włączyć stronę

![wpisanie npm start](https://pics.tinypic.pl/i/00994/9pogvbvi61f2.png)

Ostatecznie możemy cieszyć się naszą piękną stroną :)

![widok strony internetowej](https://pics.tinypic.pl/i/00994/c883std8emdp.png)
