import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, render_template, request, url_for, redirect, jsonify
import magic
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
mime = magic.Magic(mime=True)


@app.errorhandler(405)
def method_not_allowed(error):
    # 405エラー時に '/' にリダイレクト
    return redirect(url_for('index'))

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/git')
def git_analysis():
  data = {
    'query': 'query{user(login:"' + os.getenv('GIT_USER') + '"){contributionsCollection {contributionCalendar {weeks {contributionDays {contributionCount\ndate}}}}}}'
  }
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer  ' +  os.getenv('GIT_TOKEN'),
    'User-Agent': 'Awesome-Octocat-App'
  }

  response = requests.post('https://api.github.com/graphql', json = data, headers = headers)

  if response.status_code == 200:
    return jsonify(response.json()), 200
  else:
    return [], 200

@app.route('/request', methods=['POST'])
def api():
  return render_template('index.html')

if __name__ == "__main__":
  app.run(debug=True)