from django.urls import path
from .views import api_shoes, api_shoe, api_binsVO, api_show_bin

urlpatterns = [
    path("shoes/", api_shoes, name="api_shoes"),
    path("bins/<int:bin_vo_id>/shoes/", api_shoes, name="api_shoes_in_a_bin"),
    path("shoes/<int:pk>/", api_shoe, name="api_shoe"),
    path("binsvo", api_binsVO, name="api_binsvo"),
    path("binsvo/<int:pk>/", api_show_bin, name="api_binvo"),
]
