// shopping cart
let shoppingCart = [];  
let total = 0;
let timer = 45;

window.onunload = () => { 
	localStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
	localStorage.setItem("total",JSON.stringify(total));
	localStorage.setItem("timer",JSON.stringify(timer));
}

window.onload = () => {
	timer = JSON.parse(localStorage.getItem("timer"));
	shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
	total = shoppingCart.reduce((sum, item) =>{
		return sum + parseInt(item.price); 
	}, 0);

	renderCards(shoppingCart)

	document.querySelector('.header__cart-text').innerHTML = total + ' руб.';
	document.querySelector('.shopping-cart__total-price').innerHTML = total + ' руб.';

	var int = setInterval(() => {
		console.log(timer);
		document.querySelector('#offer-valid').innerHTML = timer;
		if(timer <= 0) {
			let oldPrice = document.querySelector('.bestsale').querySelector('#old-price').textContent;
			let currentPrice = document.querySelector('.bestsale').querySelector('#product-price').textContent;
			
			let arr = shoppingCart.map(item => {
				if(item.price == currentPrice) {
					item.price = oldPrice;
				}
				return item;
			});
			renderCards(shoppingCart)

			document.querySelector('.bestsale').querySelector('#product-price').innerHTML = parseInt(oldPrice);
			document.querySelector('.bestsale').querySelector('#old-price').innerHTML = '';
			document.querySelector('.card__validtimer').innerHTML = '';

			clearInterval(int); 
		} else { timer--; }
	}, 1000);
}

document.querySelector('.shopping-cart__cleaner').onclick = () => {
	shoppingCart = [];
	document.querySelector('.header__cart-text').innerHTML = '0 руб.';
	document.querySelector('.shopping-cart__items').innerHTML = '';
	document.querySelector('.shopping-cart__total-price').innerHTML = '0 руб.' ;
	total = 0;
}


// toggle shopping cart modal
document.querySelector('.header__cart').onclick = () => {
	document.querySelector('.modal-cart-bg').style.display = 'block'
}

document.querySelector('.shopping-cart__quit-link').onclick = () => {
	document.querySelector('.modal-cart-bg').style.display = 'none'
}


function renderCards(cart){
	document.querySelector('.shopping-cart__items').innerHTML = '';
	cart.forEach(item => {
		total = shoppingCart.reduce((sum, item) =>{
			return sum + parseInt(item.price); 
		}, 0);

		let cartItem = document.createElement('div');
		cartItem.classList.add('shopping-cart__item');

		let img = document.createElement('img');
		img.classList.add('shopping-cart__item-image')
		img.src = './img/pic.png';

		let wrapper = document.createElement('div');
		wrapper.classList.add('shopping-cart__info');

		let cardTitle = document.createElement('p');
		cardTitle.classList.add('shopping-cart__info-title');
		cardTitle.innerHTML = item.title;

		let cardPrice = document.createElement('p');
		cardPrice.classList.add('shopping-cart__info-price');
		cardPrice.innerHTML = item.price + ' руб.';

		wrapper.append(cardTitle);
		wrapper.append(cardPrice);

		cartItem.append(img);
		cartItem.append(wrapper)

		document.querySelector('.header__cart-text').innerHTML = total + ' руб.';
		document.querySelector('.shopping-cart__items').append(cartItem);
		document.querySelector('.shopping-cart__total-price').innerHTML = total + ' руб.' ;
	});
}

// buyNow handlers
document.querySelectorAll('.card__buybtn').forEach(btn => btn.onclick = event => {
	let title = event.target.closest('.card').querySelector('.card__title').textContent;
	let price = event.target.closest('.card').querySelector('#product-price').textContent;
	shoppingCart.push({'title': title, 'price': price});

	renderCards(shoppingCart)
});

