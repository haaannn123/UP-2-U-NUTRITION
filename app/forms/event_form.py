from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired

class EventForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    details = StringField('details')
    start_date = StringField('start_date')
    end_date = StringField("end_date",)
    start_time = StringField('start_time')
    end_time = StringField('end_time')
    color = StringField('color')
