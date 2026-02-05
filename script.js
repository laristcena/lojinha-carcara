let cart = [];
const phone = "5579999401478";

// Função Carrinho
function addToCart(name, price, color, quantity = 1) {
    if (!color || color === "Selecione uma cor") {
        alert("Por favor, selecione uma cor!");
        return;
    }
    for (let i = 0; i < quantity; i++) {
        cart.push({ name, price, color });
    }
    updateCart();
}

function selectColor(button) {
    // 1. Encontra o card do produto onde o botão foi clicado
    const productCard = button.closest('.product-card');
    
    // 2. Remove a seleção de outros botões APENAS dentro deste card
    productCard.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('selected'));
    
    // 3. Marca o botão clicado como selecionado
    button.classList.add('selected');
    
    // 4. Captura a cor e salva no input oculto DESTE card específico
    const color = button.getAttribute('data-color');
    productCard.querySelector('.color-display').value = color;
}

function increaseQuantity(button) {
    const qtyDisplay = button.closest('.quantity-control').querySelector('.qty-display');
    qtyDisplay.innerText = parseInt(qtyDisplay.innerText) + 1;
}

function decreaseQuantity(button) {
    const qtyDisplay = button.closest('.quantity-control').querySelector('.qty-display');
    const currentQty = parseInt(qtyDisplay.innerText);
    if (currentQty > 1) {
        qtyDisplay.innerText = currentQty - 1;
    }
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

    // Agrupa itens por nome e cor
    const groupedItems = {};
    cart.forEach((item, index) => {
        const key = `${item.name}|${item.color}`;
        if (!groupedItems[key]) {
            groupedItems[key] = { name: item.name, color: item.color, price: item.price, quantity: 0, indices: [] };
        }
        groupedItems[key].quantity++;
        groupedItems[key].indices.push(index);
        total += item.price;
    });

    // Exibe itens agrupados
    Object.values(groupedItems).forEach(group => {
        const firstIndex = group.indices[0];
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <span class="item-name">${group.name} x${group.quantity}</span>
                    <span class="item-color">Cor: ${group.color}</span>
                </div>
                <span class="item-price">R$ ${(group.price * group.quantity).toFixed(2)} <button onclick="removeFromCart(${firstIndex})" class="remove-item-btn"><img src="fotos/lixo_icone.png" alt="Remover" class="icon-lixeira"></button></span>
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
    
    // Agrupa itens por nome e cor
    const groupedItems = {};
    cart.forEach(item => {
        const key = `${item.name}|${item.color}`;
        if (!groupedItems[key]) {
            groupedItems[key] = { name: item.name, color: item.color, price: item.price, quantity: 0 };
        }
        groupedItems[key].quantity++;
    });
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    
    let message = "*Pedido Lojinha Carcará*\n";
    Object.values(groupedItems).forEach(item => {
        message += `\n• ${item.name}\n   Cor: ${item.color}\n   Quantidade: ${item.quantity}x\n   Preço unitário: R$ ${item.price.toFixed(2)}\n   Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\nForma de Entrega: ${deliveryMethod}\n*Total: R$ ${document.getElementById('cart-total').innerText}*`;
    
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
    const offset = currentProductIndex * (101 / itemsPerPage);
    slider.style.transform = `translateX(-${offset}%)`;
}
function updateColor(selectElement) {
    const selectedColor = selectElement.value;
    const productCard = selectElement.closest('.product-card');
    const addButton = productCard.querySelector('button');
}
// teste do campo de whatsapp
function sendWhatsAppMessage() {
    const input = document.getElementById('whatsapp-input');
    const message = input.value;
    const phoneNumber = "5579999401478"; // Número da equipe

    if (message.trim() === "") {
        alert("Por favor, digite uma mensagem antes de enviar!");
        return;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
}
