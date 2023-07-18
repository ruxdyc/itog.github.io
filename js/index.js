// Слайдер 
$('.intro').slick({
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
});

// Функция открытия модального окна для обратной связи
// Объявляем необходимые переменные
let openModalButton = document.getElementById('openModalButton');
let modal = document.getElementById('modal');
let closeButton = document.querySelector('.close');
// Функция открытия модального окна обратной связи
function openModal() {
    modal.classList.add('animate__fadeIn');
    modal.style.display = 'block';

};
// Функция закрытия модального окна обратной свзяи
function closeModal() {
    modal.classList.add('animate__fadeOut');
    setTimeout(function () {
        modal.classList.remove('animate__fadeOut');
        modal.style.display = 'none';
    }, 1000);

};
// Слушаем события для открытия модального окна при нажатии на кнопку
openModalButton.addEventListener('click', openModal);
// Слушаем события для закрытия модального окна при нажатии на крестик
closeButton.addEventListener('click', closeModal);

// Отправка формы внутри модального окна, и модальное окно с успешной отправкой формы
let form = document.getElementById('form')
let submitButton = document.getElementById('submitButton');
let succes = document.getElementById('succes');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    succes.classList.add('animate__animated', 'animate__fadeIn')
    // Показываем окно
    succes.style.display = 'block';
    modal.classList.add('animate__fadeOut')
    setTimeout(function () {
        succes.style.display = 'none';
        document.getElementById('form').submit();
        form.reset();
        modal.style.display = 'none';
    }, 2000);
});


//Модальное окно логин
// Объявдяем переменные
let loginModal = document.getElementById('login-modal');

let login = document.getElementById('login');
let loginForm = document.getElementById('login-modal-form')

function openLoginModal() {
    loginModal.classList.add('animate__fadeIn');
    loginModal.style.display = 'block';
};
function closeLoginModal() {
    loginModal.classList.remove('animate__fadeIn');
    loginModal.classList.add('animate__fadeOut');
    setTimeout(function () {
        loginModal.style.display = 'none';
        loginModal.classList.remove('animate__fadeOut');
        loginForm.reset();

    }, 500)
};
login.addEventListener('click', openLoginModal);

// Гамбургер меню
let hamburger = document.getElementById('hamburger');
let menu = document.getElementById('menu');
let bar = document.getElementsByClassName('.bar');
let menuItems = menu.querySelectorAll('a');
function hamburgerMenu() {
    if (!menu.classList.contains('open')) {
        menu.classList.add('animate__fadeInRight')
        menu.classList.add('open')
        hamburger.classList.add('open');
        menu.classList.add('hamburger-menu');
        setTimeout(function () {
            menu.classList.remove('animate__fadeInRight')
        }, 1000);

    } else {
        menu.classList.add('animate__fadeOutRight');
        menu.classList.remove('open');
        hamburger.classList.remove('open');
        setTimeout(function () {
            menu.classList.remove('animate__fadeOutRight');
            menu.classList.remove('hamburger-menu');
        }, 500);
    };
};
hamburger.addEventListener('click', hamburgerMenu);
// закрытие при нажатии на любой из элементов списка меню
menuItems.forEach(function (item) {
    item.addEventListener('click', function (event) {
        if (menu.classList.contains('open')) {
            hamburgerMenu();
        };
    });
});

// Открытие корзины
let openCart = document.getElementById('openCart');
let closeCart = document.getElementById('closeBtn');
let cart = document.getElementById('cart');

openCart.addEventListener('click', function () {
    cart.classList.add('animate__fadeInRight');
    setTimeout(function () {
        cart.classList.remove('animate__fadeInRight');
    }, 1500);
    cart.style.display = 'block';
});

closeCart.addEventListener('click', function () {
    cart.classList.add('animate__fadeOutRight');
    setTimeout(function () {
        cart.classList.remove('animate__fadeOutRight');
        cart.style.display = 'none';
    }, 500);

});

