# Etapa de construcción
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia los archivos de configuración de paquetes
COPY frontend/package*.json ./

# Instala dependencias
RUN npm install

# Copia el código fuente del frontend
COPY frontend/ .

# Configuraciones para construcción
ENV NODE_OPTIONS=--max_old_space_size=8192
ENV NG_PERSISTENT_BUILD_CACHE=false

# Construir la aplicación para producción
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar archivos construidos al directorio de nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copiar configuración de nginx personalizada (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]