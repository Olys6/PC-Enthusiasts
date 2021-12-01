from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Component
from .serializers import ComponentSerializer

class ComponentDetailView(APIView):
    def delete(self, request, pk):
        try:
            component = Component.objects.get(id=pk)
            component.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        component = Component.objects.get(id=pk)
        updated_component = ComponentSerializer(component, data=request.data)
        if updated_component.is_valid():
            updated_component.save()
            return Response(updated_component.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_component.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    def get(self, request, pk):
        component = Component.objects.get(id=pk)
        serialized_Component = ComponentSerializer(component)
        return Response(serialized_Component.data, status=status.HTTP_200_OK)

class ComponentListView(APIView):

    def post(self, request):
        component = ComponentSerializer(data = request.data)
        if component.is_valid():
            component.save()
            return Response(component.data, status=status.HTTP_201_CREATED)
        else:
            return Response(component.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    
    def get(self, _request):
        components = Component.objects.all()
        serialized_components = ComponentSerializer(components, many=True)
        return Response(serialized_components.data, status=status.HTTP_200_OK)