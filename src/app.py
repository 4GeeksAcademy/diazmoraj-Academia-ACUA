"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, Student, Professor, Administrator
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import Administrator
from api.models import Professor
from api.models import Student
from api.models import ProfessorPayment
from api.models import StudentPayment
from api.models import ElectronicInvoice
from api.models import Course
from api.models import ContactForm
# from api.models import Modality
from api.models import NewCourse
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.security import check_password_hash

from flask_bcrypt import Bcrypt

from datetime import timedelta
from sqlalchemy.sql.functions import ReturnTypeFromArgs

# from models import Person

class unaccent(ReturnTypeFromArgs):
    pass

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = os.getenv("JWT-KEY") #super secret
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

#--------------------------------------#

# INGRESO ESTUDIANTE / PROFESOR / ADMINISTRADOR
@app.route("/api/login", methods=["POST"])
def login():
    body = request.get_json(silent=True)
    
    if body is None:
        return jsonify({"msg": "El cuerpo de la solicitud está vacío"}), 400
    if "email" not in body or not body["email"]:
        return jsonify({"msg": "Debes completar el campo email"}), 400
    if "password" not in body or not body["password"]:
        return jsonify({"msg": "Debes completar el campo contraseña"}), 400
    
    # Verificar estudiante
    student = Student.query.filter_by(email=body["email"]).first()
    if student and bcrypt.check_password_hash(student.password, body['password']):
        access_token = create_access_token(identity={"email": student.email, "user_type": "student", "id": student.id})
        return jsonify({"msg": "ok", "access_token": access_token, "user_type": "student", "email": student.email, "id": student.id}), 200
    
    # Verificar profesor
    professor = Professor.query.filter_by(email=body["email"]).first()
    if professor and bcrypt.check_password_hash(professor.password, body['password']):
        access_token = create_access_token(identity={"email": professor.email, "user_type": "professor", "id": professor.id})
        return jsonify({"msg": "ok", "access_token": access_token, "user_type": "professor", "email": professor.email, "id": professor.id}), 200
    
    # Verificar admin
    administrator = Administrator.query.filter_by(email=body["email"]).first()
    if administrator and administrator.password == body['password']:
        access_token = create_access_token(identity={"email": administrator.email, "user_type": "admin", "id": administrator.id})
        return jsonify({"msg": "ok", "access_token": access_token, "user_type": "admin", "email": administrator.email, "id": administrator.id}), 200


    return jsonify({"msg": "Email o contraseña inválidos"}), 400

# MÉTODO GET --> TRAER TODOS LOS ADMINISTRADORES --> ¡NO SE USA!
@app.route('/api/administrators', methods=['GET'])
def get_all_administrator():
    all_admins = Administrator.query.all()
    admins_serialized = []
    for admin in all_admins:
        admins_serialized.append(admin.serialize())
        print(admins_serialized)
    return jsonify({"administrators": admins_serialized}), 200

# MÉTODO GET --> TRAER TODOS LOS PROFESORES --> HOME ADMINISTRADOR Y LANDING PAGE
@app.route('/api/professors', methods=['GET'])
def get_all_professor():
    all_profes = Professor.query.all()
    profes_serialized = []
    for profe in all_profes:
        profes_serialized.append(profe.serialize())
        print(profes_serialized)
    return jsonify({"professors": profes_serialized}), 200

# MÉTODO GET --> TRAER TODOS LOS ESTUDIANTES --> HOME ADMINISTRADOR
@app.route('/api/students', methods=['GET'])
# @jwt_required()
def get_all_student():
    # identity = get_jwt_identity()
    all_studs = Student.query.all()
    studs_serialized = []
    for stud in all_studs:
        studs_serialized.append(stud.serialize())
        print(studs_serialized)
    return jsonify({"students": studs_serialized}), 200

# MÉTODO GET --> TRAER TODA LA INFORMACIÓN DE PAGO DE LOS PROFESORES
# @app.route('/api/professorspayment', methods=['GET'])
# def get_all_profpay():
#     all_profpays = ProfessorPayment.query.all()
#     profpays_serialized = []
#     for profpay in all_profpays:
#         profpays_serialized.append(profpay.serialize())
#         print(profpays_serialized)
#     return jsonify({"profpays": profpays_serialized}), 200

