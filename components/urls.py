from django.urls import path
from . import views
from .views import ComponentListView
from .views import ComponentDetailView

urlpatterns = [
    path('<int:pk>/', ComponentDetailView),
    path('', ComponentListView.as_view()),
]