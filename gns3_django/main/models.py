from django.db import models

class ServerSettings(models.Model):
	"""
		Server Settings stores the server url and port
		persistently in the database and loads it automatically
		when the app starts
	"""
	url = models.CharField('Server URL', max_length=200)
	port = models.IntegerField('Server Port')

	def __str__(self):
		return self.url + ':' + self.port