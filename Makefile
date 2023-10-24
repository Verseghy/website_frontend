build-push:
	podman build . -t docker.io/verseghy/website_frontend
	podman push docker.io/verseghy/website_frontend

rollout:
	kubectl rollout restart deployment frontend-ssr