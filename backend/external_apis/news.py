from newsapi import NewsApiClient
from datetime import date, timedelta
import json

news = NewsApiClient(api_key='6516959f267443f7862c29e39ff3a129')

def get_news(topic):
    try:
        from_param = date.today() - timedelta(days=29)

        all_articles = news.get_everything(
            q=topic,
            from_param=from_param,
            language='en',
            sort_by='publishedAt',
            )

        if all_articles['status'] == 'ok':
            filtered_articles = [article for article in all_articles['articles'] if article.get('source').get('id') is not None]

            # with open('json_out.json', 'w') as file:
            #     file.write(json.dumps(filtered_articles))
                
            return filtered_articles

    except Exception as e:
        print(f'Error: {e}')
        return None

# all_articles = get_news(topic=' flood')
# indian earthquake
# floods