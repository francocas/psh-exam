import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import LastTimeGenerationComponent from './LastTimeGenerationComponent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';
import { convertArrayOfObjectsToCSV } from '../Utils/ConvertToCsv';
import { convertTime } from '../Utils/ConvertTime';
const { default: axios } = require('axios');
const MINUTE_MS = 10000;

const TableComponent = () => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Stat Id',
                accessor: 'StatId',
            },
            {
                Header: 'Player Id',
                accessor: 'PlayerId',
            },
            {
                Header: 'Nickname',
                accessor: 'Nickname',
            },
            {
                Header: 'Creation Date',
                accessor: 'CreationDate',
            },
            {
                Header: 'Score',
                accessor: 'Score',
            },
            {
                Header: 'Picture',
                accessor: 'Picture',
                Cell: (row) => {
                    return <div><img height={34} src={row.row.original.Picture}></img></div>
                }
            }
        ],
        []
    );
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [lastTimeGenerated, setLastTimeGenerated] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            async function getData() {
                await axios
                    .get("http://localhost:3001/")
                    .then((response) => {
                        if (response.data.length > 0) {
                            let latestTimestamp = Math.max.apply(Math, response.data.map((stat) => { return stat.CreationDate; }));
                            response.data.forEach((row) => {
                                row.CreationDate = convertTime(row.CreationDate);
                            })
                            setLastTimeGenerated(convertTime(latestTimestamp));
                            setData(response.data);
                            setLoadingData(false);
                        }
                    });
            }
            if (loadingData) {
                getData();
            }
        }, MINUTE_MS);
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));

    const onClickExportToCsv = () => {
        convertArrayOfObjectsToCSV(data);
    }

    const classes = useStyles();
    return (
        <section>
            <section className='section' style={{ margin: '10px 0px' }}>
                <section style={{ display: 'flex' }}>
                    <section style={{
                        marginRight: '170px', display: 'flex', alignItems: 'center'
                    }}>
                        <span className='statsSpan'>Last stats update: </span>
                        <LastTimeGenerationComponent lastDate={lastTimeGenerated} />
                    </section>
                    <section className={classes.root}>
                        <Button onClick={onClickExportToCsv} variant='contained' disabled={loadingData} color={loadingData ? 'disabled' : 'primary'}>Export to CSV</Button>
                    </section>
                </section>
            </section>
            <section className='section'>
                <table {...getTableProps()} style={{ borderSpacing: '0px', borderCollapse: 'collapse' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}
                                className='headerRow'
                            >
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className='header'
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}
                                    className='row'
                                >
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                className='cell'
                                            >
                                                {cell.render('Cell')}

                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </section >
    )
}

export default TableComponent;