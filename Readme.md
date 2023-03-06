Learn project of control debugger with code.
## Environment requirements:
### On Linux:
gcc, gdb, cmake

### On Windows:
Visual Studio, cmake, cdb

## Run example:
### 1. Build debug target
#### On Unix
```shell
cmake -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build ./build
```
#### On Windows
```shell
cmake -B build -DCMAKE_BUILD_TYPE=Debug -G "Visual Studio 17 2022"
cmake --build ./build
```

### 2. Init nodejs project
```shell
npm install
npm run build
```
### 3. Run example
#### On Unix
```shell
node ./out/index.js ./build/DebugTarget/DebugTarget
```
#### On Windows
```shell

```