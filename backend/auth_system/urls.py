from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
]

urlpatterns += [
    path(
        "manifest.json",
        TemplateView.as_view(
            template_name="manifest.json", content_type="application/json"
        ),
    ),
    re_path(r"^.*", TemplateView.as_view(template_name="index.html")),
]