@app.route('/api/professorspayment', methods=['GET'])
def get_all_profpay():
    all_profpays = db.session.query(
        ProfessorPayment, Professor
    ).join(
        Professor, ProfessorPayment.professor_id == Professor.id
    ).all()

    all_profpays_serialized = []
    for professor_payment, professor in all_profpays:
        all_profpays_serialized.append({
            'professor_payment_id': professor_payment.id,
            'payment_method': professor_payment.payment_method,
            'phone_number': professor_payment.phone_number,
            'iban_account': professor_payment.iban_account,
            'professor_id':{
                'id': professor.id,
                'name': professor.name,
                'last_name': professor.last_name
            }
        })

    return jsonify({"profpays": all_profpays_serialized}), 200

# MÉTODO GET --> TRAER TODA LA INFORMACIÓN DE PRÓXIMO PAGO DE ESTUDIANTES
@app.route('/api/studentspayment', methods=['GET'])
def get_all_studpay():
    all_studpays = StudentPayment.query.all()
    studpays_serialized = []
    for studpay in all_studpays:
        studpays_serialized.append(studpay.serialize())
        print(studpays_serialized)
    return jsonify({"studpays": studpays_serialized}), 200

@app.route('/api/electronicinvoice', methods=['GET'])
def get_all_electinv():
    all_electinvs = ElectronicInvoice.query.all()
    electinvs_serialized = []
    for electinv in all_electinvs:
        electinvs_serialized.append(electinv.serialize())
        print(electinvs_serialized)
    return jsonify({"electinvs": electinvs_serialized}), 200

@app.route('/api/courses', methods=['GET'])
def get_all_course():
    all_courses = Course.query.all()
    courses_serialized = []
    for course in all_courses:
        courses_serialized.append(course.serialize())
        print(courses_serialized)
    return jsonify({"courses": courses_serialized}), 200

# @app.route('/api/modalities', methods=['GET'])
# def get_all_modality():
#     all_modalities = Modality.query.all()
#     modalities_serialized = []
#     for modality in all_modalities:
#         modalities_serialized.append(modality.serialize())
#         print(modalities_serialized)
#     return jsonify({"modalities": modalities_serialized}), 200

# @app.route('/api/allregisteredcourses', methods=['GET'])
# def get_all_registered_courses():
#     all_registered_courses = NewCourse.query.all()
#     all_registered_courses_serialized = []
#     for registered_course in all_registered_courses:
#         all_registered_courses_serialized.append(registered_course.serialize())
#         print(all_registered_courses_serialized)
#     return jsonify({"all_registered_courses": all_registered_courses_serialized}), 200

@app.route('/api/allregisteredcourses', methods=['GET'])
def get_all_registered_courses():
    all_registered_courses = db.session.query(
        NewCourse, Professor, Student, Course
        ).join(
            Professor, NewCourse.professor_id == Professor.id
        ).join(
            Student, NewCourse.student_id == Student.id
        ).join(
            Course, NewCourse.course_id == Course.id
        ).all()
    
    all_registered_courses_serialized = []
    for new_course, professor, student, course in all_registered_courses:
        all_registered_courses_serialized.append({
            'new_course_id': new_course.id,
            'professor_id': {
                'id': professor.id,
                'name': professor.name,
                'last_name': professor.last_name
            },
            'student_id': {
                'id': student.id,
                'name': student.name,
                'last_name': student.last_name
            },
            'course_id': {
                'id': course.id,
                'name': course.name
            }
        })
    
    return jsonify({"all_registered_courses": all_registered_courses_serialized}), 200


#----------------------------------------------#
#App Route para los metodos GET ID

@app.route('/api/administrator/personalinfo', methods=['GET'])
@jwt_required()
def get_single_admin():
    identity = get_jwt_identity()
    print(identity['user_type'])
    single_admin = Administrator.query.filter_by(email = identity['email']).first()
    if single_admin is None:
        return jsonify({"msg": "No existe administrador con la información indicada"}), 401
    if identity['user_type'] != "admin":
        return jsonify({"msg": "No tienes autorización para ingresar"}), 402 
    return jsonify({"administrator": single_admin.serialize()}), 200

@app.route('/api/student/personalinfo', methods=['GET'])
@jwt_required()
def get_single_stud():
    identity = get_jwt_identity()
    single_stud = Student.query.filter_by(email = identity['email']).first()
    if single_stud is None:
        return jsonify({"msg": "No existe estudiante con la información indicada"}), 401
    if identity['user_type'] != "student":
        return jsonify({"msg": "No tienes autorización para ingresar"}), 402
    return jsonify({"student": single_stud.serialize()}), 200

@app.route('/api/professor/personalinfo', methods=['GET'])
@jwt_required()
def get_single_profe():
    identity = get_jwt_identity()
    single_profe = Professor.query.filter_by(email = identity['email']).first()
    if single_profe is None:
        return jsonify({"msg": "No existe profesor con la información indicada"}), 401
    if identity['user_type'] != "professor":
        return jsonify({"msg": "No tienes autorización para ingresar"}), 402
    return jsonify({"professor": single_profe.serialize()}), 200


