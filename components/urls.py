from django.urls import path
from . import views
from .views import ComponentListView
from .views import ComponentDetailView

urlpatterns = [
    path('<int:pk>/', ComponentDetailView.as_view()),
    path('', ComponentListView.as_view()),
]