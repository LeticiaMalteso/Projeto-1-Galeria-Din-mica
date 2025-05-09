const imageInput = document.getElementById('imageInput');
const addImageBtn = document.getElementById('addImageBtn');
const galeria = document.getElementById('galeria');

const LOCAL_STORAGE_KEY = 'galeriaDeImagens';


window.addEventListener('load', carregarImagensSalvas);


addImageBtn.addEventListener('click', () => {
const file = imageInput.files[0];
if (!file) return;

const reader = new FileReader();
reader.onload = function (e) {
const base64 = e.target.result;
const id = crypto.randomUUID();

adicionarImagemNaGaleria(id, base64);
salvarImagem(id, base64);
};

reader.readAsDataURL(file);
});


function adicionarImagemNaGaleria(id, base64) {
const container = document.createElement('div');
container.classList.add('img-container');
container.dataset.id = id;

const img = document.createElement('img');
    img.src = base64;
    img.alt = "Imagem adicionada";

    img.addEventListener('click', () => {
        removerImagem(id, container);
});

    container.appendChild(img);
    galeria.appendChild(container);
}

function salvarImagem(id, base64) {
    const imagens = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    imagens[id] = base64;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(imagens));
}

function removerImagem(id, container) {
  galeria.removeChild(container);
  const imagens = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
   delete imagens[id];
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(imagens));
}

function carregarImagensSalvas() {
  const imagens = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  for (const id in imagens) {
  adicionarImagemNaGaleria(id, imagens[id]);
}
}