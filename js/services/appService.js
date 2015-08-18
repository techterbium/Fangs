var appServiceModule = angular.module("appServiceModule", ['appFactoryModule']);

appServiceModule.service("appService", function (productFactory) {
    this.getAllProducts = function () {
        return productFactory.getProducts();
    };
});

appServiceModule.service("cartService", function (cartFactory) {
    this.addProductToCart = function (product) {

        var continueFurther = true;
        angular.forEach(this.allCartItems, function (cartItem) {
            if(cartItem.name == product.name)
            {
                cartFactory.increseCount($index);
                continueFurther = false;
            }
        });
        if(continueFurther)
        {
            cartFactory.addToCart(product);
        }
    };

    this.removeFromCart = function (index) {
        cartFactory.removeFromCart(index);
    };

    this.allCartItems = function () {
        return cartFactory.allCartItems();
    };
});