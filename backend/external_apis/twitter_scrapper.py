from ntscraper import Nitter
import json

def get_tweets(word: str, number: int):
    scraper = Nitter()
    tweets = scraper.get_tweets(word, mode='term', number=number, language='en')
    return {
        'word': word,
        'tweets': tweets
    }