FROM python:slim-bullseye

LABEL Author="AmirMohammad"

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt requirements.txt
RUN apt-get update -y
RUN apt-get install python3-dev libpq-dev -y
RUN pip install -r requirements.txt

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN useradd django
RUN chown -R django:django /app
RUN chown -R django:django /vol
RUN chmod 755 /vol/web
USER django
