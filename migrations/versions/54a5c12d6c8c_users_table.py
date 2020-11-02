"""users table

Revision ID: 54a5c12d6c8c
Revises: 
Create Date: 2020-11-02 13:49:29.314278

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '54a5c12d6c8c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.Column('consent', sa.Integer(), nullable=True),
    sa.Column('training', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.create_table('demo',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('demo_num', sa.Integer(), nullable=True),
    sa.Column('card_num', sa.Integer(), nullable=True),
    sa.Column('correct_bin', sa.Integer(), nullable=True),
    sa.Column('rule_set', sa.String(length=300), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_demo_timestamp'), 'demo', ['timestamp'], unique=False)
    op.create_table('trial',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('trial_num', sa.Integer(), nullable=True),
    sa.Column('card_num', sa.Integer(), nullable=True),
    sa.Column('correct_bin', sa.Integer(), nullable=True),
    sa.Column('chosen_bin', sa.Integer(), nullable=True),
    sa.Column('feedback_given', sa.String(length=300), nullable=True),
    sa.Column('feedback_type', sa.String(length=20), nullable=True),
    sa.Column('rule_set', sa.String(length=300), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_trial_timestamp'), 'trial', ['timestamp'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_trial_timestamp'), table_name='trial')
    op.drop_table('trial')
    op.drop_index(op.f('ix_demo_timestamp'), table_name='demo')
    op.drop_table('demo')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    # ### end Alembic commands ###