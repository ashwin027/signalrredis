#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
# Setup NodeJs
RUN apt-get update && \
apt-get install -y wget && \
apt-get install -y gnupg2 && \
wget -qO- https://deb.nodesource.com/setup_12.x | bash - && \
apt-get install -y build-essential nodejs
# End setup
WORKDIR /src
COPY ["SignalrRedis.csproj", ""]
RUN dotnet restore "./SignalrRedis.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "SignalrRedis.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SignalrRedis.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SignalrRedis.dll"]