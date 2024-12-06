const app = angular.module("mealApp", []);

app.controller("mealController", function ($scope, $http, $window) {
    $scope.meals = [];
    $scope.cart = [];
    $scope.showCart = false;
    $scope.showInvoice = false;
    $scope.invoice = {};

    $http.get("https://www.themealdb.com/api/json/v1/1/categories.php").then(
        (response) => {
            $scope.meals = response.data.categories.map((category) => ({
                name: category.strCategory,
                price: Math.floor(Math.random() * 15) + 5, 
                image: category.strCategoryThumb,
            }));
        },
        (error) => {
            console.error("Error fetching data:", error);
        }
    );

    $scope.addToCart = (meal) => {
        $scope.cart.push(meal);
    };

    $scope.removeFromCart = (index) => {
        $scope.cart.splice(index, 1);
    };

    $scope.getTotal = () => {
        return $scope.cart.reduce((total, item) => total + item.price, 0);
    };

    $scope.toggleCart = () => {
        $scope.showCart = !$scope.showCart;
    };

    $scope.checkout = () => {
        $scope.invoice.number = "INV" + Math.floor(Math.random() * 10000); 
        $scope.invoice.date = new Date().toLocaleDateString(); 
        
        $scope.invoice.items = $scope.cart.map((item) => ({
            name: item.name,
            category: item.name,
            price: item.price,
        }));

        $scope.invoice.total = $scope.getTotal();

        $scope.cart = [];
        $scope.showCart = false;
        $scope.showInvoice = true;
    };

    $scope.closeInvoice = () => {
        $scope.showInvoice = false;
    };

    $scope.goBack = function() {
        $window.location.href = '../homepage/beranda.html';
    };
});
