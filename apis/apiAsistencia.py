from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, methods=["GET", "POST", "PUT", "DELETE"])

profesores = [
    {
        "id": 1,
        "nombre": "Juan Perez",
        "cursos": [
            {
                "id": 1,
                "nombre": "Matematicas",
                "codigo": "PGY0014",
                "seccion": "013V",
                "alumnos": [
                    {"id": 1, "rut": "14.356.789-5", "nombre": "Pedro salas", "status": 0},
                    {"id": 2, "rut": "19.834.562-K", "nombre": "Maria Jose", "status": 0},
                    {"id": 3, "rut": "17.025.349-2", "nombre": "Andres Vencep", "status": 0}
                ]
            },
            {
                "id": 2,
                "nombre": "Fisica",
                "codigo": "PGY0012",
                "seccion": "015V",
                "alumnos": [
                    {"id": 1, "rut": "13.456.278-9", "nombre": "Alan Brito", "status":0},
                    {"id": 2, "rut": "20.768.543-4", "nombre": "Armando Meza", "status":0},
                    {"id": 3, "rut": "22.123.345-3", "nombre": "Pedro Pascal", "status":0}
                ]
            },
            {
                "id": 3,
                "nombre": "Quimica",
                "codigo": "PGY0011",
                "seccion": "018V",
                "alumnos": [
                    {"id": 1, "rut": "18.654.239-7", "nombre": "Elsa Quito", "status":0},
                    {"id": 2, "rut": "12.345.678-K","nombre": "Cruela Devil", "status":0},
                    {"id": 3, "rut": "15.098.234-8","nombre": "Rubio Moreno", "status":0}
                ]
            }
        ]
    }
]


usuarios = [
    {
        "id": 1,
        "user": "docente",
        "password": "pass1",
        "nombre": "Juan Perez",
        "perfil":  1,
        "correo": "docente@gmail.com"
    },
    {
        "id": 2,
        "user": "alumno",
        "password": "pass2",
        "nombre": "Luis Gonzalez",
        "perfil": 2,
        "correo": "alumno@gmail.com"
    }
]


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('user')
    password = request.json.get('password')
    
    usuario = next((u for u in usuarios if u["user"] == username and u["password"] == password), None)
    
    if usuario:
        return jsonify({
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "user": usuario["user"],
            "correo": usuario["correo"],
            "tipoPerfil": usuario["perfil"]
        }), 200
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401


@app.route('/profesores', methods=['GET'])
def obtener_profesores():
    return jsonify(profesores), 200

@app.route('/profesores/<int:profesor_id>/cursos', methods=['GET'])
def obtener_cursos_profesor(profesor_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    return jsonify(profesor["cursos"]), 200

@app.route('/profesores/<int:profesor_id>/cursos/<int:curso_id>/alumnos', methods=['GET'])
def obtener_alumnos_curso(profesor_id, curso_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    curso = next((c for c in profesor["cursos"] if c["id"] == curso_id), None)
    if not curso:
        return jsonify({"message": "Curso no encontrado"}), 404
    return jsonify(curso["alumnos"]), 200

@app.route('/registrar_asistencia', methods=['POST'])
def registrar_asistencia():
    alumno_id = request.json.get('alumno_id')
    codigo = request.json.get('codigo')
    seccion = request.json.get('seccion')
    fecha = request.json.get('fecha')
    
    # Aquí buscarías el curso y al alumno y actualizarías su estado.
    for profesor in profesores:
        for curso in profesor["cursos"]:
            if curso["codigo"] == codigo and curso["seccion"] == seccion:
                for alumno in curso["alumnos"]:
                    if alumno["id"] == alumno_id:
                        alumno["status"] = 1  # 1 es para presente
                        return jsonify({"message": "Asistencia registrada"}), 200
    
    return jsonify({"message": "No se pudo registrar la asistencia"}), 400


if __name__ == '__main__':
    app.run(debug=True)
