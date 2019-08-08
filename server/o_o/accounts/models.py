from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
def displayPicturePath(username):
    return 'images/' + str(username) + '/defaultImages'

class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True)
    verified = models.BooleanField(default=False)
    displayPicture = models.ImageField(upload_to=displayPicturePath(username), default='defaultImage/default.jpg')

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username
