from django.urls import path
from . import views
from .views import BuildListView
from .views import BuildDetailView

urlpatterns = [
    path('<int:pk>/', BuildDetailView.as_view()),
    path('', BuildListView.as_view()),
]