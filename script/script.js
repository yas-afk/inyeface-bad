// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push({ nome, preco });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(`${nome} foi adicionado ao carrinho!`);
}

// Função para exibir os itens no carrinho
function exibirCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let carrinhoContainer = document.getElementById('carrinho-container');
  let total = 0;

  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
  } else {
    carrinho.forEach(item => {
      carrinhoContainer.innerHTML += `
        <div class="item-carrinho">
          <p>${item.nome} - R$${item.preco.toFixed(2)}</p>
        </div>
      `;
      total += item.preco;
    });
  }

  document.getElementById('total').textContent = total.toFixed(2);
}

// Função para finalizar a compra
function finalizarCompra() {
  localStorage.removeItem('carrinho');
  alert('Compra finalizada com sucesso! Agradecemos sua compra.');
  window.location.href = 'index.html'; // Redireciona para a página principal
}

// Função para cancelar a compra
function cancelarCompra() {
  localStorage.removeItem('carrinho');
  alert('Compra cancelada.');
  window.location.href = 'index.html'; // Redireciona para a página principal
}

// Chama a função de exibição do carrinho ao carregar a página do carrinho
if (window.location.pathname.includes('carrinho.html')) {
  exibirCarrinho();
}
// Função para mostrar o pop-up
function mostrarPopup() {
  const popup = document.getElementById('popup-tempo');
  const tempoDisplay = document.getElementById('contador-tempo');
  const fecharPopup = document.getElementById('fechar-popup');
  let tempoRestante = 60; // 60 segundos (1 minuto)

  // Exibe o pop-up
  popup.style.display = 'flex';

  // Função para atualizar o contador de tempo
  const timerInterval = setInterval(() => {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    tempoDisplay.textContent = `Tempo restante: ${minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
    
    tempoRestante--;

    // Quando o tempo acabar
    if (tempoRestante < 0) {
      clearInterval(timerInterval); // Para o temporizador
      popup.style.display = 'none';  // Fecha o pop-up automaticamente
    }
  }, 1000);

  // Função para fechar o pop-up quando o botão X for clicado
  fecharPopup.addEventListener('click', () => {
    clearInterval(timerInterval);  // Para o temporizador
    popup.style.display = 'none';  // Fecha o pop-up
  });
}

// Chama a função para mostrar o pop-up (pode ser chamada quando desejar, por exemplo, ao carregar a página)
window.onload = function() {
  mostrarPopup();
};

