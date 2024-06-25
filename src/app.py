"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
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
from api.models import Modality
from api.models import NewCourse
from flask_cors import CORS

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

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
#App Route para los metodos GET

@app.route('/api/administrators', methods=['GET'])
def get_all_administrator():
    all_admins = Administrator.query.all()
    admins_serialized = []
    for admin in all_admins:
        admins_serialized.append(admin.serialize())
        print(admins_serialized)
    return jsonify({"administrators": admins_serialized}), 200

@app.route('/api/professors', methods=['GET'])
def get_all_professor():
    all_profes = Professor.query.all()
    profes_serialized = []
    for profe in all_profes:
        profes_serialized.append(profe.serialize())
        print(profes_serialized)
    return jsonify({"professors": profes_serialized}), 200

@app.route('/api/students', methods=['GET'])
def get_all_student():
    all_studs = Student.query.all()
    studs_serialized = []
    for stud in all_studs:
        studs_serialized.append(stud.serialize())
        print(studs_serialized)
    return jsonify({"students": studs_serialized}), 200

@app.route('/api/professorspayment', methods=['GET'])
def get_all_profpay():
    all_profpays = ProfessorPayment.query.all()
    profpays_serialized = []
    for profpay in all_profpays:
        profpays_serialized.append(profpay.serialize())
        print(profpays_serialized)
    return jsonify({"data": profpays_serialized}), 200

@app.route('/api/studentspayment', methods=['GET'])
def get_all_studpay():
    all_studpays = StudentPayment.query.all()
    studpays_serialized = []
    for studpay in all_studpays:
        studpays_serialized.append(studpay.serialize())
        print(studpays_serialized)
    return jsonify({"data": studpays_serialized}), 200

@app.route('/api/electronicinvoice', methods=['GET'])
def get_all_electinv():
    all_electinvs = ElectronicInvoice.query.all()
    electinvs_serialized = []
    for electinv in all_electinvs:
        electinvs_serialized.append(electinv.serialize())
        print(electinvs_serialized)
    return jsonify({"data": electinvs_serialized}), 200

@app.route('/api/courses', methods=['GET'])
def get_all_course():
    all_courses = Course.query.all()
    courses_serialized = []
    for course in all_courses:
        courses_serialized.append(course.serialize())
        print(courses_serialized)
    return jsonify({"courses": courses_serialized}), 200

@app.route('/api/modalities', methods=['GET'])
def get_all_modality():
    all_modalities = Modality.query.all()
    modalities_serialized = []
    for modality in all_modalities:
        modalities_serialized.append(modality.serialize())
        print(modalities_serialized)
    return jsonify({"data": modalities_serialized}), 200

@app.route('/api/newcourses', methods=['GET'])
def get_all_newcourses():
    all_newcourses = NewCourse.query.all()
    newcourses_serialized = []
    for newcourse in all_newcourses:
        newcourses_serialized.append(newcourse.serialize())
        print(newcourses_serialized)
    return jsonify({"data": newcourses_serialized}), 200


#----------------------------------------------#
#App Route para los metodos GET ID

@app.route('/api/administrator/<int:number_cardID>', methods=['GET'])
def get_single_admin(number_cardID):
    single_admin = Administrator.query.filter_by(number_cardID = number_cardID).first()
    if single_admin is None:
        return jsonify({"msg": "El administrador con el ID: {} no existe".format(number_cardID)}), 400
    return jsonify({"data": single_admin.serialize()}), 200

