import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

LOG = 0
def log(msg):
    if LOG:
        print(msg)

def verbose(verbose):
    global LOG
    if verbose:
        LOG = 1
        log("Verbose mode on!")

# Make a connection to the app
def make_connection(keyfile):
    log("Connecting to firebase using key file \"{}\"...".format(keyfile))
    cred = credentials.Certificate(keyfile)
    firebase_admin.initialize_app(cred)
    log("Connected to firebase!\n")
    return firestore.client()

# Just a simple facade
def upload_entry(collection, name, entry):
    collection.document(name).set(entry)
    log("Uploaded document \"{}\" to collection:".format(name))
    log("   {}".format(entry))

# from:
# https://firebase.google.com/docs/firestore/manage-data/delete-data
def delete_collection(coll_ref, batch_size):
    docs = coll_ref.limit(10).get()
    deleted = 0

    for doc in docs:
        log('   Deleting doc {} => {}'.format(doc.id, doc.to_dict()))
        doc.reference.delete()
        deleted = deleted + 1

    if deleted >= batch_size:
        return delete_collection(coll_ref, batch_size)


# Handle retrieving a fresh collection, if required
def get_collection(db, collection_name, fresh):
    collection = db.collection(collection_name)
    if fresh:
        log("Deleting old entries from collection \"{}\"".format(collection_name))
        delete_collection(collection, 10)
        log("Deleted all entries from collection \"{}\"\n".format(collection_name))
    return collection



def read_team(team_snapshot):
    name = team_snapshot.get("name")
    submits = team_snapshot.reference.collection("solutions")
    solutions = {}
    for sol in submits.get():
        solutions[sol.get("id")]=sol.get("solution")
    return name, solutions

def read_teams(teams_handle):
    teams = []
    for team in teams_handle.get():
        name, submited = read_team(team)
        teams.append({"name":name, "submits":submited})
    return teams
