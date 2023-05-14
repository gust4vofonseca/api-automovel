# Como rodar o projeto

- Rode primeiro o container do docker:
docker run --name postgres-seidor -e POSTGRES_PASSWORD=seidor -p 5432:5432 -d postgres

- Logo em seguida rode o yarn para instalacao das dependencias e rode as migrations do banco de dados
yarn
yarn typeorm migration:run


- Para iniciar o projeto 
crie uma pasta .env como a .env.exemplo logo em seguida: 
yarn dev

# Como testar o projeto
coloque na variavel do .env NODE_ENV=test logo em seguida:
yarn test