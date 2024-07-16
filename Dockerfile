# Use a imagem oficial do Node.js como base
FROM node:20-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários e instale as dependências
COPY package.json /app/
RUN npm install

# Copie o resto dos arquivos do projeto
COPY . /app

# Construa o projeto Next.js
RUN npm run build

# Exponha a porta 3000 usada pelo Next.js
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]
