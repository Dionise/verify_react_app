from datetime import timedelta
from pathlib import Path
from decouple import config
import os
BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = config('SECRET_KEY')

DEBUG = config('DEBUG', cast=bool)

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'api.swe5203.dm33ocd.co.uk']

#CSRF_COOKIE_SECURE = True
# Application definition

INSTALLED_APPS = [
    'storages',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_rest_passwordreset',
    'users',
    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'auth_site.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'auth_site.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config("NAME"),
        'USER': config("DATABASESUSER"),
        'PASSWORD': config("DATABASESPASSWORD"),
        'HOST': config("DATABASESHOST"),
        'PORT': '3306',
        'OPTIONS': {'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"}
    }
}



# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = 'static/'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=2200),
}

AUTH_USER_MODEL = 'users.UserAccount'
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DJANGO_REST_PASSWORDRESET_TOKEN_CONFIG = {
    "CLASS": "django_rest_passwordreset.tokens.RandomStringTokenGenerator"

}


EMAIL_BACKEND = 'django_ses.SESBackend'




CSRF_HEADER_NAME = 'HTTP_X_CSRFTOKEN'

CSRF_COOKIE_NAME = 'X-CSRFTOKEN'

CORS_ALLOW_HEADERS = [
    'X-CSRFTOKEN',
    'csrftoken',
    'X-XSRF-TOKEN',
    'content-type',
    'x-requested-with',
    'Authorization',
    'Set-Cookie'
]

CORS_ALLOW_CREDENTIALS = True