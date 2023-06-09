# WebFloat
Static webpage for a floating point calculator powered Berkeley SoftFloat 


## Installation Requirements
1. Download Emscripten [(source)](https://emscripten.org/docs/getting_started/downloads.html): 
   ```
   # cd into a new directory outside this repo
   cd ..
   
   # Get the emsdk repo
   git clone https://github.com/emscripten-core/emsdk.git

   # Enter that directory
   cd emsdk
   
   # Fetch the latest version of the emsdk (not needed the first time you clone)
   git pull

   # Download and install the latest SDK tools.
   ./emsdk install latest
   
   # Make the "latest" SDK "active" for the current user. (writes .emscripten file)
   ./emsdk activate latest
   ```
2. (OPTIONAL) Get source code from Berkeley SoftFloat [(source)](https://github.com/ucb-bar/berkeley-softfloat-3) 
   
    I compiled `softfloat.a` (included in the repo already) by changing the following line in  `berkeley-softfloat-3/build/Linux-x86_64-GCC/Makefile` and running `make` in the same directory on a Linux x86 machine. 
    ```
    COMPILE_C = emcc -c -Werror-implicit-function-declaration -DSOFTFLOAT_FAST_INT64 $(SOFTFLOAT_OPTS) $(C_INCLUDES) -O2 -o $@ -fPIC 
    ```
    By compiling with `emcc`, `softfloat.a` has a portable application binary interface (ABI) that can be linked to other `emcc` compiled files on other platforms; I only tested that it works on my Windows x86 machine with Emscripten installed.

## Build WebAssembly and Glued HTML/JS
In the repo directory, run the command below.
```
emcc fpcalc.c -o index.html softfloat.a --shell-file template.html -s EXPORTED_RUNTIME_METHODS='["callMain"]' -s USE_SDL=2 -s USE_LIBPNG=1 -s USE_ZLIB=1  
```
