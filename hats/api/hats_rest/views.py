from django.shortcuts import render


from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Hat, LocationV0


class LocationV0Encoder(ModelEncoder):
    model = LocationV0
    properties = [
        "closet_name",
        "section_number",
        "shelf_number",
        "import_href",
    ]


class HatEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {"location": LocationV0Encoder()}


@require_http_methods(["GET", "POST"])
def api_hats(request):
    """
    Collection RESTful API handler for Hats objects in
    the wardrobe.

    GET:
    Returns a dictionary with a single key "hats" which
    is a list of the closet name, section number, and shelf
    number for the location, along with its href and id.

    {
        "hats": [
            {
                "id": database id for the location,
                "closet_name": location's closet name,
                "section_number": the number of the wardrobe section,
                "shelf_number": the number of the shelf,
                "href": URL to the location,
            },
            ...
        ]
    }

    POST:
    Creates a location resource and returns its details.
    {
        "closet_name": location's closet name,
        "section_number": the number of the wardrobe section,
        "shelf_number": the number of the shelf,
    }
    """
    if request.method == "GET":
        Hats = Hat.objects.all()
        return JsonResponse(
            {"hats": Hats},
            encoder=HatEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationV0.objects.get(import_href=location_href)
            content["location"] = location
        except LocationV0.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id. It does not exist!"},
                status=400,
            )

        hats = Hat.objects.create(**content)
        return JsonResponse(
            hats,
            encoder=HatEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_hat(request, pk):
    """
    Single-object API for the Hat resource.

    GET:
    Returns the information for a Hat resource based
    on the value of pk
    {
        "id": database id for the location,
        "closet_name": location's closet name,
        "section_number": the number of the wardrobe section,
        "shelf_number": the number of the shelf,
        "href": URL to the location,
    }

    PUT:
    Updates the information for a Location resource based
    on the value of the pk
    {
        "closet_name": location's closet name,
        "section_number": the number of the wardrobe section,
        "shelf_number": the number of the shelf,
    }

    DELETE:
    Removes the location resource from the application
    """
    if request.method == "GET":
        try:
            location = Hat.objects.get(id=pk)
            return JsonResponse(location, encoder=HatEncoder, safe=False)
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            location = Hat.objects.get(id=pk)
            location.delete()
            return JsonResponse(
                location,
                encoder=HatEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:  # PUT
        try:
            content = json.loads(request.body)
            location = Hat.objects.get(id=pk)

            props = ["closet_name", "shelf_number", "section_number"]
            for prop in props:
                if prop in content:
                    setattr(hats, prop, content[prop])
            hat.save()
            return JsonResponse(
                hat,
                encoder=HatEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
