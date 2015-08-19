var appFactoryModule = angular.module("appFactoryModule", ['ngResource']);

appFactoryModule.factory("productFactory", function ($resource) {

    var productsResource = $resource("http://localhost:2403/products", {"id" : "@id"}, {update: {method : 'PUT'}});
    var products;

    return {
        getProducts : function () {
            products = productsResource.query();
            return products;
        },
        addNewProduct : function (newProduct) {
            var p = new productsResource(newProduct);
            p.$save(function (responseData) {
                products.push(responseData);
            });
        },
        deleteProduct : function (pid, index) {
            var p = new productsResource({"id": pid});
            p.$remove(function () {
                products.splice(index, 1);
            });
        },

        updateProduct : function (updatedProduct) {
            var p = new productsResource(updatedProduct);
            p.$update(function (responseData) {
                products[updatedProduct.index] = responseData;
            });
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
