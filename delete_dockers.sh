# Stop all running containers
docker stop $(docker ps -q)

# Remove all containers (stopped or exited)
docker rm $(docker ps -a -q)

# Remove all images
docker rmi -f $(docker images -q)

# Remove all volumes
docker volume rm $(docker volume ls -q)

# Remove all custom networks (except 'bridge', 'host', 'none')
# docker network rm $(docker network ls -q | grep -vE 'bridge|host|none')

# Optionally, prune everything (if something still left hanging)
# docker system prune -a --volumes -f
