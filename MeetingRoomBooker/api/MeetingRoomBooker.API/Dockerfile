FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build  
WORKDIR /src  

COPY ["MeetingRoomBooker.API/MeetingRoomBooker.API.csproj", "MeetingRoomBooker.API/"]  
COPY ["MeetingRoomBooker.Application/MeetingRoomBooker.Application.csproj", "MeetingRoomBooker.Application/"]  
COPY ["MeetingRoomBooker.Domain/MeetingRoomBooker.Domain.csproj", "MeetingRoomBooker.Domain/"]  
COPY ["MeetingRoomBooker.Infrastructure/MeetingRoomBooker.Infrastructure.csproj", "MeetingRoomBooker.Infrastructure/"]  
RUN dotnet restore "MeetingRoomBooker.API/MeetingRoomBooker.API.csproj"  

COPY . .  
WORKDIR "/src/MeetingRoomBooker.API"  
RUN dotnet build "MeetingRoomBooker.API.csproj" -c Release -o /app/build  

FROM build AS publish  
RUN dotnet publish "MeetingRoomBooker.API.csproj" -c Release -o /app/publish  

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final  
WORKDIR /app  
COPY --from=publish /app/publish .  
ENTRYPOINT ["dotnet", "MeetingRoomBooker.API.dll"]