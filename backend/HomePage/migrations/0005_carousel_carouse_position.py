# Generated by Django 4.2.5 on 2024-05-06 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HomePage', '0004_clientlogo_client_position'),
    ]

    operations = [
        migrations.AddField(
            model_name='carousel',
            name='carouse_position',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
