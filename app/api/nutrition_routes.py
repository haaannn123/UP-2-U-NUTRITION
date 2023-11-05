from flask import Blueprint, flash,request,jsonify
from flask_login import login_required, current_user
from datetime import date
from ..models.db import db
from ..models.menus import MenuItem,Ingredient,Nutrition
from ..forms.menu_form import MenuForm,IngredientForm,NutritionForm


nutrition_routes = Blueprint("nutritions",__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@nutrition_routes.route("<int:id>/update", methods=['PUT'])
# @login_required
def update_nutrition(id):
    form = NutritionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        nutrition = Nutrition.query.get(id)
        menu_id = nutrition.menu_id

        nutrition.nutrient = form.data['nutrient']
        nutrition.weight = form.data['weight']

        nutrition.menu_id = menu_id

        db.session.commit()
        return {"resNutrition":nutrition.to_dict()}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@nutrition_routes.route("<int:id>/delete",methods=['DELETE'])
# @login_required
def delete_nutrition(id):
    nutrition = Nutrition.query.get(id)

    db.session.delete(nutrition)
    db.session.commit()
    return {"res":"Successfully deleted"}
