from .db import db, environment, SCHEMA, add_prefix_for_prod
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

class MenuItem(db.Model):
    __tablename__ = "menu_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(5000), nullable=False)
    category = db.Column(db.String(),nullable=False)
    price = db.Column(db.Float(), nullable=False)
    image = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.Date(), nullable=False)

    # user = db.relationship('User', back_populates = 'menus')

    # one to many relationship for ingredients

    ingredients = db.relationship(
        'Ingredient',
        back_populates='menu_item',
        cascade = 'all, delete-orphan'
    )

    nutritions = db.relationship(
        'Nutrition',
        back_populates='menu_item',
        cascade = 'all, delete-orphan'
    )


    def __repr__(self):
        return f'<MenuItem {self.id}, {self.name}, created Menu item #{self.id}'

    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'category':self.category,
            'image' :self.image,
            'price':self.price,
            'created_at':self.created_at,
            'ingredients':[ingredient.to_dict() for ingredient in self.ingredients],
            'nutritions': [nutrient.to_dict() for nutrient in self.nutritions]
        }


class Ingredient(db.Model):
    __tablename__= 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(5000),nullable=False)

    menu_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('menu_items.id')), nullable=True)

    def __repr__(self):
        return f'<Ingredient {self.id}, {self.name} was created>'

    def to_dict(self):
        return {
            'name':self.name
        }

    menu_item = db.relationship('MenuItem', back_populates='ingredients')



class Nutrition(db.Model):
    __tablename__ = 'nutritions'

    id = db.Column(db.Integer, primary_key=True)
    nutrient = db.Column(db.String(5000), nullable=False)
    weight = db.Column(db.String())
    percentage = db.Column(db.Integer())

    menu_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('menu_items.id')), nullable=True)


    def __repr__(self):
        return f'<Nutrition {self.id}, {self.nutrient} {self.weight} {self.percentage}% was created>'


    def to_dict(self):
        return {
            'nutrient':self.nutrient,
            'weight':self.weight,
            'percentage':self.percentage
        }

    menu_item = db.relationship('MenuItem', back_populates='nutritions')
