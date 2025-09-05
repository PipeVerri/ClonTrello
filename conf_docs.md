# Herramientas usadas
### Proyecto en general
- Turborepo para tener librerias en conjunto
- pnpm como package manager
- Typescript como lenguaje para backend y frontend

## Estructura del proyecto

- En packages va a haber codigo comun, como el schema de la DB, funciones generales, etc
- En app va a estar todo lo ejecutable

    - En api el backend
    - En web el frontend
# Documentacion de archivos

### pnpm-workspace.yaml
Como estoy trabajando con multiples proyectos(multiples package.json) le tengo que indicar a pnpm cuales package.json tomar
### turbo.json
La configuracion de turborepo
- $schema: para que el editor sepa auto-completar el json
- Parametros de cada task:
  - cache: si cachear los resultados del build o no
  - persistent: si es una tarea "continua" que no termina o si deberia ser de tiempo finito
