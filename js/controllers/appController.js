var c = angular.module("appControlModule", ['appServiceModule'], function () {
console.info("CtrlModule function");
});

c.controller("MainController", function ($scope, $location, $rootScope) {
        $scope.$on("$locationChangeSuccess", function () {
            console.log("Location Change Success --> " + $location.path());

            if($location.path() == "/logout")
            {
                $rootScope.isLoggedIn = false;
                $location.path("/login");
            } else if($location.path() == "/productMgmt" && !$rootScope.isLoggedIn)
            {
                $location.path("/login")
            }
    });
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
    $scope.cartSize = cartService.allCartItems().length;

    $scope.addToCart = function(product){

        console.log("addTOCart");
        var continueFurther = true;
        console.log("Searching for " + product.name);
        angular.forEach(cartService.allCartItems(), function(cartItem){
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


c.controller("LoginController", function ($scope, $location, $rootScope) {

    $scope.Login = function () {
      if($scope.login.uname == "admin") {
          $rootScope.isLoggedIn = true;
          $location.path("/productMgmt");
      } else {
            $location.path("/login");
    }
    };

});
