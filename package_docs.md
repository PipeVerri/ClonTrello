# Documentacion del package

### pnpm-workspace.yaml
Como estoy trabajando con multiples proyectos(multiples package.json) le tengo que indicar a pnpm cuales package.json tomar
### turbo.json
La configuracion de turborepo
- $schema: para que el editor sepa auto-completar el json
- Parametros de cada task:
  - cache: si cachear los resultados del build o no
  - persistent: si es una tarea "continua" que no termina o si deberia ser de tiempo finito
  - outputs: los outputs que produce la tarea, asi sabe con que hacer cache. Si pongo "directorio/**" siginfica "checkea el directorio y recursivamente todo lo de adentro"
  - dependsOn: lo que tiene que hacer antes de ejecutar el paso, "^build" significa ejecutar el paso build en todos los "padres"(todos los paquetes que incluyo)
### Scripts del package.json
El linting checkea "warnings" para evitar que se shipee codigo que no se ejecuta, con mal formato(pueden haber bugs ocultos), etc.

El typecheck se asegura que no hayan errores de tipos(y que no sucedan al compilar, lo cual es mucho mas lento que el typecheck)