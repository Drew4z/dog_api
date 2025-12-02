// const BREEDS =["affenpinscher", "african", "airedale"];
const URL_ALL_BREEDS = "https://dog.ceo/api/breeds/list/all";
const URL_IMG_BREEDS = "https://dog.ceo/api/breed/{breed}/images";

document.addEventListener("DOMContentLoaded", ()=>{
    
    async function getData() {
        try {
            const response = await fetch(URL_ALL_BREEDS);
            // Verificamos si la respuesta es correcta
            if (!response.ok) throw new Error("Error conectando con la API");
            
            const data = await response.json();

            if (data && data.message) {
                const breedObject = data.message;
                const breedAllArray = Object.keys(breedObject);
                const breedNum = 20;
                const breedArray = breedAllArray.slice(0, breedNum);

                // SOLUCIÓN ASÍNCRONA: Usamos for...of para mantener el orden
                for (const breed of breedArray) {
                    let urlThisBreed = URL_IMG_BREEDS.replace("{breed}", breed);
                    
                    try {
                        let responseImg = await fetch(urlThisBreed);
                        let dataImg = await responseImg.json();
                        console.log(dataImg)
                        processData(dataImg, breed);
                    } catch (err) {
                        console.error(`Error cargando imagen para ${breed}`, err);
                    }
                }
            }
        } catch (error) {
            console.error("Error general:", error);
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
        tbodyElement.appendChild(linkElement);
    }
   
    getData();
});

