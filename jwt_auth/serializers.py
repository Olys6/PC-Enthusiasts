from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True) # never read pw
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        # if data['username'] == "Ed Chamberlain":
        #     raise serializers.ValidationError({'edward_registration_error': 'User not allowed'})

        password = data.pop('password') # pw originally looks like: "123"
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password) # seisdlfjsdkl
        return data

    class Meta:
        model = User
        fields = ('username', 'password', 'password_confirmation',)