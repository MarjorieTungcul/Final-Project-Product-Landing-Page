let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}

let darkmode = document.querySelector('#darkmode');

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

darkmode.onclick = () => {
    if (darkmode.classList.contains('bx-moon')) {
        enableDarkMode();
        localStorage.setItem('theme', 'dark');
    } else {
        disableDarkMode();
        localStorage.setItem('theme', 'light');
    }
}

function enableDarkMode() {
    darkmode.classList.replace('bx-moon', 'bx-sun');
    document.body.classList.add('active');
    document.documentElement.style.setProperty('--bg-color', 'black');
    document.documentElement.style.setProperty('--text-color', 'white');
    document.documentElement.style.setProperty('--main-color', 'tan');
}

function disableDarkMode() {
    darkmode.classList.replace('bx-sun', 'bx-moon');
    document.body.classList.remove('active');
    document.documentElement.style.setProperty('--bg-color', 'white');
    document.documentElement.style.setProperty('--text-color', 'black');
    document.documentElement.style.setProperty('--main-color', 'tan');
}

const sr = ScrollReveal ({
    origin: 'top',
    distance: '40px',
    duration: 1500,
    reset: true
});


sr.reveal(`.home-text, .home-img,
            .about-img, .about-text,
            .box, .s-box,
            .btn, .connect-text,
            .contact-box`, {
    interval: 200
})

const termsLink = document.getElementById("termsLink");
const termsModal = document.getElementById("termsModal");
const closeModal = document.getElementById("closeModal");

termsLink.addEventListener("click", function (e) {
  e.preventDefault();
  termsModal.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  termsModal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === termsModal) {
    termsModal.style.display = "none";
  }
});

const privacyLink = document.getElementById("privacyLink");
const ptermsModal = document.getElementById("privacyModal");
const pcloseModal = document.getElementById("pcloseModal");

privacyLink.addEventListener("click", function (e) {
  e.preventDefault();
  privacyModal.style.display = "flex";
});

pcloseModal.addEventListener("click", function () {
  ptermsModal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === privacyModal) {
    privacyModal.style.display = "none";
  }
});

const suggestionsData = {
    brands: ["Fila", "Nike", "Vans", "Puma", "Asics"],
    models: {
        "Fila": ["Fila Disruptor 2", "Fila Venom", "Fila Disruptor"],
        "Nike": ["Nike Air Zoom", "Nike KD Trey 5IX EP", "Nike Blazer Low '77 Vintage"],
        "Vans": ["Vans Sk8-Hi", "Vans Era", "Vans Slip-On"],
        "Puma": ["Puma RS-X3", "Puma Cali", "Puma Aramy Trainer"],
        "Asics": ["Asics Gel-Lyte III", "Asics Gel-Lyte", "Asics Gel-Venture 8"],
    }
};

const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");

searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase().trim();
    
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none'; 
    
    if (query) {
        const matchedBrands = suggestionsData.brands.filter(brand => brand.toLowerCase().includes(query));
        
        const matchedModels = [];
        for (let brand in suggestionsData.models) {
            const models = suggestionsData.models[brand];
            models.forEach(model => {
                if (model.toLowerCase().includes(query)) {
                    matchedModels.push({ brand, model });
                }
            });
        }
        
    
        matchedBrands.forEach(brand => {
            const li = document.createElement("li");
            li.textContent = brand;
            li.onclick = function() {
                window.location.href = `products.html#${brand.toLowerCase()}`; // Redirect to the brand section
            };
            suggestionsList.appendChild(li);
        });
        
        matchedModels.forEach(({ brand, model }) => {
            const li = document.createElement("li");
            li.textContent = model;
            li.onclick = function() {
                window.location.href = `products.html#${brand.toLowerCase()}`; // Redirect to the model section
            };
            suggestionsList.appendChild(li);
        });

        if (suggestionsList.innerHTML) {
            suggestionsList.style.display = 'block';
        }
    }
});

document.addEventListener("click", function(event) {
    if (!searchInput.contains(event.target) && !suggestionsList.contains(event.target)) {
        suggestionsList.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const openButtons = document.querySelectorAll(".open-modal-btn");
    const closeButtons = document.querySelectorAll(".product-close-btn");
  
    openButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = "flex";
        }
      });
    });
  
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".product-modal");
        modal.style.display = "none";
      });
    });
  
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("product-modal")) {
        e.target.style.display = "none";
      }
    });
  });

