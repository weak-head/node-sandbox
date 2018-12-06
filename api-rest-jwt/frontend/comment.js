const titleInput   = document.getElementById('title_2');
const contentInput = document.getElementById('content_2');
const imagePicker  = document.getElementById('image_2');
const createButton = document.getElementById('button_2');

createButton.addEventListener('click', () => {
    title   = titleInput.value;
    content = contentInput.value;
    image   = imagePicker.files[0];

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