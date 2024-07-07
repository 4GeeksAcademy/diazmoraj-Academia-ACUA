  
import os
from flask_admin import Admin
from .models import db
from flask_admin.contrib.sqla import ModelView
from .models import Administrator, Professor, Student, ProfessorPayment, StudentPayment, ElectronicInvoice, ContactForm
from .models import Course, NewCourse

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Administrator, db.session))
    admin.add_view(ModelView(Professor, db.session))
    admin.add_view(ModelView(Student, db.session))
    admin.add_view(ModelView(ProfessorPayment, db.session))
    admin.add_view(ModelView(StudentPayment, db.session))
    admin.add_view(ModelView(ElectronicInvoice, db.session))
    admin.add_view(ModelView(ContactForm, db.session))
    admin.add_view(ModelView(Course, db.session))
    # admin.add_view(ModelView(Modality, db.session))
    admin.add_view(ModelView(NewCourse, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))