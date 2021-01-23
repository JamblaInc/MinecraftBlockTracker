import subprocess
import argparse
import shlex

DB_NAME = "blocks"
DB_USER = "postgres"
PURGE_CONNECTIONS_SQL = "SELECT pid, pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = current_database() AND pid <> pg_backend_pid()"
PURGE_CONNECTIONS_CMD = f'psql -U {DB_USER} -c "{PURGE_CONNECTIONS_SQL}";'
DROP_CMD = f'psql -U {DB_USER} -c "DROP DATABASE IF EXISTS {DB_NAME}";'
VALID = True


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


def drop_database() -> None:
    """
    Drops the database.
    """
    run_command(PURGE_CONNECTIONS_CMD)
    run_command(DROP_CMD)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--db_user", help="Database User, default is 'postgres'")
    parser.add_argument(
        "--db_name", help="Name of the database, default is 'blocks'"
    )
    args = parser.parse_args()

    if args.db_user and args.db_name:
        drop_database()
    else:
        print("Please specify the db_user and db_name")
