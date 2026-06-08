import numpy as np
import pandas as pd
import seaborn as sb
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LogisticRegression
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import r2_score
import warnings
warnings.filterwarnings('always')
warnings.filterwarnings('ignore')
import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
import sys
import json

input_data = sys.stdin.read()

data = json.loads(input_data)
alr_cuisines = data.get('cuisines', '')
alr_cost_range = data.get('cost_range', '')
alr_city = data.get('city', '')



Data1=pd.read_csv(r"C:\Users\PavanBIndresh\Downloads\Project\Project\Project\data\combined.csv")
Data1.head()
data=Data1.drop(['url','dish_liked','phone'],axis=1)

#Removing the Duplicates
data.duplicated().sum()
data.drop_duplicates(inplace=True)

#Remove the NaN values from the dataset
data.isnull().sum()
data.dropna(how='any',inplace=True)

#Changing the column names
data= data.rename(columns={'approx_cost(for two)':'cost','listed_in(type)':'type', 'listed_in(city)':'city'})

#Some Transformations
data['cost'] = data['cost'].astype(str)
data['cost'] = data['cost'].apply(lambda x: x.replace(',','.'))
data['cost'] = data['cost'].astype(float)

#Removing '/5' from Rates
data= data.loc[data.rate !='NEW']
data = data.loc[data.rate !='-'].reset_index(drop=True)
remove_slash = lambda x: x.replace('/5', '') if type(x) == str else x
data.rate = data.rate.apply(remove_slash).str.strip().astype('float')

# Adjust the column names
data.name = data.name.apply(lambda x:x.title())
data.online_order.replace(('Yes','No'),(True, False),inplace=True)
data.book_table.replace(('Yes','No'),(True, False),inplace=True)

## Computing Mean Rating
restaurants = list(data['name'].unique())
data['Mean Rating'] = 0

for i in range(len(restaurants)):
    data['Mean Rating'][data['name'] == restaurants[i]] = data['rate'][data['name'] == restaurants[i]].mean()

from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler(feature_range = (1,5))
data[['Mean Rating']] = scaler.fit_transform(data[['Mean Rating']]).round(2)
## Lower Casing
data["reviews_list"] = data["reviews_list"].str.lower()

## Removal of Puctuations
import string
PUNCT_TO_REMOVE = string.punctuation
def remove_punctuation(text):
    """custom function to remove the punctuation"""
    return text.translate(str.maketrans('', '', PUNCT_TO_REMOVE))
data["reviews_list"] = data["reviews_list"].apply(lambda text: remove_punctuation(text))

## Removal of Stopwords
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
STOPWORDS = set(stopwords.words('english'))
def remove_stopwords(text):
    """custom function to remove the stopwords"""
    return " ".join([word for word in str(text).split() if word not in STOPWORDS])

data["reviews_list"] = data["reviews_list"].apply(lambda text: remove_stopwords(text))

data[['reviews_list', 'cuisines']].sample(5)
def recommend_restaurant(cuisines, cost, city, top_n=5):
    # Filter data based on city and cuisines
    filtered_data = data[(data['city'] == city) & (data['cuisines'].str.contains(cuisines))]
    
    # Filter data based on cost range
    filtered_data = filtered_data[(filtered_data['cost'] >= cost[0]) & (filtered_data['cost'] <= cost[1])]
    
    if filtered_data.empty:
        return "No restaurants found matching the given criteria."
    
    # Sort filtered data by mean rating
    sorted_data = filtered_data.sort_values(by='Mean Rating', ascending=False)
    
    # Get top N recommendations
    top_recommendations = sorted_data.head(top_n)
    
    return top_recommendations[['ID','name', 'cuisines', 'Mean Rating', 'cost']]

# Example usage:
cuisines = alr_cuisines  # Example cuisine
cost_range = alr_cost_range  # Example cost range
city = alr_city    # Example city


recommendation = recommend_restaurant(cuisines, cost_range, city)

Data2=pd.read_csv(r"C:\Users\PavanBIndresh\Downloads\Project\Project\Project\data\reelcombine .csv")
    
Data2.head()
Data2['reel_link'] = Data2['reel_link'].astype(str) #Changing the reel_link to string
# Convert all names to lowercase for case-insensitive comparison in Data2
Data2['name_lower'] = Data2['name'].str.lower()

# Iterate over each recommendation
for index, row in recommendation.iterrows():
    restaurant_id = row['ID']  # Get the ID from the recommended output
    
    # Check if the restaurant ID is in the IDs in Data2
    if Data2['ID'].isin([restaurant_id]).any():
        # Get the corresponding reel_link
        reel_link = Data2.loc[Data2['ID'] == restaurant_id, 'reel_link'].values[0]
        print(f"{reel_link}")
    else:
        print("No reel link found for the recommended restaurant with ID:", restaurant_id)
    
    

