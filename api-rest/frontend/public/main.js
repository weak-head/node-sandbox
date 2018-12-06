const getButton  = document.getElementById('get');
const postButton = document.getElementById('post');

getButton.addEventListener('click', () => {
    fetch('http://localhost:8080/messages')
        .then(res => res.json())
        .then(resData => {
            console.log(resData);
        })
        .catch(err => console.log(err));
});

postButton.addEventListener('click', () => {
    fetch('http://localhost:8080/messages/create', {
        method: 'POST',
        body: JSON.stringify({
            title: 'message title',
            body: 'message body'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });
});