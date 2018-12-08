const emailInput    = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupButton  = document.getElementById('button_signup');
const loginButton   = document.getElementById('button_login');

const titleInput    = document.getElementById('title_2');
const contentInput  = document.getElementById('content_2');
const imagePicker   = document.getElementById('image_2');
const createButton  = document.getElementById('button_2');

const statusOutput  = document.getElementById('status');

// Signup
signupButton.addEventListener('click', () => {
    const email = emailInput.value;
    const pwd   = passwordInput.value;

    const body = JSON.stringify({
        email: email,
        password: pwd
    });

    const url = 'http://localhost:8080/api/auth/signup';

    fetch(url, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            alert(`\n${res.status} - ${res.statusText}`);
            console.log(res);
            return res;
        })
        .then(res => res.json())
        .then(res => {
            statusOutput.innerHTML = JSON.stringify(res);
        })
        .catch(err => {
            alert(`error!\n${res.status} - ${res.statusText}`);
            console.log(res);
        })
});

// Post message
createButton.addEventListener('click', () => {
    const title   = titleInput.value;
    const content = contentInput.value;
    const image   = imagePicker.files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    const url = 'http://localhost:8080/api/comments/create';

    fetch(url, { method: 'POST', body: formData })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('error!');
                console.log(res);
            } else {
                console.log('ok');
            }
        })
        .catch(err => {
            console.log(err);
        })
});