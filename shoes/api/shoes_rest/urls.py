from django.urls import path
from .views import api_shoes, api_shoe

urlpatterns = [
    path("shoes/", api_shoes, name="api_shoes"),
    path("bins/<int:bin_vo_id>/shoes/", api_shoes, name="api_shoes_in_a_bin"),
    path("shoes/<int:pk>/", api_shoe, name="api_shoe"),
]
