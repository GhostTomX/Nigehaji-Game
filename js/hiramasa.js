 $(document).ready(function () {
     var name = "this windows";
     var hi = new Person("#hiramasa");
     var mi = new Person("#mikuri");
     personMoveControl(hi);
     console.log(hi.position);
     console.log(mi.position);

     function personMoveControl(obj) {
         $(document).keydown(function (event) {
             obj.positionValueTest();
             console.log(obj.position.top, obj.position.left);
             switch (event.keyCode) {
             case 40: // down
                 if (obj.position_down) {
                     obj.position.top = obj.position.top + 20;
                     obj.name.animate({
                         'top': obj.position.top + 'px'
                     }, "fast");
                 }
                 break;

             case 38: //up
                 if (obj.position_top) {
                     obj.position.top = obj.position.top - 20;
                     obj.name.animate({
                         'top': obj.position.top + 'px'
                     }, "fast");
                 }
                 break;

             case 39: //right
                 if (obj.position_right) {
                     obj.position.left = obj.position.left + 20;
                     obj.name.animate({
                         'left': obj.position.left + 'px'
                     }, "fast");
                 }
                 break;

             case 37:
                 if (obj.position_left) {
                     obj.position.left = obj.position.left - 20;
                     obj.name.animate({
                         'left': obj.position.left + 'px'
                     }, "fast");
                 }
                 break;
             };
         });
     }


     function Person(name) {
         this.name = $(name);
         this.position = this.name.position();
         this.positionValueTest = function () {
             this.position_top = true;
             this.position_down = true;
             this.position_left = true;
             this.position_right = true;
             //contious range ,so can't use case
             if (this.position.top <= 8) { //Outside limitation
                 this.position_top = false;
             }
             if (this.position.left <= 8) {
                 this.position_left = false;
             }
             if (this.position.top > 548) {
                 this.position_down = false;
             }
             if (this.position.left > 968) {
                 this.position_right = false;
             }
             //House structure limitation according to position.left
             if ((this.position.left === 68 & this.position.top < 308) ||
                     (this.position.left === 68 & this.position.top > 508) ||
                 (this.position.left === 308 & this.position.top < 248))
              { //  ベランダ    
                 this.position_right = false;
             }


             if ((this.position.left === 88 & this.position.top === 308) ||
                 ((this.position.left >= 108 & this.position.top === 268) &
                     (this.position.left <= 208 & this.position.top === 268))
             ) {
                 this.position_top = false;
             }


             if (this.position.left === 88 & this.position.top === 508) { //  ベランダ ドア   
                 this.position_down = false;
             }


             if ((this.position.left === 108 & this.position.top < 308) ||
                 (this.position.left === 108 & this.position.top > 508)) { //  ベランダ    
                 this.position_left = false;
             }




         };
     };
 });