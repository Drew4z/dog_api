// const BREEDS =["affenpinscher", "african", "airedale"];
const URL_ALL_BREEDS = "https://dog.ceo/api/breeds/list/all";
const URL_IMG_BREEDS = "https://dog.ceo/api/breed/{breed}/images";

document.addEventListener("DOMContentLoaded", ()=>{

    getData("get", URL_ALL_BREEDS, (data) => {
        const breedObject = data.message;
        const breedAllArray = Object.keys(breedObject);

        const breedNum = 20;
        const breedArray = breedAllArray.slice(0,breedNum);
        breedArray.forEach(breed =>{
            let urlThisBreed = URL_IMG_BREEDS.replace("{breed}",breed);
            getData("get", urlThisBreed, (imgData)=>{
                processData(imgData,breed)
            });
        })
    });
    
    function getData(method, url, callback) {
        const request = new XMLHttpRequest();
    
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) { // Si aún no se ha completado la petición, no se hace nada.
                return;
            }
            if (request.status === 200) {
                const response = request.response;
                const data = JSON.parse(response);
                callback(data);
            }
        };
        try{
            request.open(method,url);
            request.send();
        } catch(e) {
            console.log(e);
        }
    }
    
    function getRandomInt(max){
        return Math.floor(Math.random() * max)
    };

    function processData(data, breed){
        const {message, status} = data;
        /*
        const message = data.message;
        const status = data.status;
        */ 
       const numDogs = message.length;
       const posDog = getRandomInt(numDogs);
       const imgDog = message[posDog];

       createElement(imgDog, breed);
    }

    function createElement(img, breed) {
        const tbodyElements = document.getElementsByTagName("tbody");

        const tbodyElement = tbodyElements[0];
            // 1. Creamos el enlace
            const linkElement = document.createElement("a");
            // 2. Le decimos a dónde va: a la nueva página, pasando la raza en la URL
            linkElement.href = `/templates/breeds.html?breed=${breed}`;

                const trElement = document.createElement("tr");
                    trElement.className = "breed-row"; // Para CSS

                const h2Element = document.createElement("h2");
                    h2Element.innerText = breed;

                    const tdElement = document.createElement("td");
                            // 3. Creamos el contenido que irá DENTRO del enlace
                            const imgElement = document.createElement("img")
                            imgElement.src = img;

                    tdElement.appendChild(imgElement); 
                trElement.appendChild(tdElement);
                trElement.appendChild(h2Element);
            linkElement.appendChild(trElement);    
        tbodyElement.appendChild(trElement);
    }
   
});
