# Makefile for Docker Compose
project_name = ft_transcendence
compose = docker compose --env-file ./.env -f compose.yaml

all:
	@$(compose) up --build -d

build:
	@$(compose) build

up:
	@$(compose) up -d 

up-logs:
	@$(compose) up

logs:
	@$(compose) logs -f

stop:
	@$(compose) stop
	@$(compose) down

clean: stop
	@docker image ls --filter=reference='$(project_name)-*' -q | grep . | xargs docker rmi -f

fclean:
	@$(compose) stop
	@$(compose) down -v --remove-orphans --rmi local
	@docker volume prune -f
	@docker network prune -f

re: clean
	@$(MAKE) all

dev_compose = docker compose \
	--env-file development/.env \
	-f development/docker compose.yml

dev:
	@$(dev_compose) up --build

dev-stop:
	@$(dev_compose) down

dev-clean:
	@$(dev_compose) down
	@docker image ls --filter=reference='$(project_name)-*' -q | grep . | xargs docker rmi -f

dev-fclean:
	@$(dev_compose) down -v --remove-orphans --rmi local
	@docker volume prune -f
	@docker network prune -f

dev-re: dev-clean
	@$(MAKE) dev

nuke:
	@if [ -n "$$(docker ps -q)" ]; then docker stop $$(docker ps -q); fi
	@if [ -n "$$(docker ps -aq)" ]; then docker rm $$(docker ps -aq); fi
	@if [ -n "$$(docker images -q)" ]; then docker rmi -f $$(docker images -q); fi
	@if [ -n "$$(docker volume ls -q)" ]; then docker volume rm $$(docker volume ls -q); fi
	@docker system prune --all --force --volumes

submodule-update:
	./submodule-update.sh

.PHONY: all build up up-logs logs clean fclean re dev dev-stop dev-clean dev_fclean dev-re submodule-update nuke 
