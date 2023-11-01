from app.models import MenuItem,Ingredient,Nutrition, db, SCHEMA,environment
from sqlalchemy.sql import text
from datetime import datetime

def seed_menus():
    menu_item1 = MenuItem(
        name = "Strawberry Cheesecake",
        price = 17.99,
        image = "https://i.imgur.com/OJbcnTl.jpg",
        category = 'supah shakes',
        created_at = datetime.now()
    )

    ingredient_item1 = Ingredient(
        ingredient_name = "Graham Cracker Crumbs",
        menu_id = 1
    )
    ingredient_item2 = Ingredient(
        ingredient_name = "Strawberry Ice Cream",
        menu_id = 1
    )

    nutrition_item1 = Nutrition(
        nutrient = "Fat",
        menu_id = 1,
        weight = "10mg",
        percentage = "5"
    )

    nutrition_item2 = Nutrition(
        nutrient = "Carb",
        menu_id = 1,
        weight = "50mg",
        percentage = "7"
    )


    menu_item1.ingredients.extend([ingredient_item1,ingredient_item2])
    menu_item1.nutritions.extend([nutrition_item1,nutrition_item2])

    menu_item2 = MenuItem(
        name = "Chocolate Cheesecake",
        price = 15.99,
        image = "https://i.imgur.com/OJbcnTl.jpg",
        category = 'combos',
        created_at = datetime.now()
    )

    ingredient_item3 = Ingredient(
        ingredient_name = "Cream Cheese",
        menu_id = 2
    )

    ingredient_item4 = Ingredient(
        ingredient_name = "Blue Cheese",
        menu_id = 2
    )

    nutrition_item3 = Nutrition(
        nutrient = "Fat",
        menu_id = 2,
        weight = "15mg",
        percentage = "5"
    )

    nutrition_item4 = Nutrition(
        nutrient = "Carb",
        menu_id = 2,
        weight = "550mg",
        percentage = "10"
    )



    menu_item2.ingredients.extend([ingredient_item3,ingredient_item4])
    menu_item2.nutritions.extend([nutrition_item3,nutrition_item4])


    menu_item3 = MenuItem(
        name = "Vanilla Cheesecake",
        price = 15.99,
        image = "https://i.imgur.com/OJbcnTl.jpg",
        category = 'combos',
        created_at = datetime.now()
    )

    ingredient_item5 = Ingredient(
        ingredient_name = "Cream Cheese",
        menu_id = 3
    )

    ingredient_item6 = Ingredient(
        ingredient_name = "Blue Cheese",
        menu_id = 3
    )

    nutrition_item5 = Nutrition(
        nutrient = "Fat",
        menu_id = 3,
        weight = "20mg",
        percentage = "5"
    )

    nutrition_item6 = Nutrition(
        nutrient = "Carb",
        menu_id = 3,
        weight = "100mg",
        percentage = "10"
    )

    menu_item3.ingredients.extend([ingredient_item5,ingredient_item6])
    menu_item3.nutritions.extend([nutrition_item5,nutrition_item6])


    menu_item4 = MenuItem(
        name = "Vanilla Cake Cheesecake",
        price = 19.99,
        image = "https://i.imgur.com/OJbcnTl.jpg",
        category = 'combos',
        created_at = datetime.now()
    )

    ingredient_item7 = Ingredient(
        ingredient_name = "Cream Cheese",
        menu_id = 4
    )

    ingredient_item8 = Ingredient(
        ingredient_name = "Blue Cheese",
        menu_id = 4
    )

    nutrition_item7 = Nutrition(
        nutrient = "Fat",
        menu_id = 4,
        weight = "20mg",
        percentage = "5"
    )

    nutrition_item8 = Nutrition(
        nutrient = "Carb",
        menu_id = 4,
        weight = "100mg",
        percentage = "10"
    )

    menu_item4.ingredients.extend([ingredient_item7,ingredient_item8])
    menu_item4.nutritions.extend([nutrition_item7,nutrition_item8])

    menu_item5 = MenuItem(
        name = "Birthday Cake Cheesecake",
        price = 17.99,
        image = "https://i.imgur.com/OJbcnTl.jpg",
        category = 'combos',
        created_at = datetime.now()
    )

    ingredient_item9 = Ingredient(
        ingredient_name = "Cream Cheese",
        menu_id = 5
    )

    ingredient_item10 = Ingredient(
        ingredient_name = "Blue Cheese",
        menu_id = 5
    )

    nutrition_item9 = Nutrition(
        nutrient = "Fat",
        menu_id = 5,
        weight = "20mg",
        percentage = "5"
    )

    nutrition_item10 = Nutrition(
        nutrient = "Carb",
        menu_id = 5,
        weight = "100mg",
        percentage = "10"
    )

    menu_item5.ingredients.extend([ingredient_item9,ingredient_item10])
    menu_item5.nutritions.extend([nutrition_item9,nutrition_item10])

    menu_item6 = MenuItem(
        name = "Oreo Shake",
        price = 5.00,
        image = 'https://i.imgur.com/uC981f4.jpg', 
        category = 'supah shakes',
        created_at = datetime.now()
    )

    ingredient_item11 = Ingredient(
        ingredient_name = "Cow milk",
        menu_id = 6
    )

    ingredient_item12 = Ingredient(
        ingredient_name = "Mother's Milk",
        menu_id = 6
    )

    nutrition_item11 = Nutrition(
        nutrient = 'Fat',
        menu_id = 6,
        weight = '100mg',
        percentage = 10
    )

    nutrition_item12 = Nutrition(
        nutrient = "Carbs",
        menu_id = 6,
        weight = '100mg',
        percentage = 10
    )

    menu_item6.ingredients.extend([ingredient_item11,ingredient_item12])
    menu_item6.nutritions.extend([nutrition_item11, nutrition_item12])

    menu_item7 = MenuItem(
        name = "Cookies and Cream Shake",
        price = 5.00,
        image = 'https://i.imgur.com/uC981f4.jpg', 
        category = 'supah shakes',
        created_at = datetime.now()
    )

    ingredient_item13 = Ingredient(
        ingredient_name = "Cow milk",
        menu_id = 7
    )

    ingredient_item14 = Ingredient(
        ingredient_name = "Mother's Milk",
        menu_id = 7
    )

    nutrition_item13 = Nutrition(
        nutrient = 'Fat',
        menu_id = 7,
        weight = '100mg',
        percentage = 10
    )

    nutrition_item14 = Nutrition(
        nutrient = "Carbs",
        menu_id = 7,
        weight = '100mg',
        percentage = 10
    )

    menu_item7.ingredients.extend([ingredient_item13, ingredient_item14])
    menu_item7.nutritions.extend([nutrition_item13, nutrition_item14])

    menu_item8 = MenuItem(
        name = "Swirly Swirl",
        price = 5.00,
        image = 'https://i.imgur.com/uC981f4.jpg', 
        category = 'supah shakes',
        created_at = datetime.now()
    )

    ingredient_item15 = Ingredient(
        ingredient_name = "Cow milk",
        menu_id = 8
    )

    ingredient_item16 = Ingredient(
        ingredient_name = "Mother's Milk",
        menu_id = 8
    )

    nutrition_item15 = Nutrition(
        nutrient = 'Fat',
        menu_id = 8,
        weight = '100mg',
        percentage = 10
    )

    nutrition_item16 = Nutrition(
        nutrient = "Carbs",
        menu_id = 8,
        weight = '100mg',
        percentage = 10
    )

    menu_item8.ingredients.extend([ingredient_item15, ingredient_item16])
    menu_item8.nutritions.extend([nutrition_item15, nutrition_item16])

    menuitems = [menu_item1,menu_item2,menu_item3,menu_item4,menu_item5, menu_item6, menu_item7, menu_item8]

    [db.session.add(menu_item) for menu_item in menuitems]
    db.session.commit()

def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()
