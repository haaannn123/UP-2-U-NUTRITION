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


@menu_item_routes.route("/<int:id>")
def single_menu_item(id):
    menu_item = MenuItem.query.get(id)
    menu_item_detail = menu_item.to_dict()
    res = {}
    res[menu_item_detail['id']] = menu_item_detail
    return res


@menu_item_routes.route("", methods=["POST"])
@login_required
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

        ingredient_list = form.data['ingredient_name'].split(",")
        for ingredient in ingredient_list:
            ingredient = Ingredient(
                ingredient_name = ingredient,
                menu_id = new_menu_item.id
            )
            db.session.add(ingredient)
            db.session.commit()

        nutrient_list = form.data['nutrient'].split(",")
        weight_list = form.data['weight'].split(",")
        percentage_list = form.data['percentage'].split(",")



        for i in range(len(nutrient_list)):
            nutrient = nutrient_list[i]
            weight = weight_list[i]
            percentage = percentage_list[i]

            new_nutrition = Nutrition(
                nutrient = nutrient,
                weight = weight,
                percentage = percentage,
                menu_id = new_menu_item.id
            )

            db.session.add(new_nutrition)
            db.session.commit()

        return {"resMenuItem":new_menu_item.to_dict()}

    if form.errors:
        print("======== hitting form error",form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@menu_item_routes.route("/<int:id>/ingredients",methods=["POST"])
# @login_required
def create_ingredient(id):
    ingredient_form = IngredientForm()
    ingredient_form["csrf_token"].data = request.cookies["csrf_token"]

    if ingredient_form.validate_on_submit():
        new_ingredient = Ingredient(
            ingredient_name = ingredient_form.data['ingredient_name'],
            menu_id = id
        )

        db.session.add(new_ingredient)
        db.session.commit()
        return {"resIngredient":new_ingredient.to_dict()}

    if ingredient_form.errors:
        return {"errors":validation_errors_to_error_messages(ingredient_form.errors)}, 400


@menu_item_routes.route("/<int:id>/nutritions", methods=["POST"])
# @login_required
def create_nutrition(id):
    nutrition_form = NutritionForm()
    nutrition_form["csrf_token"].data = request.cookies["csrf_token"]

    if nutrition_form.validate_on_submit():
        new_nutrient = Nutrition(
            nutrient = nutrition_form.data["nutrient"],
            weight = nutrition_form.data["weight"],
            percentage = nutrition_form.data["percentage"],
            menu_id = id
        )

        db.session.add(new_nutrient)
        db.session.commit()
        return {"resNutrition":new_nutrient.to_dict()}

    if nutrition_form.errors:
        return {"errors":validation_errors_to_error_messages(nutrition_form.errors)}, 400

@menu_item_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_menu_item(id):
    menu_item_form = MenuForm()

    menu_item_form["csrf_token"].data = request.cookies["csrf_token"]

    if menu_item_form.validate_on_submit():
        menu_item = MenuItem.query.get(id)



        menu_item.name = menu_item_form.data['name']
        menu_item.category = menu_item_form.data['category']
        menu_item.price = menu_item_form.data['price']
        menu_item.image = menu_item_form.data['image']
        menu_item.created_at = date.today()

        db.session.commit()

        ingredients = menu_item_form.data['ingredient_name'].split(",")

        for ingredient_name in ingredients:
            existing_ingredient = Ingredient.query.filter_by(menu_id=id, ingredient_name=ingredient_name).first()

            if existing_ingredient:
                # Update existing ingredient
                existing_ingredient.ingredient_name = ingredient_name
            else:
                # Create a new ingredient
                new_ingredient = Ingredient(
                    ingredient_name=ingredient_name,
                    menu_id=id
                )
                db.session.add(new_ingredient)

        db.session.commit()

        # Handle nutrition updates
        nutrients = menu_item_form.data['nutrient'].split(",")
        weights = menu_item_form.data['weight'].split(",")
        percentages = menu_item_form.data['percentage'].split(",")

        existing_nutrients = Nutrition.query.filter_by(menu_id=id).all()

        for i, nutrient_name in enumerate(nutrients):
            if i < len(existing_nutrients):
                # Update existing nutrition
                existing_nutrient = existing_nutrients[i]
                existing_nutrient.nutrient = nutrient_name
                existing_nutrient.weight = weights[i]
                existing_nutrient.percentage = percentages[i]
            else:
                # Create new nutrition
                new_nutrition = Nutrition(
                    nutrient=nutrient_name,
                    weight=weights[i],
                    percentage=percentages[i],
                    menu_id=id
                )
                db.session.add(new_nutrition)

        db.session.commit()

        return {"resMenuItem": menu_item.to_dict()}

    if menu_item_form.errors:
        print("============ error", menu_item_form.errors)
        return {"errors": validation_errors_to_error_messages(menu_item_form.errors)}, 400

@menu_item_routes.route("/<int:id>/delete", methods=['DELETE'])
@login_required
def delete_menu_item(id):
    menu_item = MenuItem.query.get(id)

    db.session.delete(menu_item)
    db.session.commit()
    return {"res":"Successfully deleted"}
