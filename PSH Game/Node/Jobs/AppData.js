const express = require('express');
const app = express();
const { default: axios } = require('axios');
const BdHelper = require('./Utils/BdHelper');
const StringBuilder = require('./Utils/StringBuilders');
const SB = new StringBuilder();
const helper = new BdHelper();
const cors = require('cors');

app.use(cors());
app.get('/', cors(), (req, res) => {
  helper.getStatPlayers((rows) => {
    res.send(rows);
  });
});

app.post('/generateNewStats', cors(), (req, res) => {
  let users = [];
  let promises = [];
  for (i = 0; i < 1/*Math.round(Math.random() * 10)*/; i++) {
    promises.push(
      axios.get('https://randomuser.me/api').then(user => {
        let userEntry = user.data.results[0];
        users.push({ 'nickname': userEntry['login']['username'], 'picture': userEntry['picture']['thumbnail'] });
      })
    );
  }
  Promise.all(promises).then(() => {
    helper.insertUsers(SB.buildInsertUserValues(users));
    helper.getIdsWithoutStats((rows) => {
      helper.insertStats(SB.buildInsertStatsValues(rows));
    })
  }).catch(er => {
    console.log(er);
  });
  res.send();
});


app.listen(3001, () => {
  console.log('Server is running at port 3001');
});