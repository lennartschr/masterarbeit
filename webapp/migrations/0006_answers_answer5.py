# Generated by Django 4.2.1 on 2024-06-28 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0005_alter_answers_participantgender'),
    ]

    operations = [
        migrations.AddField(
            model_name='answers',
            name='answer5',
            field=models.CharField(default='No Answer', max_length=200),
        ),
    ]
