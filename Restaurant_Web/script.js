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
});