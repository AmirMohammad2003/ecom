FROM python:slim-bullseye

LABEL Author="AmirMohammad"
ARG reqFile
ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app

RUN apt-get update && apt-get install python3-dev libpq-dev libpango-1.0-0 libpangoft2-1.0-0 libjpeg-dev libopenjp2-7-dev libffi-dev -y
COPY . /app
RUN pip install -r ${reqFile} --no-cache-dir

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN useradd django
RUN chown -R django:django /app
RUN chown -R django:django /vol
RUN chmod 755 /vol/web
USER django
