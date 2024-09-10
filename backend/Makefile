.PHONY: setup
setup:
	composer install
	cp .env.example .env
	$(MAKE) up
	./vendor/bin/sail artisan migrate -n

.PHONY: test
test:
	./vendor/bin/sail test

.PHONY: up
up:
	./vendor/bin/sail up -d --wait

.PHONY: down
down:
	./vendor/bin/sail down
