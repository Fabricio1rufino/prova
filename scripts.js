document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("fileInput");
    const importarTourBtn = document.getElementById("importar-tour");
    const tourViewer = document.getElementById("tour-viewer");

    importarTourBtn.addEventListener("click", function() {
        const arquivos = fileInput.files;

        if (arquivos.length !== 4) {
            alert("Selecione exatamente 4 fotos para importar o tour.");
            return;
        }

        const promessasImagens = [];
        for (let i = 0; i < 4; i++) {
            const arquivo = arquivos[i];
            if (!arquivo.type.match("image.*")) {
                alert("Selecione apenas imagens.");
                return;
            }
            promessasImagens.push(lendoArquivoComoDataURL(arquivo));
        }

        Promise.all(promessasImagens)
        .then(function(urlsImagens) {
            criarVisualizadorTour(urlsImagens); // Chama a função para criar o visualizador
        })
        .catch(function(erro) {
            console.error("Erro ao ler imagens:", erro);
        });
});

    function lendoArquivoComoDataURL(arquivo) {
        return new Promise(function(resolve, reject) {
            const leitor = new FileReader();
            leitor.onload = function(evento) {
                resolve(evento.target.result);
            };
            leitor.onerror = function(erro) {
                reject(erro);
            };
            leitor.readAsDataURL(arquivo);
        });
    }
    function criarVisualizadorTour(urlsImagens) {
        const containerId = "container-visualizador";
        const container = document.getElementById(containerId);
        if (!container) return;
    
        const visualizador = new PhotoSphereViewer.Viewer({
            container: container,
            panorama: urlsImagens,
        });
    
        container.appendChild(visualizador.container);
    }
    function vizualizartour(arquivo){
        document.documentElement.innerHTML = arquivo
    }
});