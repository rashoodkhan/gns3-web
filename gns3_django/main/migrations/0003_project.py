# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_serversettings_created_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200, verbose_name=b'Project Name')),
                ('project_id', models.CharField(max_length=200, verbose_name=b'Project ID')),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
