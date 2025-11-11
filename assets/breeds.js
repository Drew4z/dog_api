const URL_BREEDS = "https://dog.ceo/api/breed/{breed}/images";

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Leemos los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // 2. Buscamos el parámetro específico llamado 'breed'
    const breedName = urlParams.get('breed');

    // 3. Si existe, llamamos a la API para esa raza
    if (breedName) {
        showBreedImages(breedName);
    } else {
        // Si alguien llega a breed.html sin parámetro, muéstrale un error
        console.error("No se especificó ninguna raza");
        window.location.href = '..';
    }
});

// Función que pide y muestra TODAS las imágenes de una raza
function showBreedImages(breed) {
    const container = document.getElementById("container_item");

    const tbodyElement = container.getElementsByTagName("tbody")[0];

    // <-- CAMBIO 2: Limpiamos el contenido del 'tbody' por si acaso
    tbodyElement.innerHTML = "";

    const breedName = document.getElementById("breedName");
    // Creamos un título y un botón para volver
    breedName.innerText = `Raza de ${breed}`;

    // Hacemos la petición a la API
    let urlThisBreed = URL_BREEDS.replace("{breed}", breed);
    
    getData("get", urlThisBreed, (data) => {
        const { message } = data; // 'message' es el array con TODAS las URLs

        const numImg= 10;
        const limitImg = message.slice(0, numImg);
        // Recorremos el array y creamos una imagen por cada una
       
        limitImg.forEach(imageUrl => {
            // Por cada foto, creamos una fila <tr>
            const trElement = document.createElement("tr");
            // Creamos la celda <td>
                const tdElement = document.createElement("td");
                const h2Element = document.createElement("h2");
                h2Element.innerHTML=breed;
                    
                    // Creamos la imagen <img>
                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.alt = `Foto de ${breed}`;
                    
                    // Metemos la <img> DENTRO del <td>
                    tdElement.appendChild(imgElement);
                
                // Metemos el <td> DENTRO del <tr>
                trElement.appendChild(tdElement);
                trElement.appendChild(h2Element);
            
            // Metemos el <tr> DENTRO del <tbody>
            tbodyElement.appendChild(trElement);
        });
    });
}

// Necesitamos la función getData aquí también
function getData(method, url, callback) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
        if (request.readyState !== 4) return;
        if (request.status === 200) {
            const data = JSON.parse(request.response);
            callback(data);
        }
    };
    try {
        request.open(method, url);
        request.send();
    } catch (e) {
        console.log(e);
    }
}