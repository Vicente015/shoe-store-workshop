.PHONY: setup
setup:
	docker run --rm -v ${PWD}:/code -w /code composer:2.2.24 install
	cp .env.example .env
	$(MAKE) up
	./vendor/bin/sail artisan migrate -n --seed

.PHONY: test
test:
	./vendor/bin/sail test

.PHONY: up
up:
	./vendor/bin/sail up -d --wait

.PHONY: down
down:
	./vendor/bin/sail down
