$(document).ready(function() {
    var isDragging = false;
    var startX;
    var scrollLeft;

    var num = $('.ui-card').length;
    var even = num / 2;
    var odd = (num + 1) / 2;
    
    // Seleciona as divs ativas, prev e next
    if (num % 2 == 0) {
        $('.ui-card:nth-child(' + even + ')').addClass('active');
        $('.ui-card:nth-child(' + even + ')').prev().addClass('prev');
        $('.ui-card:nth-child(' + even + ')').next().addClass('next');
    } else {
        $('.ui-card:nth-child(' + odd + ')').addClass('active');
        $('.ui-card:nth-child(' + odd + ')').prev().addClass('prev');
        $('.ui-card:nth-child(' + odd + ')').next().addClass('next');
    }

    // Remover números na frente das imagens de fundo
    $('.ui-card:before').css('content', 'none');

    // Evento mousedown nas divs de cartão
    $('.ui-card').on('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX;
        scrollLeft = $('.container').scrollLeft();
    });

    // Evento mousemove nas divs de cartão
    $('.ui-card').on('mousemove', function(e) {
        if (!isDragging) return;
        var mouseX = e.pageX;
        var diff = mouseX - startX;
        $('.container').scrollLeft(scrollLeft - diff);
    });

    // Evento mouseup nas divs de cartão
    $('.ui-card').on('mouseup', function() {
        isDragging = false;
    });

    // Evento mouseleave nas divs de cartão
    $('.ui-card').on('mouseleave', function() {
        isDragging = false;
    });

    // Navegação por teclado
    $(document).keydown(function(e) {
        if (e.keyCode == 37) { // seta esquerda
            $('.active').prev().trigger('click');
        } else if (e.keyCode == 39) { // seta direita
            $('.active').next().trigger('click');
        }
    });
});

var clicks = 0;

$('.ui-card').click(function() {
    clicks++; // Incrementa o contador de cliques
    var $this = $(this);
    var link = $this.data('link');

    if (clicks === 1) {
        // Primeiro clique: animação e seleção da div
        // Adicione aqui o código para animação e seleção da div
        var slide = $('.active').width();
        var leftPos = $('.active').position().left;

        if ($(this).hasClass('next')) {
            $('.container').stop(false, true).animate({left: '-=' + slide});
        } else if ($(this).hasClass('prev')) {
            $('.container').stop(false, true).animate({left: '+=' + slide});
        }

        $(this).removeClass('prev next');
        $(this).siblings().removeClass('prev active next');

        $(this).addClass('active');
        $(this).prev().addClass('prev');
        $(this).next().addClass('next');

        // Após a navegação, centraliza o cartão selecionado
        scrollToSelectedCard();

        // Reinicia o contador de cliques após um curto intervalo de tempo
        setTimeout(function() {
            clicks = 0;
        }, 300); // Tempo em milissegundos para a animação completa

    } else if (clicks === 2) {
        // Segundo clique: redireciona para o link associado
        window.location.href = link;
    }
});

// Função para centralizar o cartão selecionado na tela
function scrollToSelectedCard() {
    // Seleciona o contêiner
    var container = $('.container');
    // Obtém a posição do cartão selecionado em relação ao contêiner
    var selectedCardPosition = $('.ui-card.active').position().left;
    // Obtém a largura visível do contêiner
    var containerWidth = container.width();
    // Calcula a posição para centralizar o cartão selecionado
    var scrollPosition = selectedCardPosition - (containerWidth / 2) + ($('.ui-card.active').width() / 2);
    // Aplica a rolagem horizontal para centralizar o cartão selecionado
    container.scrollLeft(scrollPosition);
}
$(document).ready(function() {
    // Oculta o botão dinâmico inicialmente
    $('.dynamic-button').hide();

    // Evento de clique no botão dinâmico
    $('.dynamic-button').click(function() {
        var link = $('.ui-card.active').data('link'); // Obtém o link da div ativa
        window.location.href = link; // Redireciona para o link
    });

    // Monitora mudanças na seleção da div
    $('.ui-card').click(function() {
        $('.dynamic-button').toggle($('.ui-card.active').length > 0); // Alterna a visibilidade do botão com base na presença de uma div ativa
    });
});
