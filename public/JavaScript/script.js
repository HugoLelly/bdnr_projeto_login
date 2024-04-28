document.addEventListener('DOMContentLoaded', async function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageContainer = document.getElementById('message');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const formDataJson = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/profile.html';
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            messageContainer.innerText = 'Error: ' + error.message;
        }
    });

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const formDataJson = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            });

            const data = await response.json();

            if (response.ok) {
                messageContainer.innerText = data.name + ', ' + data.message;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            messageContainer.innerText = 'Error: ' + error.message;
        }
    });

    if (window.location.pathname === '/profile.html') {
        const userInfoContainer = document.getElementById('user-info');
        const editProfileBtn = document.getElementById('edit-profile-btn');
        const deleteProfileBtn = document.getElementById('delete-profile-btn');

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch('/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                const { name } = data.user;
                document.getElementById('user-name').innerText = name;
                editProfileBtn.addEventListener('click', function () {
                    window.location.href = '/edit-profile.html';
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            messageContainer.innerText = 'Error: ' + error.message;
        }
    }
});
