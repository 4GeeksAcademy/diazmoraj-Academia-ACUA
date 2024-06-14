from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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
    paymentID = db.Column(db.Integer)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }