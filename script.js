// Создание плавающих сердечек на фоне
function createHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartCount = 25;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        // Случайные параметры для сердечек
        const size = Math.random() * 25 + 15;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${left}%`;
        heart.style.top = `${top}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Шкала чувств
function setupLoveMeter() {
    const meterFill = document.getElementById('meter-fill');
    const increaseBtn = document.getElementById('increase-meter');
    let fillLevel = 70;
    
    increaseBtn.addEventListener('click', function() {
        if (fillLevel < 100) {
            fillLevel += 10;
            meterFill.style.width = `${fillLevel}%`;
            meterFill.textContent = `${fillLevel}%`;
            
            // Анимация при нажатии
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Создаем сердечко над кнопкой
            createFloatingHeart(this);
            
            // Если шкала заполнена полностью
            if (fillLevel >= 100) {
                meterFill.textContent = 'Бесконечно! ♥';
                this.textContent = 'Чувства зашкаливают!';
                this.disabled = true;
                createConfetti(50);
            }
        }
    });
    
    // Изначальное значение
    meterFill.textContent = `${fillLevel}%`;
}

// Создание плавающего сердечка
function createFloatingHeart(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fas fa-heart" style="color:#ff6b9d"></i>';
    heart.style.position = 'absolute';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;
    
    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(heart);
    
    // Анимация полета сердечка
    const animation = heart.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -150px) scale(1.5)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => {
        document.body.removeChild(heart);
    };
}

// Секретное сообщение
function setupSecretMessage() {
    const showSurpriseBtn = document.getElementById('show-surprise');
    const secretMessage = document.getElementById('secret-message');
    const closeSecretBtn = document.getElementById('close-secret');
    
    showSurpriseBtn.addEventListener('click', function() {
        secretMessage.classList.remove('hidden');
        createConfetti(30);
        
        // Анимация появления
        secretMessage.style.animation = 'fadeIn 1s';
        
        // Меняем текст кнопки
        this.textContent = 'Сюрприз активирован!';
        this.disabled = true;
        
        // Меняем цвет секретного блока
        const secretPlaceholder = document.querySelector('.secret-placeholder');
        secretPlaceholder.style.background = 'linear-gradient(135deg, #a18cd1, #fbc2eb)';
        secretPlaceholder.innerHTML = '<i class="fas fa-gift" style="font-size: 3rem; color: #ff6b9d; margin-bottom: 10px;"></i><p>Сюрприз открыт!</p>';
    });
    
    closeSecretBtn.addEventListener('click', function() {
        secretMessage.classList.add('hidden');
    });
}

// Кнопка сердечного взрыва
function setupHeartsButton() {
    const heartsBtn = document.getElementById('hearts-btn');
    
    heartsBtn.addEventListener('click', function() {
        // Создаем взрыв сердечек
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createExplodingHeart();
            }, i * 30);
        }
        
        // Анимация кнопки
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

// Создание взрывающегося сердечка
function createExplodingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.style.position = 'fixed';
    heart.style.fontSize = `${Math.random() * 25 + 15}px`;
    heart.style.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight;
    
    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(heart);
    
    // Анимация взрыва
    const endX = startX + (Math.random() * 200 - 100);
    const endY = Math.random() * window.innerHeight * 0.7;
    
    const animation = heart.animate([
        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(${endX - startX}px, ${-window.innerHeight + endY}px) scale(0.5)`, opacity: 0 }
    ], {
        duration: 2000,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    });
    
    animation.onfinish = () => {
        document.body.removeChild(heart);
    };
}

// Кнопка нового признания
function setupMessageButton() {
    const messageBtn = document.getElementById('message-btn');
    const mainMessage = document.getElementById('main-message');
    
    const messages = [
        "Саша, ты самое прекрасное, что случалось со мной!",
        "Ты невероятная девушка! Умная, добрая, красивая - я восхищаюсь тобой каждый день.",
        "Спасибо, что ты есть в моей жизни."
    ];
    
    let messageIndex = 0;
    
    messageBtn.addEventListener('click', function() {
        mainMessage.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
        
        // Анимация
        mainMessage.parentElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            mainMessage.parentElement.style.transform = 'scale(1)';
        }, 300);
        
        // Создаем несколько сердечек
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingHeart(this);
            }, i * 100);
        }
    });
}

// Конфетти
function setupConfetti() {
    const confettiBtn = document.getElementById('confetti-btn');
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let confettiPieces = [];
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speed = Math.random() * 3 + 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
        }
        
        update() {
            this.y += this.speed;
            this.rotation += this.rotationSpeed;
            
            // Если конфетти упало за экран, перемещаем его наверх
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Сердечко
                ctx.beginPath();
                ctx.moveTo(0, this.size / 4);
                // Левая половинка сердца
                ctx.bezierCurveTo(
                    -this.size / 2, -this.size / 2,
                    -this.size, this.size / 3,
                    0, this.size
                );
                // Правая половинка сердца
                ctx.bezierCurveTo(
                    this.size, this.size / 3,
                    this.size / 2, -this.size / 2,
                    0, this.size / 4
                );
                ctx.closePath();
                ctx.fill();
            }
            
            ctx.restore();
        }
    }
    
    function createConfetti(count) {
        for (let i = 0; i < count; i++) {
            confettiPieces.push(new Confetti());
        }
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < confettiPieces.length; i++) {
            confettiPieces[i].update();
            confettiPieces[i].draw();
        }
        
        // Удаляем старые конфетти, если их слишком много
        if (confettiPieces.length > 300) {
            confettiPieces = confettiPieces.slice(-200);
        }
        
        requestAnimationFrame(animateConfetti);
    }
    
    confettiBtn.addEventListener('click', function() {
        createConfetti(150);
        
        // Анимация кнопки
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Запускаем анимацию конфетти
    animateConfetti();
    
    // Глобальная функция для создания конфетти из других частей кода
    window.createConfetti = createConfetti;
}

// Адаптация к изменению размера окна
function handleResize() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    setupLoveMeter();
    setupSecretMessage();
    setupHeartsButton();
    setupMessageButton();
    setupConfetti();
    
    // Изменение текста при наведении на основное сообщение
    const mainMessage = document.getElementById('main-message');
    const originalText = mainMessage.textContent;
    
    mainMessage.addEventListener('mouseenter', function() {
        this.textContent = "Сашулечка, я просто обожаю тебя! Ты делаешь мой мир лучше каждый день!";
    });
    
    mainMessage.addEventListener('mouseleave', function() {
        this.textContent = originalText;
    });
    
    // Клик по секретному блоку
    const secretPlaceholder = document.querySelector('.secret-placeholder');
    secretPlaceholder.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Создаем несколько сердечек
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFloatingHeart(this);
            }, i * 200);
        }
    });
    
    // Обработка изменения размера окна
    window.addEventListener('resize', handleResize);
    
    // Приветственное сообщение в консоли
    console.log("%c💖 Для самой прекрасной девочки! 💖", "color: #ff6b9d; font-size: 18px; font-weight: bold;");
    console.log("%cНа этом сайте спрятано много сюрпризов! Исследуй все кнопки и элементы 💕", "color: #a18cd1; font-size: 14px;");
    
    // Автоматический запуск небольшого конфетти при загрузке
    setTimeout(() => {
        createConfetti(30);
    }, 1000);
});