# WebFloat
Static webpage for a floating point calculator powered Berkeley SoftFloat 


## Installation Requirements
1. [Emscripten](https://emscripten.org/docs/getting_started/downloads.html): After installing, activate `emcc` in terminal by running the command below in the `emsdk` repo (following the installation instructions):
   ```
   ./emsdk activate latest
   ```

2. [Berkeley SoftFloat](https://github.com/ucb-bar/berkeley-softfloat-3) (OPTIONAL)
   
    I compiled `softfloat.a` (included in the repo already) by changing the following line in  `berkeley-softfloat-3/build/Linux-x86_64-GCC/Makefile` and running `make` in the same directory on a Linux x86 machine. 
    ```
    COMPILE_C = emcc -c -Werror-implicit-function-declaration -DSOFTFLOAT_FAST_INT64 $(SOFTFLOAT_OPTS) $(C_INCLUDES) -O2 -o $@ -fPIC 
    ```
    By compiling with `emcc`, `softfloat.a` has a portable application binary interface (ABI) that can be linked to other `emcc` compiled files on other platforms; I only tested that it works on my Windows x86 machine with Emscripten installed.

## Build WebAssembly and Glued HTML/JS
In the repo directory, run the command below.
```
emcc fpcalc.c -o index.html softfloat.a --shell-file template.html -s EXPORTED_RUNTIME_METHODS='["callMain"]'
```