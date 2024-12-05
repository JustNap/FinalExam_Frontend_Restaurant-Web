const app = angular.module("restoApp", []);

app.controller("MainController", function ($scope, $http) {

    $scope.currentPage = "login.html";

    $scope.user = {};

    $scope.newUser = {};

    $scope.meals = [];
    $scope.searchQuery = "";

    $scope.login = function () {
        if ($scope.user.email && $scope.user.password) {
            $scope.currentPage = "beranda.html";
        } else {
            alert("Email dan password wajib diisi.");
        }
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

    $scope.searchByName = function () {
        const query = $scope.searchQuery;
        $http.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`).then(response => {
            $scope.meals = response.data.meals || [];
        });
    };

    $scope.searchByFirstLetter = function () {
        const query = $scope.searchQuery[0];
        $http.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`).then(response => {
            $scope.meals = response.data.meals || [];
        });
    };

    $scope.fetchCategories = function () {
        $http.get("https://www.themealdb.com/api/json/v1/1/categories.php").then(response => {
            $scope.meals = response.data.categories || [];
        });
    };
});