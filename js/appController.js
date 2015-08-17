var c = angular.module("CtrlModule", [], function () {
console.info("CtrlModule function");
});

c.config(function() {
console.info("CtrlModule Config");
});

c.run(function($rootScope) {
console.info("CtrlModule Run");
    $rootScope.productsInCart = [];
});

c.controller("ProductController",function($scope, $rootScope) {
    console.info("ProductController Function");
    $scope.products = [{
                   "code":"PRD001",
                   "name":"Samsung MicroOven",
                   "price":"18000",
                   "description":"28L Convection"
                  },{
                   "code":"PRD002",
                   "name":"Panasonic MicroOven",
                   "price":"19000",
                   "description":"27L Convection"
                  },{
                   "code":"PRD003",
                   "name":"IFB MicroOven",
                   "price":"20000",
                   "description":"29L Convection"
                  },{
                   "code":"PRD004",
                   "name":"LG MicroOven",
                   "price":"21000",
                   "description":"21L Convection"
                  }]


    $scope.addToCart = function(product){

        var continueFurther = true;

        angular.forEach($rootScope.productsInCart, function(cartItem){
            if(cartItem.name == product.name)
            {
                cartItem.quantity += 1;
                continueFurther = false;
                return;
            }
        });

         if(continueFurther)
         {
            var item = {"name":product.name,
                        "price":product.price,
                        "quantity":1}
            $rootScope.productsInCart.push(item);
         }
    };
});

c.controller("CartController", function($scope, $rootScope){
    console.info("CartController");

    $scope.removeFromCart = function(index){
        $rootScope.productsInCart.splice(index,1);
    };

    $scope.totalAmount = function(){
        var totalCartValue = 0;
        angular.forEach($rootScope.productsInCart, function(c){
            totalCartValue += (c.price * c.quantity);
        });
        return totalCartValue;
    };

    $scope.checkOut = function()
    {
        $rootScope.byeMessage = "Sit Back & Relaax.. ";
    };
});
