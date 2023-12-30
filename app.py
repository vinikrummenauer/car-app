from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@127.0.0.1:3306/appreact'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'verzelApp'

db = SQLAlchemy(app)
jwt = JWTManager(app)

class Carro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    marca = db.Column(db.String(100))
    modelo = db.Column(db.String(100))
    foto = db.Column(db.String(100))
    preco = db.Column(db.Float)
    localizacao = db.Column(db.String(100))

class Usuarios(db.Model):
    usuario_id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(50), unique=True)
    perfil = db.Column(db.String(100))
    senha = db.Column(db.String(100))

@app.route('/login', methods=['POST'])
def login():
    usuario = request.json.get('usuario')
    senha = request.json.get('senha')

    user = Usuarios.query.filter_by(usuario=usuario).first()

    if user and user.senha == senha:
        access_token = create_access_token(identity=usuario)
        return jsonify(resultado=True, access_token=access_token, user_id=user.usuario_id, user_nome=user.usuario, perfil=user.perfil)

    return jsonify(resultado=False, message='Credenciais inválidas')

@app.route('/register', methods=['POST'])
def register():
    usuario = request.json.get('usuario')
    senha = request.json.get('senha')
    existing_user = Usuarios.query.filter_by(usuario=usuario).first()

    if existing_user:
        return jsonify(resultado=False, message='Usuário já existe')

    novo_usuario = Usuarios(usuario=usuario, senha=senha)
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify(resultado=True, message='Usuário registrado com sucesso!')

@app.route('/carros', methods=['GET'])
@jwt_required() 
def get_carros():
    print(get_jwt_identity())
    carros = Carro.query.order_by(Carro.preco).all()
    lista_carros = [{
        'id': carro.id,
        'nome': carro.nome,
        'marca': carro.marca,
        'modelo': carro.modelo,
        'foto': carro.foto,
        'preco': carro.preco,
        'localizacao': carro.localizacao
    } for carro in carros]
    return jsonify(lista_carros)

@app.route('/carros', methods=['POST'])
@jwt_required()
def criar_carro():
    dados = request.json
    novo_carro = Carro(**dados)
    db.session.add(novo_carro)
    db.session.commit()
    return jsonify({'message': 'Veículo criado com sucesso!', 'resultado': True})

@app.route('/carros/<int:carro_id>', methods=['PUT'])
@jwt_required()
def atualizar_carro(carro_id):
    carro = Carro.query.get(carro_id)
    if not carro:
        return jsonify({'error': 'Veículo não encontrado'}), 404
    dados_atualizados = request.json
    for key, value in dados_atualizados.items():
        setattr(carro, key, value)
    db.session.commit()
    return jsonify({'message': 'Veículo atualizado com sucesso!', 'resultado': True})

@app.route('/carros/<int:carro_id>', methods=['DELETE'])
@jwt_required()
def deletar_carro(carro_id):
    carro = Carro.query.get(carro_id)
    if not carro:
        return jsonify({'error': 'Veículo não encontrado'}), 404
    db.session.delete(carro)
    db.session.commit()
    return jsonify({'message': 'Veículo removido com sucesso!', 'resultado': True})

if __name__ == '__main__':
    app.run(debug=True)
