from app.models import Event, db, SCHEMA,environment
from sqlalchemy.sql import text
from datetime import datetime,date



def seed_events():
    event1 = Event(
        title = "Latinos night - Networking Event" ,
        details = 'Reprehenderit incididunt laboris in commodo minim est eiusmod et mollit consequat dolor. Magna anim proident occaecat pariatur sint incididunt excepteur duis. Cupidatat Lorem laboris laborum esse ut velit dolore non Lorem. Quis proident est anim fugiat. Non anim amet enim incididunt sunt qui irure occaecat dolor reprehenderit dolor est.',
        start_time = datetime(2023, 10, 26, hour = 9, minute = 30),
        end_time = datetime(2023, 10, 26, hour = 10, minute = 30),
        start_date = date.today(),
        color = 'rgba(9, 146, 209, 1)',
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    event2 = Event(
        title = "Asian night" ,
        details = 'Reprehenderit incididunt laboris in commodo minim est eiusmod et mollit consequat dolor. Magna anim proident occaecat pariatur sint incididunt excepteur duis. Cupidatat Lorem laboris laborum esse ut velit dolore non Lorem. Quis proident est anim fugiat. Non anim amet enim incididunt sunt qui irure occaecat dolor reprehenderit dolor est.',
        start_time = datetime(2023, 10, 27, hour = 9, minute = 30),
        end_time = datetime(2023, 10, 27, hour = 10, minute = 30),
        created_at = datetime.now(),
        start_date = date.today(),
        end_date = date.today(),
        color = 'rgba(211, 37, 64, 1)',
        updated_at = datetime.now()
    )


    events = [event1,event2]
    [db.session.add(event) for event in events]
    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()
