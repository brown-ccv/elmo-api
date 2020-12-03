const mysql = require('mysql');

let COUNTS = null;

const pool  = mysql.createPool({
    connectionLimit : 10,
    host     : process.env.SLURM17_DB_HOST,
    user     : process.env.SLURM17_DB_USER,
    password : process.env.SLURM17_DB_PASSWORD,
    database : process.env.SLURM17_DB_DATABASE
});

exports.pool = pool;

const parseCounts = (rawCounts) => {
    return rawCounts.map((val) => {
        let dt = new Date(val.submit_day)
        dt.setHours(val.submit_hour);
        return {
            timestamp: dt,
            count: val.count
        }
    })
}

const getCounts = () => {
    return new Promise( (resolve, reject) => {
        if (COUNTS) resolve(COUNTS);

        pool.query('select date(time_submit) as submit_day, hour(time_submit) as submit_hour, count(*) as count from oscar_job_view group by date(time_submit), hour(time_submit);', function (error, results, fields) {
            if (error) {
                console.log(error);
                reject(error);
            }

            COUNTS = parseCounts(results);
            resolve(COUNTS);
        });
    });
}

exports.getCounts = getCounts
