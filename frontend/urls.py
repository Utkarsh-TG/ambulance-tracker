from django.urls import path
from . import views as frontendViews

urlpatterns = [
    path('', frontendViews.index, name='index_view'),
]
