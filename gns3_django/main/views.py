from django.shortcuts import render
from django.http import JsonResponse
import requests

def home(request):
	r = requests.get("http://localhost:8000/v1/version")
	json_response = r.json()
	return render(request,'main/index.html',{"version":json_response["version"],"local":json_response["local"]})

def get_server_version(request):
	r = requests.get("http://localhost:8000/v1/version")
	return JsonResponse(r.json())

def create_project(request):
	data = {"name":name}
	res = requests.post("http://localhost:8000/v1/projects",data=data)
	json_response = res.json()
	return JsonResponse(json_response)

def create_vcps(request,project_id,vcps_name):
	data = {"name":vcps_name}
	url = "http://localhost:8000/v1/projects/"+str(project_id)+"/vcps/vms"
	res = requests.post(url,data=data)
	json_response = res.json()
	return JsonResponse(json_response)

def get_port(request,project_id):
	res = requests.post("http://localhost:8000/v1/projects/"+str(project_id)+"/ports/udp")
	json_response = res.json()
	return JsonResponse({"udp_port":json_response["udp_port"]})

def start_vcps(request,project_id,vcps_id_1,vcps_id_2,lport,rport):
	url_1 = "http://localhost:8000/v1/projects/"+str(project_id)+"/vcps/vms/"+str(vcps_id_1)+"/adapters/0/ports/0/nio"
	data_1 = {"lport":lport,"rhost":"127.0.0.1","rport":rport,"type":"nio_udp"}
	r1 = requests.post(url_1,data=data_1)

	url_2 = "http://localhost:8000/v1/projects/"+str(project_id)+"/vcps/vms/"+str(vcps_id_2)+"/adapters/0/ports/0/nio"
	data_2 = {"lport":rport,"rhost":"127.0.0.1","rport":lport,"type":"nio_udp"}
	r2 = requests.post(url_2,data=data_2)

	url_1 = "http://localhost:8000/v1/projects/"+str(project_id)+"/vcps/vms/"+str(vcps_id_1)+"/start"
	url_2 = "http://localhost:8000/v1/projects/"+str(project_id)+"/vcps/vms/"+str(vcps_id_2)+"/start"
	requests.post(url_1)
	requests.post(url_2)

	return JsonResponse({"status":"success"})




