const mysql = require('mysql');
const SelectQueries = require('../Queries/SelectQueries');
const InsertQueries = require('../Queries/InsertQueries');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'psh_game_score_table'
});

class BdHelper {
    executeQuery = (callback, query) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(query, (err, rows) => {
                connection.release();
                if (err) throw err;
                console.log('Executed Properly');
                callback(JSON.parse(JSON.stringify(rows)));
            });
        });
    }

    getStatPlayers = (callback) => {
        this.executeQuery(callback, SelectQueries.getStatsPlayers);
    }

    getIdsWithoutStats = (callback) => {
        this.executeQuery(callback, SelectQueries.getPlayersWithoutStats);
    }

    insertUsers = (users) => {
        this.executeQuery(() => { }, InsertQueries.insertUsers + users);
    }

    insertStats = (stats) => {
        this.executeQuery(() => { }, InsertQueries.insertStats + stats);
    }
}

module.exports = BdHelper;