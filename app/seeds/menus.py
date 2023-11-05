from app.models import MenuItem, Ingredient,Nutrition, db, SCHEMA,environment
from sqlalchemy.sql import text
from datetime import datetime



# menu_data = [
#     {
#         'name': 'Strawberry Cheesecake',
#         'price': 12.48,
#         'image': 'https://i.imgur.com/OJbcnTl.jpg',
#         'category': 'supah shakes',
#         'ingredients': ["Cookies and cream", "Vanilla Protein", "Unflavored Fiber", "Sugar Free Chocolate Syrup", "Crumbled Oreos"],
#         'nutrients': ["Calories","Fat", "Carb", "Fiber","Protein", "Vitamins & Minerals"],
#         'weights': ["265", "5g", "24g", "10g","32g","21"]
#     },

# ]

def seed_menus(menu_data):
    menuitems = []

    for data in menu_data:
        menu_item = MenuItem(
            name=data['name'],
            price=data['price'],
            image=data['image'],
            category=data['category'],
            created_at=datetime.now()
        )

        for ingredient_name in data['ingredients']:
            ingredient = Ingredient(ingredient_name=ingredient_name)
            menu_item.ingredients.append(ingredient)

        if 'nutrients' in data:  # Check if 'nutrients' key exists
            for i in range(len(data['nutrients'])):
                nutrient = Nutrition(
                    nutrient=data['nutrients'][i],
                    weight=data['weights'][i]
                )
                menu_item.nutritions.append(nutrient)

        menuitems.append(menu_item)

    db.session.add_all(menuitems)
    db.session.commit()


def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")

    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()
