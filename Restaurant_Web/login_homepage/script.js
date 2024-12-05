var app = angular.module("restoApp", []);

app.controller("MainController", function ($scope, $http) {

    $scope.currentPage = "login.html";

    $scope.user = {};

    $scope.newUser = {};

    $scope.meals = [];
    $scope.searchQuery = "";

    $scope.selectedMeal = {};

    $scope.getMealCategories = function () {
        $http.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(function (response) {
                $scope.meals = response.data.categories;
            })
            .catch(function (error) {
                console.error("Error fetching data from API:", error);
            });
    };

    $scope.getMealCategories();

    $scope.viewMealDetails = function (meal) {
        $scope.selectedMeal = meal;
        const modal = new bootstrap.Modal(document.getElementById('mealDetailModal'));
        modal.show();
    };


    $scope.validateEmail = function (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    $scope.login = function () {
        if (!$scope.validateEmail($scope.user.email)) {
            alert("Format email tidak valid.");
            return;
        }
        if ($scope.user.password.length < 6) {
            alert("Password minimal 6 karakter.");
            return;
        }
        $scope.currentPage = "beranda.html";
    };

    $scope.register = function () {
        if ($scope.newUser.name && $scope.newUser.email && $scope.newUser.password) {
            alert("Registrasi berhasil!");
            $scope.currentPage = "login.html";
        } else {
            alert("Semua field wajib diisi.");
        }
    };

    $scope.goToRegister = function () {
        $scope.currentPage = "register.html";
    };

    $scope.goToLogin = function () {
        $scope.currentPage = "login.html";
    };

    $scope.goToPage = function (page) {
        $scope.currentPage = page;
    };

    $scope.logout = function () {
        alert("Anda telah logout.");
        $scope.currentPage = "login.html";
    };
});