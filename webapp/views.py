from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# Wiedergabe der Views und deren Code/Inhalt unter dem Reiter "templates"

def start(request):
    return render(request, "experiment/start.html")

def experiment(request):
    return render(request, "experiment/experiment.html")

def datenschutz(request):
    return render(request, "experiment/datenschutz.html")

def kontrolle(request):
    return render(request, "experiment/kontrolle.html")

def webseite(request):
    return render(request, "webseite/webseite.html")


# Experiment B 
def experimentB(request):
    return render(request, "experiment/experimentB.html")

def datenschutzB(request):
    return render(request, "experiment/datenschutzB.html")

def kontrolleB(request):
    return render(request, "experiment/kontrolleB.html")

def webseiteB(request):
    return render(request, "webseite/webseiteB.html")


def ZTest(request):
    return render(request, "webseite/ZTest.html")
    
def ZTest2(request):
    return render(request, "webseite/ZTest2.html")
