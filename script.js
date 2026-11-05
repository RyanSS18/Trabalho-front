function iniciarMenu() {
    const botao = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu-lista');
    if (!botao || !menu) return;

    function definirMenu(aberto) {
        menu.classList.toggle('aberto', aberto);
        botao.setAttribute('aria-expanded', String(aberto));
        botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
        botao.textContent = aberto ? '✕' : '☰';
    }

    botao.addEventListener('click', () => {
        definirMenu(!menu.classList.contains('aberto'));
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => definirMenu(false));
    });

    document.addEventListener('keydown', evento => {
        if (evento.key === 'Escape') definirMenu(false);
    });

    window.matchMedia('(min-width: 601px)').addEventListener('change', evento => {
        if (evento.matches) definirMenu(false);
    });
}


function iniciarSlider() {
    const secao = document.querySelector('.promocoes');
    if (!secao) return;

    const imagem = secao.querySelector('img');
    const titulo = secao.querySelector('h2');
    const anterior = secao.querySelector('button[aria-label="Promoção anterior"]');
    const proximo = secao.querySelector('button[aria-label="Próxima promoção"]');
    if (!imagem || !titulo || !anterior || !proximo) return;

    const banners = [
        { src: imagem.getAttribute('src'), alt: imagem.alt, titulo: titulo.textContent.trim() },
        { src: 'images/banner-2.svg', alt: 'Banner de ofertas de eletrônicos', titulo: 'OFERTAS DE ELETRÔNICOS' },
        { src: 'images/banner-3.svg', alt: 'Banner de ofertas de casa e moda', titulo: 'OFERTAS DE CASA E MODA' }
    ];
    let atual = 0;

    function mostrar(indice) {
        atual = (indice + banners.length) % banners.length;
        imagem.style.opacity = 0;
        setTimeout(() => {
            imagem.src = banners[atual].src;
            imagem.alt = banners[atual].alt;
            titulo.textContent = banners[atual].titulo;
            imagem.style.opacity = 1;
        }, 250);
    }

    anterior.addEventListener('click', () => mostrar(atual - 1));
    proximo.addEventListener('click', () => mostrar(atual + 1));
}


function iniciarCarrinho() {
    const link = document.querySelector('.fotoCarrinho');
    const contador = document.getElementById('contador-carrinho');
    if (!link || !contador) return;

    let total = 0;

    function atualizar() {
        const texto = total === 1 ? '1 item' : `${total} itens`;
        contador.textContent = `(${texto})`;
        link.setAttribute('aria-label', `Carrinho de compras com ${texto}`);
    }

    document.querySelectorAll('.produto button').forEach(botao => {
        const textoOriginal = botao.textContent.trim();
        let temporizador;

        botao.addEventListener('click', () => {
            total++;
            atualizar();

            botao.textContent = 'Adicionado ✓';
            clearTimeout(temporizador);
            temporizador = setTimeout(() => {
                botao.textContent = textoOriginal;
            }, 1200);
        });
    });
}


function iniciarRevelarAoRolar() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                obs.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.categorias article, .produto').forEach(elemento => {
        elemento.classList.add('revelar');
        observador.observe(elemento);
    });
}

iniciarMenu();
iniciarSlider();
iniciarCarrinho();
iniciarRevelarAoRolar();
