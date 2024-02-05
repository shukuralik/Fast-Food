// Timer from 0 to 100 in logo
const timer = document.querySelector('.timer');
function counter() {
    if (timer.textContent < 100) {
        timer.textContent++;
        setTimeout(counter, 50)
    }
} counter()

// Opening and closing mobile menu
const mobileMenu = document.querySelector('.mobile__menu'),
    headerBtn = document.querySelector('.header__btn');
headerBtn.addEventListener('click', function (e) {
    mobileMenu.classList.toggle('active')
})


// Order
const food = [
    {
        name: 'Classic Burger',
        price: 20500,
        amount: 0,
        kcall: 470,
        id: 'classic'
    },
    {
        name: 'Cheesse Burger',
        price: 24000,
        amount: 0,
        kcall: 530,
        id: 'cheesse'
    },
    {
        name: 'Kombo Burger',
        price: 28000,
        amount: 0,
        kcall: 610,
        id: 'kombo'
    },
    {
        name: 'Coca Cola',
        price: 6000,
        amount: 0,
        kcall: 45,
        id: 'cola'
    },
    {
        name: 'Sprite',
        price: 10000,
        amount: 0,
        kcall: 80,
        id: 'sprite'
    },
    {
        name: 'Fanta',
        price: 12000,
        amount: 0,
        kcall: 110,
        id: 'fanta'
    },
]
const btns = [...document.querySelectorAll('.count__btn')];
const calc = (amount, something) => amount * something;
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function (e) {
        e.preventDefault();
        sh(this);
    })
}
function sh(btn) {
    const parent = btn.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        count = parent.querySelector('.count__num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        symbol = btn.getAttribute('data-symbol');

    let index = food.findIndex(item => item.id == parentId);

    if (symbol == '+' && food[index].amount < 20) {
        food[index].amount++;
    }
    else if (symbol == '-' && food[index].amount > 0) {
        food[index].amount--;
    }
    count.textContent = food[index].amount;
    kcall.textContent = calc(food[index].amount, food[index].kcall);
    price.textContent = calc(food[index].amount, food[index].price);
};



const orderBtn = document.querySelectorAll('.spec-link'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window-out'),
    payBtn = document.querySelector('.receipt__window-btn');
orderBtn.forEach(item => {
    item.addEventListener('click', function () {
        if (food.some(item => item.amount > 0 ? item : false)) {
            receipt.classList.add('active');
            let totalName = '';
            let totalPrice = 0;
            let totalKcall = 0;
            for (let i = 0; i < food.length; i++) {
                if (food[i].amount > 0) {
                    totalName += `${food[i].name} - ${food[i].amount}шт\n`;
                    totalPrice += calc(food[i].amount, food[i].price);
                    totalKcall += calc(food[i].amount, food[i].kcall);
                    for (const key in food[i]) {
                        if (food[i][key] === true) {
                            let data = dataExtra.findIndex(item => item.extraId == key);
                            totalName += `\t${dataExtra[data].name}\n`;
                        }
                    }
                }
            }
            receiptWindow.innerHTML = `Ваш заказ:\n${totalName}Общая стоимость: ${totalPrice}\nОбщая калорийность ${totalKcall}`;
        }
        else alert('Вы ничего не заказали');
    })
})
payBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.reload();
})