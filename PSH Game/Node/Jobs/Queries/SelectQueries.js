const SelectQueries = {
    'getStatsPlayers': 'SELECT p.Id as StatId, p.PlayerId, p.Score, UNIX_TIMESTAMP(p.CreationDate) as CreationDate, s.Nickname, s.Picture FROM scoreboard p INNER JOIN players s ON p.PlayerId=s.Id ORDER BY p.Score DESC LIMIT 10',
    'getPlayersWithoutStats': 'select Id from players p where not exists (select PlayerId from scoreboard where p.Id = PlayerId)'
}
module.exports = SelectQueries


//SELECT s.Id, s.Nickname, s.Picture FROM players s JOIN scoreboard p ON p.PlayerId=s.Id