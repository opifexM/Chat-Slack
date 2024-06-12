install:
	npm ci && make -C frontend install
build:
	npm run build
start:
	npx start-server -s ./frontend/build
start-backend:
	npm run start
start-frontend:
	cd frontend && npm start