import subprocess
import os
import argparse
import shlex

DB_NAME = "blocks"
DB_USER = "postgres"
FILE_PATH = "db_scripts"


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


def build_db(input_file: str) -> None:
    BUILD_CMD = f"psql -U {DB_USER} -d {DB_NAME} -f {input_file}"
    run_command(BUILD_CMD)


def run_build_scripts() -> None:
    for file in os.listdir(FILE_PATH):
        if file.endswith(".sql"):
            build_db(f"{FILE_PATH}/{file}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--db_user", help="Database User, default is 'postgres'"
    )
    parser.add_argument(
        "--db_name", help="Name of the database, default is 'blocks'"
    )
    args = parser.parse_args()

    if args.db_user:
        DB_USER = args.db_user
    if args.db_name:
        DB_NAME = args.db_name

    run_build_scripts()
