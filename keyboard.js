function customKeyboard(zone, input, onClick, onESC, onEnter, form) {
    /*
        zone : 생성될 위치
        input : 입력할 변수
        onClick : 키보드가 눌렸을때 동작
        onESC : 뒤로 눌렸을때 동작
        form : 키보드의 모습
    */
    var nowlang = "koNormal";
    this.setClick = function(newclick) {
        onClick = newclick;
    }
    this.setEnter = function(Enterfun) {
        onEnter = Enterfun;
    }
    this.setZone = function(newZone) {
        zone = newZone;
    };
    var charlist = [];
    this.setInput = function(inputtag) {
        input = inputtag;
        var sub = Hangul.disassemble("" + input.value);
        charlist = sub;
    }
    function getText() {
        return Hangul.assemble(charlist);
    }
    if(form == null) {
        form = {
            koNormal : [
                ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
                ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
                ['⮸','ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ','⌫'],
                ['🌐', '','↩']
            ], 
            koShift : [
                ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ'],
                ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
                ['⮸','ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ','⌫'],
                ['🌐', '','↩']
            ],
            enNormal : [
                ['q','w','e','r','t','y','u','i','o','p'],
                ['a','s','d','f','g','h','j','k','l'],
                ['⮸','z','x','c','v','b','n','m','⌫'],
                ['🌐', '','↩']
            ],
            enShift : [
                ['Q','W','E','R','T','Y','U','I','O','P'],
                ['A','S','D','F','G','H','J','K','L',],
                ['⮸','Z','X','C','V','B','N','M','⌫'],
                ['🌐', '','↩']
            ],
            symbolNormal : [
                ['1','2','3','4','5','6','7','8','9','0'],
                ['-','/',':',';','(',')','￦','&','@','"'],
                ['⮸','.',',','?','!',`'`,'⌫'],
                ['🌐', '','↩']
            ],
            symbolShift : [
                ['[',']','{','}','#','%','^','*','+','='],
                ['_','\\','|','~','<','>','$','￡','￡','●'],
                ['⮸','.',',','?','!','`','⌫'],
                ['🌐', '','↩']
            ]
        }
    }
    var keydiv = {};
    for (let index = 0; index < Object.keys(form).length; index++) {
        keydiv[Object.keys(form)[index]] = document.createElement("keyboard-layout")
        keydiv[Object.keys(form)[index]].style.cssText = `
            position: absolute;
            align : center;
            visibility: hidden;
        `

        for (let i = 0; i < form[Object.keys(form)[index]].length; i++) {
            var keyline = document.createElement("table");
            for (let j = 0; j < form[Object.keys(form)[index]][i].length; j++) {
                var key = document.createElement("th")

                if (form[Object.keys(form)[index]][i][j] == "↩") {
                    key.classList.add("highlight");
                }

                if (form[Object.keys(form)[index]][i][j] == "⌫" ||
                    form[Object.keys(form)[index]][i][j] == "⮸") {
                    key.classList.add("function");
                }

                if (form[Object.keys(form)[index]][i][j] == "") {
                    key.classList.add("spacebar");
                }

                key.innerHTML = "<keyboard-text>" + form[Object.keys(form)[index]][i][j] + "</keyboard-text>";
                key.addEventListener("click", keyfun)
                keyline.appendChild(key);
            }
            keydiv[Object.keys(form)[index]].appendChild(keyline);
        }

        zone.appendChild(keydiv[Object.keys(form)[index]])
    }

    keydiv[nowlang].style.visibility = "visible";
    function keyfun() {
        if(this.innerText == '↩') {
            onEnter(getText());
            return
        } else if(this.innerText == '🌐') {
            keydiv[nowlang].style.visibility = "hidden";
            if(nowlang == "koNormal") {
                nowlang = "enNormal"
            }
            
            else if(nowlang == "enNormal") {
                nowlang = "symbolNormal"
            }

            else if(nowlang == "symbolNormal") {
                nowlang = "koNormal"
            }
            
            else if(nowlang == "koShift") {
                nowlang = "enShift"
            }

            else if(nowlang == "enShift") {
                nowlang = "symbolShift"
            }

            else if(nowlang == "symbolShift") {
                nowlang = "koShift"
            }

            keydiv[nowlang].style.visibility = "visible";
            return
        }
        else if(this.innerText == '⮸') {
            keydiv[nowlang].style.visibility = "hidden";
            if(nowlang == "koNormal") {
                nowlang = "koShift"
            }
            else if(nowlang == "enNormal") {
                nowlang = "enShift"
            }
            else if(nowlang == "koShift") {
                nowlang = "koNormal"
            }
            else if(nowlang == "enShift") {
                nowlang = "enNormal"
            }
            else if(nowlang == "symbolShift") {
                nowlang = "symbolNormal"
            }
            else if(nowlang == "symbolNormal") {
                nowlang = "symbolShift"
            }
            keydiv[nowlang].style.visibility = "visible";
            return
        }
        else if(this.innerText == '⌫') {
            charlist.splice(charlist.length - 1, 1);
        }
        else if(this.innerText == '') {
            charlist.push(" ");
        }
        else {
            charlist.push(this.innerText);
        }
        
        text = Hangul.assemble(charlist)
        input.value = text;
        if(onClick != null) {
            onClick(getText());
        }
    }

}