import utils
import argparse
import csv

def get_problem_ids(db):
    problem_ids = []
    for problem in db.collection("problems").get():
        problem_ids.append(problem.get("id"))
    return sorted(problem_ids)


def save_database(teams_handle, outputfile, heading, ids):
    teams = utils.read_teams(teams_handle)
    with open(outputfile, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        if heading:
            writer.writerow(["Name", *ids])
        for team in teams:
            writer.writerow([team["name"],*(team["submits"].get(key,None) for key in ids)])


def main():
    DEFAULTS = {
                "key": "./serviceAccountKey.json",
                }

    parser = argparse.ArgumentParser(description='Download and save teams answers to file', epilog="Made by László Baráth (Sasszem), 2018")
    parser.add_argument('output', help='Output CSV file')
    parser.add_argument('--key', help='Account key JSON file. Defaults to "{}"'.format(DEFAULTS["key"]), default=DEFAULTS["key"])
    parser.add_argument('-v','--verbose', help='Enable additional logging', action="store_true", dest="verbose")
    parser.add_argument('--no-heading',help='Disable the generation of a first heading row in the report', dest="heading", action="store_false")
    args = parser.parse_args()

    db = utils.make_connection(args.key)
    ids = get_problem_ids(db)
    save_database(db.collection("teams"), args.output, args.heading, ids)

if __name__=="__main__":
    main()
