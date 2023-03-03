import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

# Import models from hats_rest, here.
# from hats_rest.models import Something
from hats_rest.models import LocationV0

def get_Locations():
    response = requests.get("http://wardrobe-api:8000/api/locations/")
    content = json.loads(response.content)
    print(content)
    print(response)
    for location in content ["locations"]:
        LocationV0.objects.update_or_create(
            import_href=location("href"),
            defaults = {
            "closer_name": location["closet_name"],
            "section_number": location["section_number"],
            "shelf_number": location["shelf_number"],

            }
        )

def poll():
    while True:
        print('Hats poller polling for data')
        try:
            # Write your polling logic, here
            get_locations()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
