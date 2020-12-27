

const buttons = document.querySelectorAll(".button");


let inOrder = [];
for(let i = 0 ; i < 3 ; i++){
    inOrder.push(buttons[i]);
}
inOrder.push(buttons[5]);

for(let i = 8 ; i >= 6 ; i--){
    inOrder.push(buttons[i]);
}
inOrder.push(buttons[3]);

console.log(inOrder);

document.querySelector("#btn5").addEventListener("click" , () => {

    const total = inOrder.length;
    let saved = inOrder[total-1].innerHTML;
    for(let i = total-1 ; i >= 0  ; i--){
        if( i === 0){
            inOrder[i].innerHTML = saved;
        }
        else{
            inOrder[i].innerHTML = inOrder[i-1].innerHTML;
        }
        
    }


})