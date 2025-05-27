
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
  body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
  body.className = "sign-up-js";
})




// Função para logar o usuário

document.querySelectorAll('.form')[1].addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const senha = e.target.senha.value;

  const resposta = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  });

  const dados = await resposta.json();

  if (resposta.ok) {
    localStorage.setItem('token', dados.token);
    alert('Login realizado com sucesso!');
    // redireciona para página principal
    window.location.href = '/TelaPrincipal';
  } else {
    alert(dados.message || 'Erro ao fazer login');
  }
});


// Função para mostrar mensagem de erro ou sucesso
function mostrarMensagem(texto) {
  const msg = document.getElementById('mensagem-usuario');
  msg.textContent = texto;
  msg.style.display = 'block';

  setTimeout(() => {
    msg.style.display = 'none';
  }, 3000); // some após 3 segundos
}



// Função para cadastrar o usuário

document.querySelectorAll('.form')[0].addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = e.target.nome.value;
  const email = e.target.email.value;
  const senha = e.target.senha.value;
  const confirmarSenha = e.target.confirmarSenha.value;

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem!');

    return;
  }
  document.body.className = "sign-in-js"; // 👉 animação de volta para login
  const resposta = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email, senha, confirmarSenha })
  });

  const dados = await resposta.json();

  if (resposta.ok) {
    mostrarMensagem('Cadastro realizado com sucesso! Faça login agora.');
    // animação: mudar pra tela de login após 1s
    
      
    

  } else {
    alert(dados.message || 'Erro ao cadastrar');
  }
});




