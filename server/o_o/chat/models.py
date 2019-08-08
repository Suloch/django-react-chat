from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatRoom(models.Model):
    name = models.CharField(max_length=60)
    nMembers = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return self.name

    @property
    def members(self):
        memberships = Membership.objects.filter(room=self)
        users = [membership.user for membership in memberships]
        return users

class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.user + ' -> ' + self.room

class Message(models.Model):
    message = models.TextField(null=True)
    sender = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    chatRoom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, null=True)

    def __str__(self):
            return message[:10]