let cart = JSON.parse(localStorage.getItem('cart')) || [];

if (document.getElementById('cart-items')) {
    const cartContainer = document.getElementById('cart-items');

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      
        displayCartItems();
    }

    document.addEventListener('DOMContentLoaded', () => {
        displayCartItems(); 
    });

   
    function displayCartItems() {
        cartContainer.innerHTML = ''; 

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="text-gray-500">No items in cart.</p>';
    
            const checkoutBtn = document.getElementById('checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.disabled = true;
                checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
    
            return; 
        }

        cart.forEach((product, index) => {
            const total = product.quantity * product.price;
            const itemHTML = `
                <div class="header-grid cart-row" data-index="${index}">
                    <div class="product-col">
                        <input type="checkbox" class="checkout-checkbox" data-index="${index}" ${product.selected ? 'checked' : ''}>
                        <img src="${product.image}" alt="${product.name}" width="80">
                        <p>${product.name}</p>
                    </div>
                    <div class="price-col">₱${product.price}</div>
                    <div class="qty-col">
                        <input type="number" min="1" max="10" value="${product.quantity}" class="qty-input" data-index="${index}">
                    </div>
                    <div class="total-col">₱${total.toFixed(2)}</div>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartContainer.innerHTML += itemHTML;
        });

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

        attachEventListeners();
    }

    function attachEventListeners() {
        const qtyInputs = document.querySelectorAll('.qty-input');
        qtyInputs.forEach((input, i) => {
            input.addEventListener('input', () => {
                let value = parseInt(input.value);
                if (isNaN(value) || value < 1) value = 1;
                if (value > 10) value = 10;

                input.value = value;
                cart[i].quantity = value;
                localStorage.setItem('cart', JSON.stringify(cart));

                const totalCol = input.closest('.cart-row').querySelector('.total-col');
                const total = value * cart[i].price;
                totalCol.textContent = `₱${total.toFixed(2)}`;

                updateGrandTotal();
            });
        });

        const removeBtns = document.querySelectorAll('.remove-btn');
        removeBtns.forEach((button) => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));

                const cartRow = e.target.closest('.cart-row');
                cartRow.remove();

                alert('Item removed from the cart!');

                displayCartItems();
                updateGrandTotal();
            });
        });

        const checkboxes = document.querySelectorAll('.checkout-checkbox');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                const index = checkbox.getAttribute('data-index');
                cart[index].selected = checkbox.checked;
                localStorage.setItem('cart', JSON.stringify(cart));

                updateGrandTotal();
            });
        });
    }

    function updateGrandTotal() {
        let total = 0;
        cart.forEach((product) => {
            if (product.selected) {
                total += product.quantity * product.price;
            }
        });

        const grandTotalEl = document.getElementById('grand-total');
        if (grandTotalEl) {
            grandTotalEl.textContent = `₱${total.toFixed(2)}`;
        }
    }
}

if (document.querySelector('.add-to-cart')) {
    const cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productBox = button.closest('.box');
            const id = productBox.dataset.id;
            const name = productBox.dataset.name;
            const price = parseFloat(productBox.dataset.price);
            const image = productBox.dataset.image;

            const product = {
                id,
                name,
                price,
                image,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${name} added to cart!`);

            updateGrandTotal();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const confirmPopup = document.createElement('div');
            confirmPopup.innerHTML = `
                <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999;">
                    <div style="background:white; padding:20px; border-radius:10px; text-align:center;">
                        <p style="color:black">Are you sure you want to checkout?</p>
                        <button id="confirm-yes">Yes</button>
                        <button id="confirm-cancel">Cancel</button>
                    </div>
                </div>
            `;
            document.body.appendChild(confirmPopup);

            document.getElementById('confirm-cancel').onclick = () => {
                confirmPopup.remove();
            };

            document.getElementById('confirm-yes').onclick = () => {
                confirmPopup.remove();
            
                cart = cart.filter(item => !item.selected);
                localStorage.setItem('cart', JSON.stringify(cart));
   
                displayCartItems();
                updateGrandTotal();

                const placedPopup = document.createElement('div');
                placedPopup.innerHTML = `
                    <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999;">
                        <div style="background:white; padding:20px; border-radius:10px; text-align:center;">
                            <p style="color:black">Your order has been placed!</p>
                        </div>
                    </div>
                `;
                document.body.appendChild(placedPopup);
            
                setTimeout(() => {
                    placedPopup.remove();
                }, 2000);
            };
            
        });
    }
});

