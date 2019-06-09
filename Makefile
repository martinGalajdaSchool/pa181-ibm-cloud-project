

cluster_name=ssme-app-v2

export KUBECONFIG=/Users/martingalajda/.bluemix/plugins/container-service/clusters/ssme-app/kube-config-mil01-ssme-app.yml

list_kubernetes_workers:
	ibmcloud ks workers $(cluster_name)

list_kubernetes_clusters:
	ibmcloud ks clusters

init_ibm_kubernetes_environment:
	ibmcloud ks cluster-config --cluster $(cluster_name)

kubeconfig:
	echo $(KUBECONFIG)

ibm_login:
	ibmcloud login

docker_login:
	ibmcloud cr login

ls_container_repository_namespaces:
	ibmcloud cr namespace-list

current_region:
	ibmcloud cr region

setup_kubernetes_env_variables:
	# does not work, need to do ". init_ibm_kubernetes_env.sh" manually from terminal/shell
	# It is needed to for kubernetes work with IBM cloud...
	. init_ibm_kubernetes_env.sh

# Build docker image from API source code and push it to IBM container registry
build_and_push_api_docker_image:
	# ibmcloud cr build -t <region>.icr.io/<namespace>/ssme-app-api
	ibmcloud cr build -t de.icr.io/ssme-app/ssme-app-api ./api

build_and_push_docker_api_tagged_image:
	# ibmcloud cr build -t <region>.icr.io/<namespace>/ssme-app-api
	ibmcloud cr build -t de.icr.io/ssme-app/ssme-app-api:$(tag) ./api --pull --no-cache

build_and_push_docker_fe_tagged_image:
	# ibmcloud cr build -t <region>.icr.io/<namespace>/ssme-app-api
	ibmcloud cr build -t de.icr.io/ssme-app/ssme-app-fe:$(tag) ./fe --pull --no-cache

ls_docker_images:
	# ibmcloud cr build -t <region>.icr.io/<namespace>/ssme-app-api
	ibmcloud cr images

reload_worker:
	ibmcloud ks worker-reload --workers kube-mil01-pa9ba7245e6f154f03b2d2c40928d563cb-w1 --cluster ssme-app
