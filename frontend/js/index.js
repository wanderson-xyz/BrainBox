// Referência ao botão e modal
const modal = document.getElementById('modal');
const form = document.getElementById('idea-form');
const newIdeaBtn = document.querySelector('.new-idea-btn');
const closeBtn = document.querySelector('.close-button');

// Abre modal
newIdeaBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Fecha modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Adiciona nova ideia
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('new-title').value;
    const description = document.getElementById('new-description').value;
    const details = document.getElementById('new-details').value;
    const creator = document.getElementById('new-creator').value;
    const date = document.getElementById('new-date').value;



    const newButton = document.createElement('button');
    newButton.classList.add('idea-item');
    newButton.id = `idea-${Date.now()}`; // ID único baseado no timestamp
    newButton.dataset.title = title;
    newButton.dataset.description = description;
    newButton.dataset.details = details;
    newButton.dataset.creator = creator;
    newButton.dataset.date = new Date(date).toLocaleDateString('pt-BR');
    newButton.dataset.metrics = JSON.stringify(metrics);
    newButton.innerHTML = `<strong>${title}</strong><p>${description}</p>`;



    document.querySelector('.idea-list').appendChild(newButton);

    // Adiciona o mesmo comportamento de clique
    newButton.addEventListener('click', () => {
        document.querySelectorAll('.idea-item').forEach(i => i.classList.remove('selected-idea'));
        newButton.classList.add('selected-idea');

        document.querySelector('#detail-title').textContent = title;
        document.querySelector('#detail-description').textContent = description;
        document.querySelector('#detail-info').textContent = details;
        document.querySelector('#detail-creator').textContent = creator;
        document.querySelector('#detail-date').textContent = new Date(date).toLocaleDateString('pt-BR');


    });

    // Fecha modal e limpa
    modal.style.display = 'none';
    form.reset();
});

const editButton = document.querySelector('.edit-btn'); // só 1 botão na lateral
const popup = document.getElementById('edit-popup');
const closePopupButton = document.getElementById('close-popup');
const saveEditButton = document.getElementById('save-edit');
const editTitleInput = document.getElementById('edit-title');
const editDescriptionInput = document.getElementById('edit-description');

let currentCardId = null;

// Quando o usuário clica em um card, ele armazena o ID e preenche a lateral
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
        const title = card.querySelector('.card-title').textContent;
        const description = card.querySelector('.card-description').textContent;

        document.getElementById('detail-title').textContent = title;
        document.getElementById('detail-description').textContent = description;

        currentCardId = card.id; // <-- guarda o ID do card selecionado
    });
});




const deleteButton = document.getElementById('delete-idea');
console.log(deleteButton);
const ideasContainer = document.getElementById('ideas-container'); // <- ajuste ao seu container real
const ideaListMessage = document.getElementById('empty-message'); // <- criamos abaixo

deleteButton.addEventListener('click', function () {
    console.log("currentCardId:", currentCardId);
    if (!currentCardId) return; // Verifica se há um card selecionado

    // Remove o card do DOM
    const card = document.getElementById(currentCardId);
    if (card) {
        console.log("Botão excluir clicado");
        card.remove();
    }
    console.log("Botão excluir clicado");
    // Limpa o painel lateral
    document.getElementById('detail-title').textContent = '';
    document.getElementById('detail-description').textContent = 'Clique em uma ideia para ver mais detalhes.';
    document.getElementById('detail-info').textContent = '-';
    document.getElementById('detail-creator').textContent = '-';
    document.getElementById('detail-date').textContent = '-';

    // Fecha o popup
    popup.style.display = 'none';

    // Verifica se não há mais cards
    const remainingCards = ideasContainer.querySelectorAll('.idea-item'); // Corrigido para '.idea-item'
    if (remainingCards.length === 0) {
        ideaListMessage.style.display = 'block';
    }
});





document.addEventListener('DOMContentLoaded', () => {
    const ideaItems = document.querySelectorAll('.idea-item');
    const title = document.querySelector('#detail-title');
    const description = document.querySelector('#detail-description');
    const creator = document.querySelector('#detail-creator');
    const date = document.querySelector('#detail-date');
    const details = document.querySelector('#detail-info');






    document.querySelectorAll('.idea-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;  // Agora pega o ID real da API

            // Requisição para obter os detalhes atualizados desse card da API
            fetch(`/api/braincards/${id}`)
                .then(res => res.json())
                .then(idea => {



                    // Atualiza o conteúdo da lateral com os dados da API
                    document.querySelector('#detail-title').textContent = idea.titulo;
                    document.querySelector('#detail-description').textContent = idea.descricao;
                    document.querySelector('#detail-priority').textContent = idea.prioridade;
                    document.querySelector('#detail-date').textContent = new Date(idea.data).toLocaleDateString('pt-BR');

                    // Guarda o ID da ideia selecionada para futuras edições
                    currentCardId = idea._id;  // Agora é o ID real da API
                    console.log("ID do card selecionado:", currentCardId);  // Verifique no console se está certo
                })
                .catch(err => {
                    console.error('Erro ao buscar dados do card:', err);
                });
        });
    });


    // Carrega o primeiro por padrão
    ideaItems[0].click();
});



function atualizarDetalhes(idea) {
    document.getElementById('detail-title').textContent = idea.titulo;
    document.getElementById('detail-description').textContent = idea.descricao;
    document.getElementById('detail-priority').textContent = idea.prioridade
    document.getElementById('detail-date').textContent = new Date(idea.criadoEm).toLocaleDateString();
    let prioridadeTexto = '';
    switch (idea.prioridade) {
        case 1:
            prioridadeTexto = 'Baixa';
            break;
        case 2:
            prioridadeTexto = 'Média';
            break;
        case 3:
            prioridadeTexto = 'Alta';
            break;
        default:
            prioridadeTexto = 'Indefinida';
    }

    document.getElementById('detail-priority').textContent = prioridadeTexto;
}



