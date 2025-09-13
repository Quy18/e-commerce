# Dùng Node LTS ổn định
FROM node:20

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json trước (tận dụng cache Docker)
COPY package*.json ./

# Cài dependencies trong container
RUN npm install

# Copy toàn bộ source code (không có node_modules vì đã ignore)
COPY . .

# Expose cổng dev server
EXPOSE 3001

# Chạy Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3001"]
