// Add event listeners to each input field
var arg1 = document.getElementById('arg1');
var arg2 = '+';
var arg3 = document.getElementById('arg3');
var arg4 = 'RNE';
var arg5 = document.getElementById('arg5');
var arg6 = 'RNE';

function updateRoundingMode() {
    var roundingSelectElement = document.getElementById("rounding-mode");
    var flag = roundingSelectElement.value
    if (selectedOpButtonIndex === multiplyAddIndex) {
        arg6 = flag;
    } else {
        arg4 = flag;
    }
}

var inputOnlyDropdown = document.getElementById('')

var Module = {
    preRun: [],
    arguments: [document.getElementById('arg1').value, arg2, document.getElementById('arg3').value],
    postRun: [],
    print: (function() {
    var element = document.getElementById('output');
    if (element) element.value = ''; // clear browser cache
    return function(text) {
        if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
        // These replacements are necessary if you render to raw HTML
        //text = text.replace(/&/g, "&amp;");
        //text = text.replace(/</g, "&lt;");
        //text = text.replace(/>/g, "&gt;");
        //text = text.replace('\n', '<br>', 'g');
        console.log(text);
        if (element) {
        element.value += text + "\n";
        element.scrollTop = element.scrollHeight; // focus on bottom
        }
    };
    })(),
    setStatus: function(text) {},
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
    }
};

function twoInputRun() {
    updateRoundingMode()
    Module.arguments = [arg1.value, arg2, arg3.value, arg4];
    Module.print("\n\n\n");
    Module.callMain(Module.arguments);
}

function fourInputRun() {
    updateRoundingMode()
    Module.arguments = [arg1.value, arg2, arg3.value, arg4, arg5.value, arg6];
    Module.print("\n\n\n");
    Module.callMain(Module.arguments);
}



// Only call this when not pressing operation buttons, otherwise we get a race condition
function runFPCalc() {
    if (selectedOpButtonIndex === multiplyAddIndex) {
        arg4 = '+'
        fourInputRun();
    } else {
        twoInputRun();
    }
}

