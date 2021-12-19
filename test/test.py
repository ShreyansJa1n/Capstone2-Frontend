from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome('/home/mayuri/Downloads/chromedriver_linux64/chromedriver')  # Or Chrome(), or Ie(), or Opera()
driver.get('http://localhost:3000/login')
username = driver.find_element_by_id("username")
password = driver.find_element_by_id("password")

username.send_keys("BT18GCS014")
password.send_keys("Mayuri@1")

driver.find_element_by_id("submit").click()