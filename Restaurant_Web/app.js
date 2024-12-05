const app = angular.module("mealApp", []);

app.controller("mealController", function ($scope, $http) {
    $scope.meals = [];
    $scope.cart = [];
    $scope.showCart = false;

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
        alert(`Total: $${$scope.getTotal()}. Thank you for your order!`);
        $scope.cart = [];
        $scope.showCart = false;
    };
});
