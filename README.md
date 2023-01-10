# Anim'API

Anim'API est une API RESTFULL qui permet à des utilisateurs authentifiés de créer, modifier, mettre a jour et supprimer des personnages, des animes, ainsi que des comptes rendus de combats qui voient s'affronter les personnages en 1 contre 1. Chaque utilisateur peut créer un personnage, un anime ou engager un combat. Une fois que l'utilisateur créé un personnage, un anime ou un combat, celui ci lui est associé, et seul l'utilisateur qui est associé à ce personnage, cet anime ou ce combat peut le modifier, récupérer ces informations. Exception faite pour la récupération, un admin possède les droits pour récupérer tous les personnages présents dans la base de donnée. Un personnage appartient à un anime (relation One-to-One) et un anime possède plusieurs personnages (One-to-many).

## Fonctionnalité

La fonctionnalité principale de cet API est de faire s'affronter 2 personnages d'anime dans un combat pour voir lequel des 2 est le vainqueur. Lors d'un combat, on soustrait le nombre de points de vie d'un personnage à la puissance d'un 2e personnage. Le 1er personnage pour lequel les points de vie tombent à 0 perd le combat.

## Initialisation

Pour se connecter a une base de données :
```bash
npm start
```
Pour synchroniser la base de donnée :
```bash
npm run migrate
```

## Utilisation

Voici quelques exemples de requêtes que vous pouvez envoyer : 

