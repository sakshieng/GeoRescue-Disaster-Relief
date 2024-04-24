import os
import chainlit as cl
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.schema.language_model import BaseLanguageModel
from getpass import getpass
from openai import OpenAI

class OpenAIWrapper(BaseLanguageModel):
    def __init__(self):
        self.llm = OpenAI(api_key='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')

    def generate_promt(self, prompts, **kwargs):
        # Implement the generate method using self.llm
        self.llm.chat()
        pass
# HUGGINGFACEHUB_API_TOKEN = getpass()
# os.environ['HUGGINGFACEHUB_API_TOKEN'] = HUGGINGFACEHUB_API_TOKEN

# model_id = "openai-community/gpt2-medium"
# conv_model = AsyncInferenceClient(token=os.environ['HUGGINGFACEHUB_API_TOKEN'],
#                               model=model_id,
#                              headers={"temperature": 0.8, "max_new_tokens": 150})

template = """You are a Disaster Relief FAQ AI assistant that answers to the query  based on received input

{query}
"""


@cl.on_chat_start
def main():
    prompt = PromptTemplate(template=template, input_variables=['query'])
    conv_chain = LLMChain(llm=OpenAIWrapper(),
                          prompt=prompt,
                          verbose=True)
    
    cl.user_session.set("llm_chain", conv_chain)
    
@cl.on_message
async def main(message:str):
    llm_chain = cl.user_session.get("llm_chain")
    res = await llm_chain.acall(message, callbacks=[cl.AsyncLangchainCallbackHandler()])
    
    #perform post processing on the received response here
    #res is a dict and the response text is stored under the key "text"
    await cl.Message(content=res["text"]).send()
