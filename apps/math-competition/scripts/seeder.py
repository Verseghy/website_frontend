"""
Just a damn simple seeder for testing
"""

import utils
import random
import string




def randstring(N):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))

db = utils.make_connection("../serviceAccountKey.json")

def generate_team(team_collection):
    doc = team_collection.document()
    doc.set({"name": randstring(8)})

    solutions = doc.collection("solutions")
    for id in range(30):
	    solutions.document().set({"id":id, "solution": random.randrange(100)})

def generate(db):
    teams = db.collection("teams")
    for i in range(5):
        generate_team(teams)

generate(db)
