const {saques, depositos, transferencias, contas} = require('../bancodedados');

const depositar = (req, res) => {
const {numero_conta, valor} = req.body;

const numeroConta = parseInt(numero_conta);
const valorNumerico = parseInt(valor);

if (!numeroConta || isNaN(valorNumerico)) {
    return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
}
const contaASerDepositada = contas.find(conta => conta.numeroConta === numeroConta);
    if (!contaASerDepositada) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }
    if ( valorNumerico <= 0){
        return res.status(400).json({ mensagem: "O valor do depósito deve ser maior que zero" });
    }
 contaASerDepositada.saldo += valorNumerico;

 const deposito = {
    numeroConta: numeroConta,
    valor: valorNumerico,
    data: new Date().toISOString()
 }

 depositos.push(deposito);

    return res.status(200).json();
}; 

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    const numeroConta = parseInt(numero_conta);
    const valorNumerico = parseInt(valor);

    if (!numeroConta || isNaN(valorNumerico) || !senha) {
        return res.status(400).json({ mensagem: "Número da conta, valor do saque e senha são obrigatórios!" });
    }

    const contaASerSacada = contas.find(conta => conta.numeroConta === numeroConta);

    if (!contaASerSacada) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    if (senha !== contaASerSacada.usuario.senha) {
        return res.status(400).json({ mensagem: "Senha Incorreta" });
        
    }

    if (valorNumerico <= 0) {
        return res.status(400).json({ mensagem: "O valor do saque deve ser maior que zero" });
    }

    if (contaASerSacada.saldo < valorNumerico) {
        return res.status(403).json({ mensagem: "Saldo insuficiente para o saque" });
    }

    contaASerSacada.saldo -= valorNumerico;

    const saqueEfetuado = {
        data: new Date(),
        numero_conta: numeroConta,
        valor: valorNumerico
    }

    saques.push(saqueEfetuado);

    return res.status(200).json({ mensagem: "Saque realizado com sucesso" });
};

const transferir = (req, res) =>{

    const{numero_conta_origem, numero_conta_destino, valor, senha} = req.body;
    
    const numeroContaOrigem = parseInt(numero_conta_origem);
    const numeroContaDestino = parseInt(numero_conta_destino);
    const valorNumerico = parseInt(valor);

    if (!numeroContaOrigem || !numeroContaDestino || !valor) {
        res.status(400).json({ mensagem :" Número da conta de origem, número da conta de destino, valor da transferência e senha são obrigatórios! "})
    }

    const contaDeOrigem = contas.find(conta => conta.numeroConta === numeroContaOrigem);

    if (!contaDeOrigem) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    if (senha !== contaDeOrigem.usuario.senha) {
        return res.status(400).json({ mensagem: "Senha Incorreta" });
    }

    const contaDeDestino = contas.find(conta => conta.numeroConta === numeroContaDestino);
    
    if (!contaDeDestino) {
        return res.status(404).json({ mensagem: "Conta  de destino não encontrada" });
    }
  //verificar saldo conta origem

    if ( contaDeOrigem.saldo < valorNumerico) {
        return res.status(403).json({ mensagem: "Saldo insuficiente para o Operação"});
    }
    
    contaDeOrigem.saldo -= valorNumerico;; //subtraio o valor do saque do saldo
    
    contaDeDestino.saldo += valorNumerico; //adciono a conta de destino o valor.
    
    const transferenciaEfetuada = {

        data: new Date().toISOString(),
        numero_conta_origem: numeroContaOrigem,
        numero_conta_destino: numeroContaDestino,
        valor: valorNumerico
    };
    
    transferencias.push(transferenciaEfetuada);
    
    return res.status(200).json({ mensagem: "Transferência realizada com sucesso" });
}

const saldo = (req, res) => {
    const {numero_conta, senha} = req.query

    const numeroConta = parseInt(numero_conta);

    const contaSaldo = contas.find(conta => conta.numeroConta === numeroConta);


    if(!numero_conta || !senha){
        return res.status(404).json({ mensagem: "Conta e a senha são obrigatórias" });
    }

    if(!contaSaldo) {
         return res.status(404).json({ mensagem: "Conta não encontrada" });
     }

    if (senha !== contaSaldo.usuario.senha) {
        return res.status(400).json({ mensagem: "Senha Incorreta" });
    }

    return res.status(200).json({ saldo: contaSaldo.saldo });

    };
const extrato = (req, res) => {

    const {numero_conta, senha} = req.query

    const numeroConta = parseInt(numero_conta);

    const contaExtrato = contas.find(conta => conta.numeroConta === numeroConta);


    if(!numero_conta || !senha){
        return res.status(404).json({ mensagem: "Conta e a senha são obrigatórias" });
    }

    if(!contaExtrato) {
         return res.status(404).json({ mensagem: "Conta não encontrada" });
     }

    if (senha !== contaExtrato.usuario.senha) {
        return res.status(400).json({ mensagem: "Senha Incorreta" });
     }

     const transferenciasFeitas = transferencias.filter(transferencia => transferencia.numero_conta_origem === numeroConta);
     const transferenciasRecebidas = transferencias.filter(transferencia => transferencia.numero_conta_destino === numeroConta);
     const depositosConta = depositos.filter(deposito => deposito.numeroConta === numeroConta);
     const saquesConta = saques.filter(saque => saque.numero_conta === numeroConta);

     const extrato = {
        transferencias: {
            feitas: transferenciasFeitas,
            recebidas: transferenciasRecebidas
        },
        depositos: depositosConta,
        saques: saquesConta
    };

    return res.status(200).json(extrato);
};

module.exports ={
    depositar,
    sacar, 
    transferir,
    saldo, 
    extrato
}