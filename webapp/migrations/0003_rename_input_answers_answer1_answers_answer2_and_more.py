# Generated by Django 4.2.1 on 2024-06-27 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0002_answers_experimentnumber_alter_answers_created_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answers',
            old_name='input',
            new_name='answer1',
        ),
        migrations.AddField(
            model_name='answers',
            name='answer2',
            field=models.CharField(default='No Answer', max_length=200),
        ),
        migrations.AddField(
            model_name='answers',
            name='answer3',
            field=models.CharField(default='No Answer', max_length=200),
        ),
        migrations.AddField(
            model_name='answers',
            name='answer4',
            field=models.CharField(default='No Answer', max_length=200),
        ),
    ]
