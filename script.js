$(document).ready(function() {
  // Adicionando a classe de animação de entrada para todos os elementos com a classe .zoom-in
  $('.zoom-in').addClass('zoom-in');
  
  // Função para redirecionar após o clique em .ui-card
  $('.ui-card').click(function() {
    var link = $(this).data('link');
    setTimeout(function() {
      window.location.href = link; // Redireciona para o link após 2 segundos
    }, 2000);
  });

  // Função para alternar o tema
  $('#toggle-theme').click(function() {
    $('body').toggleClass('dark-mode'); // Alternar classe para o corpo do documento
  });
});
