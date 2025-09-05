Aca voy a tener todas cosas de configuracion o codigo "global" usado por todos
## Comentarios sobre archivos
### package.json
- Le puse en el nombre "@my/config" para que npm haga la distincion entre algun paquete config publicado y mi paquete config
- Le puse private: true para decirle a npm que este paquete no se publica

### tsconfig.base.json

- Es .base.json en vez de simplemente .json para hacer la distincion que es la configuracion "base" de TS(de la cual el resto se va a basar)
- target: ES2022 para que compile a JS moderno
- module: ESNEXT para que use los imports modernos(import ... from ...) en vez de los viejos de de CommonJS(const ... = require(...))
- lib para decirle que cosas voy a querer usar(los features de ES2022 y el DOM, solo por si las dudas)
- jsx: react-jsx para decirle como quiero que haga handling de la sintaxis JSX(la de escribir "HTML" dentro del TS), para no tener que hacer import React siempre.
- strict para que no deje pasar ningun warning(el chiste de TS)
- esModuleInterop para que pueda importar modulos hechos para CommonJS usando ESNEXT