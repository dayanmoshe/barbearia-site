// Menu Mobile Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const logoBtn = document.querySelector('.logo');

// Variável para controlar o layout atual
let layoutAtual = 0;
const layouts = ['layout-classico', 'layout-moderno', 'layout-minimalista', 'layout-vintage', 'layout-dark'];

// Função para mudar o layout
function mudarLayout() {
    // Remove o layout atual
    if (layouts[layoutAtual]) {
        document.body.classList.remove(layouts[layoutAtual]);
    }
    
    // Avança para o próximo layout
    layoutAtual = (layoutAtual + 1) % layouts.length;
    
    // Adiciona o novo layout
    document.body.classList.add(layouts[layoutAtual]);
    
    // Mostra notificação
    const nomesLayouts = ['Clássico', 'Moderno', 'Minimalista', 'Vintage', 'Dark'];
    mostrarNotificacao(`Layout ${nomesLayouts[layoutAtual]} ativado!`);
    
    // Salva preferência no localStorage
    localStorage.setItem('layoutPreferido', layoutAtual.toString());
}

// Mostrar notificação temporária
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'layout-notification';
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.opacity = '1';
        notificacao.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notificacao.style.opacity = '0';
        notificacao.style.transform = 'translateY(-20px)';
        setTimeout(() => notificacao.remove(), 300);
    }, 2000);
}

// Adicionar evento de clique ao logotipo
if (logoBtn) {
    logoBtn.style.cursor = 'pointer';
    logoBtn.title = 'Clique para mudar o layout';
    logoBtn.addEventListener('click', mudarLayout);
    
    // Adiciona efeito visual ao passar o mouse
    logoBtn.addEventListener('mouseenter', () => {
        logoBtn.style.transform = 'scale(1.05)';
        logoBtn.style.transition = 'transform 0.3s ease';
    });
    
    logoBtn.addEventListener('mouseleave', () => {
        logoBtn.style.transform = 'scale(1)';
    });
}

// Carregar layout salvo (se houver)
window.addEventListener('load', () => {
    const layoutSalvo = localStorage.getItem('layoutPreferido');
    if (layoutSalvo) {
        layoutAtual = parseInt(layoutSalvo);
        if (layouts[layoutAtual]) {
            document.body.classList.add(layouts[layoutAtual]);
        }
    }
});

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animação do ícone do menu
        const spans = menuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header com sombra ao rolar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Formulário de agendamento
const form = document.getElementById('agendamentoForm');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulação de envio
        alert('✅ Agendamento enviado com sucesso!\n\nEm breve entraremos em contato para confirmar seu horário.\n\nObrigado pela preferência! 💈');
        
        // Limpar formulário
        form.reset();
        
        // Aqui você pode integrar com um backend ou serviço de email
        console.log('Dados do agendamento:', data);
    });
}

// Animação de fade-in ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contador animado para preços (opcional)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = 'R$ ' + value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Efeito de hover nos cards de serviço
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mensagem de boas-vindas no console
console.log('%c💈 Barbearia Vintage', 'font-size: 24px; font-weight: bold; color: #c9a66b;');
console.log('%cEstilo Clássico para o Homem Moderno', 'font-size: 14px; color: #666;');
console.log('%cBem-vindo ao nosso site! ☕', 'font-size: 12px; color: #999;');

// Detectar dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustes específicos para mobile
if (isMobile()) {
    document.body.classList.add('mobile-device');
}

// Prevenir zoom duplo toque em dispositivos móveis
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
}, { passive: false });

// Carregamento completo da página
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('Site carregado com sucesso! 🚀');
});
