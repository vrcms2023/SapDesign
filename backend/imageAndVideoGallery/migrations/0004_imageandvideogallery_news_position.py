# Generated by Django 4.2.5 on 2024-06-02 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imageAndVideoGallery', '0003_rename_imageandvideo_imageandvideogallery'),
    ]

    operations = [
        migrations.AddField(
            model_name='imageandvideogallery',
            name='news_position',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]