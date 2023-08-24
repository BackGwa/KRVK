function customKeyboard(zone, input, onClick, onEnter) {
    let nowlang = "koNormal";
    let charlist = [];

    this.setClick = function(newclick) {
        onClick = newclick;
    }
    this.setEnter = function(Enterfun) {
        onEnter = Enterfun;
    }
    this.setZone = function(newZone) {
        zone = newZone;
    };
    
    this.setInput = function(inputtag) {
        input = inputtag;
        charlist = Hangul.disassemble("" + input.value);
    };

    function getText() {
        return Hangul.assemble(charlist);
    }

    const form = {
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
            ['⮸','.',',','?','!',`'`,'⌫'],
            ['🌐', '','↩']
        ]
    }

    let keydiv = {};
    Object.keys(form).forEach(key => {
        keydiv[key] = document.createElement("keyboard-layout");
        keydiv[key].classList.add("disable");

        form[key].forEach(line => {
            const keyline = document.createElement("table");
            line.forEach(keySymbol => {
                const key = document.createElement("th");
                const classNames = [];

                if (keySymbol === "↩") {
                    classNames.push("highlight");
                } else if (keySymbol === "⌫" || keySymbol === "⮸") {
                    classNames.push("function");
                } else if (keySymbol === "") {
                    classNames.push("spacebar");
                } else if ([".", ",", "?", "!", "'"].includes(keySymbol)) {
                    classNames.push("long-width");
                }

                key.innerHTML = `<keyboard-text>${keySymbol}</keyboard-text>`;
                key.classList.add(...classNames);
                key.addEventListener("click", keyfun);
                keyline.appendChild(key);
            });

            keydiv[key].appendChild(keyline);
        });

        zone.appendChild(keydiv[key]);
    });

    keydiv[nowlang].style.visibility = "visible";

    function keyfun() {
        if (this.innerText === "↩") {
            onEnter(getText());
        } else if (this.innerText === "🌐") {
            keydiv[nowlang].style.visibility = "hidden";
            nowlang = (nowlang === "koNormal") ? "enNormal" :
                      (nowlang === "enNormal") ? "symbolNormal" :
                      (nowlang === "symbolNormal") ? "koNormal" :
                      (nowlang === "koShift") ? "enShift" :
                      (nowlang === "enShift") ? "symbolShift" :
                      (nowlang === "symbolShift") ? "koShift" : "koNormal";

            keydiv[nowlang].style.visibility = "visible";
        } else if (this.innerText === "⮸") {
            keydiv[nowlang].style.visibility = "hidden";
            
            nowlang = (nowlang === "koNormal" || nowlang === "enNormal") ? 
                      (nowlang === "koNormal") ? "koShift" : "enShift" :
                      (nowlang === "koShift" || nowlang === "enShift") ?
                      (nowlang === "koShift") ? "koNormal" : "enNormal" :
                      (nowlang === "symbolShift" || nowlang === "symbolNormal") ?
                      (nowlang === "symbolShift") ? "symbolNormal" : "symbolShift" : nowlang;

            keydiv[nowlang].style.visibility = "visible";
        } else if (this.innerText === "⌫") {
            charlist.pop();
        } else if (this.innerText === "") {
            charlist.push(" ");
        } else {
            charlist.push(this.innerText);
        }
        
        const text = Hangul.assemble(charlist);
        input.value = text;

        if (onClick) {
            onClick(getText());
        }
    }
}