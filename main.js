let history = "";
let current = "0";
let operation = null;

let historyText = document.querySelector("h3");
let currentText = document.querySelector("h1");
let buttons = document.querySelectorAll("button");

let allOperations = ["+", "-", "*", "/"];

update();

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerText === "=") {
      history += current;
      let final = eval(history);
      current = final;
      history = "";
      operation = null;
    } else if (e.target.innerText === "C") {
      if (current === "0") {
        history = "";
        operation = null;
        update();
        return;
      }
      current = "0";
    } else if (e.target.innerText === "%") {
      current = current / 100;
    } else if (e.target.innerText === "+/-") {
      if (current.toString().startsWith("-")) {
        let currentArr = Array.from(current);
        currentArr = currentArr.slice(1);
        console.log(currentArr);
        current = Number(currentArr);
      } else {
        current = "-" + current;
        console.log(current);
      }
    } else if (allOperations.includes(e.target.innerText)) {
      operation = e.target.innerText;
    } else {
      if (operation) {
        history += current + operation;
        operation = null;
        current = e.target.innerText;
        update();
        return;
      }
      if (current === "0" && e.target.innerText !== ".") {
        current = e.target.innerText;
        update();
        return;
      }
      if (current.includes(".") && e.target.innerText === ".") {
        return;
      }
      current += e.target.innerText;
    }
    update();
  });
});

function update() {
  historyText.innerText = history;
  currentText.innerText = current;
}
