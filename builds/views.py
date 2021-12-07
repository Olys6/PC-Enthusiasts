from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Build
from .serializers import BuildSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers import populatedBuildSerializer

class BuildDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def delete(self, request, pk):
        try:
            build = Build.objects.get(id=pk)
            build.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        build = Build.objects.get(id=pk)
        updated_build = BuildSerializer(build, data=request.data)
        if updated_build.is_valid():
            updated_build.save()
            return Response(updated_build.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_build.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    def get(self, request, pk):
        print("****Working0000****")
        build = Build.objects.get(id=pk)
        print("****Working****")
        serialized_build = populatedBuildSerializer(build)
        print("****Working2222****")
        return Response(serialized_build.data, status=status.HTTP_200_OK)

class BuildListView(APIView):

    def post(self, request):
        build = BuildSerializer(data = request.data)
        if build.is_valid():
            build.save()
            return Response(build.data, status=status.HTTP_201_CREATED)
        else:
            return Response(build.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    
    def get(self, _request):
        builds = Build.objects.all()
        serialized_builds = populatedBuildSerializer(builds, many=True)
        return Response(serialized_builds.data, status=status.HTTP_200_OK)