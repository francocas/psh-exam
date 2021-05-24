class StringBuilder {
    buildInsertUserValues = (users) => {
        let userInsertValues = '';
        for (i = 0; i < users.length; i++) {
            if (i != users.length - 1) {
                userInsertValues = userInsertValues.concat(`('${users[i].nickname}', '${users[i].picture}'), `);
                continue;
            }
            userInsertValues = userInsertValues.concat(`('${users[i].nickname}', '${users[i].picture}')`);
        };
        return userInsertValues;
    }

    buildInsertStatsValues = (ids) => {
        let statsInsertValues = '';
        for (i = 0; i < ids.length; i++) {
            if (i != ids.length - 1) {
                statsInsertValues = statsInsertValues.concat(`('${ids[i].Id}', '${Math.round(Math.random() * 100)}'), `);
                continue;
            }
            statsInsertValues = statsInsertValues.concat(`('${ids[i].Id}', '${Math.round(Math.random() * 100)}')`);
        };
        return statsInsertValues;
    }
}

module.exports = StringBuilder;
