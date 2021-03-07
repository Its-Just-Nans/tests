import re
import urllib.request
url = input('Veuillez saisir le lien que vous voulez\n')

response = urllib.request.urlopen(url)

webContent = response.read().decode('utf-8')
print(webContent)
variable = re.findall('href="[^"]*"', webContent)
print(variable)

input()
