import os
from global_settings import PROJECT_PATH, LOGGING, DATABASES

# Uncomment to put the application in non-debug mode. This is useful
# for testing error handling and messages.
# DEBUG = False
# TEMPLATE_DEBUG = DEBUG

SECRET_KEY = '12345678900987654321abcdefghijlmnopqrtuvwyz'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(PROJECT_PATH, 'openmrs.db'),
    }
}
