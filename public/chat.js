// make connection
const socket = io.connect('http://localhost:4000');

// -- grab handles
const output = document.querySelector('#output');
const handle = document.querySelector('#handle');
const message = document.querySelector('#message');
const sendBtn = document.querySelector('#send');

// -- emit events

sendBtn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
  handle.value = '';
});

// -- listen for events from the server
socket.on('chat', (data) => {
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});
