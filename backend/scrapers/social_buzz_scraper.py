from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.service import Service

def init_driver():
    service = Service()
    options = webdriver.ChromeOptions()
    # options.add_argument("--incognito")
    driver = webdriver.Chrome(service=service, options=options)
    driver.maximize_window()
    return driver


def wait_for_data_load(driver):
    try:
        wait = WebDriverWait(driver, 70)
        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'rezults-item-body')))
    except:
        raise Exception('Took too long')


def reach_page(driver):
    try:
        button = driver.find_element(By.CLASS_NAME, 'rezults-graph-button')
        button.click()
        sentiment_button = driver.find_element(By.XPATH, "//a[contains(@class, 'analytics-tabs-nav__item') and contains(text(), 'Sentiment')]")
        sentiment_button.click()
    except:
        raise Exception("didn't find the buttons")


def get_general_stats(driver):
    try:
        general_stats = driver.find_element(By.CLASS_NAME, 'generalstats')
        list_items = general_stats.find_elements(By.TAG_NAME, 'li')
        json_data = {}
        for list_item in list_items:
            info = list_item.find_element(By.CLASS_NAME, 'current').text.strip()
            info_list = info.split()
            json_data[info_list[0]] = info_list[1]
    except Exception as e:
        raise Exception("error: ", e)
    
    return json_data


def get_screen_shots(driver, tag_name):
    try:
        blocks: list = driver.find_elements(By.XPATH, "//div[contains(@class, 'responsive-block') and not(contains(@style, 'display: none'))]")
        out_list = []
        for index, block in enumerate(blocks):
            if block.text:
                actions = ActionChains(driver)
                actions.move_to_element(block).perform()
                driver.execute_script("window.scrollBy(0, -150);")
                filename = f'screenshots\{tag_name}_{index}.png'
                block.screenshot(filename)
                out_list.append(filename)

    except Exception as e:
        raise Exception("error: ", e)
    
    return out_list
    

def scrape_social_buzz(tag_name: str = 'earthquake'):
    url = f'https://www.social-searcher.com/social-buzz/?wblng=&ntw=&psttyp=&searchid=0&period=&value=&fbpage=&q5=%23{tag_name}'
    driver = init_driver()

    driver.get(url)
    wait_for_data_load(driver)
    reach_page(driver)

    genral_data = get_general_stats(driver)

    ss_list = get_screen_shots(driver, tag_name)

    driver.quit()

    return{
        'tag_name': tag_name,
        'general_stats': genral_data,
        'ss_links': ss_list
    }