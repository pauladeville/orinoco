//*****AFFICHAGE DU PANIER*****

//Récupération de l'ID produit stocké via le bouton "Ajoutez au panier"
var produitPanier = localStorage.getItem("ajoutPanier");
console.log(produitPanier);

function getProducts () {
    let url = "http://localhost:3000/api/cameras";
    let options = {
        method: "GET",
        headers: {
            "Content-type": "application/JSON"
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(products => {
            for (let product of products) {
                console.log(product);
                if (product._id == produitPanier) {
                    document.querySelector("#panier-liste").textContent = product.name;
                }               
            }
        }
)}
getProducts ();


//*****GENERATION DES NOMS DE VILLES EN FONCTION DU CODE POSTAL*****

//Ecoute du champ de formulaire destiné au code postal
const inputCode = document.getElementById("cp");

inputCode.addEventListener('change', function() {
    //Requête auprès d'une API associant cp/communes
    let url = `https://geo.api.gouv.fr/communes?codePostal=${inputCode.value}&fields=nom&format=json&geometry=centre`;

    fetch(url)
        .then( response => response.json())
        .then( cities => {
            //Apparition du bon nombre d'options dans le champ "ville" + placement du nom des villes récupérées 
            for (let x = 0; x < cities.length; x += 1) {
                document.querySelector(".data-option" + x).classList.replace("d-none", "d-block");
                document.querySelector(".data-option" + x).textContent = cities[x].nom;
                document.querySelector(".data-option" + x).setAttribute("value", cities[x].nom);
            }
        })
        .catch( err =>
            console.log("Erreur :" + err)
        )
});