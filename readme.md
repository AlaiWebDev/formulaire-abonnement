---

Author: Alain ORLUK
Formation : Développeur Web & Web mobile
Lieu: Marseille
Date : 16/11/2023

---
# **Interrogation d'un web service (API)**

L'objectif de ce TP est de vous entrainer à utiliser une des méthodes que nous avons vu destinée à interroger une ressource externe, que l'on peut  appeler un web service (les données de l'univers de la licence Pokemon, la base de données de films IMDB, …).

## **Les API mises à disposition par le gouvernement**

Plateforme disponible [ici](https://api.gouv.fr/rechercher-api)

Certaines API sont en libre accès et d'autres non.

Comme nous l'avons vu, certaines API vous demanderont de créer un compte afin de vous délivrer une clé d'accès privée.

## **Les méthodes d'interrogation**

Voici pour rappel les méthodes d'interrogation à votre disposition :

```js
// Si la ressource est locale et de type JSON
import monJson from '../../data.json' assert {type: 'json'};
console.log("Mon JSON : ", monJson);

// Ce code présente les 3 manières de récupérer une ressource externe en JS :
// Via fetch (méthode recommandée ES6), via axios (nécessite l'appel à la librairie Axios via un CDN) 
// et via Ajax et l'objet xmlHttpRequest(Obsolète car souvent associé à jQuery)

// Méthode avec Ajax

const resultAjax = await ajaxTest('data.json');
console.log("Résultat via Ajax - nécéssite une promesse explicite: ", resultAjax);
async function ajaxTest (url) {
    return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('Abandon :( Impossible de créer une instance de XMLHTTP');
        return false;
    }
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                return resolve(JSON.parse(this.response));
            }
        }
    };
    xhr.send();
    });
}

// Méthode avec axios
let datasAxios = await axiosTest();
console.log("Datas via Axios : ", datasAxios);
const axiosTest = async function () {
    const response = await axios.get("data.json");
    console.log("REPONSE DATA : ", response.data);
    return response.data;
}
axiosTest();

// Méthode avec fetch

let datasFetch;
const options = {method: 'GET', headers: {accept: 'application/json'}};
const apiKey = "56fa089f86c6a00152d19e68005d57b9";
const urlApi = "https://pokeapi.co/api/v2/pokemon?limit=1292";
await getDataFetch();
async function getDataFetch () {
    const res = await fetch(urlApi);
    datasFetch = await res.json();
}
console.log("Voici les données récupérées : ", datasFetch);

let dataFetchBis;
await getDataFetchBis();
console.log("Voici les données via fetch: ", dataFetchBis);

async function getDataFetchBis () {
    const res = await fetch("data.json", {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            
        }
    });
    dataFetchBis = await res.json();
}
// Idem avec une promesse explicite :
let dataFetchTer = await getDataAvecPromesseExplicite();
console.log("Voici les données via fetch avec promesse explicite: ", dataFetchTer);

function getDataAvecPromesseExplicite () {
    return new Promise((resolve) => {
        return resolve(
            fetch("data.json", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
            }).then(function(response) {
                return response.json();
            })
        );
    });
}
// BONUS - Transformation d'une chaîne en noeud HTML
const header = document.querySelector(".header");
let htmlHeader;
await getHeader();
async function getHeader() {
    const result = await fetch("./header.html");
    if (!result.ok) {
        throw new Error(`Code de l'erreur HTTP : ${result.status}`);
    }
    let toto = await result.text();
    console.log("Contenu de toto : ", toto);
    // header.innerHTML = toto;
    let parser = new DOMParser();
    htmlHeader = parser.parseFromString(toto,"text/html");
    console.log(htmlHeader);
}
header.innerHTML = htmlHeader.querySelector(".boite-header").innerHTML;

let navbar = document.getElementById("nav_bar");
    let lienInscrit = document.createElement("a");
    lienInscrit.href = "GestionDesInscrits.html";
    navbar.appendChild(lienInscrit);
```