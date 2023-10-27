from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField,TextAreaField,IntegerField,DateField
from wtforms.validators import DataRequired,Length,URL,ValidationError
from flask_wtf.file import FileAllowed,FileField,FileRequired

def text_length(form, field):
    # Checking if post length is correct
    text = field.data
    if len(text) > 2000 or len(text) < 5:
        raise ValidationError('Must be between 5 and 2000 characters')


class MenuForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    image = StringField('Image')
    category = StringField('Category')
    price = IntegerField('Price')
    created_at = DateField('Date')
    submit = SubmitField('Submit')

class IngredientForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    submit = SubmitField('Submit')

class NutritionForm(FlaskForm):
    nutrient = StringField('Nutrient', validators=[DataRequired()])
    weight = StringField('Weight')
    percentage = IntegerField('Percentage')
    submit = SubmitField('Submit')
