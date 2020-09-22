//Récupération de la liste des produits
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
        console.log(products);
        //Personnalisation des cards de la home pour chaque produit du tableau
        for (let p = 0; p < products.length; p += 1) {
            document.querySelector(".data-img" + p).setAttribute("src", products[p].imageUrl);
            document.querySelector(".data-name" + p).textContent = products[p].name;
            document.querySelector(".data-description" + p).textContent = products[p].description;
            document.querySelector(".data-price" + p).textContent = `${products[p].price / 100} €`;
            //Transmission de l'ID produit avec l'URL cliquée
            document.querySelector(".data-link" + p).setAttribute("href", `produit.html?id=${products[p]._id}`);
        }
    })
    .catch(error => console.log(error));
};
getProducts ();

//Ajout d'un objet local pour remplir le panier pendant la visite du site
let panier = JSON.parse(localStorage.getItem("panier"));
console.log(localStorage);
