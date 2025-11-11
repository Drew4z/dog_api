const BREEDS =["affenpinscher", "african", "airedale"];
const URL_BREEDS = "https://dog.ceo/api/breed/{breed}/images";
const ONE_BREED = "https://dog.ceo/api/breed/{breed}/images";

document.addEventListener("DOMContentLoaded", ()=>{
    BREEDS.forEach(breed =>{
        let urlThisBreed = URL_BREEDS.replace("{breed}",breed);
        getData("get", urlThisBreed, (data)=>{
            processData(data,breed)
        });
    })
    
    
    trElement.addEventListener("click",createLink());
    function createLink(urlClikBreed,breed){
        
    }
    
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

    function createElement(img, breed){
        const tbodyElements = document.getElementsByTagName("tbody");
        const tbodyElement = tbodyElements[0];
            const trElement = document.createElement("tr");
            trElement.id = "click-on-tr";
                const tdElement = document.createElement("td");
                    const imgElement = document.createElement("img")
                    imgElement.src = img;
                    const h2Element = document.createElement("h2");
                    h2Element.innerText = breed;
                tdElement.appendChild(imgElement);
            trElement.appendChild(tdElement);
            trElement.appendChild(h2Element);
        tbodyElement.appendChild(trElement);
    }
    
   
    
   
});
