var app = angular.module("myCartApp", ['ngSanitize', 'appControlModule', 'ngRoute'], function(){
    console.info("myCartApp Function..");
});

app.config(function($routeProvider){
console.info("myCartApp Config");

    $routeProvider.when("/", {template : "<h1>Happy Alien Shopping!</h1>"});
    $routeProvider.when("/cart", {templateUrl : "views/partials/cart.html"});
    $routeProvider.when("/products", {templateUrl : "views/partials/products.html"});
    $routeProvider.when("/productMgmt", {templateUrl : "views/partials/productsMgmt.html", controller : 'ProductController'});

    $routeProvider.when("/details/:product", {templateUrl:"views/partials/productDetails.html", controller : 'DetailsController'});


    $routeProvider.when("/login", {templateUrl : "views/partials/login.html", controller : 'LoginController'});
    $routeProvider.when("/logout", {templateUrl : "views/partials/logout.html"});
    $routeProvider.when("/error", {templateUrl : "views/partials/error.html"});


    $routeProvider.otherwise({template: "<h3>Error 404</h3>"})

});

app.run(function($rootScope){
   $rootScope.isLoggedIn = false;
});
