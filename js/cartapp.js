var app = angular.module("myCartApp", ['ngSanitize', 'CtrlModule'], function(){
    console.info("myCartApp Function..");
});

app.config(function(){
console.info("myCartApp Config");
});

app.run(function(){
   console.info("myCartApp Run");
});
