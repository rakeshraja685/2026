import urllib.request
import urllib.parse
import os

urls = {
  "farewell": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2VhNjZhZGVlYjFkYTRhZDFiZjM4MmEwYjcyMmZmNTRjEgsSBxCA99uMsB4YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTUzOTE2OTE0NjE5MzQwNTg3&filename=&opi=89354086",
  "landing": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzM1NjA4ZmVmYTE5MDQ0Yjg4NjA3NjZiYjQzMzZmZTc3EgsSBxCA99uMsB4YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTUzOTE2OTE0NjE5MzQwNTg3&filename=&opi=89354086",
  "memory": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2M0NWE2NDg3YTMwNTQ0Y2ViNTA4YmQyNTkxMDVjZDQwEgsSBxCA99uMsB4YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTUzOTE2OTE0NjE5MzQwNTg3&filename=&opi=89354086",
  "yearbook": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2JhZDE5Njk5YjhmYTQzYjc5NWFhNGI2MzBmYWY4YjlhEgsSBxCA99uMsB4YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTUzOTE2OTE0NjE5MzQwNTg3&filename=&opi=89354086"
}

for name, url in urls.items():
    print(f"Downloading {name}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        with open(f"C:/Users/rakes/OneDrive/Desktop/farewell website/src/stitch_{name}.html", "w", encoding="utf-8") as f:
            f.write(html)
    except Exception as e:
        print(f"Failed {name}: {e}")