// Увеличение числа товаров на значке корзины
// Объявляем переменные, находим нужные элементы на странице
const cartIcon = document.querySelector('.cart-icon');
const cartCounter = document.getElementById('cart-counter');
const addToCart = document.querySelectorAll('.add-to-cart');

let itemCount = 0;

function addToCartHandler() {
    // Увеличение значения счетчика на 1
    itemCount++;
    cartCounter.textContent = itemCount;
    updateCartCounter();
};

addToCart.forEach(function (icon) {
    icon.addEventListener('click', addToCartHandler)
});

// Добавление товаров в корзину
let products = document.querySelectorAll('.shop-card');
let cartItemsContainer = document.getElementById('cart-items-container');
let cartTotalContainer = document.getElementById('cart-total');
let clearBtn = document.getElementById('clear-cart-btn');

// Создаем массив для хранения товаров в корзине
let cartItems = [];

products.forEach(function (product) {
    // Получаем кнопку "Добавить в корзину"
    let addToCartBtn = product.querySelector('.add-to-cart');
    // Получаем имя товара 
    let productName = product.querySelector('h4').textContent;
    // Получить цену товара, и преобразуем ее в число
    let productPrice = Math.floor(parseFloat(product.querySelector('.price').textContent.slice(1).replace('.', '')));

    // Добавляем обработчик для кнопки "добавить в корзину"
    addToCartBtn.addEventListener('click', function () {
        // Проверяем есть ли товар в корзине
        let existingCartItem = null;
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].name == productName) {
                existingCartItem = cartItems[i];
                break;
            }
        }
        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            let newItem = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
            cartItems.push(newItem);
        }
        // Обновить корзину после добавления товара

        updateCart();
        updateCartCounter();

    });
});

// Функция очистки корзины
clearBtn.addEventListener('click', function () {
    cartItems = [];
    updateCart();
    updateCartCounter();
});
// Функция для обновления корзины
function updateCart() {
    cartItemsContainer.innerHTML = '';

    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i]

        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        let itemName = document.createElement('span');
        itemName.classList.add('item-name');
        itemName.textContent = item.name;

        let decreaseBtn = document.createElement('button');
        decreaseBtn.classList.add('decreaseBtn');
        decreaseBtn.textContent = '-';
        decreaseBtn.addEventListener('click', createDecreaseBtnHandler(item));

        let itemQuantity = document.createElement('span');
        itemQuantity.classList.add = ('item-quantity');
        itemQuantity.textContent = item.quantity;

        let increaseBtn = document.createElement('button');
        increaseBtn.classList.add('increaseBtn');
        increaseBtn.textContent = '+';
        increaseBtn.addEventListener('click', createIncreaseBtnHandler(item));

        let itemPrice = document.createElement('span');
        itemPrice.classList.add('item-price');
        itemPrice.textContent = '₽' + (item.price * item.quantity).toLocaleString();

        cartItem.appendChild(itemName);
        cartItem.appendChild(decreaseBtn);
        cartItem.appendChild(itemQuantity);
        cartItem.appendChild(increaseBtn);
        cartItem.appendChild(itemPrice);

        cartItemsContainer.appendChild(cartItem);

    }

    let total = calculateTotal();
    cartTotalContainer.textContent = 'Общая сумма: ₽' + total.toLocaleString();

}

function createDecreaseBtnHandler(item) {
    return function () {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            let itemIndex = cartItems.indexOf(item);
            cartItems.splice(itemIndex, 1);
        }
        updateCart();
        updateCartCounter();
    }

}

function createIncreaseBtnHandler(item) {
    return function () {
        item.quantity++;
        updateCart();
        updateCartCounter();

    };
}

function updateCartCounter() {
    let itemCount = 0;
    for (let i = 0; i < cartItems.length; i++) {
        itemCount += cartItems[i].quantity;
    }
    cartCounter.textContent = itemCount;
}

function calculateTotal() {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        total += item.price * item.quantity;
    }
    return total;
}