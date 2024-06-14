import os

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, declarative_base

db = SQLAlchemy()

class ProfessorPayment(db.Model):
    professorpaymentID = db.Column(db.Integer, primary_key=True)
    paymentmethod = db.Column(db.String(50), unique=False, nullable=False)
    phonenumber = db.Column(db.Integer, unique=True, nullable=False)
    IBANacount = db.Column(db.Integer, unique=True, nullable=False)

def serialize(self):
    return{
        "professorpaymentID": self.professorpaymentID,
        "paymentmethod": self.paymentmethod,
        "phonenumber": self.phonenumber,
        "IBANacount": self.IBANacount
    }

class Professor(db.Model):
    professorID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    lastname = db.Column(db.String(50), unique=False, nullable=False)
    photo = db.Column(db.String(50), unique=False, nullable=False)
    cardIDtype = db.Column(db.String(50), unique=False, nullable=False)
    numbercardID = db.Column(db.Integer, unique=True, nullable=False)
    birthday = db.Column(db.Date, unique=False, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    phonenumber = db.Column(db.Integer, unique=True, nullable=False)
    address = db.Column(db.String(250), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    professorpaymentID_relationship = relationship(ProfessorPayment)
    paymentID = db.Column(db.Integer, ForeignKey('ProfessorPayment.professorpaymentID'))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return 'Profesor: {}'.format(self.name)

    def serialize(self):
        return {
            "professorID": self.professorID,
            "name": self.name,
            "lastname": self.lastname,
            "photo": self.photo,
            "carIDtype": self.cardIDtype,
            "numbercardID": self.numbercardID,
            "birthday": self.birthday,
            "email": self.email,
            "phonenumber": self.phonenumber,
            "address": self.address,
            "password": self.password,
            "paymentID": self.paymentID
            # do not serialize the password, its a security breach
        }
