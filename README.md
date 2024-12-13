# Sistema de Gestión de Impresoras (ScanPoint)

## Descripción
Este sistema permite gestionar el registro, edición, eliminación y visualización de impresoras en un entorno web. Está diseñado para ser intuitivo y eficiente, facilitando la administración de dispositivos con funcionalidades modernas y un diseño atractivo.

---

## Tecnologías Utilizadas

### Frontend:
- **HTML5**: Estructura de las páginas web.
- **CSS3**: Diseño visual y estilos, incluyendo soporte para modales y botones interactivos.
- **TypeScript**: Desarrollo de la lógica para la interacción del usuario y la comunicación con el backend.

### Backend:
- **Node.js**: Configuración de la API para la gestión de los datos.
- **Express.js**: Framework para el manejo de rutas y lógica del servidor.

### Base de Datos:
- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información de las impresoras.

### Herramientas Adicionales:
- **Graphviz**: Creación del diagrama de clases.
- **Icons**: Favicons utilizados en los botones para mejorar la interfaz de usuario.

---

## Funcionalidades del Sistema

### Gestión de Impresoras
1. **Crear Impresoras**: Permite registrar una nueva impresora ingresando datos como marca, modelo y fecha de compra.
2. **Editar Impresoras**: Modifica los datos de una impresora existente.
3. **Eliminar Impresoras**: Borra registros de impresoras que ya no sean necesarias.
4. **Filtrar Impresoras**: Busca impresoras en tiempo real por marca o modelo.
5. **Ordenar por Fecha de Compra**: Organiza las impresoras según su fecha de adquisición.

### Descarga de Datos
- **Exportar a JSON**: Descarga todos los registros en formato JSON para respaldos o integración con otros sistemas.

### Seguridad
- **Autenticación por Token**: Protege las funcionalidades del sistema mediante un token de autenticación almacenado en `localStorage`.

---

## Estructura del Proyecto

### Backend
```
/project-root
├── src/                    # Código fuente del backend
│   ├── config/             # Configuración del servidor
│   │   ├── mongo.ts        # Configuración de la base de datos MongoDB
│   ├── controllers/        # Controladores para manejar la lógica de negocio
│   │   ├── auth.controller.ts
│   │   ├── impresora.controller.ts
│   ├── interfaces/         # Interfaces para definir tipos
│   │   ├── impresora.interface.ts
│   │   ├── user.interface.ts
│   ├── middleware/         # Middleware para validaciones
│   │   ├── session.ts
│   ├── models/             # Modelos de datos
│   │   ├── impresora.model.ts
│   │   ├── user.model.ts
│   ├── routes/             # Definición de rutas
│   │   ├── auth.ts
│   │   ├── impresora.ts
│   │   ├── index.ts
│   ├── service/            # Servicios para conectar con la base de datos
│   │   ├── auth.service.ts
│   │   ├── impresora.service.ts
│   ├── utils/              # Utilidades comunes
│   │   ├── error.handle.ts
│   │   ├── jwt.handle.ts
│   │   ├── password.handle.ts
│   ├── app.ts              # Configuración y arranque del servidor
```

### Frontend
```
/project-root
├── public/                 # Código fuente del frontend
│   ├── images/             # Imágenes utilizadas en el frontend
│   │   ├── logo.png        # Logo del sistema
│   ├── js/                 # Archivos JavaScript del cliente
│   ├── styles/             # Archivos de estilos
│   │   ├── dashboard.css   # Estilos del panel de control
│   │   ├── style.css       # Estilos generales
│   ├── views/              # Páginas HTML
│   │   ├── impresoras.html # Página principal para la gestión de impresoras
│   │   ├── index.html      # Página de inicio de sesión
│   │   ├── register.html   # Página de registro de usuarios
```

---

## Diagrama de Clases

![Diagrama de Clases](/diagramas/ClassDiagram.png)

---

## Cómo Usar el Sistema

1. **Autenticarse**:
   - Iniciar sesión para obtener acceso al sistema.

2. **Gestionar Impresoras**:
   - Usar los botones interactivos para crear, editar o eliminar impresoras.

3. **Descargar Registros**:
   - Hacer clic en el botón "Descargar JSON" para obtener un archivo con todos los registros almacenados.

4. **Explorar la Información**:
   - Filtrar y ordenar los registros según sea necesario para visualizar los datos de forma eficiente.