# @app.route('/api/professor/registeredcourses', methods=['GET'])
# @jwt_required()
# def get_professor_courses():
#     identity = get_jwt_identity()
#     professor = Professor.query.filter_by(email = identity['email']).first()
#     professor_courses = NewCourse.query.filter_by(professor_id = professor.id)
#     if professor is None:
#         return jsonify({"msg": "No existe profesor con la información indicada"}), 401
#     if identity['user_type'] != "professor":
#         return jsonify({"msg": "No tienes autorización para ingresar"}), 402
#     professor_courses_serialized = []
#     for course in professor_courses:
#         professor_courses_serialized.append(course.serialize())
#         print(professor_courses_serialized)
#     return jsonify({"professor_courses": professor_courses_serialized}), 200

@app.route('/api/professor/registeredcourses', methods=['GET'])
@jwt_required()
def get_professor_courses():
    identity = get_jwt_identity()
    professor = Professor.query.filter_by(email = identity['email']).first()
    if professor is None:
        return jsonify({"msg": "No existe profesor con la información indicada"})
    if identity['user_type'] != "professor":
        return jsonify({"msg": "No tienes autorización para ingresar"}), 402
    professor_courses = db.session.query(
        NewCourse, Course, Student
        ).join(
           Course, NewCourse.course_id == Course.id
        ).join(
            Student, NewCourse.student_id == Student.id
        ).filter(NewCourse.professor_id == professor.id).all()
    
    professor_courses_serialized = []
    for new_course, course, student in professor_courses:
        professor_courses_serialized.append({
            'new_course_id': new_course.id,
            'course_name': course.name,
            'student_name': student.name,
            'student_last_name': student.last_name
        })
    
    return jsonify({"professor_courses": professor_courses_serialized}), 200

@app.route('/api/professorpayment', methods=['GET'])
@jwt_required()
def get_single_profpay():
    identity = get_jwt_identity()
    print(identity, "TOKEN")
    single_profpay = ProfessorPayment.query.filter_by(professor_id = identity['id']).first()
    if single_profpay is None:
        return jsonify({"msg": "No existe información de pago para el profesor indicado"}), 400
    return jsonify({"professor_payment": single_profpay.serialize()}), 200

# @app.route('/api/student/registeredcourses', methods=['GET'])
# @jwt_required()
# def get_student_courses():
#     identity = get_jwt_identity()
#     student = Student.query.filter_by(email = identity['email']).first()
#     student_courses = NewCourse.query.filter_by(student_id = student.id)
#     if student is None:
#         return jsonify({"msg": "No existe estudiante con la información indicada"}), 401
#     if identity['user_type'] != "student":
#         return jsonify({"msg": "No tienes autorización para ingresar"}), 402
#     student_courses_serialized = []
#     for course in student_courses:
#         student_courses_serialized.append(course.serialize())
#         print(student_courses_serialized)
#     return jsonify({"student_courses": student_courses_serialized}), 200

@app.route('/api/student/registeredcourses', methods=['GET'])
@jwt_required()
def get_student_courses():
    identity = get_jwt_identity()
    student = Student.query.filter_by(email = identity['email']).first()
    if student is None:
        return jsonify({"msg": "No existe estudiante con la información indicada"})
    if identity['user_type'] != "student":
        return jsonify({"msg": "No tienes autorización para ingresar"}), 402
    student_courses = db.session.query(
        NewCourse, Course, Professor
        ).join(
           Course, NewCourse.course_id == Course.id
        ).join(
            Professor, NewCourse.professor_id == Professor.id
        ).filter(NewCourse.student_id == student.id).all()
    
    student_courses_serialized = []
    for new_course, course, professor in student_courses:
        student_courses_serialized.append({
            'new_course_id': new_course.id,
            'course_name': course.name,
            'professor_name': professor.name,
            'professor_last_name': professor.last_name
        })
    
    return jsonify({"student_courses": student_courses_serialized}), 200

@app.route('/api/studentpayment/', methods=['GET'])
@jwt_required()
def get_single_studpay():
    identity = get_jwt_identity()
    single_studpay = StudentPayment.query.filter_by(id = identity['id']).first()
    if single_studpay is None:
        return jsonify({"msg": "No existe información de pago para el estudiante indicado"}), 400
    return jsonify({"student_payment": single_studpay.serialize()}), 200

