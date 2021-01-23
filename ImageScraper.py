import requests
from bs4 import BeautifulSoup
import urllib.request

URL = 'https://www.digminecraft.com/lists/item_id_list_pc.php'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')

image_list = []

table = soup.find(id="minecraft_items")
rows = table.find_all("tr")

for row in rows:
    cells = row.find_all("td")
    block_name = "1"
    img_url = ""
    for cell in cells:
        if(cell.find('img')):
            img_url = 'https://www.digminecraft.com' + \
                cell.find('img')['data-src']

        if(cell.find('a')):
            block_name = cell.find('a').text

    if block_name and img_url:
        if ("Splash Potion" not in block_name and "Arrow of" not in block_name):
            try:
                with open('client\public\\resources\images\\' +
                          block_name+".png") as f:
                    print(block_name, " already downloaded")
                    f.close()
            except IOError:
                print(block_name, " does not exist, downloading...")

                response = requests.get(img_url)
                print(response)
                file = open('client\public\\resources\images\\' +
                            block_name+".png", "wb")

                file.write(response.content)

                file.close()
