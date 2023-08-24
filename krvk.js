
/* 타겟 입력 */
const input = document.getElementById("myinput");

const keyboardzone = document.getElementById("keyboardzone");
const keyboard_move = document.querySelector("keyboard-move");

/* 가상 키보드 등록 */
const keyboard = new customKeyboard(
        keyboardzone,
        input,  /* 입력 대상 */
        null,   /* 입력 시 이벤트 */
        null,
        null,   /* 엔터 클릭 시 이벤트 */
        null
);

let is_move = false;

/* 키보드 움직임 이벤트 시작 */
function move_start() {
    is_move = true;
    keyboardzone.classList.add("selected");
}

/* 키보드 움직임 이벤트 종료 */
function move_stop() {
    is_move = false;
    keyboardzone.classList.remove("selected");
}

/* 키보드 움직임 이벤트 등록 */
keyboard_move.addEventListener("mousedown", move_start)
keyboard_move.addEventListener("mouseup", move_stop);
keyboard_move.addEventListener("touchstart", move_start)
keyboard_move.addEventListener("touchend", move_stop);

/* 마우스 지원 */
document.addEventListener("mousemove", (e) => {
    pageX = Math.abs(e.pageX) - 225;
    pageY = Math.abs(e.pageY) - 320;
    
    if (is_move) {
        keyboardzone.style.left = `${pageX}px`;
        keyboardzone.style.top = `${pageY}px`;
    }
})

/* 터치 지원 */
document.addEventListener("touchmove", (e) => {
    pageX = e.changedTouches[0].pageX - 225;
    pageY = e.changedTouches[0].pageY - 225;

    if (is_move) {
        keyboardzone.style.left = `${pageX}px`;
        keyboardzone.style.top = `${pageY}px`;
    }
})