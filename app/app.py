from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/slot')
def slot():
    return render_template('slot.html')