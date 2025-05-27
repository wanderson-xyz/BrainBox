// Referência ao botão e modal
const modal = document.getElementById('modal');
const form = document.getElementById('idea-form');
const newIdeaBtn = document.querySelector('.new-idea-btn');
const closeBtn = document.querySelector('.close-button');
const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
document.getElementById('edit-termino').setAttribute('min', today);



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
const editPriorityInput = document.getElementById('create-priority'); // Adiciona o campo de prioridade
const editTerminoInput = document.getElementById('edit-termino');


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

function carregarIdeias() {
    fetch('/api/braincards', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);


            const tbody = document.querySelector('#idea-list tbody');
            const emptyMsg = document.getElementById('empty-message');
            const ideaDetails = document.querySelector('.idea-details');

            tbody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

            if (data.length === 0) {
                ideaDetails.style.display = 'none';
                emptyMsg.style.display = 'block';
                return;
            } else {
                emptyMsg.style.display = 'none';
                ideaDetails.style.display = 'block';
            }

            data.forEach(idea => {
                console.log("Ideia carregada:", idea);
                const tr = document.createElement('tr');



                // Checkbox
                const tdCheckbox = document.createElement('td');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';

                // Adiciona o valor de concluída do banco no checkbox
                checkbox.checked = idea.concluida;

                // Aplica o riscado se estiver concluída
                if (idea.concluida) {
                    tr.classList.add('linha-tachada'); // aplica a linha completa
                }

                // Adiciona o event listener aqui:
                checkbox.addEventListener('change', function () {
                    const isChecked = this.checked;
                    const tr = this.closest('tr');

                    if (isChecked) {
                        tr.classList.add('linha-tachada'); // aplica a linha completa
                    } else {
                        tr.classList.remove('linha-tachada');
                    }
                    atualizarIdeia(idea._id, { concluida: isChecked })
                        .then(data => {
                            console.log('Concluída atualizada:', data);
                        })
                        .catch(err => {
                            console.error('Erro ao atualizar conclusão:', err);
                        });
                });

                tdCheckbox.appendChild(checkbox);
                tr.appendChild(tdCheckbox);

                // Nome da Tarefa
                const tdTitulo = document.createElement('td');
                tdTitulo.textContent = idea.titulo;
                tr.appendChild(tdTitulo);

                // Início (dataInicio formatada)
                const tdInicio = document.createElement('td');
                tdInicio.textContent = new Date(idea.criadoEm).toLocaleDateString();
                tr.appendChild(tdInicio);

                // Término (dataTermino formatada)
                const tdTermino = document.createElement('td');
                tdTermino.textContent = new Date(idea.termino).toLocaleDateString();
                tr.appendChild(tdTermino);

                // Descrição (coluna com select)
                const descricaoLimitada = idea.descricao
                    ? (idea.descricao.length > 10 ? idea.descricao.slice(0, 10) + '...' : idea.descricao)
                    : 'Sem detalhes';
                const tdDescricao = document.createElement('td');
                tdDescricao.textContent = descricaoLimitada;
                tr.appendChild(tdDescricao);

                // Status (span com classe conforme prioridade)
                const tdStatus = document.createElement('td');
                const spanStatus = document.createElement('span');

                // Exemplo de lógica para definir classe conforme prioridade
                if (idea.prioridade === 3) {
                    spanStatus.className = 'status-urgent';
                    spanStatus.textContent = 'Urgente';
                } else if (idea.prioridade === 2) {
                    spanStatus.className = 'status-important';
                    spanStatus.textContent = 'Importante';
                } else {
                    spanStatus.className = 'status-optional';
                    spanStatus.textContent = 'Opcional';
                }

                tdStatus.appendChild(spanStatus);
                tr.appendChild(tdStatus);

                // Armazenar o ID no dataset para eventuais ações
                tr.dataset.id = idea._id;

                // Adiciona evento para atualizar detalhes ao clicar na linha
                tr.addEventListener('click', () => {
                    atualizarDetalhes(idea);
                    currentCardId = idea._id;
                    console.log("ID do card selecionado:", currentCardId);
                    window.currentIdea = idea; // Guarda o objeto da ideia para ser usado depois no botão de editar

                    ideaDetails.style.display = 'block';
                });

                tbody.appendChild(tr);
            });

            // Opcional: seleciona o primeiro item automaticamente
            if (data.length > 0) {
                atualizarDetalhes(data[0]);
            }
        })
        .catch(err => {
            console.error('Erro ao buscar ideias:', err);
        });
};



const ideaListSection = document.getElementById('idea-list');
document.addEventListener('DOMContentLoaded', () => {
    inicializarBusca();
    buscarCardsNoBackend();
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Acesso negado. Faça login primeiro.');
        window.location.href = '/login';
        return;
    }
    carregarIdeias(); // Carrega as ideias ao iniciar a página
})

// Inicializa a busca e carrega os cards do backend


//ADICIONA UM NOVO CARD AO BANCO DE DADOS

document.getElementById('idea-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const terminoInput = document.getElementById('new-termino').value;
    const novaIdeia = {
        titulo: document.getElementById('new-title').value,
        descricao: document.getElementById('new-description').value,
        termino: new Date(terminoInput).toISOString(), // Converte a data para o formato ISO
        prioridade: parseInt(document.getElementById('edit-priority').value) // Converte para número
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
            carregarIdeias();// Ou você pode chamar uma função para re-renderizar os cards sem recarregar
        })
        .catch(err => {
            console.error('Erro:', err);
            alert('Erro ao adicionar ideia');
        });
});

