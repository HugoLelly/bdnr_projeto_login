// O código é executado quando o documento HTML é completamente carregado.
document.addEventListener('DOMContentLoaded', async function () {
    // Seleciona os formulários de login e registro e o contêiner de mensagens.
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageContainer = document.getElementById('message');

    // Adiciona um ouvinte de evento ao formulário de login que é acionado quando o formulário é enviado.
    loginForm.addEventListener('submit', async function (event) {
        // Previne a ação padrão do formulário (recarregar a página).
        event.preventDefault();
        // Cria um objeto FormData a partir do formulário de login.
        const formData = new FormData(loginForm);
        // Cria um objeto JSON a partir dos dados do formulário.
        const formDataJson = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            // Faz uma solicitação POST para a rota '/users/login' com os dados do formulário.
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            });

            // Converte a resposta em JSON.
            const data = await response.json();

            // Se a resposta for bem-sucedida, armazena o token no armazenamento local e redireciona para '/profile.html'.
            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/profile.html';
            } else {
                // Se a resposta falhar, lança um erro com a mensagem da resposta.
                throw new Error(data.message);
            }
        } catch (error) {
            // Se ocorrer um erro, imprime o erro no console e exibe a mensagem de erro no contêiner de mensagens.
            console.error('Error:', error);
            messageContainer.innerText = 'Error: ' + error.message;
        }
    });

    // Adiciona um ouvinte de evento ao formulário de registro que é acionado quando o formulário é enviado.
    registerForm.addEventListener('submit', async function (event) {
        // Previne a ação padrão do formulário (recarregar a página).
        event.preventDefault();
        // Cria um objeto FormData a partir do formulário de registro.
        const formData = new FormData(registerForm);
        // Cria um objeto JSON a partir dos dados do formulário.
        const formDataJson = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            // Faz uma solicitação POST para a rota '/users' com os dados do formulário.
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            });

            // Converte a resposta em JSON.
            const data = await response.json();

            // Se a resposta for bem-sucedida, exibe a mensagem da resposta no contêiner de mensagens.
            if (response.ok) {
                messageContainer.innerText = data.name + ', ' + data.message;
            } else {
                // Se a resposta falhar, lança um erro com a mensagem da resposta.
                throw new Error(data.message);
            }
        } catch (error) {
            // Se ocorrer um erro, imprime o erro no console e exibe a mensagem de erro no contêiner de mensagens.
            console.error('Error:', error);
            messageContainer.innerText = 'Error: ' + error.message;
        }
    });

    // Se o caminho da URL for '/profile.html', executa o código a seguir.
    if (window.location.pathname === '/profile.html') {
        // Seleciona os botões de editar e excluir perfil.
        const editProfileBtn = document.getElementById('edit-profile-btn');

        try {
            // Obtém o token do armazenamento local.
            const token = localStorage.getItem('token');

            // Se o token não existir, lança um erro.
            if (!token) {
                throw new Error('Token not found');
            }

            // Faz uma solicitação GET para a rota '/users/me' com o token de autorização.
            const response = await fetch('/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Converte a resposta em JSON.
            const data = await response.json();

            // Se a resposta for bem-sucedida, exibe o nome do usuário e adiciona um ouvinte de evento ao botão de editar perfil.
            if (response.ok) {
                const { name } = data.user;
                document.getElementById('user-name').innerText = name;
                editProfileBtn.addEventListener('click', function () {
                    window.location.href = '/edit-profile.html';
                });
            } else {
                // Se a resposta falhar, lança um erro com a mensagem da resposta.
                throw new Error(data.message);
            }
        } catch (error) {
            // Se ocorrer um erro, imprime o erro no console e exibe a mensagem de erro no contêiner de mensagens.
            console.error('Error:', error);
            messageContainer.innerText = 'Error: ' + error.message;
        }
    }
});

// Este código JavaScript é responsável por lidar com os eventos de envio dos formulários de login e registro, fazer as solicitações HTTP apropriadas, lidar com as respostas e atualizar a interface do usuário de acordo. Além disso, se o usuário estiver na página de perfil, o código obtém as informações do usuário e atualiza a interface do usuário.
// Foi utilizado o copilot para gerar os comentarios explicando o codigo.