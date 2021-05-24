const downloadCSV = (csv) => {
    var data, filename, link;
    if (csv == null) return;

    filename = 'psh_scoreboard.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

export const convertArrayOfObjectsToCSV = (data) => {
    let result, ctr, keys, columnDelimiter, lineDelimiter
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = ',';
    lineDelimiter = '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach((item) => {
        ctr = 0;
        keys.forEach((key) => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });
    downloadCSV(result);
}

