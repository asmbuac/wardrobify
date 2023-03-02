from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import BinVO, Shoe


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        "import_href",
    ]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
    ]

    def get_extra_data(self, o):
        return {"bin": o.bin}


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id != None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
    return JsonResponse(
        {"shoes": shoes},
        encoder=ShoeListEncoder,
    )
