from flask import Flask, render_template, url_for
import os

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/slot')
def slot():
    output_dir = './app/static/img/'
    l = os.listdir(output_dir)
    l_img_num = len([s for s in l if s.startswith('img')])
    roll_speed = 100
    return render_template('slot.html',img_num = l_img_num, roll_speed = roll_speed)

@app.route('/config')
def config():
    return render_template('config.html')