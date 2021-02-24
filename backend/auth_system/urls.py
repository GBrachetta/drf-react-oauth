from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path(
        "manifest.json",
        TemplateView.as_view(
            template_name="manifest.json", content_type="application/json"
        ),
    ),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("auth/", include("djoser.social.urls")),
]

urlpatterns += [
    re_path(r"^.*", TemplateView.as_view(template_name="index.html")),
]
