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
        if (text.startsWith('X:')) {
            var splitXArray = text.split(' = ');
            document.getElementById("first-input-decimal").value = splitXArray[1];
        } else if (text.startsWith('Y:')) {
            var splitYArray = text.split(' = ');
            document.getElementById("second-input-decimal").value = splitYArray[1];
        } else if (text.startsWith('Z:')) {
            var splitZArray = text.split(' = ');
            document.getElementById("third-input-decimal").value = splitZArray[1]; 
        } else if (text.startsWith('exception')) {
            var splitExceptionArray = text.split('|');
            const flags_id = ["exception-label", "inexact", "divzero", "overflow", "underflow", "invalid"]
            for (let i = 1; i < splitExceptionArray.length; i++) {
                var flag_element = document.getElementById(flags_id[i]);
                flag_element.value = splitExceptionArray[i]
                if (flag_element.value.includes('1')) {
                    flag_element.style.color = "red"
                } else {
                    flag_element.style.color = "black"
                }
                
            }
            
        } else if (text.startsWith('0x') || text.startsWith('result')) {
            var hex_id = document.getElementById('argOutput');
            var dec_id = document.getElementById('output-decimal');

            var splitArray = text.split(": ");
            splitArray = splitArray[1].split(" = ");

            dec_id.value = splitArray[1];

            var spacedHex = splitArray[0];
            var cleanHex = spacedHex.replace(/_/g, '');
            cleanHex = cleanHex.replace(/0x([0-9a-fA-F]{4})/, '$1');
            hex_id.value = cleanHex
            // processHexadecimal('argOutput', 'output-decimal', 'output-sign', 'output-significand', 'output-exponent', 'hiddenbit4');
  
            // convert negative NaN (bad) to postive NaN (what we want) in output decimal
            // happens for -0 / 0 (output is -NaN but that is not a thing, so we want to convert to +NaN)
            var conversion = {
                "fe00": "7e00",
                "ffc00000": "7fc00000",
                "fff8000000000000": "7ff8000000000000"
            }
            if (cleanHex === "fe00" | cleanHex === "ffc00000" | cleanHex === "fff8000000000000") {
                hex_id.value = conversion[cleanHex];
                processHexadecimal('argOutput', 'output-decimal', 'output-sign', 'output-significand', 'output-exponent', 'hiddenbit4');
                dec_id.value = NaN;
            }
        };

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

