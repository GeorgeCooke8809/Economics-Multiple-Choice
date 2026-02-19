FROM python:3.14

COPY . .

RUN pip install Flask

CMD ["python", "./main.py"]