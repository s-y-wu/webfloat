function changeInputWidths(significand_class, exponent_class, hexadecimal_class, dropdown_id) {
    const significands = document.querySelectorAll(significand_class);
    const exponents = document.querySelectorAll(exponent_class);
    const hexadecimals = document.querySelectorAll(hexadecimal_class);
    var dropdown = document.getElementById(dropdown_id);
    var selectedIndex = dropdown.selectedIndex;

    for (let i = 0; i < significands.length; i++) {
      var significand = significands[i];
      var exponent = exponents[i];
      var hexadecimal = hexadecimals[i];
      if (selectedIndex == 0) {
        hexadecimal.size = 3;
        hexadecimal.maxLength = 4;
        hexadecimal.value = "0000"
        significand.size = 10;
        significand.maxLength = 10;
        significand.value = "0000000000"
        exponent.size = 4;
        exponent.maxLength = 5;
        exponent.value = "00000"
      }
      if (selectedIndex == 1) {
        hexadecimal.size = 8;
        hexadecimal.maxLength = 8;
        hexadecimal.value = "00000000"
        significand.size = 27;
        significand.maxLength = 23;
        significand.value = "00000000000000000000000"
        exponent.size = 8;
        exponent.maxLength = 0;
        exponent.value = "00000000"
      }
      if (selectedIndex == 2) {
        hexadecimal.size = 18;
        hexadecimal.maxLength = 16;
        hexadecimal.value = "0000000000000000"
        significand.size = 63;
        significand.maxLength = 52;
        significand.value = "0000000000000000000000000000000000000000000000000000"
        exponent.size = 12;
        exponent.maxLength = 11;
        exponent.value = "00000000000"
      }
      if (selectedIndex == 3) {
        hexadecimal.size = 23;
        hexadecimal.maxLength = 20;
        hexadecimal.value = "00000000000000000000"
        significand.size = 78;
        significand.maxLength = 64;
        significand.value = "0000000000000000000000000000000000000000000000000000000000000000"
        exponent.size = 15;
        exponent.maxLength = 15;
        exponent.value = "000000000000000"
      }
      if (selectedIndex == 4) {
        hexadecimal.size = 38;
        hexadecimal.maxLength = 32;
        hexadecimal.value = "00000000000000000000000000000000"
        significand.size = 125;
        significand.maxLength = 112;
        significand.value = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        exponent.size = 15;
        exponent.maxLength = 15;
        exponent.value = "000000000000000"
      }
    }
  }

function changeAllWidths() {changeInputWidths('.significand', '.exponent', '.hexadecimal', 'input-only-precision-select')};
function changeConvertInput() {changeInputWidths('.input-significand', '.input-exponent', '.input-hexadecimal', 'convert-table-input-precision')};