from flask import Blueprint, flash,request,jsonify
from flask_login import login_required, current_user
from datetime import date
from ..models.db import db
from ..models.menus import MenuItem,Ingredient,Nutrition
from ..forms.menu_form import MenuForm,IngredientForm,NutritionForm


menu_item_routes = Blueprint('menu_items', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@menu_item_routes.route("")
def all_items():
    menu_items = MenuItem.query.all()
    menu_list = [one_menu_item.to_dict() for one_menu_item in menu_items]

    return menu_list

@menu_item_routes.route("", methods=["POST"])
def create_menu_item():

    form = MenuForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_menu_item = MenuItem(
            name = form.data['name'],
            image = form.data['image'],
            category = form.data['category'],
            price = form.data['price'],
            created_at = date.today(),
        )

        db.session.add(new_menu_item)
        db.session.commit()

        new_ingredient = Ingredient(
            ingredient_name = form.data['name'],
            menu_id = new_menu_item.id
        )

        # print("=================",form.data)
        db.session.add(new_ingredient)
        db.session.commit()


        new_nutrition = Nutrition(
            nutrient = form.data['nutrient'],
            weight = form.data['weight'],
            percentage = form.data['percentage'],
            menu_id = new_menu_item.id
        )

        db.session.add(new_nutrition)
        db.session.commit()

        return {"resMenuItem":new_menu_item.to_dict()}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
