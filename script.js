// Variáveis globais para elementos DOM (cached for performance)
let header;
let logoImg;
let navMenu;
let menuMobileBtn;
let menuMobileIcon;

// NAVBAR SCROLL EFFECT
function handleScroll() {
    // Se o header ainda não foi cacheado, tenta encontrar
    if (!header) header = document.getElementById('main-header');
    if (!header) return; // Se não encontrar, sai da função

    const scrollClass = 'scrolled';
    const shouldAddClass = window.scrollY > 100; // Define o threshold de rolagem (100px)

    // Adiciona ou remove a classe 'scrolled' do header
    header.classList.toggle(scrollClass, shouldAddClass);

    // Nota: As alterações de tamanho do logo e cor do ícone do menu mobile
    // são agora (e idealmente) controladas via CSS através da classe 'scrolled'.
    // As linhas comentadas abaixo seriam para controle direto via JS,
    // mas o CSS é mais performático para isso.
    /*
    if (!logoImg) logoImg = document.querySelector('.logo img');
    if (logoImg) {
        logoImg.style.width = shouldAddClass ? '250px' : '350px';
    }

    if (!menuMobileIcon) menuMobileIcon = document.querySelector('.menu-mobile i');
    if (menuMobileIcon) {
        menuMobileIcon.style.color = shouldAddClass ? '#333' : '#ECE9E0';
    }
    */
}

// MOBILE MENU - Controla a abertura e fechamento do menu mobile
function setupMobileMenu() {
    if (!menuMobileBtn) menuMobileBtn = document.getElementById('menuMobile');
    if (!menuMobileBtn) return;

    if (!navMenu) navMenu = document.getElementById('navMenu');
    if (!navMenu) return;

    if (!menuMobileIcon) menuMobileIcon = menuMobileBtn.querySelector('i');

    menuMobileBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Impede que o clique no botão se propague e feche o menu
        navMenu.classList.toggle('show');
        document.body.classList.toggle('no-scroll', navMenu.classList.contains('show'));

        // Altera o ícone do menu (hamburger <-> X)
        if (menuMobileIcon) {
            menuMobileIcon.classList.toggle('fa-bars');
            menuMobileIcon.classList.toggle('fa-times');
        }
    });

    // Fecha o menu ao clicar em links internos ou fora do menu
    document.addEventListener('click', function(e) {
        // Verifica se o clique não foi dentro do menu e não foi no botão do menu
        // e se o menu está visível
        if (navMenu.classList.contains('show') && !navMenu.contains(e.target) && e.target !== menuMobileBtn && !menuMobileBtn.contains(e.target)) {
            navMenu.classList.remove('show');
            document.body.classList.remove('no-scroll');
            if (menuMobileIcon) {
                menuMobileIcon.classList.add('fa-bars');
                menuMobileIcon.classList.remove('fa-times');
            }
        }
    });

    // Fecha o menu mobile quando um link é clicado (para rolagem suave)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                document.body.classList.remove('no-scroll');
                if (menuMobileIcon) {
                    menuMobileIcon.classList.add('fa-bars');
                    menuMobileIcon.classList.remove('fa-times');
                }
            }
        });
    });
}

// SMOOTH SCROLL - Rolagem suave para seções
function setupSmoothScroll() {
    // Seleciona links na navegação e o botão na hero section
    document.querySelectorAll('nav a[href^="#"], .smooth-scroll-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Se o header não foi cacheado, tenta encontrar
                if (!header) header = document.getElementById('main-header');
                // Usa a altura do header ou um valor padrão (ex: 80px) para o offset
                // (útil se o header não carregar por algum motivo)
                const headerHeight = header ? header.offsetHeight : 80;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight, // Ajusta a posição para considerar o header fixo
                    behavior: 'smooth'
                });

                // Fecha o menu mobile se estiver aberto após a rolagem
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    document.body.classList.remove('no-scroll');
                    if (menuMobileIcon) {
                        menuMobileIcon.classList.add('fa-bars');
                        menuMobileIcon.classList.remove('fa-times');
                    }
                }
            }
        });
    });
}

// RESIZE HANDLER - Ajustes ao redimensionar a tela
function handleResize() {
    // Se o navMenu não foi cacheado, tenta encontrar
    if (!navMenu) navMenu = document.getElementById('navMenu');

    // Se a largura da janela for maior que 768px (breakpoint mobile) e o menu estiver visível
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show'); // Esconde o menu mobile
        document.body.classList.remove('no-scroll'); // Libera o scroll do body

        if (!menuMobileIcon) menuMobileIcon = document.querySelector('#menuMobile i');
        if (menuMobileIcon) {
            menuMobileIcon.classList.add('fa-bars');
            menuMobileIcon.classList.remove('fa-times');
        }
    }
    // Dispara o handleScroll caso o tamanho da tela mude e afete a visibilidade/estado do header
    handleScroll();
}

// PRELOADER & COPYRIGHT YEAR - Funções para efeitos iniciais
function setupInitialEffects() {
    // Atualiza o ano do copyright automaticamente
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Preloader - Garante que ele só apareça durante o carregamento
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = ''; // Garante que o scroll do body seja reativado
            }, 500); // Duração da animação de fade-out (deve corresponder ao CSS)
        }
        // Adiciona uma classe ao elemento <html> para sinalizar que a página foi carregada
        // Útil para estilos CSS baseados no estado de carregamento
        document.documentElement.classList.add('loaded');
    });
}


// INITIALIZATION - Função principal que configura todos os event listeners e chama as funções
document.addEventListener('DOMContentLoaded', function() {
    // Cache de elementos DOM essenciais na inicialização
    header = document.getElementById('main-header');
    logoImg = document.querySelector('.logo img');
    navMenu = document.getElementById('navMenu');
    menuMobileBtn = document.getElementById('menuMobile');
    menuMobileIcon = menuMobileBtn ? menuMobileBtn.querySelector('i') : null; // Tenta pegar o ícone do botão mobile

    // Configura os event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Inicializa os componentes e efeitos
    setupMobileMenu();
    setupSmoothScroll();
    setupInitialEffects();

    // Dispara o handleScroll uma vez para definir o estado inicial do header
    // (caso a página já carregue com scroll)
    handleScroll();
});

// Fallback para garantir que a classe 'loaded' seja adicionada mesmo se houver recursos demorados
window.addEventListener('load', function() {
    document.documentElement.classList.add('loaded');
});