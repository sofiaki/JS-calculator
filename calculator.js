let input = "";
let operand = 0;
let display = "";
let operator = null;
/** calculation is the array where the numbers and the operation symbols are store */
let calculation = [];
let numbers = Array.from(document.querySelectorAll(".number"));
/* add event listener to number buttons */
numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    storeNumber(e.target.id)
  })
);

let operators = document.querySelectorAll(".operator");
/*add event listener to operations buttons*/
operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    storeOperator(e.target.id)
  })
);
window.addEventListener('keypress',(e)=>{
  if(['1','2','3','4','5','6','7','8','9','0'].includes(e.key)) storeNumber(e.key)
  if(['/','*','-','+'].includes(e.key)) storeOperator(e.key)
})
function storeOperator(e){
  /** The input number gets stored after an operator is clicked, to make sure that 
     * the user has stopped clicking numbers. 
     */
   operand = parseInt(input);
   operand && calculation.push(operand);
   input = "";
   operand=null
   operator = e;
   console.log(calculation);
   display = display.concat(" ", e, " ");
   document.getElementById("result").innerText = display;
}
function storeNumber(e){
  /** The chosen operator get stored after a number is clicked, so only the last operator is gets
     * in the calculation array in case the user has clicked multiple operator buttons.
     * Also, if an operator is clicked before any number, it doesn't get stored.
     */
   (operator && calculation.length>0) && calculation.push(operator);
   operator = "";
   input = input.concat(e);
   display = display.concat(e);
   document.getElementById("result").innerText = display;
}
document
  .getElementById("=")
  .addEventListener("click", () => calculate(calculation));

window.addEventListener('keypress',(e)=>{
  e.key=='Enter' && calculate(calculation)
})

  document.getElementById("reset").addEventListener("click", () => reset());

  document.getElementById("delete").addEventListener("click", () => del(calculation));
window.addEventListener('keydown',(e)=>{
  e.keyCode==8 && del()
})

/**Add css style when button is clicked */
window.addEventListener("mousedown", (e) => {
  let key = document.getElementById(e.target.id);
  key && key.classList.add("clicked-button");
});
window.addEventListener("mouseup", (e) => {
  let key = document.getElementById(e.target.id);
  key && key.classList.remove("clicked-button");
});
/**Add css style when key is pressed */
window.addEventListener("keydown", (e) => {
  let key = document.getElementById(e.key);
  key && key.classList.add("clicked-button");
});
window.addEventListener("keyup", (e) => {
  let key = document.getElementById(e.key);
  key && key.classList.remove("clicked-button");
});



/**calculate() takes the calculation array, traverses it and calls the operate function
 * for each pair of numbers thar are left and right of the operators.
 */
function calculate(arr) {
  /**The last input number is stored in calculation array when the equal is clicked. */
  !['/','*','+','-',''].includes(input) && calculation.push(parseInt(input));
  console.log(calculation)

  while (arr.length > 1) {
    /**First execute multiply and division*/
    while(arr.some(i=>['/','*'].includes(i))){for (let i = 0; i < arr.length; i++) {
      if (arr[i] == "*" || arr[i] == "/") {
        res = operate(arr[i - 1], arr[i + 1], arr[i]);

        arr.splice(i - 1, 3, res);
        console.log(arr);
      }
    }}
    /**When there are no more * nad / symbols in the array, execute addition and subtraction. */
    for (let i = 0; i < arr.length; i++) {
     
      if (arr[i] == "+" || arr[i] == "-") {
        res = operate(arr[i - 1], arr[i + 1], arr[i]);

        arr.splice(i - 1, 3, res);
        console.log(arr);
      }
    }
  }
  operator = "";
  operand = 0;
  input = "";
  calculation = [];
  display = "";
}
function operate(a, b, operation) {
  if (operation == "*") {
    document.getElementById("result").innerText = a * b;
    return a * b;
  }
  if (operation == "/") {
    document.getElementById("result").innerText = a / b;
    return a / b;
  }
  if (operation == "+") {
    document.getElementById("result").innerText = a + b;
    return a + b;
  }
  if (operation == "-") {
    document.getElementById("result").innerText = a - b;
    return a - b;
  }
}
function reset() {
  operator = "";
  operand = 0;
  input = "";
  calculation = [];
  display = "";
  document.getElementById("result").innerText = display;
}
function del(){
  input=input.slice(0,-1)
  display=display.slice(0,-1)
  document.getElementById("result").innerText = display;

}