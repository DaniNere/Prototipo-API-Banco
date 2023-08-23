const {contas} = require('../bancodedados');

const listarContas = (req, res) => {

const { senha_banco } = req.query;

if (!senha_banco) {

    return res.status(401).json({ mensagem: "A senha não foi digitada!" });
}

if (senha_banco !== "Cubos123Bank") {
  return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
}

return res.status(200).json({contas})

}


let numeroConta = 1;
const criarConta = (req, res) =>{

    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha){
        return res.status(404).json({ mensagem: 'Todos os campos são de preenchimento obrigatório' });
    }

    const novaConta = { // Adiciona a nova conta ao array de conta
    numeroConta: numeroConta++,
    saldo: 0,
    usuario: {
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha,
    }
    }

    contas.push (novaConta);

    res.status(201).json({ mensagem: 'Conta criada com sucesso', conta: novaConta });
};

const atualizar = (req, res) => {

const numeroConta = Number(req.params.numeroConta);    

const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;

if (!nome) {
    return res.status(400).json({ mensagem: "O nome é obrigatório" });
}

if (!cpf) {
    return res.status(400).json({ mensagem: "O campo CPF é obrigatório" });
}

if (!data_nascimento) {
    return res.status(400).json({ mensagem: "A data de nascimento é obrigatória" });
}

if (!telefone) {
    return res.status(400).json({ mensagem: "O campo telefone é obrigatório" });
}

if (!email) {
    return res.status(400).json({ mensagem: "O campo email é obrigatório" });
}

if (!senha) {
    return res.status(400).json({ mensagem: "A senha é obrigatória" });
}

const contaComMesmoCPF = contas.find(conta => conta.cpf === cpf && conta.numeroConta !== numeroConta);
 if (contaComMesmoCPF) {

    return res.status(400).json({ mensagem: "O CPF informado já está cadastrado!'" });
 }

 const contaComMesmoEmail = contas.find(conta => conta.email === email && conta.numeroConta !== numeroConta);

 if (contaComMesmoEmail){
    return res.status(400).json({ mensagem: 'O E-mail informado já existe cadastrado!' });
 }

 const contaASerAtualizada = contas.find(conta => conta.numeroConta === numeroConta);
    if (!contaASerAtualizada) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    contaASerAtualizada.nome = nome;
    contaASerAtualizada.cpf = cpf;
    contaASerAtualizada.data_nascimento = data_nascimento;
    contaASerAtualizada.telefone = telefone;
    contaASerAtualizada.email = email;
    contaASerAtualizada.senha = senha;

    res.status(200).json({ mensagem: "Dados da conta atualizados com sucesso"});


};


const excluir = (req,res) =>{

const numeroConta = Number(req.params.numeroConta);

if (!numeroConta || isNaN(numeroConta)){

    return res.status(404).json({ mensagem: 'Digite uma conta válida'});
}
 
const contaASerExcluida = contas.findIndex(conta => conta.numeroConta === numeroConta);
 //caso ele não encontre a conta ele retorna -1, caso encontre ele retorna a posição da conta dentro do array

if (numeroConta === -1 ) {
    return res.status(404).json({ mensagem: 'A conta não foi encontrada'});
}
 
const saldoDaConta = contas[contaASerExcluida].saldo;

if (saldoDaConta !== 0){
        return res.status(404).json({ mensagem: 'A conta só pode ser removida se o saldo for zero'});
}
const contaExcluida = contas.splice(contaASerExcluida, 1);
return res.status(201).json({ mensagem: 'A conta foi excluida', contaExcluida});
};

module.exports = {
    listarContas,
    criarConta,
    atualizar,
    excluir
}