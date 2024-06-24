import os

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Administrator(db.Model):
    __tablename__ = 'administrator'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    # photo = db.Column(db.String(150))
    cardID_type = db.Column(db.String(50))
    number_cardID = db.Column(db.Integer, unique=True)
    birthday = db.Column(db.Date)
    email = db.Column(db.String(50), unique=True)
    phone_number = db.Column(db.Integer)
    province = db.Column(db.String(50))
    canton = db.Column(db.String(50))
    distric = db.Column(db.String(50))
    password = db.Column(db.String(80))
    is_active = db.Column(db.Boolean())

    def __repr__(self):
        return 'Administrador: {}'.format(self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            # "photo": self.photo,
            "cardID_type": self.cardID_type,
            "number_cardID": self.number_cardID,
            "birthday": self.birthday,
            "email": self.email,
            "phone_number": self.phone_number,
            "province": self.province,
            "canton": self.canton,
            "distric": self.distric
            # do not serialize the password, its a security breach
        }

class Professor(db.Model):
    __tablename__ = 'professor'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    # photo = db.Column(db.String(150))
    cardID_type = db.Column(db.String(50))
    number_cardID = db.Column(db.Integer, unique=True)
    birthday = db.Column(db.Date)
    email = db.Column(db.String(50), unique=True)
    phone_number = db.Column(db.Integer)
    province = db.Column(db.String(50))
    canton = db.Column(db.String(50))
    distric = db.Column(db.String(50))
    password = db.Column(db.String(80))
    is_active = db.Column(db.Boolean())
    professor_payment = db.relationship("ProfessorPayment", back_populates="professor_id_relationship")
    new_course_professor = db.relationship("NewCourse", back_populates="professor_id_relationship")

    def __repr__(self):
        return 'Profesor: {}'.format(self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            # "photo": self.photo,
            "cardID_type": self.cardID_type,
            "number_cardID": self.number_cardID,
            "birthday": self.birthday,
            "email": self.email,
            "phone_number": self.phone_number,
            "province": self.province,
            "canton": self.canton,
            "distric":self.distric
            # do not serialize the password, its a security breach
        }
    
class Student(db.Model):
    __tablename__ = 'student'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    # photo = db.Column(db.String(150))
    cardID_type = db.Column(db.String(50))
    number_cardID = db.Column(db.Integer, unique=True)
    birthday = db.Column(db.Date)
    email = db.Column(db.String(50), unique=True)
    phone_number = db.Column(db.Integer)
    province = db.Column(db.String(50))
    canton = db.Column(db.String(50))
    distric = db.Column(db.String(50))
    password = db.Column(db.String(80))
    is_active = db.Column(db.Boolean())
    student_payment = db.relationship("StudentPayment", back_populates="student_id_relationship")
    electronic_invoice = db.relationship("ElectronicInvoice", back_populates="student_id_relationship")
    new_course_student = db.relationship("NewCourse", back_populates="student_id_relationship")

    def __repr__(self):
        return 'Estudiante: {}'.format(self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            # "photo": self.photo,
            "cardID_type": self.cardID_type,
            "number_cardID": self.number_cardID,
            "birthday": self.birthday,
            "email": self.email,
            "phone_number": self.phone_number,
            "province": self.province,
            "canton": self.canton,
            "distric":self.distric
            # do not serialize the password, its a security breach
        }
    
class ProfessorPayment(db.Model):
    __tablename__ = 'professor_payment'

    id = db.Column(db.Integer, primary_key=True)
    payment_method = db.Column(db.String(50))
    phone_number = db.Column(db.Integer)
    iban_acount = db.Column(db.BigInteger, unique=True)
    professor_id = db.Column(db.Integer, db.ForeignKey('professor.id'))
    professor_id_relationship = db.relationship("Professor", back_populates="professor_payment")

    def serialize(self):
        return{
            "id": self.id,
            "payment_method": self.payment_method,
            "phone_number": self.phone_number,
            "iban_acount": self.iban_acount,
            "professor_id": self.professor_id
        }
    
class StudentPayment(db.Model):
    __tablename__ = 'student_payment'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    mount = db.Column(db.Integer)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    student_id_relationship = db.relationship("Student", back_populates="student_payment")


    def serialize(self):
        return{
            "id": self.id,
            "date": self.date,
            "mount": self.mount,
            "student_id": self.student_id
        }

class ElectronicInvoice(db.Model):
    __tablename__ = 'electronic_invoice'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False)
    cardID_type = db.Column(db.String(50), unique=False)
    number_cardID = db.Column(db.Integer, unique=True)
    email = db.Column(db.String(50), unique=True)
    phone_number = db.Column(db.Integer, unique=True)
    province = db.Column(db.String(50))
    canton = db.Column(db.String(50))
    distric = db.Column(db.String(50))
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    student_id_relationship = db.relationship("Student", back_populates="electronic_invoice")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "cardID_type": self.cardID_type,
            "number_cardID": self.number_cardID,
            "email": self.email,
            "phone_number": self.phone_number,
            "province": self.province,
            "canton": self.canton,
            "distric":self.distric,
            "student_id": self.student_id
        }

class Course(db.Model):
    __tablename__ = 'course'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    new_course = db.relationship("NewCourse", back_populates="course_id_relationship")

    def __repr__(self):
        return 'Curso: {}'.format(self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

class Modality(db.Model):
    __tablename__ = 'modality'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    new_course_modality = db.relationship("NewCourse", back_populates="modality_id_relationship")

    def __repr__(self):
        return 'Modalidad: {}'.format(self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
    
class NewCourse(db.Model):
    __tablename__ = 'new_course'

    id = db.Column(db.Integer, primary_key=True)
    professor_id = db.Column(db.Integer, db.ForeignKey('professor.id'))
    professor_id_relationship = db.relationship("Professor", back_populates="new_course_professor")
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    student_id_relationship = db.relationship("Student", back_populates="new_course_student")
    modality_id = db.Column(db.Integer, db.ForeignKey('modality.id'))
    modality_id_relationship = db.relationship("Modality", back_populates="new_course_modality")
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    course_id_relationship = db.relationship("Course", back_populates="new_course")

    def __repr__(self):
        return f"Estudiante: {self.student_id} -> Inscrito a nuevo curso de {self.course_id} con profesor {self.professor_id}"

    def serialize(self):
        return {
            "id": self.id,
            "professor_id": self.professor_id,
            "student_id": self.student_id,
            "modality_id": self.modality_id,
            "course_id": self.course_id
        }