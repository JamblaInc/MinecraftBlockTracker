psql -U postgres -h 127.0.0.1 -c "CREATE DATABASE rank_it;"

for i in db_scripts/*.sql; do
    psql -U postgres -h 127.0.0.1 -d rank_it -f $i
done

for i in test_data/*.sql; do
    psql -U postgres -h 127.0.0.1 -d rank_it -f $i
done