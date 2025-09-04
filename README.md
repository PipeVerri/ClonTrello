# programacion-3-2025-verri-PipeVerri
programacion-3-2025-verri-PipeVerri created by GitHub Classroom

## Proyecto: Aplicación de Tablero de Tareas (Estilo Trello)

El objetivo de este proyecto es construir una aplicación web full-stack inspirada en Trello. La aplicación permitirá a los usuarios gestionar tareas a través de un tablero interactivo con columnas y tarjetas.

### Requisitos Funcionales (MVP - Producto Mínimo Viable)

1.  **Tableros:**
    *   El usuario podrá ver un tablero principal.
    *   El tablero contendrá múltiples columnas.

2.  **Columnas (Listas):**
    *   Dentro de un tablero, el usuario podrá ver columnas que representan estados de una tarea (ej: "Por Hacer", "En Progreso", "Hecho").
    *   El usuario podrá crear nuevas columnas.

3.  **Tarjetas (Tareas):**
    *   Dentro de una columna, el usuario podrá ver tarjetas, cada una representando una tarea.
    *   El usuario podrá crear nuevas tarjetas con un título y una descripción.
    *   El usuario podrá mover tarjetas entre columnas mediante una interfaz de "arrastrar y soltar" (drag and drop).

### Requisitos Técnicos

La aplicación se construirá siguiendo una arquitectura moderna de desarrollo web full-stack.

1.  **Backend:**
    *   **Lenguaje:** A elección entre Python o JavaScript/TypeScript.
    *   **Framework:** Se debe utilizar un framework web moderno como FastAPI, Django, Express o NestJS.
    *   **Base de Datos:** Se debe utilizar un ORM (Object-Relational Mapper) como SQLAlchemy, Prisma o TypeORM para interactuar con la base de datos.
    *   **API:** Se debe exponer una API RESTful para que el frontend pueda consumir los datos (CRUD de Tableros, Columnas y Tarjetas).

2.  **Frontend:**
    *   **Framework:** Se debe construir obligatoriamente con **React**.
    *   **Gestión de Estado:** Se utilizarán hooks de React (`useState`, `useEffect`, `useContext`) para gestionar el estado de la aplicación.
    *   **Comunicación con el Backend:** Se realizarán llamadas a la API REST del backend para obtener, crear, actualizar y eliminar datos.
    *   **Interfaz de Usuario:** La interfaz debe ser intuitiva y permitir la funcionalidad de arrastrar y soltar tarjetas.

3.  **Base de Datos:**
    *   A elección, puede ser una base de datos relacional (como PostgreSQL o SQLite) o NoSQL. El modelo de datos debe soportar la relación entre tableros, columnas y tarjetas.
