# import requests
# from confi import CHATGPT_KEY

# api = 'https://api.openai.com/v1/chat/completions'

# def get_resposne(number_of_people: int, disaster_name: str):
#     behavior = 'You are an agent trained to assist during natural disaster by providing a plan as asked'
#     prompt = f'There are {number_of_people} suspected to be stuck in a disaster, {disaster_name}. Optimize the allocation of resources such as emergency personnel, medical supplies, and equipment. List only the resources to use and the count for each for such a disaster'

#     body = {
#         'model': 'gpt-3.5-turbo',
#         'messages': [
#             {"role": "system", "content": behavior},
#             {"role": "user", "content": prompt},
#         ]
#     }

#     header = {
#         'Content-Type': 'application/json',
#         'Authorization': f'Bearer {CHATGPT_KEY}'
#     }

#     try:
#         response = requests.post(url=api, headers=header, json=body)
#     except Exception as e:
#         raise Exception("error is gpt: ",e)
#     json_data = response.json()
#     return json_data['choices'][0]['message']['content']