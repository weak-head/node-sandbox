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

    handleFetch(() => fetch(url,
        {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }));
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

    handleFetch(() => fetch(url,
        {
            method: 'POST',
            body: formData
        }));
});

function handleFetch(fetchPromise) {
    return fetchPromise()
        .then(res => {
            alert(`\n${res.status} - ${res.statusText}`);
            console.log(res);
            return res;
        })
        .then(res => res.json())
        .then(res => {
            statusOutput.innerHTML = syntaxHighlight(res);
            return res;
        })
        .catch(err => {
            alert(`error!\n${res.status} - ${res.statusText}`);
            console.log(res);
        });
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }

    json = json.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');

    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}