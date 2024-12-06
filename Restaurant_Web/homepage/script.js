var app = angular.module("restoApp", []);

app.controller("MainController", function ($scope, $http, $window) {

    $scope.currentPage = "login.html";

    $scope.user = {};

    $scope.newUser = {};

    $scope.meals = [];
    $scope.searchQuery = "";

    $scope.selectedMeal = {};
    $scope.registeredUsers = [];


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
        const user = $scope.registeredUsers.find(
            (u) => u.email === $scope.user.email && u.password === $scope.user.password
        );
    
        if (user) {
            alert(`Selamat datang, ${user.name}!`);
            $scope.user = {};
            $scope.goToPage("beranda.html");
        } else {
            alert("Email atau password salah.");
        }
    };

    $scope.register = function () {
        if ($scope.newUser.name && $scope.newUser.email && $scope.newUser.password) {

            $scope.registeredUsers.push({
                name: $scope.newUser.name,
                email: $scope.newUser.email,
                password: $scope.newUser.password
            });

            alert("Registrasi berhasil!");
            $scope.newUser = {};
            $scope.goToPage ("login.html");
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

    $scope.goBack = function() {
        $window.location.href = '../homepage/beranda.html';
    };
});