// Helper function to convert a hexadecimal representation to a float
function hexToFloat(hexString) {
    const int32 = parseInt(hexString, 16);
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, int32);
    return view.getFloat32(0);
}
  
// Helper function to convert a hexadecimal representation to a double
function hexToDouble(hexString) {
const int64_high = parseInt(hexString.slice(0, 8), 16);
const int64_low = parseInt(hexString.slice(8), 16);
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
view.setUint32(0, int64_high);
view.setUint32(4, int64_low);
return view.getFloat64(0);
}
  
// Converts half-precision (16-bit) IEEE 754 hexadecimal representation to decimal
function halfPrecisionToDecimal(hexString) {
    const half = parseInt(hexString, 16);
    const sign = (half & 0x8000) << 16;
    let exponent = (half & 0x7c00) >> 10;
    let fraction = half & 0x03ff;
  
    if (exponent !== 0 || fraction !== 0) {
      exponent = (exponent - 15 + 127) & 0xff;
    }
  
    const float32Array = new Float32Array(1);
    const uint32Array = new Uint32Array(float32Array.buffer);
    uint32Array[0] = sign | (exponent << 23) | (fraction << 13);
  
    return float32Array[0];
  }
  

  // Converts single-precision (32-bit) IEEE 754 hexadecimal representation to decimal
  function singlePrecisionToDecimal(hexString) {
    return hexToFloat(hexString);
  }
  
  // Converts double-precision (64-bit) IEEE 754 hexadecimal representation to decimal
  function doublePrecisionToDecimal(hexString) {
    return hexToDouble(hexString);
  }


function makeOutputAllNaN() {
    var hex_id = document.getElementById('argOutput');
    var dec_id = document.getElementById('output-decimal');
    var significand_id = document.getElementById('output-significand');
    var exponent_id = document.getElementById('output-exponent');
    hex_id.value = NaN;
    dec_id.value = NaN;
    significand_id.value = NaN;
    exponent_id.value = NaN;
}
  
function processHexadecimal(whoCalled, theirDecimalID, theirSignID, theirSignificandID, theirExponentID, theirHiddenBitID) {
    var hex_id = document.getElementById(whoCalled);
    var dec_id = document.getElementById(theirDecimalID);
    var precision_id = document.getElementById("input-only-precision-select");
    var sign_id = document.getElementById(theirSignID);
    var significand_id = document.getElementById(theirSignificandID);
    var exponent_id = document.getElementById(theirExponentID);
    var hidden_bit_id = document.getElementById(theirHiddenBitID);
    var binary;

    if (!(/^[0-9A-Fa-f]+$/.test(hex_id.value))) {
        hex_id.value = NaN;
        dec_id.value = NaN;
        significand_id.value = NaN;
        exponent_id.value = NaN;
        makeOutputAllNaN();
        return
    }

    if (precision_id.value === "half") {
        hex_id.value = hex_id.value.padEnd(4, "0");
        dec_id.value = halfPrecisionToDecimal(hex_id.value); 
        binary = hexToBinary(hex_id.value);
        if (binary.slice(0, 1) === '0')
            sign_id.selectedIndex = 0;
        else {
            sign_id.selectedIndex = 1;
        }
        significand_id.value = binary.slice(6, 16);
        exponent_id.value = binary.slice(1, 6);
        if (hex_id.value === "fc00") {
            dec_id.value = "-Infinity";
        }
        if (hex_id.value === "7e00") {
            dec_id.value = NaN;
        }
    };

    if (precision_id.value === "single") {
        hex_id.value = hex_id.value.padEnd(8, "0");
        dec_id.value = singlePrecisionToDecimal(hex_id.value);
        binary = hexToBinary(hex_id.value);
        if (binary.slice(0, 1) === '0')
            sign_id.selectedIndex = 0;
        else {
            sign_id.selectedIndex = 1;
        }
        significand_id.value = binary.slice(9, 32);
        exponent_id.value = binary.slice(1, 9);
        if (hex_id.value === "7fc00000") {
            dec_id.value = NaN;
        }
    };
    

    if (precision_id.value === "double") { 
        hex_id.value = hex_id.value.padEnd(16, "0");
        dec_id.value = doublePrecisionToDecimal(hex_id.value);
        binary = hexToBinary(hex_id.value);
        if (binary.slice(0, 1) === '0')
            sign_id.selectedIndex = 0;
        else {
            sign_id.selectedIndex = 1;
        }
        significand_id.value = binary.slice(12, 64);
        exponent_id.value = binary.slice(1, 12);
        if (hex_id.value === "7ff8000000000000") {
            dec_id.value = NaN;
        }
    };
    
    if (binary.includes("1")) {
        hidden_bit_id.value = "1."
    } else {
        hidden_bit_id.value = "0."
    }
}

function processAllHexadecimals(){
    processHexadecimal('arg1', 'first-input-decimal', 'first-input-sign', 'first-input-significand', 'first-input-exponent', 'hiddenbit1');
    processHexadecimal('arg3', 'second-input-decimal', 'second-input-sign', 'second-input-significand', 'second-input-exponent', 'hiddenbit2');
    processHexadecimal('arg5', 'third-input-decimal', 'third-input-sign', 'third-input-significand', 'third-input-exponent', 'hiddenbit3');
}
