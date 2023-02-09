15.oldal

10.
DELETE FROM klubok WHERE klubNev = "ZZZ";

11.
UPDATE klubok SET klubNev = 'ADMIRAL' WHERE id = 1;

12.
SELECT AVG(pontok) FROM hajok;

13.
SELECT * FROM klubok WHERE klubNev LIKE "___";

14.
SELECT kormanyosNev, hajoNev FROM hajok WHERE kormanyosNev LIKE "%István%";

15.
SELECT count(id) FROM hajok WHERE ido IS NULL;

16.
SELECT ido, hajoNev, osztalynev FROM hajok
INNER JOIN osztalyok
on hajok.hajoOszt = osztalyok.id
WHERE ido IS NOT NULL
order by ido asc
limit 15