document.getElementById('importar-tour').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click(); // Clicar no input de arquivo para abrir a janela de seleção de arquivos
});

document.getElementById('fileInput').addEventListener('change', async function(event) {
    const files = event.target.files; // Obter os arquivos selecionados pelo usuário

    if (files.length !== 4) {
        alert("Por favor, selecione exatamente 4 fotos.");
        return;
    }

    const fotos = [];
    for (let i = 0; i < files.length; i++) {
        const fotoURL = await readURL(files[i]); // Ler a URL da foto como base64
        fotos.push(fotoURL);
    }

    // Combina as quatro fotos em uma única imagem panorâmica
    const imagemPanoramica = await combinarFotos(fotos);

    // Exibir a imagem panorâmica como tour visual
    exibirTourVisualizacao(imagemPanoramica);
});

function exibirTourVisualizacao(imagemPanoramica) {
    // Remova qualquer conteúdo anterior
    document.getElementById('tour-viewer').innerHTML = '';

    // Criar uma nova instância do Photo Sphere Viewer com a imagem panorâmica
    new PhotoSphereViewer.Viewer({
        container: document.querySelector('#tour-viewer'),
        panorama: imagemPanoramica,
        time_anim: 3000,
        navbar: false,
    });
}

// Função auxiliar para ler a URL de uma foto como base64
function readURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Função auxiliar para combinar as quatro fotos em uma única imagem panorâmica
async function combinarFotos(fotos) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const imagens = await Promise.all(fotos.map(carregarImagem));

    // Definir o tamanho do canvas para acomodar as quatro fotos
    canvas.width = imagens[0].width * 2;
    canvas.height = imagens[0].height * 2;

    // Desenhar as quatro fotos no canvas
    context.drawImage(imagens[0], 0, 0, imagens[0].width, imagens[0].height);
    context.drawImage(imagens[1], imagens[0].width, 0, imagens[1].width, imagens[1].height);
    context.drawImage(imagens[2], 0, imagens[0].height, imagens[2].width, imagens[2].height);
    context.drawImage(imagens[3], imagens[0].width, imagens[0].height, imagens[3].width, imagens[3].height);

    // Retornar a imagem panorâmica como base64
    return canvas.toDataURL();
}

// Função auxiliar para carregar uma imagem
function carregarImagem(src) {
    return new Promise((resolve, reject) => {
        const imagem = new Image();
        imagem.onload = () => resolve(imagem);
        imagem.onerror = reject;
        imagem.src = src;
    });
}