from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests

from models import ServerSettings

SERVER_URL = None
SERVER_PORT = None

def createURL(parameter):
	url = "http://"+str(SERVER_URL)+":"+str(SERVER_PORT)+"/v1/"+str(parameter)
	return url

def home(request):
	r = requests.get("http://localhost:8000/v1/version")
	json_response = r.json()
	return render(request,'main/index.html',{"version":json_response["version"],"local":json_response["local"]})

def get_server_version(request):
	r = requests.get("http://localhost:8000/v1/version")
	return JsonResponse(r.json())

def create_project(request,name):
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

@csrf_exempt
def settings(request):
	if request.method == 'POST':
		server_url = request.POST.get("serverURL")
		server_port = request.POST.get("serverPort")
		print server_url
		print str(server_port)
		r = requests.get("http://"+str(server_url)+":"+str(server_port)+"/v1/version")
		print r.status_code
		if r.status_code == 200:
			#The given server URL and Port are working
			print "Hello"
			server_settings = ServerSettings.objects.create(url=server_url,port=server_port)
			server_settings.save()
		else:
			#The given server credentials are not working, Raise Error
			return JsonResponse({"status":"Failed"})
	return JsonResponse({"status":"success"})




