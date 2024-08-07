from django.db import models
from django.utils import timezone
from datetime import timedelta

# Create your models here
# Klassen definieren


# Ähnlich wie bei Java: class Answer extends models.Model { ... }
class Answers(models.Model): 
    session_id = models.CharField(max_length=40, null=True, blank=True)  # Session-ID speichern
    
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    experimentNumber = models.PositiveIntegerField(default=0)
    
    participantName = models.CharField(max_length=20, default="UnknownName") 
    participantGender = models.CharField(max_length=20, default="UnknownGender")

    answer1 = models.CharField(max_length=500, default="No Answer")
    answer2 = models.CharField(max_length=500, default="No Answer")
    answer3 = models.CharField(max_length=500, default="No Answer")
    answer4 = models.CharField(max_length=500, default="No Answer")

    pdf_clicked = models.IntegerField(default=0) # Ob die PDF mitgesendet wurde oder nicht
    installed_update = models.IntegerField(default=0) # Ob das Update getätigt wurde oder nicht


# Experiment Nummern
#         0 = Default Webseite
# Adler = 1 = Nudge1
# Igel  = 2 = Nudge1 + Zeitstress
# Hase  = 3 = Nudge2
# Otter = 4 = Nudge2 + Zeitstress
# Fuchs = 5 = ISP-Compliance
# Koala = 6 = ISP-Compliance + Zeitstress