from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.shortcuts import HttpResponseRedirect, reverse
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'].is_authenticated:
            print(self.scope['user'])
            self.room_name = self.scope['url_route']['kwargs']['room_name']
            self.room_group_name = 'chat_%s' % self.room_name
            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()
        else:
            return HttpResponseRedirect(reverse('accounts:login'))

    async def disconnect(self, close_code):
        # Leave room group
        if self.scope['user'].is_authenticated:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
        else:
            return HttpResponseRedirect(reverse('accounts:login'))

    # Receive message from WebSocket
    async def receive(self, text_data):

        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        message = str(self.scope['user']) + ': ' + message
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
