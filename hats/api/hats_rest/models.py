from django.db import models
from django.urls import reverse


class LocationV0(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.closet_name} - {self.section_number}/{self.shelf_number}"

    class Meta:
        ordering = ("closet_name", "section_number", "shelf_number")


class Hat(models.Model):
    fabric = models.CharField(max_length=50)
    style_name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    picture_url = models.URLField()
    location = models.ForeignKey(
        LocationV0,
        related_name="hats",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_hat", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.closet_name} - {self.section_number}/{self.shelf_number}"

    class Meta:
        ordering = ("fabric", "style_name", "color", "picture_url", "location")
