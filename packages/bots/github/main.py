import requests
from dotenv import load_dotenv
import os
import json

load_dotenv()

baseUrl = 'https://api.github.com'

username = 'nutritionnutbot'

token = os.getenv('GITHUB_ACCESS_TOKEN')
header = {'Authorization': 'Bearer ' + token}

def githubPost(route: str, body: object):
    return requests.post(baseUrl + route, json = body, headers = header)

def githubGet(route: str):
    return requests.get(baseUrl + route)

owner = 'nutrition-nuts'

repo = 'nutrition-nuts'

# 1. Fork
def makeFork(owner, repo):
    body = {
        "owner": "nutritionnutbot",
        "repo":repo,
        "default_branch_only": "true"
    }

    result = githubPost(f'/repos/{owner}/{repo}/forks', body)

# 2. Get Ref Head
def getRefHead(owner, repo):
    return githubGet(f'/repos/{owner}/{repo}/git/ref/heads/main').json()["object"]["sha"]

# 3. Get Head Commit
def getHeadCommitTree(owner, repo, refHead):
    return githubGet(f'/repos/{owner}/{repo}/commits/{refHead}').json()["commit"]["tree"]["sha"]

# 4. Post Blob
def postFileBlob(owner, repo, content):
    body = {
        "owner": owner,
        "repo":repo,
        "content": content,
        "encoding": "utf-8"
    }
    
    return githubPost(f'/repos/{owner}/{repo}/git/blobs', body).json()["sha"]

# 6. Create Tree With Blob
def createTreeWithBlob(owner, repo, baseTree, blobPath, blobSha):
   body = {
        "owner": owner,
        "repo":repo,
        "base_tree": baseTree,
        "tree": [{
            "path": blobPath,
            "mode": "100644",
            "type": "blob",
            "sha": blobSha
        }]
    }

   return githubPost(f"/repos/{owner}/{repo}/git/trees", body).json()["sha"]

# 7. Create Commit with tree
def createCommitWithTree(owner, repo, message, parentCommit, treeSha):
    body = {
        "owner": owner,
        "repo":repo,
        "message": message,
        "parents": [parentCommit],
        "tree": treeSha
    }

    return githubPost(f"/repos/{owner}/{repo}/git/commits", body).json()["sha"]

# 8. Update Head of Fork to new commit
def updateHead(owner, repo, branch, commitSha):
   body = {
        "owner": owner,
        "repo":repo,
        "ref": f"refs/heads/{branch}",
        "sha": commitSha
    }

   return githubPost(f"/repos/{owner}/{repo}/git/refs/heads/{branch}", body).json()

# 9. Make PR to upstream repo
def createPR(upstreamOwner, upstreamRepo, localOwner, localRepo, title, body, branch):
   body = {
        "owner": localOwner,
        "repo": localRepo,
        "title": title,
        "body": body,
        "head": f"{localOwner}:{branch}",
        "base": branch
    } 

   return githubPost(f"/repos/{upstreamOwner}/{upstreamRepo}/pulls", body)
   
makeFork(owner, repo)

refHead = getRefHead(username, repo)
print(refHead)

headCommitTree = getHeadCommitTree(username, repo, refHead)

fileBlobSha = postFileBlob(username, repo, "# Test")

newTreeWithFileSha = createTreeWithBlob(username, repo, headCommitTree, "EATME.md", fileBlobSha)

commitSha = createCommitWithTree(username, repo, "TESTTESTTEST", refHead, newTreeWithFileSha)

updatedHead = updateHead(username, repo, "main", commitSha)

createdPR = createPR(owner, repo, username, repo, "TEST TEST TEST", "BODY", "main")



