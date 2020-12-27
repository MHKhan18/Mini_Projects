
let num1 = "";
let num2 = "";
let curExpr = "";

let curNum1 = true;
let curNum2 = false;


let operand ;

let display = document.querySelector("#res");


document.querySelector("#btn0").addEventListener("click" , () => {
    if(curNum1){
        num1 += "0";
        curExpr += "0";
    }
    else{
        num2 += "0";
        curExpr += "0";
    }

    display.innerHTML = curExpr;
})

document.querySelector("#btn1").addEventListener("click" , () => {
    if(curNum1){
        num1 += "1";
        curExpr += "1";
    }
    else{
        num2 += "1";
        curExpr += "1";
    }

    display.innerHTML = curExpr;
})


document.querySelector("#btnClr").addEventListener("click" , () => {

    curExpr = "";
    display.innerHTML = curExpr;

    curNum1 = true;
    curNum2 = false;
    operand = null;
    num1 = "";
    num2 = "";

})


document.querySelector("#btnEql").addEventListener("click" , () => {
    //alert("Not implemented yet!")

    let res = eval(num1 , num2 , operand);
    curExpr = res;
    display.innerHTML = curExpr;

    curNum1 = true;
    curNum2 = false;
    operand = null;
    num1 = "";
    num2 = "";
    curExpr = "";

})


document.querySelector("#btnSum").addEventListener("click" , () => {
    operand = "+";
    curNum1 = false;
    curNum2 = true;
    curExpr += "+";
    display.innerHTML = curExpr;
})


document.querySelector("#btnSub").addEventListener("click" , () => {
    operand = "-";
    curNum1 = false;
    curNum2 = true;
    curExpr += "-";
    display.innerHTML = curExpr;
})


document.querySelector("#btnMul").addEventListener("click" , () => {
    operand = "*";
    curNum1 = false;
    curNum2 = true;
    curExpr += "*";
    display.innerHTML = curExpr;
})


document.querySelector("#btnDiv").addEventListener("click" , () => {
    operand = "/";
    curNum1 = false;
    curNum2 = true;
    curExpr += "/";
    display.innerHTML = curExpr;
})


function eval(op1 , op2 , operand){

    let num1 = parseInt(op1 , 2);
    let num2 = parseInt(op2 , 2);

    let res;

    if(operand === "+"){
        res = num1 + num2;
    }

    else if(operand === "-"){
        res = num1 - num2;
    }

    else if(operand === "*"){
        res = num1 * num2;
    }
    else if(operand === "/"){
        res = Math.floor(9/2);
    }

    /* console.log(num1);
    console.log(num2);
    console.log(operand);
    console.log(res); */

    return res.toString(2);

}

