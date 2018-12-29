import json
from geventwebsocket import WebSocketServer, WebSocketApplication, Resource

port = 10000
host = 'localhost'


class WebSocketApp(WebSocketApplication):
    def on_open(self):
        print('Some client connected')

    def on_message(self, message):
        if message is None:
            return
        message = json.loads(message)
        print('on_message: %s' % message)
        self.broadcast(message)

    def broadcast(self, message):
        for client in self.ws.handler.server.clients.values():
            client.ws.send(json.dumps(message))

    def on_close(self, reason):
        print('Connection closed')


print('running http://%s:%s' % (host, port))
server = WebSocketServer((host, port), Resource([('^/', WebSocketApp)]))
server.serve_forever()
