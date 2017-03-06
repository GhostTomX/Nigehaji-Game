 $(document).ready(function () {
             var hi = $("#hiramasa");
             var position_hi = hi.position();
             console.log(position_hi);
             var mi = $("#mikuri");
             var position_hi = mi.position();
             console.log(position_hi);
             $(document).keydown(function (event) {
                     if (event.keyCode == 40 && position_hi.top>0 ) {
                         console.log(position_hi.top);
                        position_hi.top= position_hi.top+20;
                         

                         
                         $('#hiramasa').animate({'top':position_hi.top+'px'},"fast");
//                         $('#hiramasa').css({'top':position_hi.top+'px'});
                         console.log(position_hi.top);
                     } else if (event.keyCode == 39) {};
             });});