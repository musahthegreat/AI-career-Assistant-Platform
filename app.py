from flask import Flask,request,jsonify,render_template_string
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
app=Flask(__name__)
jobs=pd.DataFrame([{"title":"AI Engineer","skills":"Python TensorFlow NLP AWS"},{"title":"ML Engineer","skills":"Python Scikit-learn Docker SQL"},{"title":"Full Stack Developer","skills":"JavaScript React Flask SQL APIs"}])
HTML="""<h1>AI Career Assistant</h1><form method=post><textarea name=skills placeholder='Python ML Flask'></textarea><br><button>Recommend</button></form>{% if recs %}<ul>{% for r in recs %}<li>{{r['title']}} - {{r['score']}}%</li>{% endfor %}</ul>{% endif %}"""
def recommend(skills):
 c=jobs.skills.tolist()+[skills]
 v=TfidfVectorizer().fit_transform(c)
 s=cosine_similarity(v[-1],v[:-1]).flatten()
 return sorted([{"title":jobs.iloc[i].title,"score":round(float(s[i])*100,2)} for i in range(len(s))], key=lambda x:x['score'], reverse=True)
@app.route('/',methods=['GET','POST'])
def home():
 recs=None
 if request.method=='POST': recs=recommend(request.form['skills'])
 return render_template_string(HTML,recs=recs)
@app.route('/api/recommend',methods=['POST'])
def api(): return jsonify(recommend(request.json['skills']))
if __name__=='__main__': app.run(debug=True)