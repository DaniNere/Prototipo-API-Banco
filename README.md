# Projeto de Sistema Bancário Simples

###Este projeto consiste em uma aplicação de sistema bancário simples, onde é possível criar contas, fazer depósitos, saques, transferências, verificar saldo e excluir contas. O sistema foi desenvolvido em JavaScript utilizando o Node.js e Express.js.

## Funcionalidades
Criar Conta: Permite a criação de uma nova conta bancária com informações básicas do cliente.

* Depósito: Permite fazer depósitos em uma conta bancária, atualizando o saldo.

* Saque: Permite realizar saques de uma conta bancária, verificando o saldo disponível.

* Transferência: Permite a transferência de recursos entre duas contas bancárias, considerando os saldos e senhas.

* Verificar Saldo: Retorna o saldo de uma conta bancária específica.

* Atualizar Dados: Atualiza os dados de uma conta bancária existente, como nome, CPF, telefone, etc.

* Excluir Conta: Permite excluir uma conta bancária, desde que o saldo seja zero.

## Requisitos

Node.js e NPM instalados

## Como Executar
Clone este repositório: git clone https://github.com/seu-usuario/projeto-sistema-bancario.git

Acesse a API em http://localhost:3000.

## Endpoints

POST /contas - Cria uma nova conta bancária.
POST /transacoes/depositar - Realiza um depósito em uma conta bancária.
POST /transacoes/sacar - Realiza um saque de uma conta bancária.
POST /transacoes/transferir - Realiza uma transferência entre contas bancárias.
GET /contas/:numeroConta/saldo - Retorna o saldo de uma conta.
PUT /contas/:numeroConta - Atualiza os dados de uma conta.
DELETE /contas/:numeroConta - Exclui uma conta.

## Observações
Este projeto é um sistema bancário simples desenvolvido para fins de aprendizado e não deve ser usado em um ambiente de produção. Algumas validações e funcionalidades podem não estar totalmente implementadas.

Autor: Danielle Nere
