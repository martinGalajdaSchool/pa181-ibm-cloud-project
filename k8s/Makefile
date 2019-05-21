namespace_name=ssme-app
cluster_name=ssme-app

ls_namespaces:
	kubectl get namespaces

ls_secrets:
	kubectl get secrets --namespace=$(namespace_name)

deploy_api:
	kubectl apply -f ./api --namespace=$(namespace_name)

delete_api:
	kubectl delete -f ./api --namespace=$(namespace_name)

describe_api_service:
	kubectl describe service ssme-app-api-service --namespace=$(namespace_name)

describe_api_deployment:
	kubectl describe deployment ssme-app-api-deployment --namespace=$(namespace_name)

ls_pods:
	kubectl get pods --namespace=$(namespace_name)

ls_ibm_workers:
	ibmcloud ks workers $(cluster_name)
