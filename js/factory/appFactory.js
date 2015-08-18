var appFactoryModule = angular.module("appFactoryModule", []);

appFactoryModule.factory("productFactory", function () {


    var products = [{
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
                  }];
        return {
            getProducts : function () {
                return products;
            }
        }
});

appFactoryModule.factory("cartFactory", function () {

    var cartItems = [];
    return {

    addToCart : function (product) {
        var cartItem = {name : product.name, price : product.price, quantity : 1}
        cartItems.push(cartItem);
    },

    increseCount : function (index) {
        cartItems.indexOf(index).quantity += 1;
    },

    removeFromCart : function (index) {
        cartItems.splice(index, 1);
    },

    allCartItems : function () {
        return cartItems;
    }

    };
});
