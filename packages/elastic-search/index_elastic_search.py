from os import listdir
from os.path import isfile, join
import requests

DATA_DIR = "./data"
BASE_URL = "http://localhost:9200"

# assuming here that all of our indices will have a separate folder within the data dir
indices = listdir(DATA_DIR)

for index in indices:
    print(f"------ Index {index} ------")
    elastic_index_url = join(BASE_URL, index)

    delete_req = requests.delete(elastic_index_url)
    print(f"DELETE INDEX {index}: {delete_req.text}")

    create_index_req = requests.put(elastic_index_url)
    print(f"CREATE INDEX {index}: {create_index_req.text}")

    documents_dir = join(DATA_DIR, index)
    documents = [f for f in listdir(
        documents_dir) if isfile(join(documents_dir, f))]

    for document in documents:
        file = open(join(documents_dir, document))
        json = file.read()

        # throw the document to elasticsearch
        doc_post_req = requests.post(join(elastic_index_url, "_doc"), json, headers={
                                     "Content-Type": "application/json"})
        message = f"✅ {doc_post_req.status_code}" if doc_post_req.status_code == 201 else f"❌ {doc_post_req.text}"
        print(f"POST DOCUMENT {document}: {message}")

    print()
