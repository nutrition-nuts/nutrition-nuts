import requests
from dotenv import load_dotenv
import os
import json

load_dotenv()

baseUrl = 'https://api.github.com'

token = os.getenv('GITHUB_ACCESS_TOKEN')
header = {'Authorization': 'Bearer ' + token}
username = 'nutritionnutbot'


def githubPost(route: str, body: object):
    return requests.post(baseUrl + route, json=body, headers=header)


def githubGet(route: str):
    return requests.get(baseUrl + route)

# 1. Fork


def makeFork(upstreamOwner, repo, localOwner):
    body = {
        "owner": localOwner,
        "repo": repo,
        "default_branch_only": "true"
    }

    result = githubPost(f'/repos/{upstreamOwner}/{repo}/forks', body)
    print(f"Make Fork: {result.status_code}")

# 2. Get Ref Head


def getRefHead(owner, repo):
    result = githubGet(f'/repos/{owner}/{repo}/git/ref/heads/main')
    print(f"Get Ref Head: {result.status_code}")
    return result.json()["object"]["sha"]

# 3. Get Head Commit


def getHeadCommitTree(owner, repo, refHead):
    result = githubGet(f'/repos/{owner}/{repo}/commits/{refHead}')
    print(f"Get Head Commit Tree {result.status_code}")
    return result.json()["commit"]["tree"]["sha"]

# 4. Post Blob


def postFileBlob(owner, repo, content):
    body = {
        "owner": owner,
        "repo": repo,
        "content": content,
        "encoding": "utf-8"
    }
    result = githubPost(f'/repos/{owner}/{repo}/git/blobs', body)
    print(f"Post File Blob: {result.status_code}")
    return result.json()["sha"]

# 6. Create Tree With Blob


def createTreeWithBlob(owner, repo, baseTree, blobPath, blobSha):
    body = {
        "owner": owner,
        "repo": repo,
        "base_tree": baseTree,
        "tree": [{
            "path": blobPath,
            "mode": "100644",
            "type": "blob",
            "sha": blobSha
        }]
    }

    result = githubPost(f"/repos/{owner}/{repo}/git/trees", body)
    print(f"Create Tree With Blob: {result.status_code}")
    return result.json()["sha"]

# 7. Create Commit with tree


def createCommitWithTree(owner, repo, message, parentCommit, treeSha):
    body = {
        "owner": owner,
        "repo": repo,
        "message": message,
        "parents": [parentCommit],
        "tree": treeSha
    }

    result = githubPost(f"/repos/{owner}/{repo}/git/commits", body)
    print(f"Create Commit with Tree: {result.status_code}")
    return result.json()["sha"]

# 8. Update Head of Fork to new commit


def updateHead(owner, repo, branch, commitSha):
    body = {
        "owner": owner,
        "repo": repo,
        "ref": f"refs/heads/{branch}",
        "sha": commitSha
    }

    result = githubPost(f"/repos/{owner}/{repo}/git/refs/heads/{branch}", body)
    print(f"Update Fork Head: {result.status_code}")
    return result.json()

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

    result = githubPost(f"/repos/{upstreamOwner}/{upstreamRepo}/pulls", body)
    print(f"Make PR: {result.status_code}")
    if (result.status_code >= 400):
        print(json.dumps(result.json()))
    return result

def updateMarkdown(markdown: str):
    return f"""
# Hungry?

You devs are working hard and look very hungry. Here is a selected recipe for you!

We have also added a `EATME.md` file to your repo to permanently document the recipe. Super useful! Your boss will love it! Enjoy!

***

{markdown}

***
### *© 2022 Nutrition Nuts*
"""


def createEatMeGithubPR(ownerOfRepo, repoName, markdown):
    makeFork(ownerOfRepo, repoName, username)

    refHead = getRefHead(username, repoName)

    headCommitTree = getHeadCommitTree(username, repoName, refHead)

    fileBlobSha = postFileBlob(username, repoName, markdown)

    newTreeWithFileSha = createTreeWithBlob(
        username, repoName, headCommitTree, "EATME.md", fileBlobSha)

    commitSha = createCommitWithTree(
        username, repoName, "Heard Someone was Hungry! 🌮", refHead, newTreeWithFileSha)

    updatedHead = updateHead(username, repoName, "main", commitSha)

    createdPR = createPR(ownerOfRepo, repoName, username,
                         repoName, "Heard Someone was Hungry! 🌮", updateMarkdown(markdown), "main")


if (__name__ == "__main__"):
    owner = 'nutrition-nuts'
    repo = 'nutrition-nuts'

    createEatMeGithubPR(owner, repo, "# TEST")
