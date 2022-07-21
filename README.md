# Projeto API de Blogs!

  Neste projeto foi desenvolvida uma API e um banco de dados para a produção de conteúdo para um blog! 

  A aplicação foi desenvolvida em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

  1. Foram desenvolvidos endpoints que estarão conectados ao banco de dados seguindo os princípios do REST;

  2. Para fazer um post é necessário usuário e login, portanto será trabalhada a **relação entre** `user` e `post`, além de usar validação via JWT token; 

  3. Foi necessário a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.



