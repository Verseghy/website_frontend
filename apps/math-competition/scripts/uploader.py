import sys
import csv
import argparse
import utils


def process_row(row):
    return {"id": int(row["id"]),
            "text": row["text"],
            "image": row["image"]=="1"
            }


def read_to_db(filename, collection):
    with open(filename, newline='') as csvfile:
        reader = csv.DictReader(csvfile, ("id", "text", "image"))
        utils.log("Started uploading data from \"{}\"...\n".format(filename))
        for row in reader:
            processed_row = process_row(row)
            utils.upload_entry(collection, str(processed_row["id"]), processed_row)
        utils.log("\nUpload finished!")

def main():
    DEFAULTS = {
                "key": "./serviceAccountKey.json",
                "collection": "problems",
                }

    # Only allow python 3
    if sys.version_info < (3,0):
        print("Sry, only Python 3 is supported")
        exit(0)

    parser = argparse.ArgumentParser(description='Upload data to cloud firestore from a CSV file', epilog="Made by László Baráth (Sasszem), 2018")
    parser.add_argument('source', help='source CSV file')
    parser.add_argument('--key', help='Account key JSON file. Defaults to "{}"'.format(DEFAULTS["key"]), default=DEFAULTS["key"])
    parser.add_argument('--collection', help='Collection to upload to. Defaults to "{}"'.format(DEFAULTS["collection"]), default=DEFAULTS["collection"])
    parser.add_argument('--nofresh', help='Do not remove old entries from target collection', action="store_false", dest="fresh")
    parser.add_argument('-v','--verbose', help='Enable additional logging', action="store_true", dest="verbose")

    args = parser.parse_args()
    utils.verbose(args.verbose)

    db = utils.make_connection(args.key)

    collection = utils.get_collection(db, args.collection, args.fresh)

    read_to_db(args.source, collection)


if __name__=="__main__":
    main()