@app.route('/api/electronicinvoice/<int:number_cardID>', methods=['GET'])
def get_single_electinv(number_cardID):
    single_electinv = ElectronicInvoice.query.filter_by(number_cardID = number_cardID).first()
    if single_electinv is None:
        return jsonify({"msg": "No existen datos para facturación electrónica para el estudiante con N° identificación: {}".format(number_cardID)}), 400
    return jsonify({"student_electinv": single_electinv.serialize()}), 200

@app.route('/api/course/<name>', methods=['GET'])
def get_single_course(name):
    single_course = Course.query.filter_by(name = name).first()
    if single_course is None:
        return jsonify({"msg": "No existe un curso con el nombre: {}".format(name)}), 400
    return jsonify({"course": single_course.serialize()}), 200

# @app.route('/api/modality/<modality>', methods=['GET'])
# def get_single_modality(modality):
#     single_modality = Modality.query.get(modality = modality).first()
#     if setup_commands is None:
#         return jsonify({"msg": "La modalidad con el ID: {} no existe".format(modality)}), 400
#     return jsonify({"modality": single_modality.serialize()}), 200

# @app.route('/api/professorregisteredcourses/<int:professor_id>', methods=['GET'])
# def get_professor_registered_courses(professor_id):
#     professor_registered_courses = db.session.query(NewCourse, Professor).join(Professor).filter(NewCourse.professor_id == professor_id).all()
#     professor_registered_courses_serialized = []
#     for professor_registered_course, professor in professor_registered_courses:
#         professor_registered_courses.append({'professor_registered_courses': professor_registered_courses.id, "planet": planet.serialize(), "user_id": id})
# professor_registered_courses = NewCourse.query.filter_by(professor_id = professor_id).all()
# if professor_registered_courses is None:
#     return jsonify({"msg": "El profesor con con el ID: {} no tiene cursos asignados".format(professor_id)}), 401
# return jsonify({"professor_registered_courses": professor_registered_courses.serialize()}), 200

#------------------------------------------#
#App Route para los metodos POST


@app.route('/api/contactform/new', methods=['PUT'])
def new_contact_form():
    body = request.get_json(silent=True)
    if body is None: 
        return jsonify({'msg' : 'Debes completar la informacion requerida para continuar'}) , 400
    if 'body_name' not in body:
        return jsonify({'msg' : 'body_name must be in body'})
    if 'body_text' not in body:
        return jsonify({'msg' : 'body_text must be in body'})
    if 'body_email' not in body:
        return jsonify({'msg' : 'body_email must be in body'})
    if 'body_requeriment' not in body:
        return jsonify({'msg' : 'body_requeriment must be in body'})
    
    new_contact_form = ContactForm()
    new_contact_form.body_name = body['body_name']
    new_contact_form.body_text = body['body_text']
    new_contact_form.body_email = body['body_email']
    new_contact_form.body_requeriment = body['body_requeriment']

    try:
        db.session.add(new_contact_form)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al crear una nueva form"}), 500

    return jsonify({"new_contact_form": new_contact_form.serialize()}), 201

