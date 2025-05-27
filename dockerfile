# Usa a imagem oficial do Node.js
FROM node:18

# Cria e define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência para instalar as libs
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos da aplicação
COPY . .

# Exponha a porta que sua aplicação escuta (ajuste se não for 3000)
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["npm", "run", "dev"]
