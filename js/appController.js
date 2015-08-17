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
                   "name":"Samsung Kindle",
                   "price":"1000",
                   "description":"28L Convection"
                  },{
                   "code":"PRD002",
                   "name":"Panasonic Generator",
                   "price":"1900",
                   "description":"27L Convection"
                  },{
                   "code":"PRD003",
                   "name":"IFB Android Phone",
                   "price":"2800",
                   "description":"29L Convection"
                  },{
                   "code":"PRD004",
                   "name":"LG Stoves",
                   "price":"2100",
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

    $scope.checkOut = function(){
        
        if($rootScope.productsInCart.length == 0)
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
