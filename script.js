/*Книга*/

document.addEventListener('DOMContentLoaded', function() {
    const bookSlider = document.querySelector('.bookSlider');
    const allBooks = document.querySelectorAll('.bookSliderPage');
    let currentIndex = 0;
    
    if (allBooks.length > 0) {
        allBooks[0].classList.add('active');
    }
    
    bookSlider.addEventListener('click', function() {
        allBooks[currentIndex].classList.remove('active');
        allBooks[currentIndex].classList.add('hidden');
        
        currentIndex++;
        
        if (currentIndex < allBooks.length) {
            allBooks[currentIndex].classList.add('active');
        } else {
            const message = document.createElement('div');
            message.textContent = 'Страницы закончились!';
            message.style.display = 'flex';
            message.style.justifyContent = 'center';
            message.style.alignItems = 'center';
            message.style.height = '100%';
            message.style.fontSize = '1.9vw';
            message.style.color = '#DB284D';
            message.style.marginTop = '1.9vw';
            bookSlider.appendChild(message);
        }
    });
    
    bookSlider.parentNode.insertBefore(resetBtn, bookSlider.nextSibling);
});


/*Магазин*/

document.querySelectorAll('.flowerButton').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        
        const h2 = this.querySelector('h2');
        if (this.classList.contains('active')) {
            h2.textContent = this.dataset.activeText;
        } else {
            h2.textContent = this.dataset.text;
        }
    });
});


/*Корзина*/


document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.flowerButton');
    
    // Восстанавливаем состояние кнопок из localStorage
    buttons.forEach(button => {
        const flowerGroup = button.closest('.flowerGroup');
        const name = flowerGroup.querySelector('.flowerName h2').textContent.trim();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.find(item => item.name === name)) {
            button.classList.add('active');
            const h2 = button.querySelector('h2');
            if (h2) h2.textContent = button.dataset.activeText;
        }
    });
    
    // Обработчик кликов
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const flowerGroup = button.closest('.flowerGroup');
            const name = flowerGroup.querySelector('.flowerName h2').textContent.trim();
            const img = flowerGroup.querySelector('img').src;
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.name === name);
            
            if (itemIndex === -1) {
                // Добавляем в корзину
                button.classList.add('active');
                const h2 = button.querySelector('h2');
                if (h2) h2.textContent = button.dataset.activeText;

                cart.push({ name, img, html: flowerGroup.outerHTML });


            } else {
                // Удаляем из корзины
                cart.splice(itemIndex, 1);
                button.classList.remove('active');
                const h2 = button.querySelector('h2');
                if (h2) h2.textContent = button.dataset.text;
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));

            
        });
    });
});