// Botão "Editar" na lateral
editButton.addEventListener('click', function () {
    console.log("Botão de editar clicado");

    const idea = window.currentIdea;
    if (!idea) {
        alert("Nenhuma ideia selecionada.");
        return;
    }

    // Preenche os campos com os dados atuais
    editTitleInput.value = idea.titulo;
    editDescriptionInput.value = idea.descricao;

    // Prioridade numérica (1, 2, 3)
    editPriorityInput.value = idea.prioridade;

    // Formata a data no formato "yyyy-mm-dd" para input type="date"
    const dataFormatada = new Date(idea.termino).toISOString().split('T')[0];
    editTerminoInput.value = dataFormatada;

    popup.style.display = 'block';
});


// Função para atualizar uma ideia no banco de dados
function atualizarIdeia(id, dadosAtualizados) {
    return fetch(`/api/braincards/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(dadosAtualizados)
    })
        .then(res => {
            if (!res.ok) throw new Error('Erro ao atualizar ideia');
            return res.json();
        });
}





// Botão "Salvar" no popup
saveEditButton.addEventListener('click', function () {

    if (!currentCardId) {
        alert('Selecione uma ideia para editar!');
        return;
    }

    const updatedTitle = editTitleInput.value;
    const updatedDescription = editDescriptionInput.value;
    const updatedPriority = parseInt(document.getElementById('create-priority').value)
    const updateTermino = document.getElementById('edit-termino').value;

    // Envie updatedPriority no corpo da requisição PUT



    // Atualiza os dados no banco de dados (API)
    const updatedIdea = {
        titulo: updatedTitle,
        descricao: updatedDescription,
        prioridade: updatedPriority,
        termino: new Date(updateTermino).toISOString(),

    };
    atualizarIdeia(currentCardId, updatedIdea)


        .then(data => {
            console.log('Ideia atualizada no banco de dados:', data);

            // Opcional: você pode recarregar os dados da API após a atualização (ou fazer uma nova requisição para obter os dados atualizados)
            // Isso pode ser feito chamando a função que carrega os dados ou recarregando a página
            carregarIdeias();  // Recarrega a página para buscar os dados atualizados da API

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
            carregarIdeias();  // Recarrega a página para buscar os dados atualizados da API
        })

    

    popup.style.display = 'none';
})

// Botão "Fechar"
closePopupButton.addEventListener('click', function () {
    popup.style.display = 'none';
});


async function buscarCardsNoBackend(termoDeBusca) {
    const apiBaseUrl = '/api/braincards';

    try {
        let url;
        const termoLimpo = termoDeBusca ? termoDeBusca.trim() : "";

        if (termoLimpo) {
            const termoCodificado = encodeURIComponent(termoLimpo);
            url = `${apiBaseUrl}/search?titulo=${termoCodificado}`;
        } else {
            url = apiBaseUrl;
        }

        console.log(`Frontend: Buscando em: ${url}`);

        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `Erro HTTP ${response.status}` }));
            throw new Error(errorData.message || `Erro ao buscar dados: ${response.status}`);
        }

        const cards = await response.json();
        renderizarCards(cards);

    } catch (error) {
        console.error('Falha ao buscar cards:', error);
        if (ideaListSection) {
            ideaListSection.innerHTML = `<p class="error-message" style="color: red; text-align: center;">Erro ao carregar cards: ${error.message}.</p>`;
        }
    }
}


function inicializarBusca() {
    const barraPesquisaInput = document.getElementById('task-search');
    let debounceTimer;

    if (barraPesquisaInput) {
        barraPesquisaInput.addEventListener('input', (event) => {
            const termoDigitado = event.target.value;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                buscarCardsNoBackend(termoDigitado);
            }, 300);
        });
    }
}

function renderizarCards(cards) {
  const tbody = document.getElementById('idea-table-body');
  const emptyMessage = document.getElementById('empty-message');

  if (!tbody) return;

  if (cards.length === 0) {
    tbody.innerHTML = '';
    emptyMessage.style.display = 'block';
    emptyMessage.innerText = 'Nenhum registro encontrado.';
    return;
  }

  emptyMessage.style.display = 'none';

  tbody.innerHTML = '';

  cards.forEach(card => {
    const inicio = new Date(card.criadoEm).toLocaleDateString('pt-BR');
    const termino = card.termino ? new Date(card.termino).toLocaleDateString('pt-BR') : '';

    const prioridadeClass = card.prioridade === 3 ? 'status-important'
                       : card.prioridade === 2 ? 'status-urgent'
                       : 'status-optional';

    const rowHTML = `
      <tr>
        <td><input type="checkbox" data-id="${card._id}" ${card.concluida ? 'checked' : ''}></td>
        <td>${card.titulo}</td>
        <td>${inicio}</td>
        <td>${termino}</td>
        <td>${card.descricao}</td>
        <td><span class="${prioridadeClass}">${prioridadeClass.replace('status-', '').toUpperCase()}</span></td>
      </tr>
    `;

    tbody.insertAdjacentHTML('beforeend', rowHTML);
  });

  // Aqui pode adicionar event listeners para checkboxes, etc, se tiver
}




// Essa função deve ser chamada quando o usuário clicar no botão de logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token'); // Remove o token
    window.location.href = '/login';  // Redireciona para a tela de login
});

