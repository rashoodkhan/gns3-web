# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='serversettings',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 7, 16, 39, 53, 324663), auto_now=True),
            preserve_default=False,
        ),
    ]
