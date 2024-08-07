# webapp/middleware.py

from django.shortcuts import redirect
from django.utils.deprecation import MiddlewareMixin
from django.contrib.sessions.models import Session
from django.utils import timezone

class SessionExpiryMiddleware(MiddlewareMixin):
    def process_request(self, request):
        session_key = request.session.session_key
        
        # Erstelle einen neuen Session-Key, wenn keiner existiert
        if session_key is None:
            request.session.create()
            return None  # Erlaube die Verarbeitung der Anfrage
        
        try:
            session = Session.objects.get(session_key=session_key)
            
            # Prüfen, ob die Sitzung abgelaufen ist
            if session.expire_date < timezone.now():
                # Leite zu einer spezifischen Seite weiter
                return redirect('/')  
        
        except Session.DoesNotExist:
            # Leite zu einer spezifischen Seite weiter, wenn die Sitzung nicht existiert
            return redirect('/')
        
        return None  # Erlaube die Verarbeitung der Anfrage