```http
### ---------------------------------------------Requêtes User-------------------------------------------------------------------

### ---------------------------------------------Tests Savindu-------------------------------------------------------------------

###get colletion user(200 OK)
GET http://localhost:3000/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjo0LCJyw7RsZSI6IkFETUlOSVNUUkFURVVSIiwiaWF0IjoxNjcyNTAzNDQ0fQ.bMixlX4zMWzYU_YCQ2gF_YF6qORbvUngdv_h93majoQ

###get user by id(error 404 Not Found)
GET http://localhost:3000/users/8

###Création user 1(201 Created)
POST  http://localhost:3000/users
Content-Type: application/json

{
    "nom_de_famille": "DESARAM",
    "prénom": "Savindu",
    "email": "Savindu_user@gmail.com",
    "mot_de_passe": "Savindu123",
    "rôle": "UTILISATEUR"
}

###Création admin 1(201 Created)
POST  http://localhost:3000/users
Content-Type: application/json

{
    "nom_de_famille": "DESARAM",
    "prénom": "Savindu",
    "email": "Savindu_admin@gmail.com",
    "mot_de_passe": "Savindu123",
    "rôle": "ADMINISTRATEUR"
}

###

PUT http://localhost:3000/users/4
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxMCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MjY2NzkyOX0.240IlZ4rfw-WQUVnsq4AP34evHkpLsP2MkjN5BqjRic

{
    "prénom":"Jeremy"

}

###

POST http://localhost:3000/login
Content-Type: application/json

{
    "email": "Savindu_user@gmail.com",
    "mot_de_passe": "Savindu123"
}

###

DELETE  http://localhost:3000/users/13
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxMywicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MzI2MTMxM30.uNwz_Je7nOds15k_GjvaekGrHeIvKdeXDomctOens_Y

###


###-----------------------------------------------CRUDE personnages--------------------------------------------------------------

### Code 200 Ok , Test : Un admin récupère tout les personnages créés. 

GET http://localhost:3000/personnage
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fQWRtaW4iLCJwcsOpbm9tIjpudWxsLCJpZCI6NCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MjQ5NzQ1OX0.9uGbEBnWquD-cVI1l02u0AipNCbmOTfdoSL-bjbRS0E

### Code 403 Interdit , Test : Un utilisateur non-admin tente de récupèrer tout les personnages créés. 

GET http://localhost:3000/personnage
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fVXRpbGkiLCJwcsOpbm9tIjpudWxsLCJpZCI6MiwicsO0bGUiOiJVVElMSVNBVEVVUiIsImlhdCI6MTY3MzI2MDQ2Nn0.uAh8SwL4vNk9VWp_ECJp-MAurAVxaVVrlHTjHpHAx8A

### Code 403 Interdit , Test : Un utilisateur tente de récupèrer un personnage qu'il n'a pas créé. 

GET http://localhost:3000/personnage/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fVXRpbGkiLCJwcsOpbm9tIjpudWxsLCJpZCI6MiwicsO0bGUiOiJVVElMSVNBVEVVUiIsImlhdCI6MTY3MzI2MDQ2Nn0.uAh8SwL4vNk9VWp_ECJp-MAurAVxaVVrlHTjHpHAx8A

### Code 200 Ok , Test : Un utilisateur récupère un personnage qu'il a créé. 

GET http://localhost:3000/personnage/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fQWRtaW4iLCJwcsOpbm9tIjpudWxsLCJpZCI6NCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MjQ5NzQ1OX0.9uGbEBnWquD-cVI1l02u0AipNCbmOTfdoSL-bjbRS0E

### Code 401 Non-autorisé , Test : Un visiteur non authentifié (non-utilisateur) tente de créer un personnage. 

POST http://localhost:3000/personnage
Content-Type: application/json

{
    "nom_de_famille": "Vinsmoke",
    "prénom" : "Sanji",
    "puissance" : "9000",
    "points_de_vie": "8000"
}

### Code 201 : Ok , Test : Un admin créée un personnage avec son Id. 

POST http://localhost:3000/personnage
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fQWRtaW4iLCJwcsOpbm9tIjpudWxsLCJpZCI6NCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MjQ5NzQ1OX0.9uGbEBnWquD-cVI1l02u0AipNCbmOTfdoSL-bjbRS0E
Content-Type: application/json

{
    "nom_de_famille": "Monkey D.",
    "prénom" : "Luffy",
    "puissance" : "14000",
    "points_de_vie": "11000",
    "UtilisateurId": 4
}

### Code 201 : Ok , Test : Un admin créée un personnage avec son Id. 

POST http://localhost:3000/personnage
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fQWRtaW4iLCJwcsOpbm9tIjpudWxsLCJpZCI6NCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MjQ5NzQ1OX0.9uGbEBnWquD-cVI1l02u0AipNCbmOTfdoSL-bjbRS0E
Content-Type: application/json

{
    "nom_de_famille": "Monkey D.",
    "prénom" : "Luffy",
    "puissance" : "14000",
    "points_de_vie": "11000",
    "UtilisateurId": 4
}

### Code 201 : Ok , Test : Un admin créée un personnage avec son Id. 

POST http://localhost:3000/personnage
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fQWRtaW4iLCJwcsOpbm9tIjpudWxsLCJpZCI6NCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MjQ5NzQ1OX0.9uGbEBnWquD-cVI1l02u0AipNCbmOTfdoSL-bjbRS0E
Content-Type: application/json

{
    "nom_de_famille": "Uchiha",
    "prénom" : "Sasuke",
    "puissance" : "12000",
    "points_de_vie": "10000",
    "UtilisateurId": 4,
    "AnimeId": 1
}

### Code 200 Ok , Test : un admin modifie un personnage qu'il a créé. 

PUT http://localhost:3000/personnage/4 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fQWRtaW4iLCJwcsOpbm9tIjpudWxsLCJpZCI6NCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MjQ5NzQ1OX0.9uGbEBnWquD-cVI1l02u0AipNCbmOTfdoSL-bjbRS0E
Content-Type: application/json

{
    "puissance" : "12000",
    "UtilisateurId": 4
}

### Code 403 : Interdit , Test : un utilisateur essaie de modifier un personnage qu'il n'a pas créé. 

PUT http://localhost:3000/personnage/3 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fVXRpbGkiLCJwcsOpbm9tIjpudWxsLCJpZCI6MiwicsO0bGUiOiJVVElMSVNBVEVVUiIsImlhdCI6MTY3MzI2MDQ2Nn0.uAh8SwL4vNk9VWp_ECJp-MAurAVxaVVrlHTjHpHAx8A
Content-Type: application/json

{
    "puissance" : "16000",
    "UtilisateurId": 4
}

### Code 403 : Interdit, Test : Un utilisateur essaie de supprimer un personnage qu'il n'a pas créé. 

DELETE http://localhost:3000/personnage/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fVXRpbGkiLCJwcsOpbm9tIjpudWxsLCJpZCI6MiwicsO0bGUiOiJVVElMSVNBVEVVUiIsImlhdCI6MTY3MzI2MDQ2Nn0.uAh8SwL4vNk9VWp_ECJp-MAurAVxaVVrlHTjHpHAx8A

### Code 204 : No content, Test : Un administrateur supprime un personnage qu'il a créé. 

DELETE http://localhost:3000/personnage/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkVuem9fQWRtaW4iLCJwcsOpbm9tIjpudWxsLCJpZCI6NCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MjQ5NzQ1OX0.9uGbEBnWquD-cVI1l02u0AipNCbmOTfdoSL-bjbRS0E

###-----------------------------------------------CRUDE Anime--------------------------------------------------------------

###Get collection anime, only admin(200 OK)
GET http://localhost:3000/animes
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxMywicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MzA5Nzg5NX0.jr50ay2QDwLkCHoveljVugZNcjOztbJEN-mwyfKjAEU

###get anime item(200 OK)
GET http://localhost:3000/animes/14
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxNCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MzIwNDQ0OX0.MeRH3cJCWN5pDGC35Ht60xPMXHFaNOCw7A2mbpdh2m4

###Get anime by id(error 404 not found)
GET http://localhost:3000/animes/78
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxNCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MzIwNDQ0OX0.MeRH3cJCWN5pDGC35Ht60xPMXHFaNOCw7A2mbpdh2m4

###Création anime 1 by user(201 Created)
POST http://localhost:3000/animes
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxNSwicsO0bGUiOiJVVElMSVNBVEVVUiIsImlhdCI6MTY3MzI2MTc1N30.Aqr0vlwFJ3cu116Adha_bBsE8baYPF_K2vC6_PeIxeg

{
    "nom": "Jojo",
    "autheur": "Araki",
    "genre": "Seinen",
    "UtilisateurId" : 15
}

###Création anime 2 by user(201 Created)
POST http://localhost:3000/animes
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxNSwicsO0bGUiOiJVVElMSVNBVEVVUiIsImlhdCI6MTY3MzI2MTc1N30.Aqr0vlwFJ3cu116Adha_bBsE8baYPF_K2vC6_PeIxeg

{
    "nom": "Demon slayer",
    "autheur": "Gotoge",
    "genre": "Shonen",
    "UtilisateurId" : 15
}

###Création anime 3 by admin(201 Created)
POST http://localhost:3000/animes
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxNiwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MzI2MTQ4OX0.3KlxaWvhDk5JKqqofb_UNotd6nsSKluwDarljtst9Wg

{
    "nom": "One piece",
    "autheur": "Oda",
    "genre": "Shonen",
    "UtilisateurId" : 16
}

###Création anime,genre must in list Isin(error 422)
POST http://localhost:3000/animes
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxNCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MzI2MDk0M30.s0IO33vCi3h5qw_ztKS5zlbz35Ph7f0FiDroK1IxUrk

{
    "nom": "One piece",
    "autheur": "Oda",
    "genre": "non valide",
    "UtilisateurId" : 14
}

###Création anime,bad request(error 400)
POST http://localhost:3000/animes
Content-Type: application/xml
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxNCwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MzI2MDk0M30.s0IO33vCi3h5qw_ztKS5zlbz35Ph7f0FiDroK1IxUrk

{
    "nom": "One piece",
    "autheur": "Oda",
    "genre": "Seinen",
    "UtilisateurId" : 14
}

###Modif anime
PUT http://localhost:3000/animes/16
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxMiwicsO0bGUiOiJVVElMSVNBVEVVUiIsImlhdCI6MTY3MzE2OTg1OH0.DY-aNK83ua5a09vcXJ1fmncMEn-tLLfjIN-C-TarpwY

{
    "nom": "salut",
    "autheur": "test",
    "genre": "Seinen",
    "UtilisateurId": 13
}

###Modif anime, error 422: genre must in isIN
PUT http://localhost:3000/animes/12
Content-Type: application/json

{
    "nom": "Jojo",
    "autheur": "Araki",
    "genre": "Pas bon"
}

###Modif anime(error 400)
PUT http://localhost:3000/animes/7
Content-Type: application/xml

{
    "nom": "Jojo",
    "autheur": "Araki",
    "genre": "Seinen"
}

###Modif anime(error 404 not Found)
PUT http://localhost:3000/animes/100
Content-Type: application/json

{
    "nom": "Jojo",
    "autheur": "Araki",
    "genre": "Seinen"
}

###Delete anime by item
DELETE http://localhost:3000/animes/19
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21fZGVfZmFtaWxsZSI6IkRFU0FSQU0iLCJwcsOpbm9tIjoiU2F2aW5kdSIsImlkIjoxNiwicsO0bGUiOiJBRE1JTklTVFJBVEVVUiIsImlhdCI6MTY3MzI2MTQ4OX0.3KlxaWvhDk5JKqqofb_UNotd6nsSKluwDarljtst9Wg

###Delete, error 404: not found
DELETE http://localhost:3000/animes/18
```

## Contribution

Créé par EDIRISURIYA Savindu, AIT-YAKOUB Enzo, LESSUEUR Jilani / BIN 2

## License

Sans licence.
