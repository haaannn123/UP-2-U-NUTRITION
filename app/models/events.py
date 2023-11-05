from .db import db, environment, SCHEMA, add_prefix_for_prod
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


class Event(db.Model):
    __tablename__ = "events"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    details = db.Column(db.String(1000), nullable=False)
    start_date = db.Column(db.Date(), nullable=False)
    end_date = db.Column(db.Date(), nullable=True)
    start_time = db.Column(db.DateTime())
    end_time = db.Column(db.DateTime())
    color = db.Column(db.String())
    created_at = db.Column(db.Date())
    updated_at = db.Column(db.Date())

    def __repr__(self):
        return f'Event #{self.id} #{self.title} created'

    def to_dict(self):
        return {
        'id': self.id,
        'title':self.title,
        'details':self.details,
        'start_date':self.start_date,
        'end_date': self.end_date,
        'start_time':self.start_time,
        'end_time':self.end_time,
        'color': self.color,
        'created_at':self.created_at,
        'updated_at':self.updated_at
        }
