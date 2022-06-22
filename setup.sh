#!/bin/bash
TARGET=/etc/cron.daily/jobs_daily
LOGS=$(pwd)/logs
DATAMINING=$(pwd)/data_mining.js

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

su jobs - -c "node $DATAMINING &> $LOGS/jobs_\$TODAY.log &"
EOF

chmod +x "$TARGET"

# Finishing by cleaning up before building
chmod +x "$(pwd)/cleanup.sh"
.$(pwd)/cleanup.sh