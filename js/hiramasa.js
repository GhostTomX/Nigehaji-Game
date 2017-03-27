var SPECIALVALUE;
var USERNAME;

function save() {
    var xhr = new XMLHttpRequest();
    var url = "server.js"
    url = addURLParam(url, "s_value", SPECIALVALUE);
    url = addURLParam(url, "username", USERNAME);
    xhr.open("get", url, false);
    xhr.send(null);
    alert(xhr.responseText);
};



function deleteAllCookies() {
    //  TODO
}


function goBackLogin() {
    deleteAllCookies();
    window.location.href = "./index.html";
};

function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
};

$(document).ready(function () {
    var name = "this windows";
    var hi = new Person("#hiramasa");
    var mi = new Person("#mikuri");
    personMoveControl(hi, mi);
    console.log(hi.position);
    console.log(mi.position);
    touchConversation(hi);
    stateShow();

    function stateShow() {
        //        alert(document.cookie);
        var cookies = document.cookie.split(';');
        USERNAME = cookies[1].split('=')[1];
        SPECIALVALUE = Number(cookies[2].split('=')[1]);
        //本地
        //        USERNAME = cookies[0].split('=')[1];
        //        SPECIALVALUE = Number(cookies[1].split('=')[1]);
        $("#state").append("<h1>" + USERNAME + "</h1>");
        specialValueFresh();
    }

    function specialValueFresh() {
        $("#sp").remove();
        $("#state").append("<h1 id = \"sp\">好感值=" + SPECIALVALUE + "</h1>")

    }

    function touchConversation(obj, refobj) {
        var counterOfConv = 0;
        $(document).keydown(function (event) {
            if (event.keyCode === 32) { //space touch conversation
                obj.conversationTest();
                console.log(obj.conversationSignal);
                if (obj.conversationSignal) {
                    if (!counterOfConv) {
                        $("#conversation").css("visibility", "visible");
                        var xhr = new XMLHttpRequest();
                        var url = "server.js"
                        url = addURLParam(url, "left", obj.position.left);
                        url = addURLParam(url, "top", obj.position.top);
                        xhr.open("get", url, false);
                        xhr.send(null);
                        console.log(xhr.responseText);
                        words = xhr.responseText.split("/"); //words is a global var
                        $("#conversation").empty();
                        $("#hiconversation").css("visibility", "visible");
                        //                         document.getElementById("#conversation").innerHTML=words[0];
                        $("#conversation").append(words[0]);
                        counterOfConv += 1;
                    } else {
                        console.log(counterOfConv);
                        console.log(words.length);
                        if (counterOfConv < words.length) {
                            $("#conversation").empty();
                            $("#conversation").css("visibility", "visible");
                            $("#conversation").append(words[counterOfConv]);
                            counterOfConv += 1;
                            if (counterOfConv%2 === 1){
                                $("#hiconversation").css("visibility", "visible");
                                $("#miconversation").css("visibility", "hidden");
                            }else{
                                $("#miconversation").css("visibility", "visible");
                                $("#hiconversation").css("visibility", "hidden");
                            }
                        } else {
                            SPECIALVALUE += 1;
                            specialValueFresh()
                            alert("好感值+1");
                            counterOfConv = 0;
                            $("#conversation").empty();
                            $("#conversation").css("visibility", "hidden");
                            $("#miconversation").css("visibility", "hidden");

                        }
                    }
                }
            }
        })
    }



    function personMoveControl(obj, refobj) {
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
        this.conversationSignal = false;
        this.conversation = "con test";
        this.conversationTest = function (refobj) {
            switch (this.position.left) {
                case 448:
                    if (this.position.top === 428) {
                        this.conversationSignal = true;
                    } else {
                        this.conversationSignal = false;
                    }
                    break;
                default:
                    this.conversationSignal = false;

            }
        };
        this.positionContactTest = function (refobj) {
            if ((this.position.left - refobj.position.left === -40) &&
                (Math.abs(this.position.top - refobj.position.top) < 40)) {
                this.position_right = false;
            }
            if ((this.position.left - refobj.position.left === 40) &&
                (Math.abs(this.position.top - refobj.position.top) < 40)) {
                this.position_left = false;
            }
            if ((Math.abs(this.position.left - refobj.position.left) < 40) &&
                (this.position.top - refobj.position.top === 40)) {
                this.position_top = false;
            }
            if ((Math.abs(this.position.left - refobj.position.left) < 40) &&
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
            //         console.log(this.position_top);


            if ((this.position.left === 88 & this.position.top === 508) ||
                ((this.position.left > 88 & this.position.top === 208) &&
                    (this.position.left < 228 & this.position.top === 208)) ||
                ((this.position.left > 288 & this.position.top === 208) &&
                    (this.position.left < 408 & this.position.top === 208)) ||
                (this.position.left > 668 & this.position.top === 208) ||
                ((this.position.left > 328 & this.position.top === 108) &&
                    (this.position.left < 468 & this.position.top === 108)) ||
                ((this.position.left > 588 & this.position.top === 68) &&
                    (this.position.left < 668 & this.position.top === 68)) ||
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
                (this.position.left === 368 & this.position.top < 128) ||
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
