# Generated by Django 4.2.1 on 2024-07-10 17:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0015_alter_answers_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answers',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 10, 19, 57, 36, 272302, tzinfo=datetime.timezone.utc)),
        ),
    ]
