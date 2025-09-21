#!/bin/bash
sudo pacman -S python-sqlalchemy python-psycopg2 python-jose python-cryptography python-alembic python-passlib python-bcrypt 
python -m venv venv 
source venv/bin/activate.fish
pip3 install fastapi uvicorn sqlalchemy psycopg2-binary alembic python-jose[cryptography] passlib[bcrypt] pydantic PyJWT python-multipart scapy  google-generativeai
sudo pacman -S postgresql
sudo -iu postgres initdb -D /var/lib/postgres/data
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo -iu postgres
# in postgres 	
#createdb hexamgen

#	psql -c "CREATE USER ved WITH PASSWORD 'v'"
#	psql -c "CREATE DATABASE hexamgen OWNER ved"
#	psql -c "GRANT ALL PRIVILEGES ON DATABASE hexamgen TO ved"

python -m venv venv 

# to run  uvicorn main:app --reload