@app.route('/api/createadministrator', methods=['POST'])
def new_admin():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    if "last_name" not in body:
        return jsonify({"msg": "Debes escribir un apellido"}), 400
    if "cardID_type" not in body:
        return jsonify({"msg": "Debes seleccionar un tipo de identificacion"}), 400
    if "number_cardID" not in body:
        return jsonify({"msg": "Debes escribir un numero de identificacion"}), 400
    # if "birthday" not in body:
    #     return jsonify({"msg": "Debes registrar su nacimiento"}), 400
    if "email" not in body:
        return jsonify({"msg": "El campo email es obligatorio"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    # if "province" not in body:
    #     return jsonify({"msg": "Debes escribir una provincia"}), 400
    # if "canton" not in body:
    #     return jsonify({"msg": "Debes escribir un canton"}), 400
    # if "distric" not in body:
    #     return jsonify({"msg": "Debes escribir un distrito"}), 400
    if "password" not in body:
        return jsonify({"msg": "Debes escribir una contraseña"}), 400
    

    new_admin = Administrator()
    new_admin.name = body["name"]
    new_admin.last_name = body["last_name"]
    # new_admin.photo = body["photo"]
    new_admin.cardID_type = body["cardID_type"]
    new_admin.number_cardID = body["number_cardID"]
    # new_admin.birthday = body["birthday"]
    new_admin.email = body["email"]
    new_admin.phone_number = body["phone_number"]
    # new_admin.province = body["province"]
    # new_admin.canton = body["canton"]
    # new_admin.distric = body["distric"]
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_admin.password = pw_hash
    new_admin.user_type = "admin"

    try:
        db.session.add(new_admin)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al crear un nuevo administrador"}), 500

    return jsonify({"new_admin": new_admin.serialize()}), 201

@app.route('/api/createprofessor', methods=['POST'])
def new_profe():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    if "last_name" not in body:
        return jsonify({"msg": "Debes escribir un apellido"}), 400
    # if "photo" not in body:
    #     return jsonify({"msg": "Debes agregar una photo"}), 400
    if "cardID_type" not in body:
        return jsonify({"msg": "Debes seleccionar un tipo de identificacion"}), 400
    if "number_cardID" not in body:
        return jsonify({"msg": "Debes escribir un numero de identificacion"}), 400
    # if "birthday" not in body:
    #     return jsonify({"msg": "Debes registrar su nacimiento"}), 400
    if "email" not in body:
        return jsonify({"msg": "El campo email es obligatorio"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    # if "province" not in body:
    #     return jsonify({"msg": "Debes escribir una provincia"}), 400
    # if "canton" not in body:
    #     return jsonify({"msg": "Debes escribir un canton"}), 400
    # if "distric" not in body:
    #     return jsonify({"msg": "Debes escribir un distrito"}), 400
    if "password" not in body:
        return jsonify({"msg": "Debes escribir una contraseña"}), 400
    
    new_profe = Professor()
    new_profe.name = body["name"]
    new_profe.last_name = body["last_name"]
    # new_profe.photo = body["photo"]
    new_profe.cardID_type = body["cardID_type"]
    new_profe.number_cardID = body["number_cardID"]
    # new_profe.birthday = body["birthday"]
    new_profe.email = body["email"]
    new_profe.phone_number = body["phone_number"]
    # new_profe.province = body["province"]
    # new_profe.canton = body["canton"]
    # new_profe.distric = body["distric"]
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_profe.password = pw_hash
    new_profe.user_type = "professor"
    
    try:
        db.session.add(new_profe)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al crear un nuevo profesor"}), 500

    return jsonify({"new_professor": new_profe.serialize()}), 201

# CREACIÓN NUEVO ESTUDIANTE --> ADMINISTRADOR
@app.route('/api/createstudent', methods=['POST'])
def new_stud():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    if "last_name" not in body:
        return jsonify({"msg": "Debes escribir un apellido"}), 400
    if "cardID_type" not in body:
        return jsonify({"msg": "Debes seleccionar un tipo de identificacion"}), 400
    if "number_cardID" not in body:
       return jsonify({"msg": "Debes escribir un numero de identificacion"}), 400
    if "email" not in body:
        return jsonify({"msg": "El campo email es obligatorio"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "password" not in body:
        return jsonify({"msg": "Debes escribir una contraseña"}), 400
    
    new_stud = Student()
    new_stud.name = body["name"]
    new_stud.last_name = body["last_name"]
    new_stud.cardID_type = body["cardID_type"]
    new_stud.number_cardID = body["number_cardID"]
    new_stud.email = body["email"]
    new_stud.phone_number = body["phone_number"]
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_stud.password = pw_hash
    new_stud.user_type = "student"
   
    try:
        db.session.add(new_stud)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al crear un nuevo estudiante"}), 500

    return jsonify({"new_stud": new_stud.serialize()}), 201

@app.route('/api/addprofessorpayment', methods=['POST'])
def new_profpay():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "payment_method" not in body:
        return jsonify({"msg": "Debes seleccionar un tipo de pago"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "iban_account" not in body:
        return jsonify({"msg": "Debes registrar una cuenta IBAN"}), 400
    if "professor_id" not in body:
        return jsonify({"msg": "Debes seleccionar un professor"}), 400
    
    new_profpay = ProfessorPayment()
    new_profpay.payment_method = body["payment_method"]
    new_profpay.phone_number = body["phone_number"]
    new_profpay.iban_account = body["iban_account"]
    new_profpay.professor_id = body["professor_id"]

    try:
        db.session.add(new_profpay)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al crear un nuevo método pago profesor"}), 500

    return jsonify({"new_profpay": new_profpay.serialize()}), 201

    # try:
    #     db.session.add(new_profpay)
    #     db.session.commit()
    # except Exception as error:
    #     return jsonify({"msg": error.args[0]}), 500

    # return jsonify({"msg": "OK"}), 200

@app.route('/api/addstudentpayment', methods=['POST'])
def new_studpay():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "date" not in body:
        return jsonify({"msg": "Debes registrar una fecha de pago"}), 400
    if "mount" not in body:
        return jsonify({"msg": "Debes registrar un monto a pagar"}), 400
    if "student_id" not in body:
        return jsonify({"msg": "Debes seleccionar un estudiante"}), 400
    
    new_studpay = StudentPayment()
    new_studpay.date = body["date"]
    new_studpay.mount = body["mount"]
    new_studpay.student_id = body["student_id"]

    try:
        db.session.add(new_studpay)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al crear un nuevo pago estudiante"}), 500

    return jsonify({"new_studpay": new_studpay.serialize()}), 201

# MÉTODO POST --> AGREGAR DATOS PARA FACTURA ELECTRONICA --> ESTUDIANTES
@app.route('/api/addelectronicinvoiceinfo', methods=['POST'])
@jwt_required()
def new_electinv():
    identity = get_jwt_identity()
    print(identity, "TOKEN")
    student = Student.query.filter_by(id = identity['id']).first()
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    if "cardID_type" not in body:
        return jsonify({"msg": "Debes seleccionar un tipo de identificacion"}), 400
    if "number_cardID" not in body:
        return jsonify({"msg": "Debes escribir un numero de identificacion"}), 400
    if "email" not in body:
        return jsonify({"msg": "Debes registrar un correo"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "province" not in body:
        return jsonify({"msg": "Debes escribir una provincia"}), 400
    if "canton" not in body:
        return jsonify({"msg": "Debes escribir un canton"}), 400
    if "distric" not in body:
        return jsonify({"msg": "Debes escribir un distrito"}), 400
    if "student_id" not in body:
        return jsonify({"msg": "Debes seleccionar un estudiante"}), 400
    
    new_electinv = ElectronicInvoice()
    new_electinv.name = body["name"]
    new_electinv.cardID_type = body["cardID_type"]
    new_electinv.number_cardID = body["number_cardID"]
    new_electinv.email = body["email"]
    new_electinv.phone_number = body["phone_number"]
    new_electinv.province = body["province"]
    new_electinv.canton = body["canton"]
    new_electinv.distric = body["distric"]
    new_electinv.student_id = student.id

    try:
        db.session.add(new_electinv)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al crear una nueva facturación electrónica"}), 500

    return jsonify({"new_electinv": new_electinv.serialize()}), 201

    # try:
    #     db.session.add(new_electinv)
    #     db.session.commit()
    # except Exception as error:
    #     return jsonify({"msg": error.args[0]}), 500

    # return jsonify({"msg": "OK"}), 200

@app.route('/api/addcourse', methods=['POST'])
def add_course():

    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes agregar el nombre del nuevo curso"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes agregar el nombre del nuevo curso"}), 400
    
    add_course = Course()
    add_course.name = body["name"]


    try:
        db.session.add(add_course)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al crear un nuevo curso"}), 500

    return jsonify({"new_course_added": add_course.serialize()}), 201


# @app.route('/api/addmodality', methods=['POST'])
# def new_modality():
#     body = request.get_json(silent=True)
#     if body is None:
#         return jsonify({"msg": "Debes escribir un tipo de modalida"}), 400
#     if "name" not in body:
#         return jsonify({"msg": "Debes escribir un tipo de modalidad"}), 400
    
#     new_modality = Modality()
#     new_modality.name = body["name"]

#     try:
#         db.session.add(new_modality)
#         db.session.commit()
#     except Exception as error:
#         db.session.rollback()
#         print(error)
#         return jsonify({"msg": "Ocurrió un error al crear una nueva modalidad"}), 500

#     return jsonify({"new_modality_added": new_modality.serialize()}), 201

    # try:
    #     db.session.add(new_modality)
    #     db.session.commit()
    # except Exception as error:
    #     return jsonify({"msg": error.args[0]}), 500

    # return jsonify({"msg": "OK"}), 200

@app.route('/api/newcourseregistration', methods=['POST'])
def new_course_registration():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "professor_id" not in body:
        return jsonify({"msg": "Debes seleccionar un profesor"}), 400
    if "student_id" not in body:
        return jsonify({"msg": "Debes seleccionar un estudiante"}), 400
    # if "modality_id" not in body:
    #     return jsonify({"msg": "Debes seleccionar una modalidad del curso"}), 400
    if "course_id" not in body:
        return jsonify({"msg": "Debes seleccionar un curso"}), 400
    
    new_course_registration = NewCourse()
    new_course_registration.professor_id = body["professor_id"]
    new_course_registration.student_id = body["student_id"]
    # new_course_registration.modality_id = body["modality_id"]
    new_course_registration.course_id = body["course_id"]

    try:
        db.session.add(new_course_registration)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al registrar un nuevo curso"}), 500

    return jsonify({"new_course_registered": new_course_registration.serialize()}), 201
    

if __name__ == "__main__":
    app.run(debug=True)


    

#------------------------------------------------------#
#App Route para los metodos PUT

@app.route('/api/editadministratorinfo/<int:number_cardID>', methods=['PUT'])
def update_admin(number_cardID):
    body = request.get_json(silent=True)
    admin_to_update = Administrator.query.filter_by(number_cardID = number_cardID).first()
    if admin_to_update is None:
        return jsonify({"msg": "Administrador no encontrado"}), 404
    if "name" in body:
        admin_to_update.name = body["name"]
    if "last_name" in body:
        admin_to_update.last_name = body["last_name"]
    if "phone_number" in body:
        admin_to_update.phone_number = body["phone_number"]

    try:
        db.session.add(admin_to_update)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al tratar de actualizar la información"}), 500

    return jsonify({"updated_admin": admin_to_update.serialize()}), 201

@app.route('/api/personalinfo/editprofessorinfo', methods=['PUT'])
@jwt_required()
def update_profe():
    identity = get_jwt_identity()
    body = request.get_json(silent=True)
    profe_to_update = Professor.query.filter_by(email = identity['email']).first()
    if profe_to_update is None:
        return jsonify({"msg": "Profesor no encontrado"}), 404
    if "name" in body:
        profe_to_update.name = body["name"]
    if "last_name" in body:
        profe_to_update.last_name = body["last_name"]
    if "phone_number" in body:
        profe_to_update.phone_number = body["phone_number"]
    if "birthday" in body:
        profe_to_update.birthday = body["birthday"]
    if "email" in body:
        profe_to_update.email = body["email"]
    if "province" in body:
        profe_to_update.province = body["province"]
    if "canton" in body:
        profe_to_update.canton = body["canton"]
    if "district" in body:
        profe_to_update.district = body["district"]

    try:
        db.session.add(profe_to_update)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al tratar de actualizar la información"}), 500

    return jsonify({"updated_professor": profe_to_update.serialize()}), 201

@app.route('/api/personalinfo/editstudentinfo/', methods=['PUT'])
@jwt_required()
def update_student():
    identity = get_jwt_identity()
    body = request.get_json(silent=True)
    student_to_update = Student.query.filter_by(email = identity['email']).first()
    if student_to_update is None:
        return jsonify({"msg": "Estudiante no encontrado"}), 404
    if body is None:
        return jsonify({"msg": "Debes agregar la información solicitada"}), 400
    if "name" in body:
        student_to_update.name = body["name"]
    if "last_name" in body:
        student_to_update.last_name = body["last_name"]
    if "phone_number" in body:
        student_to_update.phone_number = body["phone_number"]
    if "birthday" in body:
        student_to_update.birthday = body["birthday"]
    if "email" in body:
        student_to_update.email = body["email"]
    if "province" in body:
        student_to_update.province = body["province"]
    if "canton" in body:
        student_to_update.canton = body["canton"]
    if "district" in body:
        student_to_update.district = body["district"]

    try:
        db.session.add(student_to_update)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al tratar de actualizar la información"}), 500

    return jsonify({"updated_student": student_to_update.serialize()}), 201

@app.route('/api/editprofessorpaymentinfo/<int:id>', methods=['PUT'])
def update_profpay(id):
    body = request.get_json(silent=True)
    profpay_to_update = ProfessorPayment.query.get(id)
    if profpay_to_update is None:
        return jsonify({"msg": "Profesor no encontrado"}), 404
    if "payment_method" in body:
        profpay_to_update.payment_method = body["payment_method"]
    if "phone_number" in body:
        profpay_to_update.phone_number = body["phone_number"]
    if "iban_account" in body:
        profpay_to_update.iban_account = body["iban_account"]

    try:
        db.session.add(profpay_to_update)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al tratar de actualizar la información"}), 500

    return jsonify({"updated_profpay": profpay_to_update.serialize()}), 201

@app.route('/api/editstudentpaymentinfo/<int:id>', methods=['PUT'])
def update_studpay(id):
    body = request.get_json(silent=True)
    studpay_to_update = StudentPayment.query.get(id)
    if studpay_to_update is None:
        return jsonify({"msg": "Estudiante no encontrado"}), 404
    if "date" in body:
        studpay_to_update.date = body["date"]
    if "mount" in body:
        studpay_to_update.mount = body["mount"]

    try:
        db.session.add(studpay_to_update)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al tratar de actualizar la información"}), 500

    return jsonify({"updated_studpay": studpay_to_update.serialize()}), 201

@app.route('/api/editelectronicinvoiceinfo/<int:id>', methods=['PUT'])
def update_electinv(id):
    body = request.get_json(silent=True)
    electinv_to_update = ElectronicInvoice.query.get(id)
    if electinv_to_update is None:
        return jsonify({"msg": "Profesor no encontrado"}), 404
    if "name" in body:
        electinv_to_update.name = body["name"]
    if "cardId_type" in body:
        electinv_to_update.cardID_type = body["cardID_type"]
    if "number_cardID" in body:
        electinv_to_update.number_cardID = body["number_cardID"]
    if "email" in body:
        electinv_to_update.email = body["email"]
    if "phone_number" in body:
        electinv_to_update.phone_number = body["phone_number"]
    if "province" in body:
        electinv_to_update.province = body["province"]
    if "canton" in body:
        electinv_to_update.canton = body["canton"]
    if "district" in body:
        electinv_to_update.district = body["district"]

    try:
        db.session.add(electinv_to_update)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al tratar de actualizar la información"}), 500

    return jsonify({"updated_electinv": electinv_to_update.serialize()}), 201

@app.route('/api/editcourse/<int:id>', methods=['PUT'])
def update_course(id):
    body = request.get_json(silent=True)
    course_to_update = Course.query.get(id)
    if course_to_update is None:
        return jsonify({"msg": "Curso no encontrado"}), 404
    if "name" in body:
        course_to_update.name = body["name"]

    try:
        db.session.add(course_to_update)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al tratar de actualizar la información"}), 500

    return jsonify({"updated_course": course_to_update.serialize()}), 201

@app.route('/api/editmodality/<int:id>', methods=['PUT'])
def update_modality(id):
    body = request.get_json(silent=True)
    modality_to_update = Modality.query.get(id)
    if modality_to_update is None:
        return jsonify({"msg": "Curso no encontrado"}), 404
    if "name" in body:
        modality_to_update.name = body["name"]


#     try:
#         db.session.add(modality_to_update)
#         db.session.commit()
#     except Exception as error:
#         db.session.rollback()
#         print(error)
#         return jsonify({"msg": "Ocurrió un error al tratar de actualizar la información"}), 500

#     return jsonify({"updated_modality": modality_to_update.serialize()}), 201

@app.route('/api/editregisteredcourse/<int:id>', methods=['PUT'])
def update_registered_course(id):
    body = request.get_json(silent=True)
    registered_course_to_update = NewCourse.query.get(id)
    if registered_course_to_update is None:
        return jsonify({"msg": "Curso no encontrado"}), 404
    if "professor_id" in body:
        registered_course_to_update.professor_id = body["professor_id"]
    if "modality_id" in body:
        registered_course_to_update.modality_id = body["modality_id"]

    try:
        db.session.add(registered_course_to_update)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al tratar de actualizar la información"}), 500

    return jsonify({"updated_registered_course": registered_course_to_update.serialize()}), 201

@app.route('/api/search/students',methods=['POST'])
def handle_search_students():
    body = request.get_json(silent=True)
    print(body, "BODY")
    term = body.get('term', None)
    print(term, "TERMINO")
    if term is not None:
        students = Student.query.filter((unaccent(Student.name).ilike("%"+term+"%"))).all()
        response = [student.serialize() for student in students]

        if students:
            return jsonify({"result": response}), 200
        
        return jsonify({"msg": "No se encuentran estudiantes"}), 404
    return jsonify({"msg": "Es necesario el término de búsqueda"}), 400

@app.route('/api/search/professors',methods=['POST'])
def handle_search_professors():
    body = request.get_json(silent=True)
    print(body, "BODY")
    term = body.get('term', None)
    print(term, "TERMINO")
    if term is not None:
        professors = Professor.query.filter((unaccent(Professor.name).ilike("%"+term+"%"))).all()
        response = [professor.serialize() for professor in professors]

        if professors:
            return jsonify({"result": response}), 200
        
        return jsonify({"msg": "No se encuentran profesores"}), 404
    return jsonify({"msg": "Es necesario el término de búsqueda"}), 400

@app.route('/api/search/courses',methods=['POST'])
def handle_search_courses():
    body = request.get_json(silent=True)
    print(body, "BODY")
    term = body.get('term', None)
    print(term, "TERMINO")
    if term is not None:
        courses = Course.query.filter((unaccent(Course.name).ilike("%"+term+"%"))).all()
        response = [course.serialize() for course in courses]

        if courses:
            return jsonify({"result": response}), 200
        
        return jsonify({"msg": "No se encuentran cursos"}), 404
    return jsonify({"msg": "Es necesario el término de búsqueda"}), 400

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
