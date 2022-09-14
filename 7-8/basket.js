"use strict";

const basketCounterEl = document.querySelector('.cart-icon-wrap span');
const basketTotalValueEl = document.querySelector('.basket-total-value');
const basketTotalEl = document.querySelector('.basket-total');
const basketEl = document.querySelector('.basket');

document.querySelector('.cart-icon-wrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};
document.querySelector('.offer-cardbox').addEventListener('click', event => {
    if (!event.target.closest('.offer-btn-cart')) {
        return;
    }
    const offerCard = event.target.closest('.offer-card');
    const id = +offerCard.dataset.id;
    const name = offerCard.dataset.name;
    const price = +offerCard.dataset.price;
    offerBtnCart(id, name, price);
});

function offerBtnCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0};
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
    /*const productsArr = Object.values(basket);
    let count = 0;
    for (const product of productsArr) {
        count += product.count;
    }
    return count;*/
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0)
}

function renderProductInBasket(id) {
    const basketBoxEl = basketEl
        .querySelector(`.basket-box[data-productId="${id}"]`);
    if (!basketBoxEl) {
        renderNewProductInBasket(id);
        return;
    }
    basketBoxEl.querySelector('.product-count').textContent = basket[id].count;
    basketBoxEl.querySelector('.product-total-row')
        .textContent = basket[id].count * basket[id].price;
    // renderNewProductInBasket(id);
}

function renderNewProductInBasket(productId) {
    const productRow = `
        <div class="basket-box" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="product-count">${basket[productId].count}</span> шт.
            </div>
            <div>$${basket[productId].price}</div>
            <div>
                $<span class="product-total-row">
                    ${(basket[productId].price * basket[productId].count).toFixed(2)}
                </span>
            </div>
        </div> 
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}