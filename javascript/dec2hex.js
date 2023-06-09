// Helper function to convert a float to its hexadecimal representation
function floatToHex(f) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, f);
    const int32 = view.getUint32(0);
    return int32.toString(16).padStart(8, '0');
}

// Helper function to convert a double to its hexadecimal representation
function doubleToHex(d) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, d);
    const int64_high = view.getUint32(0);
    const int64_low = view.getUint32(4);
    return int64_high.toString(16).padStart(8, '0') + int64_low.toString(16).padStart(8, '0');
}

  // Converts decimal string to half-precision (16-bit) IEEE 754 hexadecimal representation

function decimalToHalfPrecision(decimalString) {
    // Parse the decimal string to a 32-bit floating-point number
    const float = parseFloat(decimalString);

    // Create a 32-bit floating-point array and a 32-bit unsigned integer array that shares the same buffer
    const float32Array = new Float32Array(1);
    const uint32Array = new Uint32Array(float32Array.buffer);

    // Store the float value in the floating-point array and extract its binary representation as an unsigned integer
    float32Array[0] = float;
    const uint32 = uint32Array[0];

    // Extract the sign, exponent, and fraction components from the unsigned integer using bit masks and shifts
    const sign = uint32 >>> 31;
    const exponent = (uint32 >>> 23) & 0xff;
    const fraction = uint32 & 0x7fffff;

    // Convert the exponent to its biased representation in the half-precision format
    let biasedExponent;
    if (exponent === 0) {
        biasedExponent = 0;
    } else if (exponent >= 255) {
        biasedExponent = 31;
    } else {
        biasedExponent = exponent - 127 + 15;
    }

    // Pack the sign, biased exponent, and fraction components into a 16-bit unsigned integer in the half-precision format
    const uint16 = (sign << 15) | (biasedExponent << 10) | fraction >> 13;

    // Convert the unsigned integer to a hexadecimal string and pad it with zeroes to a length of 4 digits
    const hexString = uint16.toString(16).padStart(4, '0');

    // Return the hexadecimal string
    return hexString;
}
  

// Converts decimal string to single-precision (32-bit) IEEE 754 hexadecimal representation
function decimalToSinglePrecision(decimalString) {
    const decimal = parseFloat(decimalString);
    return floatToHex(decimal);
}

// Converts decimal string to double-precision (64-bit) IEEE 754 hexadecimal representation
function decimalToDoublePrecision(decimalString) {
    const decimal = parseFloat(decimalString);
    return doubleToHex(decimal);
}

function hexToBinary(hexString) {
    var binaryString = '';
    for (var i = 0; i < hexString.length; i++) {
      var hexDigit = hexString.charAt(i);
      var binaryDigit = parseInt(hexDigit, 16).toString(2).padStart(4, '0');
      binaryString += binaryDigit;
    }
    return binaryString;
}

function processDecimal(whoCalled, theirHexID, theirSignID, theirSignificandID, theirExponentID, theirHiddenBitID) {
    var dec_id = document.getElementById(whoCalled);
    var hex_id = document.getElementById(theirHexID);
    var precision_id = document.getElementById("input-only-precision-select");
    var sign_id = document.getElementById(theirSignID);
    var significand_id = document.getElementById(theirSignificandID);
    var exponent_id = document.getElementById(theirExponentID);
    var hidden_bit_id = document.getElementById(theirHiddenBitID);
    var binary;

    if (isNaN(parseFloat(dec_id.value))) {
        hex_id.value = NaN;
        dec_id.value = NaN;
        significand_id.value = NaN;
        exponent_id.value = NaN;
        makeOutputAllNaN();
        return
    }

    if (precision_id.value === "half") {
        hex_id.value = decimalToHalfPrecision(dec_id.value); 
        binary = hexToBinary(hex_id.value);
        if (binary.slice(0, 1) === '0')
            sign_id.selectedIndex = 0;
        else {
            sign_id.selectedIndex = 1;
        }
        significand_id.value = binary.slice(6, 16);
        exponent_id.value = binary.slice(1, 6);
    };

    if (precision_id.value === "single") {
        hex_id.value = decimalToSinglePrecision(dec_id.value);
        binary = hexToBinary(hex_id.value);
        if (binary.slice(0, 1) === '0')
            sign_id.selectedIndex = 0;
        else {
            sign_id.selectedIndex = 1;
        }
        significand_id.value = binary.slice(9, 32);
        exponent_id.value = binary.slice(1, 9);
    };
    

    if (precision_id.value === "double") { 
        hex_id.value = decimalToDoublePrecision(dec_id.value);
        binary = hexToBinary(hex_id.value);
        if (binary.slice(0, 1) === '0')
            sign_id.selectedIndex = 0;
        else {
            sign_id.selectedIndex = 1;
        }
        significand_id.value = binary.slice(12, 64);
        exponent_id.value = binary.slice(1, 12);
    };
    
    if (binary.includes("1")) {
        hidden_bit_id.value = "1."
    } else {
        hidden_bit_id.value = "0."
    }
}


function processAllDecimals(){
    processDecimal('first-input-decimal', 'arg1', 'first-input-sign', 'first-input-significand', 'first-input-exponent', 'hiddenbit1');
    processDecimal('second-input-decimal', 'arg3', 'second-input-sign', 'second-input-significand', 'second-input-exponent', 'hiddenbit2');
    processDecimal('third-input-decimal', 'arg5', 'third-input-sign', 'third-input-significand', 'third-input-exponent', 'hiddenbit3');
}
  