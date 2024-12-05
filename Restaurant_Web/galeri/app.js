const app = angular.module('luxuryGalleryApp', []);

app.controller('GalleryController', function($scope, $http) {
    $scope.images = [];

    const categories = [
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood',
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef',
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken',
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'
    ];

    categories.forEach(url => {
        $http.get(url).then(response => {
            const meals = response.data.meals;
            if (meals) {
                meals.forEach(meal => {
                    $scope.images.push(meal.strMealThumb);
                });
            }
        });
    });
});
