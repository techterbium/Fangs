var c = angular.module("appControlModule", ['appServiceModule'], function () {
console.info("CtrlModule function");
});

c.controller("MainController", function ($scope) {

});

c.config(function() {
console.info("CtrlModule Config");
});

c.run(function() {
console.info("CtrlModule Run");
});


c.controller("ProductController",function($scope, appService, cartService) {
    console.info("ProductController Function");

    $scope.products = appService.getAllProducts();

    $scope.addToCart = function(product){

        console.log("addTOCart");
        var continueFurther = true;
        console.log(product.name);
        angular.forEach(cartService.allCartItems(), function(cartItem){
            console.log(cartItem.name);
            if(cartItem.name == product.name)
            {
                console.log("Item Found..");
                cartItem.quantity += 1;
                continueFurther = false;
                return;
            }
        });

         if(continueFurther)
         {
            console.log("Item Not Found, adding for first time");
            var item = {"name":product.name,
                        "price":product.price,
                        "quantity":1}
            cartService.addProductToCart(product);
         }
    };

});

c.controller("CartController", function($scope, cartService){
    console.info("CartController");

    $scope.productsInCart = cartService.allCartItems();

    $scope.removeFromCart = function(index){
        cartService.removeFromCart(index);
    };

    $scope.totalAmount = function(){
        var totalCartValue = 0;
        angular.forEach(cartService.allCartItems(), function(c){
            totalCartValue += (c.price * c.quantity);
        });
        return totalCartValue;
    };

    $scope.checkOut = function($rootScope){

        if(cartService.allCartItems().length == 0)
        {
            $rootScope.poorMessage = true;
            $rootScope.byeMessage = false;
        }
        else
        {
            $rootScope.byeMessage = true;
            $rootScope.poorMessage = false;
        }
    };
});

c.controller("DetailsController", function ($scope, $routeParams) {
    $scope.details = angular.fromJson($routeParams.product);
});
