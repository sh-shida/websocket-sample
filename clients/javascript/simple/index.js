var ws;

window.onload = function() {
  function setStatus (status) {
    document.getElementById('status').innerHTML = '<b>' + status + '</b>';
  }

  function addMessage (message) {
    var div = document.createElement('div')
    div.innerHTML = '<p>' + message + '</p>'
    document.getElementById('messages').appendChild(div);
  }

  function sendMessage () {
    var element = document.getElementById('message');
    var content = element.value;
    var type = 'message';

    ws.send(JSON.stringify({ content, type }));
    element.value = '';
  }

  function connect() {
    var port = 10000
    ws = new WebSocket('ws://localhost:' + port + '/');
    ws.onmessage = function (e) { addMessage(e.data); }
    ws.onopen = function (e) { setStatus('Connected'); }
    ws.onerror = function (e) { setStatus('Error'); }
    ws.onclose = function (e) { setStatus('Closed'); }
    console.log('connect...')
  }
  connect();

  document.getElementById('connect_button').onclick = connect;
  document.getElementById('submit_button').onclick = sendMessage;
}