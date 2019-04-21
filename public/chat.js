// make connection
// eslint-disable-next-line no-undef
const socket = io.connect('http://localhost:4000');

// -- grab handles
const output = document.querySelector('#output');
const handle = document.querySelector('#handle');
const message = document.querySelector('#message');
const sendBtn = document.querySelector('#send');
const feedback = document.querySelector('#feedback');

// -- emit events
sendBtn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

// -- listen for events from the server
socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message ...</em></p>`;
});
