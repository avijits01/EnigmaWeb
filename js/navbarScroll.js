document.addEventListener('DOMContentLoaded', function(){ 
    var myElement = document.querySelector("header");
    // construct an instance of Headroom, passing the element
    var headroom  = new Headroom(myElement);
    headroom.init();
}, false);