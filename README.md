# WebFloat
Static webpage for a floating point calculator powered Berkeley SoftFloat 

## Activate `emsdk`
```
./emsdk activate latest
```

## Compile
```
emcc fpcalc.c -o index.html softfloat.a --shell-file shell_minimal.html -s EXPORTED_RUNTIME_METHODS='["callMain"]'
```