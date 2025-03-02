import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, render_template, request, url_for, redirect, jsonify
import magic

app = Flask(__name__)
mime = magic.Magic(mime=True)


@app.errorhandler(405)
def method_not_allowed(error):
    # 405エラー時に '/' にリダイレクト
    return redirect(url_for('index'))

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/request', methods=['POST'])
def api():
  return render_template('index.html')

if __name__ == "__main__":
  app.run(debug=True)