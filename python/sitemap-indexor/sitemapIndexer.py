import re
import urllib.request
import sys
baseUrl = input('Write  the URL \n')

# baseUrl = "https://its-just-nans.github.io/"


domainName = baseUrl.split("/")
while len(domainName) > 3:
    domainName.pop()
domainName = "/".join(domainName)
domainName += "/"

lastAdd = 0

inDomain = []
ext = []
mail = []
globalVar = {}
countLink = 0
dispWebContent = False

globalVar["verbose"] = True if '--verbose' in sys.argv else False
globalVar["quiet"] = True if '--quiet' in sys.argv else False
globalVar["sitemap"] = True if '--sitemap' in sys.argv else False
globalVar["rmError"] = True if '--rmError' in sys.argv else False
globalVar["css"] = False if '--nocss' in sys.argv else True
globalVar["json"] = False if '--nocss' in sys.argv else True


def disp(text, end):
    if not globalVar["quiet"]:
        if end == "\n":
            print(text)
        else:
            print(text, end="")


def explorer(url):
    parentName = url
    if not url.endswith("/"):
        parentName = parentName.split("/")
        parentName.pop()
        parentName = "/".join(parentName)
        parentName += "/"
    tempURL = url.replace("&amp;", "&")
    try:
        response = urllib.request.urlopen(tempURL)
    except Exception as exception:
        disp(type(exception).__name__, "\n")
        disp(exception.__class__.__name__, "\n")
        disp(exception.__class__.__qualname__, "\n")
        return False
    webContent = response.read().decode('utf-8').strip()
    if dispWebContent:
        disp(webContent, "\n")
    variable = re.findall('href="[^"]*"', webContent)

    for oneLink in variable:
        oneLink = oneLink.replace("href=", "")
        oneLink = oneLink.replace(oneLink[0], "")
        # only link here

        # sort
        if oneLink.startswith("mailto:"):
            mail.append(oneLink.replace("mailto:", ""))
        else:
            if oneLink.startswith("#"):
                oneLink = parentName+oneLink
            elif oneLink.startswith("?"):
                oneLink = parentName+oneLink
            elif oneLink.startswith("./"):
                oneLink = parentName+oneLink.replace("./", "")
            elif oneLink.startswith("https://"):
                pass
            elif oneLink.startswith("http://"):
                pass
            elif oneLink.startswith("//"):
                oneLink = oneLink.replace("//", "http://")
            elif oneLink.startswith("/"):
                oneLink = oneLink[1:]
                oneLink = domainName + oneLink
            else:
                oneLink = parentName+oneLink
            if oneLink.startswith(domainName):
                if oneLink not in inDomain:
                    lastAdd = len(inDomain)
                    inDomain.append(oneLink)
            else:
                if oneLink not in ext:
                    ext.append(oneLink)


def image(uri):
    imgExt = ["png", "jpg", "ico"]
    for oneExt in imgExt:
        if uri.endswith(oneExt):
            return True
    return False


try:
    inDomain.append(baseUrl)
    for oneLink in inDomain:
        disp("Exploring "+oneLink, "\n")
        checkFile = True
        if image(oneLink):
            checkFile = False
        elif oneLink.endswith("css"):
            if globalVar["css"]:
                checkFile = True
            else:
                checkFile = False
        elif oneLink.endswith("json"):
            if globalVar["json"]:
                checkFile = True
            else:
                checkFile = False
        if checkFile:
            rest = explorer(oneLink)
            if rest == False and globalVar["rmError"] == True:
                inDomain.remove(oneLink)
except KeyboardInterrupt:
    pass
except Exception as exception:
    pass

if not globalVar["quiet"]:
    disp("Finished Exploring", "\n")

if globalVar["sitemap"]:
    f = open("sitemap.xml", "w")
    f.write('<?xml version="1.0" encoding="UTF-8"?>')
    f.write("\n")
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    f.write("\n")
    for oneLink in inDomain:
        f.write("<url>")
        f.write("\n")
        f.write("<loc>")
        f.write(oneLink)
        f.write("</loc>")
        f.write("\n")
        f.write("</url>")
        f.write("\n")
    f.write("</urlset>")
    f.close()

disp(">>> Internal : ", '')
disp(len(inDomain), "\n")
if globalVar["verbose"]:
    for oneLink in inDomain:
        disp(oneLink, "\n")

disp(">>> External : ", '')
disp(len(ext), "\n")
if globalVar["verbose"]:
    for oneLink in ext:
        disp(oneLink, "\n")

disp(">>> Mails : ", '')
disp(len(mail), "\n")
if globalVar["verbose"]:
    for oneLink in mail:
        disp(oneLink, "\n")

disp(">>> all URLs discovered at : ", '')
disp(lastAdd, "\n")
