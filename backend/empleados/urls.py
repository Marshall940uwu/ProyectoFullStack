from rest_framework import routers
from .views import EmpleadoViewSet

router = routers.DefaultRouter()

router.register(r'empleados', EmpleadoViewSet)

urlpatterns = router.urls