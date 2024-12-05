var app = angular.module('mealApp', []);

app.controller('MealController', function($scope, $http) {
    // Initial cart setup
    $scope.cart = JSON.parse(localStorage.getItem("cart")) || [];
    $scope.showCartModal = false;
    $scope.showInvoiceModal = false;

    // Load categories from API
    $http.get("https://www.themealdb.com/api/json/v1/1/categories.php").then(function(response) {
        $scope.categories = response.data.categories;
    });

    // Add item to cart
    $scope.addToCart = function(category) {
        $scope.cart.push(category.strCategory);
        localStorage.setItem("cart", JSON.stringify($scope.cart));
        $scope.updateCartCount();
    };

    // Remove item from cart
    $scope.removeFromCart = function(index) {
        $scope.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify($scope.cart));
        $scope.updateCartCount();
    };

    // Update cart count
    $scope.updateCartCount = function() {
        $scope.cartCount = $scope.cart.length;
    };

    // Generate invoice
    $scope.generateInvoice = function() {
        $scope.invoiceItems = [];
        var totalAmount = 0;

        $scope.cart.forEach(function(item) {
            var category = $scope.categories.find(cat => cat.strCategory === item);
            if (category) {
                $scope.invoiceItems.push({
                    name: category.strCategory,
                    price: 10, // Assuming each item costs $10
                    thumb: category.strCategoryThumb
                });
                totalAmount += 10; // Add $10 for each item in cart
            }
        });

        $scope.totalAmount = totalAmount.toFixed(2);
        $scope.showInvoiceModal = true;
        localStorage.removeItem("cart"); // Clear cart after invoice generation
        $scope.cart = [];
        $scope.updateCartCount();
    };

    // Close modal
    $scope.closeModal = function() {
        $scope.showInvoiceModal = false;
        $scope.showCartModal = false;  // Hide cart modal when closing
    };

    // Print Invoice
    $scope.printInvoice = function() {
        window.print();
    };

    // Toggle cart modal visibility
    $scope.toggleCartModal = function() {
        $scope.showCartModal = !$scope.showCartModal;
    };

    // Update cart count on load
    $scope.updateCartCount();
});