const token = localStorage.getItem('token');


document.addEventListener('DOMContentLoaded', () => {

 
    if (!token) {
        // Se não houver token, redireciona para login
        alert('Acesso negado. Faça login primeiro.');
        window.location.href = '/login';
        return;
    }
    fetch('/api/braincards', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }) // seu endpoint GET do backend
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const ideaList = document.getElementById('idea-list');
            const emptyMsg = document.getElementById('empty-message');

            if (data.length === 0) {
                document.querySelector('.idea-details').style.display = 'none';
                emptyMsg.style.display = 'block';
            } else {
                emptyMsg.style.display = 'none';

                data.forEach(idea => {
                    const card = document.createElement('button');
                    card.classList.add('idea-item');
                    card.dataset.id = idea._id;  // Armazena o ID real da API no dataset
                    card.setAttribute('data-title', idea.titulo);
                    card.setAttribute('data-description', idea.descricao);
                    card.setAttribute('data-date', new Date(idea.criadoEm).toLocaleDateString());

                    const descricaoLimitada = idea.descricao.split(' ').slice(0, 4).join(' ') + '...';

                    card.innerHTML = `
            <strong>${idea.titulo}</strong>
            <p>${descricaoLimitada}</p>
          `;

                    card.addEventListener('click', () => {
                        atualizarDetalhes(idea);
                        currentCardId = card.dataset.id; // Agora o ID correto é armazenado
                        console.log("ID do card selecionado:", currentCardId);
                        document.querySelector('.idea-details').style.display = 'block';
                    });

                    ideaList.appendChild(card);
                });

                // Seleciona o primeiro card ao iniciar (opcional)
                if (data.length > 0) {
                    atualizarDetalhes(data[0]);
                }
            }
        })
        .catch(err => {
            console.error('Erro ao buscar ideias:', err);
        });
});

//ADICIONA UM NOVO CARD AO BANCO DE DADOS

document.getElementById('idea-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const novaIdeia = {
        titulo: document.getElementById('new-title').value,
        descricao: document.getElementById('new-description').value
        // Ignorando prioridade, detalhes, criador, métricas por enquanto
    };

    fetch('/api/braincards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(novaIdeia)
    })
        .then(res => {
            if (!res.ok) throw new Error('Erro ao criar ideia');
            return res.json();
        })
        .then(data => {
            console.log('Nova ideia criada:', data);
            document.getElementById('modal').style.display = 'none';


            // Opcional: recarregar os cards
            location.reload(); // Ou você pode chamar uma função para re-renderizar os cards sem recarregar
        })
        .catch(err => {
            console.error('Erro:', err);
            alert('Erro ao adicionar ideia');
        });
});

// Botão "Editar" na lateral
editButton.addEventListener('click', function () {
    console.log("botão clicado");

    // Pega os dados visíveis da lateral
    const title = document.getElementById('detail-title').textContent;
    const description = document.getElementById('detail-description').textContent;




    editTitleInput.value = title;
    editDescriptionInput.value = description;

    popup.style.display = 'block';
});

// Botão "Salvar" no popup
saveEditButton.addEventListener('click', function () {

    if (!currentCardId) {
        alert('Selecione uma ideia para editar!');
        return;
    }

    const updatedTitle = editTitleInput.value;
    const updatedDescription = editDescriptionInput.value;
    const updatedPriority = document.getElementById('edit-priority').value;
    // Envie updatedPriority no corpo da requisição PUT



    // Atualiza os dados no banco de dados (API)
    const updatedIdea = {
        titulo: updatedTitle,
        descricao: updatedDescription,
        prioridade: updatedPriority

    };

    fetch(`/api/braincards/${currentCardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(updatedIdea)
    })
        .then(res => {
            if (!res.ok) throw new Error('Erro ao atualizar');
            return res.json();
        })
        .then(data => {
            console.log('Ideia atualizada no banco de dados:', data);

            // Opcional: você pode recarregar os dados da API após a atualização (ou fazer uma nova requisição para obter os dados atualizados)
            // Isso pode ser feito chamando a função que carrega os dados ou recarregando a página
            location.reload();  // Recarrega a página para buscar os dados atualizados da API

            popup.style.display = 'none';  // Fecha o popup
        })
        .catch(err => {
            console.error('Erro ao atualizar ideia no banco de dados:', err);
            alert('Erro ao atualizar ideia!');
        });
});

document.getElementById('delete-idea').addEventListener('click', function () {
    if (!currentCardId) {
        alert('Clique em um card para selecionar!');
        return;
    }

    // Confirmar a exclusão
    const confirmDelete = confirm('Tem certeza que deseja excluir esta ideia?');
    if (!confirmDelete) return;

    // Fazer a requisição DELETE para o backend
    fetch(`/api/braincards/${currentCardId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

    })
        .then(res => {
            if (!res.ok) throw new Error('Erro ao excluir a ideia');
            console.log('Ideia excluída com sucesso!');
        })

    location.reload();  // Recarrega a página para buscar os dados atualizados da API

    popup.style.display = 'none';
})

// Botão "Fechar"
closePopupButton.addEventListener('click', function () {
    popup.style.display = 'none';
});


// Essa função deve ser chamada quando o usuário clicar no botão de logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token'); // Remove o token
    window.location.href = '/login';  // Redireciona para a tela de login
});

