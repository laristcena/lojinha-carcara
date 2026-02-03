let cart = [];
const phone = "5579999401478";

// Função Carrinho
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>R$ ${item.price.toFixed(2)} <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">❌</button></span>
            </div>`;
    });

    cartTotal.innerText = total.toFixed(2);
    cartCount.innerText = cart.length;
}

function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('hidden');
}

function checkout() {
    if (cart.length === 0) return alert("Seu carrinho está vazio!");
    
    let message = "*Pedido Lojinha Carcará*\n\n";
    cart.forEach(item => {
        message += `• ${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    message += `\n*Total: R$ ${document.getElementById('cart-total').innerText}*`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// Lógica do Carrossel Automático
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-img');

function showSlides() {
    slides.forEach(s => s.classList.remove('active'));
    currentSlide++;
    if (currentSlide > slides.length) { currentSlide = 1 }
    slides[currentSlide - 1].classList.add('active');

    // Mude de 3000 para 5000 (5 segundos) ou 7000 (7 segundos)
    setTimeout(showSlides, 5000); 
}

showSlides();

let currentProductIndex = 0;

function moveSlide(direction) {
    const slider = document.getElementById('products-slider');
    const cards = document.querySelectorAll('.product-card');
    const totalCards = cards.length;
    
    // Calcula quantos itens aparecem por vez baseada na largura da tela
    const itemsPerPage = window.innerWidth > 768 ? 3 : 1;
    const maxIndex = totalCards - itemsPerPage;

    currentProductIndex += direction;

    // Impede de passar do limite ou voltar demais
    if (currentProductIndex < 0) {
        currentProductIndex = 0;
    } else if (currentProductIndex > maxIndex) {
        currentProductIndex = maxIndex;
    }

    // Calcula a porcentagem do deslocamento
    const offset = currentProductIndex * (100 / itemsPerPage);
    slider.style.transform = `translateX(-${offset}%)`;
}