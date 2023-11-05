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
@login_required
def create_event():
    # date_format = "%Y-%m-%d %H:%M:%S"
    # no_time_date_format = "%Y-%m-%d"

    response = request.json
    # print("!!!!!!!!!!!!!!!!", datetime.strptime(response["start_date"],no_time_date_format ))
    print(response, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
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

        print(new_event.to_dict(), "===================================================")
        db.session.add(new_event)

        db.session.commit()

        return{'event': new_event.to_dict()}

    if form.errors:
        return{"errors": validation_errors_to_error_messages}

@event_routes.route("/update/<id>", methods=["PUT"])
@login_required
def edit_event(id):
    event = Event.query.get(id)
    event_form = EventForm()
    event_form["csrf_token"].data = request.cookies["csrf_token"]


    response = request.json
    temp_start_date = datetime.strptime(response["start_date"], "%Y-%m-%d")
    temp_end_date = datetime.strptime(response["end_date"], "%Y-%m-%d")
    temp_start_time = datetime.strptime(response["start_time"], "%Y-%m-%d %H:%M:%S")
    temp_end_time = datetime.strptime(response["end_time"],"%Y-%m-%d %H:%M:%S")
    # print(response["start_time"])
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!", temp_start_time, temp_start_date)

    event.title = response['title']
    event.details = response['details']
    event.start_date = temp_start_date
    event.end_date = temp_end_date
    event.start_time = temp_start_time
    event.end_time = temp_end_time
    event.color = response['color']

    db.session.commit()

    return event.to_dict()

@event_routes.route('<int:id>/delete', methods=['DELETE'])
@login_required
def delete_event(id):
    event = Event.query.get(id)
    db.session.delete(event)
    db.session.commit()
    return {"res":"Successfully deleted"}
