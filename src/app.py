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
from models import db, Administrator
from models import db, Professor
from models import db, Student
from models import db, ProfessorPayment
from models import db, StudentPayment
from models import db, ElectronicInvoice
from models import db, Course
from models import db, Modality
from models import db, NewCourse

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
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

@app.route('api/administrator', methods=['GET'])
def get_all_administrator():
    all_admins = Administrator.query.all()
    admins_serialized = []
    for admin in all_admins:
        admins_serialized.append(admin.serialize())
        print(admins_serialized)
    return jsonify({"data": "all_admin"}), 200

@app.route('api/professor', methods=['GET'])
def get_all_professor():
    all_profes = Professor.query.all()
    profes_serialized = []
    for profe in all_profes:
        profes_serialized.append(profe.serialize())
        print(profes_serialized)
    return jsonify({"data": "all_profe"}), 200

@app.route('api/student', methods=['GET'])
def get_all_student():
    all_studs = Student.query.all()
    studs_serialized = []
    for stud in all_studs:
        studs_serialized.append(stud.serialize())
        print(studs_serialized)
    return jsonify({"data": "all_profe"}), 200

@app.route('api/professorpayment', methods=['GET'])
def get_all_profpay():
    all_profpays = ProfessorPayment.query.all()
    profpays_serialized = []
    for profpay in all_profpays:
        profpays_serialized.append(profpay.serialize())
        print(profpays_serialized)
    return jsonify({"data": "all_profpay"}), 200

@app.route('api/studentpayment', methods=['GET'])
def get_all_studpay():
    all_studpays = StudentPayment.query.all()
    studpays_serialized = []
    for studpay in all_studpays:
        studpays_serialized.append(studpay.serialize())
        print(studpays_serialized)
    return jsonify({"data": "all_studpay"}), 200

@app.route('api/electronicinvoice', methods=['GET'])
def get_all_electinv():
    all_electinvs = ElectronicInvoice.query.all()
    electinvs_serialized = []
    for electinv in all_electinvs:
        electinvs_serialized.append(electinv.serialize())
        print(electinvs_serialized)
    return jsonify({"data": "all_electinv"}), 200

@app.route('api/course', methods=['GET'])
def get_all_course():
    all_courses = Course.query.all()
    courses_serialized = []
    for course in all_courses:
        courses_serialized.append(course.serialize())
        print(courses_serialized)
    return jsonify({"data": "all_course"}), 200

@app.route('api/modality', methods=['GET'])
def get_all_modality():
    all_modalities = Modality.query.all()
    modalities_serialized = []
    for modality in all_modalities:
        modalities_serialized.append(modality.serialize())
        print(modalities_serialized)
    return jsonify({"data": "all_modality"}), 200

@app.route('api/newcourses', methods=['GET'])
def get_all_newcourses():
    all_newcourses = NewCourse.query.all()
    newcourses_serialized = []
    for newcourse in all_newcourses:
        newcourses_serialized.append(newcourse.serialize())
        print(newcourses_serialized)
    return jsonify({"data": "all_newcourse"}), 200

#----------------------------------------------#
#App Route para los metodos GET ID

@app.route("/administrator/<int:id>", methods=['GET'])
def get_single_admin(id):
    single_admin = Administrator.query.get(id)
    if single_admin is None:
        return jsonify({"msg": "El administrador con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_admin.serialize()}), 200

@app.route("/professor/<int:id>", methods=['GET'])
def get_single_profe(id):
    single_profe = Professor.query.get(id)
    if single_profe is None:
        return jsonify({"msg": "El profesor con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_profe.serialize()}), 200

@app.route("/student/<int:id>", methods=['GET'])
def get_single_stud(id):
    single_stud = Student.query.get(id)
    if single_stud is None:
        return jsonify({"msg": "El estudiante con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_stud.serialize()}), 200

@app.route("/professorpayment/<int:id>", methods=['GET'])
def get_single_profpay(id):
    single_profpay = ProfessorPayment.query.get(id)
    if single_profpay is None:
        return jsonify({"msg": "La informacion de pago con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_profpay.serialize()}), 200

@app.route("/studentpayment/<int:id>", methods=['GET'])
def get_single_studpay(id):
    single_studpay = StudentPayment.query.get(id)
    if single_studpay is None:
        return jsonify({"msg": "La informacion de pago con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_studpay.serialize()}), 200

@app.route("/electronicinvoice/<int:id>", methods=['GET'])
def get_single_electinv(id):
    single_electinv = ElectronicInvoice.query.get(id)
    if single_electinv is None:
        return jsonify({"msg": "La informacion de la factura electronica con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_electinv.serialize()}), 200

@app.route("/course/<int:id>", methods=['GET'])
def get_single_course(id):
    single_course = Course.query.get(id)
    if single_course is None:
        return jsonify({"msg": "El curso con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_course.serialize()}), 200

@app.route("/modality/<int:id>", methods=['GET'])
def get_single_modality(id):
    single_modality = Modality.query.get(id)
    if setup_commands is None:
        return jsonify({"msg": "La modalidad con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_modality.serialize()}), 200

@app.route("/newcourse/<int:id>", methods=['GET'])
def get_single_newcourse(id):
    single_newcourse = NewCourse.query.get(id)
    if single_newcourse is None:
        return jsonify({"msg": "El curso registrado con el ID: {} no existe".format(id)}), 400
    return jsonify({"data": single_newcourse.serialize()}), 200

#------------------------------------------#
#App Route para los metodos POST



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
