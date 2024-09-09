.PHONY: setup
setup:
	composer install
	cp .env.example .env
	make up
	sleep 10
	./vendor/bin/sail artisan migrate -n

.PHONY: test
test:
	./vendor/bin/sail test

.PHONY: up
up:
	./vendor/bin/sail up -d

.PHONY: down
down:
	./vendor/bin/sail down
