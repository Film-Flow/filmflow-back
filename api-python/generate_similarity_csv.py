import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

filmes = pd.read_csv('./shared/tmdb_5000_movies.csv')

filmes.drop_duplicates(subset=['original_title'], keep='first', inplace=True)

filmes['overview'] = filmes['overview'].fillna('')
filmes['genres'] = filmes['genres'].fillna('')
filmes['tagline'] = filmes['tagline'].fillna('')

def json_to_text(json_string):
    try:
        json_dict = json.loads(json_string)
        return ' '.join([x['name'] for x in json_dict])
    except json.JSONDecodeError:
        return ''
    
filmes['keywords'] = filmes['keywords'].apply(json_to_text)

filmes['genres'] = filmes['genres'].apply(json_to_text)

filmes['infos'] = filmes['tagline'] + ' ' + filmes['overview'] + ' ' + filmes['genres'] + ' ' + filmes['keywords']

vec = TfidfVectorizer(stop_words='english')
Tfidf = vec.fit_transform(filmes['infos'].apply(lambda x: np.str_(x)))

cosine_sim = cosine_similarity(Tfidf)

sim_filmes = pd.DataFrame(cosine_sim, columns=filmes['original_title'], index=filmes['original_title'])

recommendations = pd.DataFrame(sim_filmes['Thor'].sort_values(ascending=False))

def get_recommendations(title):
    recomendation_df = pd.DataFrame(sim_filmes[title].sort_values(ascending=False))
    return recomendation_df.head(20)

#sim_filmes.to_csv('./shared/sim_filmes.csv')