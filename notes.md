
## Useful note
# Add new service to kubernetes cluster
ibmcloud ks cluster-service-bind <cluster_name> <kubernetes_namespace> <service_name>

# Add text to speech service to kubernetes cluster
ibmcloud ks cluster-service-bind ssme-app default text_to_speech


# Bind IBM cloud service (TextToSpeech = name in the web console)
ibmcloud ks cluster-service-bind --cluster ssme-app --namespace ssme-app --service TextToSpeech


## Update  docker image
kubectl set image deployment.apps/ssme-app-api-deployment ssme-app-api=de.icr.io/ssme-app/ssme-app-api@sha256:1bbd0709ec68543236b8e40254ffb1e7abf3daf7cbdc4f9e745a84bfa07b656a --namespace ssme-app


# Tutorials followed:
1. https://cloud.ibm.com/docs/containers?topic=containers-cs_cluster_tutorial
2. https://cloud.ibm.com/docs/containers?topic=containers-cs_apps_tutorial#cs_apps_tutorial
