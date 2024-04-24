import tweepy as tw
import pandas as pd
import json
from confi import (
    CUSTOMER_API_KEY,
    CUSTOMER_API_KEY_SECRET,
    ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET
)

auth = tw.OAuth1UserHandler(
    CUSTOMER_API_KEY, CUSTOMER_API_KEY_SECRET,
    ACCESS_TOKEN, ACCESS_TOKEN_SECRET
)
api = tw.API(auth, wait_on_rate_limit=True)

search_query = "'ref''world cup'-filter:retweets AND -filter:replies AND -filter:links"
no_of_tweets = 5
hardcoded_keyword = "flood"

try:
    tweets = api.search_tweets(q=search_query, lang="en", count=no_of_tweets, tweet_mode ='extended')
    print(tweets)    

    attributes_container = [[tweet.user.name, tweet.created_at, tweet.favorite_count, tweet.source, hardcoded_keyword] for tweet in tweets]

    columns = ["User", "Date Created", "Number of Likes", "Source of Tweet", "Tweet"]
    
    # Creation of Dataframe
    tweets_df = pd.DataFrame(attributes_container, columns=columns)
except BaseException as e:
    print('Status Failed On,',str(e))

print(tweets_df)
