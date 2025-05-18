# Gunakan Node.js versi LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy file package dan install dependensi
COPY package*.json ./
RUN npm install

# Copy semua file ke container
COPY . .

# Jalankan aplikasi
CMD ["npm", "run", "dev"]
