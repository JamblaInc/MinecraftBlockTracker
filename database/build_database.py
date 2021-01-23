import subprocess
import argparse
import shlex

DB_NAME = "blocks"
DB_USER = "postgres"
CREATE_CMD = f'psql -U {DB_USER} -c "CREATE DATABASE {DB_NAME}";'
BUILD_DATABASE_CMD = f"python db_scripts/build.py --db_user {DB_USER} --db_name {DB_NAME}"
BUILD_TEST_DATA_CMD = f"python test_data/build.py --db_user {DB_USER} --db_name {DB_NAME}"


def run_command(command):
    process = subprocess.Popen(shlex.split(
        command), stdout=subprocess.PIPE, shell=True, encoding='utf8')
    while True:
        output = process.stdout.readline()
        if output == '' and process.poll() is not None:
            break
        if output:
            print(output.strip())
    rc = process.poll()
    return rc


def create_database() -> None:
    """
    Creates the database.
    """
    run_command(CREATE_CMD)


def upgrade_database() -> None:
    """
    This will run all of the build scripts
    inside the db_scripts folder.
    """
    run_command(BUILD_DATABASE_CMD)


def add_test_data() -> None:
    """
    This will add all of the test data
    into the database from the test_data
    folder.
    """
    run_command(BUILD_TEST_DATA_CMD)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--db_user", help="Database User, default is 'postgres'")
    parser.add_argument(
        "--db_name", help="Name of the database, default is 'rank_it'"
    )
    args = parser.parse_args()

    if args.db_user:
        DB_USER = args.db_user
    if args.db_name:
        DB_NAME = args.db_name

    create_database()
    upgrade_database()
    add_test_data()
