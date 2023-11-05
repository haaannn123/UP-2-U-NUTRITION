from flask import Blueprint, flash,request,jsonify
from flask_login import login_required, current_user
from datetime import date
from ..models.db import db
from ..models.menus import MenuItem,Ingredient,Nutrition
from ..forms.menu_form import MenuForm,IngredientForm,NutritionForm

ingredient_routes = Blueprint("ingredients",__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@ingredient_routes.route("<int:id>/update", methods=['PUT'])
# @login_required
def update_ingredient(id):
    form = IngredientForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        ingredient = Ingredient.query.get(id)
        menu_id = ingredient.menu_id

        ingredient.ingredient_name = form.data['ingredient_name']
        ingredient.menu_id = menu_id

        db.session.commit()
        return {"resIngredient":ingredient.to_dict()}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@ingredient_routes.route("<int:id>/delete", methods=['DELETE'])
# @login_required
def delete_ingredient(id):
    ingredient = Ingredient.query.get(id)

    db.session.delete(ingredient)
    db.session.commit()
    return {"res":"Successfully deleted"}
