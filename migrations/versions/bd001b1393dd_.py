"""empty message

Revision ID: bd001b1393dd
Revises: 
Create Date: 2019-08-23 12:38:56.841869

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'bd001b1393dd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('puzzle',
    sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('uuid_generate_v4()'), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('puzzle_id', postgresql.UUID(as_uuid=True), nullable=True),
    sa.Column('position', sa.Integer(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['puzzle_id'], ['puzzle.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tile')
    op.drop_table('puzzle')
    # ### end Alembic commands ###
