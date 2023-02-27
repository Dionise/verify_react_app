# Generated by Django 4.0.5 on 2022-12-02 08:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_useraccount_company_useraccount_country_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DepartmentName', models.CharField(max_length=128, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='useraccount',
            name='ProfilePicture',
            field=models.ImageField(blank=True, null=True, upload_to='media/'),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='Department',
            field=models.ForeignKey(blank=True, max_length=40, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='users.department'),
        ),
    ]
