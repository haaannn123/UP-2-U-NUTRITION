from flask import Blueprint, flash,request,jsonify
from flask_login import login_required, current_user
from datetime import date, datetime
from ..models.db import db
from ..models.events import Event
from ..forms.event_form import EventForm

event_routes = Blueprint('events', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@event_routes.route("/")
def all_events():
    events = Event.query.all()
    event_list = [one_event.to_dict() for one_event in events]
    # print(event_list)
    # res = {}
    # for one_event in event_list:
    #     one_event_id = one_event['id']
    #     res[one_event_id] = one_event

    return event_list

@event_routes.route("/", methods=["POST"])
# @login_required
def create_event():
    # date_format = "%Y-%m-%d %H:%M:%S"
    # no_time_date_format = "%Y-%m-%d"

    response = request.json
    # print("!!!!!!!!!!!!!!!!", datetime.strptime(response["start_date"],no_time_date_format ))
    form = EventForm()
    form['csrf_token'].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_event = Event(
            title = form.data['title'],
            details = form.data['details'],
            start_date = datetime.strptime(response["start_date"], "%Y-%m-%d"),
            end_date = datetime.strptime(response["end_date"], "%Y-%m-%d"),
            start_time = datetime.strptime(response["start_time"], "%Y-%m-%d %H:%M:%S"),
            end_time = datetime.strptime(response["end_time"],"%Y-%m-%d %H:%M:%S" ),
            color = form.data['color'],
            created_at = date.today()
        )

        db.session.add(new_event)
        db.session.commit()

        return{'event': new_event.to_dict()}

    if form.errors:
        return{"errors": validation_errors_to_error_messages}
