// Simulação de dados de tours
const tours = [
    {
        id: 1,
        nome: "Tour Paris",
        url: "https://www.example.com/tour-paris",
        categoria: "Cidade",
        descricao: "Tour virtual pela cidade de Paris"
    },
    {
        id: 2,
        nome: "Tour Praia",
        url: "https://www.example.com/tour-praia",
        categoria: "Natureza",
        descricao: "Tour virtual por uma praia paradisíaca"
    }
];

// Função para exibir a lista de tours na biblioteca
function exibirTours() {
    const listaTours = document.getElementById('lista-tours');
    listaTours.innerHTML = '';
    tours.forEach(tour => {
        const itemLista = document.createElement('li');
        itemLista.innerHTML = `<a href="${tour.url}" target="_blank">${tour.nome}</a> - ${tour.descricao}`;
        listaTours.appendChild(itemLista);
    });
}

// Função para importar um tour
document.getElementById('importar-tour').addEventListener('click', function() {
    const novoTour = {
        id: tours.length + 1,
        nome: "Novo Tour",
        url: "https://www.example.com/novo-tour",
        categoria: "Outros",
        descricao: "Um novo tour virtual"
    };
    tours.push(novoTour);
    exibirTours();
});

// Função para exibir um tour na visualização
function exibirTourVisualizacao(url) {
    const iframeViewer = document.querySelector('#tour-viewer iframe');
    iframeViewer.src = url;
}

// Exibir a lista de tours ao carregar a página
window.onload = function() {
    exibirTours();
    // Exibir o primeiro tour da lista na visualização
    exibirTourVisualizacao(tours[0].url);
}