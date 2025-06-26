/**
 * Parça, adicionei umas coisas a mais, isso vai te ajudar, deixei bem explicado pra você não ter muita duvida, qualquer coisa me chama que ajudo! 
 * 
 * Este script adiciona interatividade ao portfólio, incluindo:
 * - Menu mobile responsivo
 * - Scroll suave para links internos
 * - Efeito de header ao rolar a página
 * - Slider de depoimentos
 * - Validação básica do formulário de contato
 */

// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. TOGGLE DO MENU MOBILE
    // =============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    // Adiciona evento de clique no ícone do menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        // Alterna a classe 'show' no menu (mostra/esconde)
        navUl.classList.toggle('show');
    });
    
    // =============================================
    // 2. SCROLL SUAVE PARA LINKS INTERNOS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Previne o comportamento padrão do link
            e.preventDefault();
            
            // Fecha o menu mobile se estiver aberto
            navUl.classList.remove('show');
            
            // Obtém o ID do elemento alvo do link
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Se o elemento alvo existir, faz o scroll suave até ele
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Subtrai 80px para compensar o header fixo
                    behavior: 'smooth' // Animação suave
                });
            }
        });
    });
    
    // =============================================
    // 3. EFEITO NO HEADER AO ROLAR A PÁGINA
    // =============================================
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        // Adiciona classe 'scrolled' quando a página é rolada mais de 100px
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // =============================================
    // 4. SLIDER DE DEPOIMENTOS
    // =============================================
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0; // Índice do depoimento atual
    
    // Função para mostrar um depoimento específico
    function showTestimonial(index) {
        // Esconde todos os depoimentos
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Mostra apenas o depoimento do índice especificado
        testimonials[index].classList.add('active');
    }
    
    // Botão Anterior
    prevBtn.addEventListener('click', function() {
        currentTestimonial--;
        // Se chegar no primeiro, volta para o último
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Botão Próximo
    nextBtn.addEventListener('click', function() {
        currentTestimonial++;
        // Se chegar no último, volta para o primeiro
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Rotação automática dos depoimentos a cada 5 segundos
    let testimonialInterval = setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pausa a rotação automática quando o mouse está sobre o slider
    const sliderContainer = document.querySelector('.testimonials-slider');
    
    sliderContainer.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    // Retoma a rotação automática quando o mouse sai do slider
    sliderContainer.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(() => {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);
    });
    
    // =============================================
    // 5. FORMULÁRIO DE CONTATO
    // =============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Previne o envio padrão do formulário
            e.preventDefault();
            
            // Obtém os valores dos campos
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validação básica - verifica se os campos obrigatórios foram preenchidos
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação simples de e-mail
            if (!email.includes('@') || !email.includes('.')) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }
            
            // Aqui você normalmente enviaria os dados para um servidor
            // Para este exemplo, apenas mostra uma mensagem de sucesso
            alert(`Obrigado pela sua mensagem, ${name}! Entrarei em contato em breve pelo e-mail ${email}.`);
            
            // Reseta o formulário após o envio
            this.reset();
        });
    }
    
    // =============================================
    // INICIALIZAÇÃO
    // =============================================
    // Mostra o primeiro depoimento ao carregar a página
    showTestimonial(currentTestimonial);
});