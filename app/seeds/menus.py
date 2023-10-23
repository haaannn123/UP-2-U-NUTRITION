from app.models import Menu, db, SCHEMA,environment
from sqlalchemy.sql import text
from datetime import date

def seed_menus():
    menu_item1 = Menu(
        name = "Strawberry Cheesecake", user_id = 1, ingredients = "Cream Cheese | Graham Cracker Crumbs | Powdered Sugar | Strawberry Ice Cream | Strawberry Milk | Fresh Strawberries | White Cake", nutrition = "Total Fat 28g - 43% | Saturated fat 12g - 60% | Cholesterol 69mg - 23% | Sodium 548mg - 22% | Potassium 113mg - 3% | Total Carbohydate 32g - 10% | Dietary Fiber 0.5g = 2% | Sugar 27g | Protein 7g - 14% | Vitamin C - 0% | Calcium - 6% | Iron - 4% | Vitamin D - 5% | Vitamin B6 - 5% | Cobalamin - 3% | MAgnesium - 3%"
    )
    menu_item2 = Menu(
        name = "Chocolate Cheesecake", user_id = 1, ingredients = "Cream Cheese | Graham Cracker Crumbs | Powdered Sugar | Strawberry Ice Cream | Strawberry Milk | Fresh Strawberries | White Cake", nutrition = "Total Fat 28g - 43% | Saturated fat 12g - 60% | Cholesterol 69mg - 23% | Sodium 548mg - 22% | Potassium 113mg - 3% | Total Carbohydate 32g - 10% | Dietary Fiber 0.5g = 2% | Sugar 27g | Protein 7g - 14% | Vitamin C - 0% | Calcium - 6% | Iron - 4% | Vitamin D - 5% | Vitamin B6 - 5% | Cobalamin - 3% | MAgnesium - 3%"
    )
    menu_item3 = Menu(
        name = "Vanilla Cheesecake", user_id = 1, ingredients = "Cream Cheese | Graham Cracker Crumbs | Powdered Sugar | Strawberry Ice Cream | Strawberry Milk | Fresh Strawberries | White Cake", nutrition = "Total Fat 28g - 43% | Saturated fat 12g - 60% | Cholesterol 69mg - 23% | Sodium 548mg - 22% | Potassium 113mg - 3% | Total Carbohydate 32g - 10% | Dietary Fiber 0.5g = 2% | Sugar 27g | Protein 7g - 14% | Vitamin C - 0% | Calcium - 6% | Iron - 4% | Vitamin D - 5% | Vitamin B6 - 5% | Cobalamin - 3% | MAgnesium - 3%"
    )

    menus = [menu_item1,menu_item2,menu_item3]
    [db.session.add(menu) for menu in menus]
    db.session.commit()

def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
