document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("fileInput");
    const importarTourBtn = document.getElementById("importar-tour");
    const panoramaContainer = document.getElementById("panorama-container");
    const listaTours = document.getElementById("lista-tours");
    let tourCounter = 1;

    importarTourBtn.addEventListener("click", function() {
        const files = fileInput.files;
        if (files.length !== 4) {
            alert("Selecione exatamente 4 fotos para importar o tour.");
            return;
        }

        const loadedImages = [];
        let imagesLoadedCount = 0;

        for (let i = 0; i < 4; i++) {
            const file = files[i];
            if (!file.type.match("image.*")) {
                alert("Selecione apenas imagens.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                const image = new Image();
                image.onload = function() {
                    imagesLoadedCount++;
                    if (imagesLoadedCount === 4) {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        canvas.width = image.width * 2;
                        canvas.height = image.height * 2;
                        ctx.drawImage(loadedImages[0], 0, 0);
                        ctx.drawImage(loadedImages[1], loadedImages[0].width, 0);
                        ctx.drawImage(loadedImages[2], 0, loadedImages[0].height);
                        ctx.drawImage(loadedImages[3], loadedImages[0].width, loadedImages[0].height);

                        const panoramaImage = new Image();
                        panoramaImage.src = canvas.toDataURL("image/jpeg");
                        panoramaContainer.innerHTML = "";
                        panoramaContainer.appendChild(panoramaImage);

                        const nomeTourInput = document.getElementById("tourNameInput");
                        const nomeTour = nomeTourInput.value.trim();
                        if (nomeTour === "") {
                            alert("Por favor, insira um nome para o tour.");
                            return;
                        }

                        const tourItem = document.createElement("li");
                        const tourLink = document.createElement("a");
                        tourLink.textContent = nomeTour;
                        tourLink.href = panoramaImage.src;
                        tourItem.appendChild(tourLink);
                        listaTours.appendChild(tourItem);
                    }
                };
                image.src = event.target.result;
                loadedImages.push(image);
            };
            reader.readAsDataURL(file);
        }
    });
});