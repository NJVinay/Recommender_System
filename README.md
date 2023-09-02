# hdlc_tech_project
#A data science and machine learning concept applied project on training of the machine learning model for predective analysis by learning through data sets

import pandas as pd
data_set = pd.read_csv('C:\Users\NARAM RAMBABU\Desktop\movies.csv')
print(data_set)

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Step 1: Data Preprocessing (Assuming you have data in the form of lists)
titles = ["Fast X", "Mr Bean", "Rush Hour"]
genres = ["Action, Adventure", "Comedy", "Action, Comedy", "Romance", "Animation", "Drama",]
descriptions = ["Description of Movie A", "Description of Movie B", "Description of Movie C"]

# Step 2: Feature Extraction
vectorizer = TfidfVectorizer()
features = vectorizer.fit_transform(descriptions)

# Step 3: Similarity Calculation
similarity_matrix = cosine_similarity(features)

# Step 4: User Profile Creation (Assuming user preferences)
user_profile = vectorizer.transform(["Description of Movie B"])

# Step 5: Recommendation Generation
# Calculate similarity between user profile and all movies
user_similarity_scores = cosine_similarity(user_profile, features)
# Sort the movies based on similarity scores
sorted_indices = user_similarity_scores.argsort().flatten()[::-1]
# Get the top recommendations
top_recommendations = [titles[i] for i in sorted_indices]

# Print the top recommendations
print("Top Recommendations:")
for movie in top_recommendations:
    print(movie)
