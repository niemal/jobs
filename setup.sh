#!/bin/bash
TARGET=$(pwd)/jobs_daily.sh
LOGS=$(pwd)/logs
DATAMINING=$(pwd)/data_mining.js
NODE_PATH=$(which node)

cat <<EOF > "$TARGET"
#!/bin/bash

if [ ! -d "$LOGS" ]; then
    mkdir "$LOGS"
fi

DIR_SIZE=\$(ls "$LOGS" | wc -l)
TODAY=\$(date "+%d_%m_%y")

if [ "\$DIR_SIZE" -gt "10" ]; then
    if [ ! -d "$LOGS/archive" ]; then
        mkdir "$LOGS/archive"
    fi

    tar -czf "jobs_logs_archive_\$TODAY.tar.gz" *.log
    mv "jobs_logs_archive_\$TODAY.tar.gz" "$LOGS/archive"
fi

$NODE_PATH $DATAMINING &> $LOGS/jobs_\$TODAY.log &
EOF

chmod +x "$TARGET"

# Setting config for building..
cat <<EOF > config.json
{
    "siteUrl": "https://niemal.dev/jobs"
}
EOF