from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status

class AuthenticationTests(APITestCase):

    def test_register_user(self):
        """Test user registration"""
        data = {
            "username": "testuser",
            "password": "testpassword",
            "email": "test@example.com"
        }
        response = self.client.post("/auth/register/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("token", response.data)

    def test_register_with_existing_username(self):
        """Test registration with existing username"""
        User.objects.create_user(username="testuser", password="testpassword")
        data = {
            "username": "testuser",
            "password": "newpassword",
            "email": "new@example.com"
        }
        response = self.client.post("/auth/register/", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_login_user(self):
        """Test successful user login"""
        User.objects.create_user(username="testuser", password="testpassword")
        data = {
            "username": "testuser",
            "password": "testpassword"
        }
        response = self.client.post("/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)

    def test_login_invalid_credentials(self):
        """Test login with wrong credentials"""
        User.objects.create_user(username="testuser", password="testpassword")
        data = {
            "username": "testuser",
            "password": "wrongpassword"
        }
        response = self.client.post("/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("error", response.data)
