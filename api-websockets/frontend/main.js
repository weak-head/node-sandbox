const messages     = document.getElementById('messages');
const messageInput = document.getElementById('message');
const sendButton   = document.getElementById('send');


var socket = io('http://localhost:8080');

socket.on('connect', () => {

});

socket.on('disconnect', () => {

});

socket.on('messages', data => {
    const msg     = document.createElement("pre");
    msg.innerHTML = syntaxHighlight(data);

    messages.append(msg);
});

sendButton.addEventListener('click', () => {
    const title = 'title';
    const body  = messageInput.value;

    // send the message to server
    socket.emit('messages', {
        action: 'create',
        message: {
            title: title,
            body: body
        }
    });
});

// --------------------
// -- misc

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