from django.shortcuts import get_object_or_404
from .models import OurTeam
from .serializers import OurTeamSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from django.db.models import Q
from common.CustomPagination import CustomPagination
from common.utility import get_custom_paginated_data, get_Team_data_From_request_Object

# Create your views here.
 
class CreateOurTeam(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = OurTeam.objects.all()
    serializer_class = OurTeamSerializer
    pagination_class = CustomPagination

    """
    List all our team , or create a new our team.
    """

    def get(self, request, format=None):
        snippets = OurTeam.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = OurTeamSerializer(snippets, many=True)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        user = request.user
        requestObj = get_Team_data_From_request_Object(request)
        requestObj['created_by'] = user.userName
        serializer = OurTeamSerializer(data=requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"team": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateAndDeleteOurteamDetail(APIView):
    """
    Retrieve, update or delete a App News instance.
    """
    def get_object(self, pk):
        try:
            return OurTeam.objects.get(pk=pk)
        except OurTeam.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = OurTeamSerializer(snippet)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        user = request.user
        requestObj = get_Team_data_From_request_Object(request)
        requestObj['updated_by'] = user.userName
        serializer = OurTeamSerializer(snippet, requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"team": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class OurteamClientView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = OurTeam.objects.all()
    serializer_class = OurTeamSerializer
    pagination_class = CustomPagination

    """
    List all App news, or create a new App News.
    """

    def get(self, request, format=None):
        snippets = OurTeam.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = OurTeamSerializer(snippets, many=True)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)
    
class OurteamSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = OurTeamSerializer
    pagination_class = CustomPagination
  
    def get_object(self, query):
        try:
            return OurTeam.objects.filter(
                Q(team_member_name__icontains=query) | Q(team_member_email__icontains=query) | Q(team_member_phone_number__icontains=query) | Q(team_member_designation__icontains=query) 
            )
        except OurTeam.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results

        serializer = OurTeamSerializer(snippet, many=True)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)
    
class UpdateTeamIndex(APIView):
    """
    Retrieve, update or delete a Carousel instance.
    """

    def get_object(self, obj_id):
        try:
            return OurTeam.objects.get(id=obj_id)
        except (OurTeam.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user.userName
            obj.team_member_position = item["team_member_position"]
            obj.save()
            instances.append(obj)

        serializer = OurTeamSerializer(instances,  many=True)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)