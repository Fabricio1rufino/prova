document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("fileInput");
    const importarTourBtn = document.getElementById("importar-tour");
    const tourViewer = document.getElementById("tour-viewer");

    importarTourBtn.addEventListener("click", function() {
        const files = fileInput.files;

        if (files.length !== 4) {
            alert("Selecione exatamente 4 fotos para importar o tour.");
            return;
        }

        const urls = [];
        for (let i = 0; i < 4; i++) {
            const file = files[i];
            if (!file.type.match("image.*")) {
                alert("Selecione apenas imagens.");
                return;
            }
            const url = URL.createObjectURL(file);
            urls.push(url);
        }

        const viewerContainer = document.createElement("div");
        viewerContainer.classList.add("viewer-container");
        const viewerId = "viewer-" + Math.random().toString(36).substr(2, 9);
        viewerContainer.setAttribute("id", viewerId);
        tourViewer.innerHTML = "" // Limpa qualquer visualizador existente
        tourViewer.appendChild(viewerContainer);

        const viewer = new PhotoSphereViewer.Viewer({
            container: viewerId,
            panorama: urls,
        });

        // Liberar recursos de URL criadas
        urls.forEach(URL.revokeObjectURL);
    });
});