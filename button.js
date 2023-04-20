const opButtons = document.querySelectorAll(".op-button");
let selectedOpButton = opButtons[0];
let selectedOpButtonIndex = 0;
let multiplyAddIndex = opButtons.length - 1;
const newColor = "gray";

selectedOpButton.style.backgroundColor = newColor

const translateButtons = {
  '+': '+',
  '−': '-', // TODO in fpcalc
  '×': 'x',
  '÷': '/',
  '%': '%',
  'Multiply-Add': 'x'
};

for (let i = 0; i < opButtons.length; i++) {
  const opButton = opButtons[i];
  const originalColor = window.getComputedStyle(opButton).backgroundColor;


  opButton.addEventListener("click", function() {

    if (selectedOpButton && selectedOpButton !== opButton) {
      selectedOpButton.style.backgroundColor = originalColor;
    }

    if (opButton.style.backgroundColor === newColor) {
      opButton.style.backgroundColor = originalColor;
      selectedOpButton = null;
    } else {
      opButton.style.backgroundColor = newColor;
      selectedOpButton = opButton;
      selectedOpButtonIndex = i;
      arg2 = translateButtons[opButton.innerHTML]
      
      if (opButton.innerHTML === 'Multiply-Add') {
        arg4 = "+"
        fourInputRun()
      } else {
        twoInputRun()
      }
    }
  });
}