@app.route('/api/professor/<int:id>', methods=['GET'])
def get_single_profe(id):
    single_profe = Professor.query.get(id)
    if single_profe is None:
        return jsonify({"msg": "El profesor con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_profe.serialize()}), 200

@app.route('/api/student/<int:id>', methods=['GET'])
def get_single_stud(id):
    single_stud = Student.query.get(id)
    if single_stud is None:
        return jsonify({"msg": "El estudiante con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_stud.serialize()}), 200

@app.route('/api/professorpayment/<int:id>', methods=['GET'])
def get_single_profpay(id):
    single_profpay = ProfessorPayment.query.get(id)
    if single_profpay is None:
        return jsonify({"msg": "La informacion de pago con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_profpay.serialize()}), 200

@app.route('/api/studentpayment/<int:id>', methods=['GET'])
def get_single_studpay(id):
    single_studpay = StudentPayment.query.get(id)
    if single_studpay is None:
        return jsonify({"msg": "La informacion de pago con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_studpay.serialize()}), 200

@app.route('/api/electronicinvoice/<int:id>', methods=['GET'])
def get_single_electinv(id):
    single_electinv = ElectronicInvoice.query.get(id)
    if single_electinv is None:
        return jsonify({"msg": "La informacion de la factura electronica con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_electinv.serialize()}), 200

@app.route('/api/course/<int:id>', methods=['GET'])
def get_single_course(id):
    single_course = Course.query.get(id)
    if single_course is None:
        return jsonify({"msg": "El curso con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_course.serialize()}), 200

@app.route('/api/modality/<int:id>', methods=['GET'])
def get_single_modality(id):
    single_modality = Modality.query.get(id)
    if setup_commands is None:
        return jsonify({"msg": "La modalidad con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_modality.serialize()}), 200

@app.route('/api/newcourse/<int:id>', methods=['GET'])
def get_single_newcourse(id):
    single_newcourse = NewCourse.query.get(id)
    if single_newcourse is None:
        return jsonify({"msg": "El curso registrado con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_newcourse.serialize()}), 200

#------------------------------------------#
#App Route para los metodos POST

@app.route('/api/administrator', methods=['POST'])
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
    if "birthday" not in body:
        return jsonify({"msg": "Debes registrar su nacimiento"}), 400
    if "email" not in body:
        return jsonify({"msg": "El campo email es obligatorio"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "province" not in body:
        return jsonify({"msg": "Debes escribir una provincia"}), 400
    if "canton" not in body:
        return jsonify({"msg": "Debes escribir un canton"}), 400
    if "distric" not in body:
        return jsonify({"msg": "Debes escribir un distrito"}), 400
    if "password" not in body:
        return jsonify({"msg": "Debes escribir una contraseña"}), 400
    
    new_admin = Administrator()
    new_admin.name = body["name"]
    new_admin.last_name = body["last_name"]
    # new_admin.photo = body["photo"]
    new_admin.cardID_type = body["cardID_type"]
    new_admin.number_cardID = body["number_cardID"]
    new_admin.birthday = body["birthday"]
    new_admin.email = body["email"]
    new_admin.phone_number = body["phone_number"]
    new_admin.province = body["province"]
    new_admin.canton = body["canton"]
    new_admin.distric = body["distric"]
    new_admin.password = body["password"]
    try:
        db.session.add(new_admin)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/professor', methods=['POST'])
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
    if "birthday" not in body:
        return jsonify({"msg": "Debes registrar su nacimiento"}), 400
    if "email" not in body:
        return jsonify({"msg": "El campo email es obligatorio"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "province" not in body:
        return jsonify({"msg": "Debes escribir una provincia"}), 400
    if "canton" not in body:
        return jsonify({"msg": "Debes escribir un canton"}), 400
    if "distric" not in body:
        return jsonify({"msg": "Debes escribir un distrito"}), 400
    if "password" not in body:
        return jsonify({"msg": "Debes escribir una contraseña"}), 400
    
    new_profe = Professor()
    new_profe.name = body["name"]
    new_profe.last_name = body["last_name"]
    # new_profe.photo = body["photo"]
    new_profe.cardID_type = body["cardID_type"]
    new_profe.number_cardID = body["number_cardID"]
    new_profe.birthday = body["birthday"]
    new_profe.email = body["email"]
    new_profe.phone_number = body["phone_number"]
    new_profe.province = body["province"]
    new_profe.canton = body["canton"]
    new_profe.distric = body["distric"]
    new_profe.password = body["password"]
    
    try:
        db.session.add(new_profe)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"msg": "Ocurrió un error al crear un nuevo profesor"}), 500

    return jsonify({"data": new_profe.serialize()}), 201

@app.route('/api/student', methods=['POST'])
def new_stud():
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
    if "birthday" not in body:
        return jsonify({"msg": "Debes registrar su nacimiento"}), 400
    if "email" not in body:
        return jsonify({"msg": "El campo email es obligatorio"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "province" not in body:
        return jsonify({"msg": "Debes escribir una provincia"}), 400
    if "canton" not in body:
        return jsonify({"msg": "Debes escribir un canton"}), 400
    if "distric" not in body:
        return jsonify({"msg": "Debes escribir un distrito"}), 400
    if "password" not in body:
        return jsonify({"msg": "Debes escribir una contraseña"}), 400
    # if "student_payment" not in body:
    #     return jsonify({"msg": "Debes seleccionar un pago"}), 400
    # if "electronic_invoice" not in body:
    #     return jsonify({"msg": "Debes seleccionar si desea factura electronica"}), 400
    # if "new_course_student" not in body:
    #     return jsonify({"msg": "Debes seleccionar un estudiante"}), 400
    
    new_stud = Student()
    new_stud.name = body["name"]
    new_stud.last_name = body["last_name"]
    # new_stud.photo = body["photo"]
    new_stud.cardID_type = body["cardID_type"]
    new_stud.number_cardID = body["number_cardID"]
    new_stud.birthday = body["birthday"]
    new_stud.email = body["email"]
    new_stud.phone_number = body["phone_number"]
    new_stud.province = body["province"]
    new_stud.canton = body["canton"]
    new_stud.distric = body["distric"]
    new_stud.password = body["password"]
    # new_stud.student_payment = body["student_payment"]
    # new_stud.electronic_invoice = body["electronic_invoice"]
    # new_stud.new_course_student = body["new_course_student"]
    try:
        db.session.add(new_stud)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/professorpayment', methods=['POST'])
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
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/studentpayment', methods=['POST'])
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
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/electronicinvoice', methods=['POST'])
def new_electinv():
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
    new_electinv.student_id = body["student_id"]
    try:
        db.session.add(new_electinv)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/course', methods=['POST'])
def new_course():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400

    
    new_course = Course()
    new_course.name = body["name"]

    try:
        db.session.add(new_course)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/modality', methods=['POST'])
def new_modality():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    
    new_modality = Modality()
    new_modality.name = body["name"]

    try:
        db.session.add(new_modality)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/newcourse', methods=['POST'])
def new_newcourse():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "professor_id" not in body:
        return jsonify({"msg": "Debes seleccionar un profesor"}), 400
    if "student_id" not in body:
        return jsonify({"msg": "Debes seleccionar un estudiante"}), 400
    if "modality_id" not in body:
        return jsonify({"msg": "Debes seleccionar una modalidad del curso"}), 400
    if "course_id" not in body:
        return jsonify({"msg": "Debes seleccionar un curso"}), 400
    
    new_newcourse = NewCourse()
    new_newcourse.professor_id = body["professor_id"]
    new_newcourse.student_id = body["student_id"]
    new_newcourse.modality_id = body["modality_id"]
    new_newcourse.course_id = body["course_id"]
    try:
        db.session.add(new_newcourse)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

#------------------------------------------------------#
#App Route para los metodos PUT

@app.route('/api/administrator/<int:id>', methods=['PUT'])
def update_admin(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    if "last_name" not in body:
        return jsonify({"msg": "Debes escribir un apellido"}), 400
    if "photo" not in body:
        return jsonify({"msg": "Debes agregar una photo"}), 400
    if "birthday" not in body:
        return jsonify({"msg": "Debes registrar su nacimiento"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "province" not in body:
        return jsonify({"msg": "Debes escribir una provincia"}), 400
    if "canton" not in body:
        return jsonify({"msg": "Debes escribir un canton"}), 400
    if "dstrict" not in body:
        return jsonify({"msg": "Debes escribir un distrito"}), 400
    
    update_admin = Administrator.query.get(id)
    update_admin.name = body["name"]
    update_admin.last_name = body["last_name"]
    update_admin.photo = body["photo"]
    update_admin.birthday = body["birthday"]
    update_admin.phone_number = body["phone_number"]
    update_admin.province = body["province"]
    update_admin.canton = body["canton"]
    update_admin.distric = body["distric"]
    try:
        db.session.add(update_admin)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/professor/<int:id>', methods=['PUT'])
def update_profe(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    if "last_name" not in body:
        return jsonify({"msg": "Debes escribir un apellido"}), 400
    if "photo" not in body:
        return jsonify({"msg": "Debes agregar una photo"}), 400
    if "birthday" not in body:
        return jsonify({"msg": "Debes registrar su nacimiento"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "province" not in body:
        return jsonify({"msg": "Debes escribir una provincia"}), 400
    if "canton" not in body:
        return jsonify({"msg": "Debes escribir un canton"}), 400
    if "dstrict" not in body:
        return jsonify({"msg": "Debes escribir un distrito"}), 400
    
    update_profe = Professor.query.get(id)
    update_profe.name = body["name"]
    update_profe.last_name = body["last_name"]
    update_profe.photo = body["photo"]
    update_profe.birthday = body["birthday"]
    update_profe.phone_number = body["phone_number"]
    update_profe.province = body["province"]
    update_profe.canton = body["canton"]
    update_profe.distric = body["distric"]
    try:
        db.session.add(update_profe)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/student/<int:id>', methods=['PUT'])
def update_stud(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    if "last_name" not in body:
        return jsonify({"msg": "Debes escribir un apellido"}), 400
    if "photo" not in body:
        return jsonify({"msg": "Debes agregar una photo"}), 400
    if "birthday" not in body:
        return jsonify({"msg": "Debes registrar su nacimiento"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "province" not in body:
        return jsonify({"msg": "Debes escribir una provincia"}), 400
    if "canton" not in body:
        return jsonify({"msg": "Debes escribir un canton"}), 400
    if "dstrict" not in body:
        return jsonify({"msg": "Debes escribir un distrito"}), 400
    
    update_stud = Student.query.get(id)
    update_stud.name = body["name"]
    update_stud.last_name = body["last_name"]
    update_stud.photo = body["photo"]
    update_stud.birthday = body["birthday"]
    update_stud.phone_number = body["phone_number"]
    update_stud.province = body["province"]
    update_stud.canton = body["canton"]
    update_stud.distric = body["distric"]
    try:
        db.session.add(update_stud)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/professorpayment/<int:id>', methods=['PUT'])
def update_profpay(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "payment_method" not in body:
        return jsonify({"msg": "Debes seleccionar un tipo de pago"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "iban_account" not in body:
        return jsonify({"msg": "Debes registrar una cuenta IBAN"}), 400
    
    update_profpay = ProfessorPayment.query.get(id)
    update_profpay.payment_method = body["payment_method"]
    update_profpay.phone_number = body["phone_number"]
    update_profpay.iban_account = body["iban_account"]
    try:
        db.session.add(update_profpay)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/studentpayment/<int:id>', methods=['PUT'])
def update_studpay(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "date" not in body:
        return jsonify({"msg": "Debes registrar una fecha de pago"}), 400
    if "mount" not in body:
        return jsonify({"msg": "Debes registrar un monto a pagar"}), 400
    
    update_studpay = StudentPayment.query.get(id)
    update_studpay.date = body["date"]
    update_studpay.mount = body["mount"]
    try:
        db.session.add(update_studpay)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/electronicinvoice/<int:id>', methods=['PUT'])
def update_electinv(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    if "cardID_type" not in body:
        return jsonify({"msg": "Debes seleccionar un tipo de identificacion"}), 400
    if "number_cardID" not in body:
        return jsonify({"msg": "Debes escribir un numero de identidicacion"}), 400
    if "email" not in body:
        return jsonify({"msg": "El campo email es obligatorio"}), 400
    if "phone_number" not in body:
        return jsonify({"msg": "Debes registrar un telefono"}), 400
    if "province" not in body:
        return jsonify({"msg": "Debes escribir una provincia"}), 400
    if "canton" not in body:
        return jsonify({"msg": "Debes escribir un canton"}), 400
    if "dstrict" not in body:
        return jsonify({"msg": "Debes escribir un distrito"}), 400
    
    update_electinv = ElectronicInvoice.query.get(id)
    update_electinv.name = body["name"]
    update_electinv.cardID_type = body["cardID_type"]
    update_electinv.number_cardID = body["number_cardID"]
    update_electinv.email = body["email"]
    update_electinv.phone_number = body["phone_number"]
    update_electinv.province = body["province"]
    update_electinv.canton = body["canton"]
    update_electinv = body["distric"]
    try:
        db.session.add(update_electinv)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/course/<int:id>', methods=['PUT'])
def update_course(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    
    update_course = Course.query.get(id)
    update_course.name = body["name"]
    try:
        db.session.add(update_course)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/modality/<int:id>', methods=['PUT'])
def update_modality(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "name" not in body:
        return jsonify({"msg": "Debes escribir un nombre"}), 400
    
    update_modality = Modality.query.get(id)
    update_modality.name = body["name"]
    try:
        db.session.add(update_modality)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

@app.route('/api/newcourse/<int:id>', methods=['PUT'])
def update_newcourse(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes completar toda la informacion para continuar"}), 400
    if "professor_id" not in body:
        return jsonify({"msg": "Debes seleccionar un profesor"}), 400
    if "modality_id" not in body:
        return jsonify({"msg": "Debes seleccionar una modalidad del curso"}), 400
    
    update_newcourse = NewCourse.query.get(id)
    update_newcourse.professor_id = body["professor_id"]
    update_newcourse.modality_id = body["modality_id"]
    try:
        db.session.add(update_newcourse)
        db.session.commit()
    except Exception as error:
        return jsonify({"msg": error.args[0]}), 500

    return jsonify({"msg": "OK"}), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
