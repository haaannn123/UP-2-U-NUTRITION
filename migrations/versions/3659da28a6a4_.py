"""empty message

<<<<<<<< HEAD:migrations/versions/3659da28a6a4_.py
Revision ID: 3659da28a6a4
Revises: 
Create Date: 2023-10-31 12:01:13.997578
========
Revision ID: d93520d4fc8e
Revises: 
Create Date: 2023-10-31 11:58:42.799427
>>>>>>>> 9dc7f85fcd700a1b18847f3cfc03bf5dfde7726c:migrations/versions/d93520d4fc8e_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/3659da28a6a4_.py
revision = '3659da28a6a4'
========
revision = 'd93520d4fc8e'
>>>>>>>> 9dc7f85fcd700a1b18847f3cfc03bf5dfde7726c:migrations/versions/d93520d4fc8e_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('details', sa.String(length=1000), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=True),
    sa.Column('start_time', sa.DateTime(), nullable=True),
    sa.Column('end_time', sa.DateTime(), nullable=True),
    sa.Column('color', sa.String(), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('menu_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=5000), nullable=False),
    sa.Column('category', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('admin', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('ingredients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ingredient_name', sa.String(length=5000), nullable=False),
    sa.Column('menu_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['menu_id'], ['menu_items.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('nutritions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nutrient', sa.String(length=5000), nullable=False),
    sa.Column('weight', sa.String(), nullable=True),
    sa.Column('percentage', sa.String(), nullable=True),
    sa.Column('menu_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['menu_id'], ['menu_items.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('nutritions')
    op.drop_table('ingredients')
    op.drop_table('users')
    op.drop_table('menu_items')
    op.drop_table('events')
    # ### end Alembic commands ###
