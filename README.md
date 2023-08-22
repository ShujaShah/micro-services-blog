# micro-services-blog

======================= Docker Commands ======================
#Build docker image :
docker build -t shujashah/event-bus .
#Push the docker image :
docker push shujashah/event-bus

====================== Kubernetes Commands =====================

# Apply the configuration file in kubernetes to create a deployment Pod:

        kubectl apply -f event-bus-depl.yaml
        //where event-bus-depl.yaml is a config file for kubernetes in infra folder

#Check all the pods:
kubectl get pods

#Check all the services:
kubectl get services

#Check all the deployments:
kubectl get deployments

#To restart the deployments:
kubectl rollout restart deployment deployment_name

#To get the logs of the pod
kubectl logs pod_name

#Delete the pod:
kubectl delete pod_name

#Delete the service:
kubectl delete services service_name

## To install ingress

use the command :
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

#To run Skaffold
use the command:
skaffold dev

###Code to edit the hosts file in mac

1. open terminal and write the command sudo nano /etc/hosts
2. This will open the nano file editor editing the hosts file
3. Write the command at the bottom of the file like 127.0.0.1 posts.com
4. To overwrite the existing file, use the shortcut ctrl + 0, followed by enter/ return key
5. To exit the process use ctrl + x

Note: To create multiple objects in a single yaml file we write ---
