const opButtons = document.querySelectorAll(".op-button");
let prevSelectedOpButton = opButtons[0];
let selectedOpButtonIndex = 0;
let multiplyAddIndex = opButtons.length - 1;
const newColor = "gray";

window.addEventListener('load', function() {
  prevSelectedOpButton.style.backgroundColor = newColor;
});

const translateButtons = {
  '+': '+',
  '−': '-', // TODO in fpcalc
  '×': 'x',
  '÷': '/',
  '%': '%',
  '√': 's',
  'Multiply-Add': 'x'
};

for (let i = 0; i < opButtons.length; i++) {
  const opButton = opButtons[i];
  const originalColor = window.getComputedStyle(opButton).backgroundColor;


  opButton.addEventListener("click", function() {

    prevSelectedOpButton.style.backgroundColor = originalColor;
    opButtons[2].style.backgroundColor = originalColor;

    opButton.style.backgroundColor = newColor;
    prevSelectedOpButton = opButton;
    selectedOpButtonIndex = i;
    arg2 = translateButtons[opButton.innerHTML]
    
    if (opButton.innerHTML === 'Multiply-Add') {
      opButtons[2].style.backgroundColor = 'Gold';
      arg4 = "+"
      fourInputRun()
    } else {
      twoInputRun()
    }
    
  });
}