# Generated by Django 4.2.5 on 2024-05-06 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testimonials', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='testimonials',
            name='testimonial_position',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
