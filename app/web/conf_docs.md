# Comentarios sobre archivos
### tsconfig.json

- El paths lo que hace es reemplazar "@/" por el directorio src asi no tengo que hacer ../../../src
- El include y exclude lo que hago es decir que compile todo excepto las cosas de node_modules
  - Lo que hace la exclusion de librerias en la configuracion base es excluir *el checkeo* de .ts en las librerias, no su compilacion