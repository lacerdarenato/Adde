## Considerações iniciais

Esta aplicação destina-se exibir dados básicos do clima, estes dados serão requisitados a uma API externa sua documentação poderá ser exibida através do endereço[https://www.weatherbit.io/api](https://www.weatherbit.io/api).

Esta aplicação é composta por 3 funções básicas.

1. Exibir o clima atual baseado no IP do servidor. esta função é executada ao abrir o client e também au se clicar no botão IP do client
2. Exibir o clima atual baseado nas entradas de cidade e estado fornecidas pelo usuário.
3. Exibir previsão do tempo pelos próximos X dias baseado nas entradas de cidade e país e X dias adiante fornecidas pelo usuário.


## Montar o app

1. Para executar o projeto é necessário usar git bash e executar o comando `git clone https://github.com/lacerdarenato/Adde` dentro do diretório em deseja instalá-lo.
2. Através do terminal de comando abra o diretório raiz e execute o comando `python .\server.py` para iniciar o server.
3. Abra o diretório angular-client e execute o comando `ng s` para iniciar o client.
   este comando vai ler todas as dependências contidas no arquivo package.json e instalá-las.
4. O server rodará através da URL [http://localhost:5002/](http://localhost:5002/) que será acessada pelo client.
5. O Client rodará através da URL [http://localhost:4200/](http://localhost:4200/) onde o usuário interagirá com a aplicação.


## Considerações finais.

- Modéstia a parte fiquei muito satisfeito com o resultado da aplicação, apesar de não ter implementado os testes de unidade e integração. Porem sei tambem que há muito o que melhorar na aplicação.
- Os pontos que eu melhoraria seriam a requisição de clima por IP utiliza o IP do servidor, e me ocorreu agora que esse IP (em um ambiente mais próximo do real) não mudaria, seria mais válido conseguir esse ip através do client, mas já são mais de 01:30 da madrugada agora e eu confesso que o cansaço está pesando vou parar por hoje.
- Outro ponto muito válido para futuras melhorias seriam as validações dos inputs e tratativa dos possíveis erros das respostas das requisições HTTP.

## De qualquer forma e com qualquer resultado, gostaria de agradecer pela oportunidade. []'s