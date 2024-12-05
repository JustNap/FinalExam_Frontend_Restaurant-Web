document.addEventListener("DOMContentLoaded", async () => {
    const menuGrid = document.getElementById("menuGrid");
    const cartCount = document.getElementById("cartCount");
    const cartItemsDiv = document.getElementById("cartItems");
    const checkoutButton = document.getElementById("checkout");
    const cartIcon = document.getElementById("cartIcon");
    const cartModal = document.getElementById("cartModal");
    const closeModal = document.getElementById("closeModal");
    const invoiceModal = document.getElementById("invoiceModal");
    const closeInvoice = document.getElementById("closeInvoice");
    const invoiceItemsDiv = document.getElementById("invoiceItems");
    const totalAmountDiv = document.getElementById("totalAmount");
    const printInvoiceButton = document.getElementById("printInvoice");

    const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
    const setCart = (newCart) => localStorage.setItem("cart", JSON.stringify(newCart));

    const updateCartCount = () => {
        cartCount.textContent = getCart().length;
    };

    const renderCart = async () => {
        const cart = getCart();
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        const categories = await fetchCategories();
        const categoryMap = categories.reduce((map, category) => {
            map[category.strCategory] = { thumb: category.strCategoryThumb, price: 10 }; // Assuming $10 as a price
            return map;
        }, {});

        cartItemsDiv.innerHTML = cart
            .map(
                (item, index) => ` 
            <div class="cart-item">
                <img src="${categoryMap[item].thumb}" alt="${item}">
                <h4>${item}</h4>
                <p>Price: $${categoryMap[item].price}</p> <!-- Show price only in cart -->
                <button data-index="${index}" class="remove-btn">Remove</button>
            </div>
        `
            )
            .join("");

        document.querySelectorAll(".remove-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                const cart = getCart();
                cart.splice(index, 1);
                setCart(cart);
                renderCart();
                updateCartCount();
            });
        });
    };

    const fetchCategories = async () => {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();
        return data.categories || [];
    };

    const renderMenu = async () => {
        const categories = await fetchCategories();
        menuGrid.innerHTML = categories
            .map(
                (cat) => `
            <div class="meal">
                <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
                <h3>${cat.strCategory}</h3>
                <!-- No price displayed here in the menu -->
                <button class="add-to-cart" data-category="${cat.strCategory}">Add to Cart</button>
            </div>
        `
            )
            .join("");

        document.querySelectorAll(".add-to-cart").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const category = e.target.getAttribute("data-category");
                const currentCart = getCart();
                currentCart.push(category);
                setCart(currentCart);
                updateCartCount();
                renderCart();
                alert(`${category} added to cart!`); // Corrected the alert syntax
            });
        });
    };

    checkoutButton.addEventListener("click", () => {
        const cart = getCart();
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        generateInvoice(cart);
    });

    cartIcon.addEventListener("click", () => {
        cartModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    closeInvoice.addEventListener("click", () => {
        invoiceModal.style.display = "none";
    });

    printInvoiceButton.addEventListener("click", () => {
        window.print(); 
    });

    const generateInvoice = async (cart) => {
        const categories = await fetchCategories();
        const categoryMap = categories.reduce((map, category) => {
            map[category.strCategory] = { thumb: category.strCategoryThumb, price: 10 }; 
            return map;
        }, {});

        let totalAmount = 0;
        invoiceItemsDiv.innerHTML = cart
            .map(
                (item) => `
            <div class="invoice-item">
                <img src="${categoryMap[item].thumb}" alt="${item}" style="width: 50px; height: 50px; margin-right: 10px;">
                <span>${item}</span>
                <span> - $${categoryMap[item].price}</span>
            </div>
        `
            )
            .join("");


        totalAmount = cart.length * 10; 
        totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`;

        invoiceModal.style.display = "block";

        localStorage.removeItem("cart");
        renderCart();
        updateCartCount();
    };

    updateCartCount();
    renderMenu();
    renderCart();
});
