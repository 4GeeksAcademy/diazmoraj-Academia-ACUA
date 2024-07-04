"""empty message

Revision ID: a5a28c1bf076
Revises: 1ca83c0c44c6
Create Date: 2024-06-29 19:17:37.883641

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a5a28c1bf076'
down_revision = '1ca83c0c44c6'
branch_labels = None
depends_on = None

def upgrade():
    with op.batch_alter_table('student') as batch_op:
        batch_op.add_column(sa.Column('user_type', sa.String(length=20), nullable=False, server_default='student'))

   
    op.execute("UPDATE student SET user_type = 'student' WHERE user_type IS NULL")

def downgrade():
    with op.batch_alter_table('student') as batch_op:
        batch_op.drop_column('user_type')
    # ### end Alembic commands ###
