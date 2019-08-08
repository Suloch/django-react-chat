from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.views import APIView
from rest_framework.generics import GenericAPIView, ListAPIView, DestroyAPIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from accounts import serializers

User = get_user_model()
class Login(APIView):
    serializer_class = serializers.LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(
             data=request.data,
             context={'request': request}
        )

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as E:
            msg = [elem[0] for elem in E.detail.values()]
            return Response({
                'ack': '0',
                'msg': msg[0],
            })
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'ack': '1',
            'msg': 'Login Successful',
            'token': token.key,
            'user_id': user.id,
        })
class CheckLoginStatus(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'ack': '1',
                'msg': 'Logged In'
            })
        else:
            return Response({
                'ack': '0',
                'msg': 'Not Logged In',
            })

class Logout(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response({
                'ack': '1',
                'msg': 'Loggged out'
                })
        else:
            return Response({
                'ack': '1',
                'msg': 'Already logged out'
            })

class Signup(APIView):
    serializer_class = serializers.SignupSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as E:
            msg = [elem[0] for elem in E.detail.values()]
            return Response({
                'ack': '0',
                'msg': msg[0],
            })
        user = serializer.create(serializer.validated_data)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'ack': '1',
            'msg': 'Account created',
            'token': token.key,
            'user_id' : user.id,
        })

class UserList(ListAPIView):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class DeleteUser(DestroyAPIView):
    queryset = User.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
