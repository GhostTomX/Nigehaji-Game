 $(document).ready(function () {
     var name = "this windows";
     var hi = new Person("#hiramasa");
     var mi = new Person("#mikuri");
     personMoveControl(hi,mi);
     console.log(hi.position);
     console.log(mi.position);

     function personMoveControl(obj,refobj) {
         $(document).keydown(function (event) {
             obj.positionValueTest();
             obj.positionContactTest(refobj);
             console.log(obj.position.left, obj.position.top);
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
         this.positionContactTest = function (refobj) {
             if ((this.position.left - refobj.position.left === -40) &&
                 (Math.abs(this.position.top - refobj.position.top)<40)) {
                 this.position_right = false;
             }
             if ((this.position.left - refobj.position.left === 40) &&
                 (Math.abs(this.position.top - refobj.position.top)<40)) {
                 this.position_left = false;
             }
             if ((Math.abs(this.position.left - refobj.position.left)<40) &&
                 (this.position.top - refobj.position.top === 40)) {
                 this.position_top = false;
             }
             if ((Math.abs(this.position.left - refobj.position.left)<40) &&
                 (this.position.top - refobj.position.top === -40)) {
                 this.position_down = false;
             }
         };
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
         if (this.position.left > 928) {
             this.position_right = false;
         }

         //House structure limitation according to position.left
         if (
             (this.position.left === 68 & this.position.top < 308) ||
             (this.position.left === 68 & this.position.top > 508) ||
             (this.position.left === 128 & this.position.top > 508) ||
             (this.position.left === 288 & this.position.top === 228) ||
             (this.position.left === 288 & this.position.top === 248) ||
             (this.position.left === 308 & this.position.top < 248) ||
             ((this.position.left === 468 & this.position.top < 548) &&
                 (this.position.left === 468 & this.position.top > 288)) ||
             (this.position.left === 528 & this.position.top === 128) ||
             (this.position.left === 528 & this.position.top === 148) ||
             (this.position.left === 568 & this.position.top < 168) ||
             (this.position.left === 668 & this.position.top === 228) ||
             (this.position.left === 668 & this.position.top === 248) ||
             (this.position.left === 728 & this.position.top === 88) ||
             (this.position.left === 748 & this.position.top < 88) ||
             (this.position.left === 788 & this.position.top > 308) ||
             (this.position.left === 908 & this.position.top === 88)
         ) {
             this.position_right = false;
         }

         if ((this.position.left === 88 & this.position.top === 308) ||
             ((this.position.left > 88 & this.position.top === 268) &&
                 (this.position.left < 228 & this.position.top === 268)) ||
             ((this.position.left > 288 & this.position.top === 268) &&
                 (this.position.left < 408 & this.position.top === 268)) ||
             ((this.position.left > 388 & this.position.top === 168) &&
                 (this.position.left < 468 & this.position.top === 168)) ||
             ((this.position.left > 528 & this.position.top === 168) &&
                 (this.position.left < 608 & this.position.top === 168)) ||
             ((this.position.left > 468 & this.position.top === 548) &&
                 (this.position.left < 668 & this.position.top === 548)) ||
             ((this.position.left > 588 & this.position.top === 108) &&
                 (this.position.left < 668 & this.position.top === 108)) ||
             ((this.position.left > 728 & this.position.top === 108) &&
                 (this.position.left < 848 & this.position.top === 108)) ||
             (this.position.left > 908 & this.position.top === 108) ||
             (this.position.left > 668 & this.position.top === 268)
         ) {
             this.position_top = false;
         }
         console.log(this.position_top);


         if ((this.position.left === 88 & this.position.top === 508) ||
             ((this.position.left > 88 & this.position.top === 208) &&
                 (this.position.left < 228 & this.position.top === 208)) ||
             ((this.position.left > 288 & this.position.top === 208) &&
                 (this.position.left < 408 & this.position.top === 208)) ||
             (this.position.left > 668 & this.position.top === 208) ||
             (this.position.left < 668 & this.position.top === 68) ||
             ((this.position.left > 728 & this.position.top === 68) &&
                 (this.position.left < 848 & this.position.top === 68)) ||
             (this.position.left > 908 & this.position.top === 68) ||
             ((this.position.left > 468 & this.position.top === 288) &&
                 (this.position.left < 668 & this.position.top === 288)) ||
             ((this.position.left > 788 & this.position.top === 308) &&
                 (this.position.left < 908 & this.position.top === 308)) ||
             ((this.position.left > 128 & this.position.top === 508) &&
                 (this.position.left < 328 & this.position.top === 508))

         ) { //  ベランダ ドア   
             this.position_down = false;
         }


         if ((this.position.left === 108 & this.position.top < 308) ||
             (this.position.left === 108 & this.position.top > 508) ||
             (this.position.left === 228 & this.position.top === 228) ||
             (this.position.left === 228 & this.position.top === 248) ||
             (this.position.left === 328 & this.position.top > 508) ||
             ((this.position.left === 408 & this.position.top < 268) &&
                 (this.position.left === 408 & this.position.top > 128)) ||
             (this.position.left === 468 & this.position.top === 128) ||
             (this.position.left === 468 & this.position.top === 148) ||
             (this.position.left === 608 & this.position.top < 168) ||
             ((this.position.left === 668 & this.position.top < 548) &&
                 (this.position.left === 668 & this.position.top > 288)) ||
             (this.position.left === 668 & this.position.top === 88) ||
             (this.position.left === 808 & this.position.top < 88) ||
             (this.position.left === 848 & this.position.top === 88) ||
             (this.position.left === 908 & this.position.top > 308)
         ) {
             this.position_left = false;
         }


     };
 };
 });