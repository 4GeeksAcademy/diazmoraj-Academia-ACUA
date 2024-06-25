"""empty message

Revision ID: 7498f4c2226d
Revises: 9524b2ab49cc
Create Date: 2024-06-25 02:44:27.685782

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7498f4c2226d'
down_revision = '9524b2ab49cc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('electronic_invoice', schema=None) as batch_op:
        batch_op.drop_constraint('electronic_invoice_phone_number_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('electronic_invoice', schema=None) as batch_op:
        batch_op.create_unique_constraint('electronic_invoice_phone_number_key', ['phone_number'])

    # ### end Alembic commands ###
