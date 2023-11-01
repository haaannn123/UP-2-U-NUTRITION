import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.event_routes import event_routes
from .api.menu_item_routes import menu_item_routes
from .api.ingredient_routes import ingredient_routes
from .api.nutrition_routes import nutrition_routes
from .seeds import seed_commands
from .config import Config

from flask import make_response


app = Flask(__name__, static_folder='../vite-project/dist', static_url_path='/')
# app.run(debug=False)

CORS(app, supports_credentials=True, origins="*", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(event_routes, url_prefix='/api/events')
app.register_blueprint(menu_item_routes, url_prefix='/api/menus')
app.register_blueprint(ingredient_routes, url_prefix='/api/ingredients')
app.register_blueprint(nutrition_routes, url_prefix='/api/nutritions')
db.init_app(app)
Migrate(app, db)

# Application Security
# CORS(app, resources={r"/api/*": {"origins": "*"}})


# @app.route('/test')
# def test_route():
#     return "Flask backend is working!"
def before_request():
    if request.method == 'OPTIONS':
        request._csrf_disabled = True


# May need this later for https redirect
# @app.before_request
# def https_redirect():
#     if os.environ.get('FLASK_ENV') == 'production':
#         if request.headers.get('X-Forwarded-Proto') == 'http':
#             url = request.url.replace('http://', 'https://', 1)
#             code = 301
#             return redirect(url, code=code)

# @app.after_request
# def inject_csrf_token(response):
#     response.set_cookie('csrf_token', generate_csrf(), httponly=True)
#     return response


@app.after_request
def inject_csrf_token(response):

    # Generate a new CSRF token
    csrf_token = generate_csrf()

    # Print both the generated CSRF token and the value of the "csrf_token" cookie for comparison
    print('Generated CSRF Token:=========', csrf_token)
    response.set_cookie(
        'csrf_token',
        csrf_token,
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    # csrf_token_from_cookies = request.cookies.get('csrf_token')
    # print('CSRF Token from Cookies:=========', csrf_token_from_cookies)
    # print("==================",response)
    return response

@app.route('/set-cookie')
def set_cookie():
    resp = make_response("Cookie Set")
    resp.set_cookie('test_cookie', 'test_value')
    return resp

@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
