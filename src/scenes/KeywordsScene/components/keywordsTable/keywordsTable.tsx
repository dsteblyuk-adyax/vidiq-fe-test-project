import React, { FC, useEffect, useState, Fragment } from 'react';
import classNames from 'classnames';
import Arrows from '../arrows/arrows';
// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
// Helpers
import { getBadgeColor } from '../../../../helpers/badgeColor';
import { numberWithCommas } from '../../../../helpers/formatNumber';
// Types
import KeywordData from '../../../../@types/keyword.type';

interface KeywordsSceneProps {
    title: string;
    count: number;
    tableData: KeywordData[];
    setSort: (field: string) => void;
    rowsPerPage: number;
    page: number;
    onClickOnChangePage: (newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    keywordsTrending: number[];
    sortField: string;
    sortOrder: string;
}

interface StringMap {
    [key: string]: string;
}

const alwaysShowColKey: string = 'keyword';

const columnsNames: StringMap = {
    'search_volume': 'Search volume',
    'competition': 'Competition',
    'overall_score': 'Overall Score',
};

const columnsKeys: StringMap = {
    'search_volume': 'search_volume',
    'competition': 'competition',
    'overall_score': 'overall_score',
};

const KeywordsTable: FC<KeywordsSceneProps> = ({
    title,
    count,
    tableData,
    setSort,
    rowsPerPage,
    page,
    onClickOnChangePage,
    handleChangeRowsPerPage,
    keywordsTrending,
    sortField,
    sortOrder,
}) => {
    /* #region  Hooks */
    const styles = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [shownColumn, setShownColumn] = useState<string>(localStorage.getItem('shownColumn') || 'search_volume');
    const [showAllColumns, setShowAllColumns] = useState<boolean>(true);

    const changeColumnSelect = (value: string) => {
        localStorage.setItem('shownColumn', value);
        setShownColumn(value);
    };
    /* #endregion */

    /* #region  Render Helpers */
    const getCellData = (col: string, value: string | number): JSX.Element => {
        switch (col) {
            case ('overall_score'):
                return (
                    <div
                        className={styles.score}
                        style={{
                            backgroundColor: getBadgeColor(Number(value))
                        }}
                    >
                        {value}
                    </div>
                );
            case ('search_volume'):
                return <div>{numberWithCommas(Number(value))}</div>;
            default:
                return <div>{value}</div>;
        }
    }
    /* #endregion */

    useEffect(() => {
       if (!isSmallScreen) {
           setShowAllColumns(!isSmallScreen);
           setShownColumn('search_volume');
       }
    },[isSmallScreen]);

    return (
        <Paper className={styles.container}>
            <Table>
                <TableHead className={styles.tableHead}>
                    <TableRow>
                        <TableCell colSpan={isSmallScreen ? 2 : 4} className={styles.tableHeadCol}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography component="h1" className={styles.title}>
                                    {title}
                                </Typography>
                                {isSmallScreen && (
                                    <FormControl size="small">
                                        <Select
                                            className={styles.select}
                                            value={shownColumn}
                                            onChange={(e:SelectChangeEvent) => changeColumnSelect(e.target.value)}
                                        >
                                            <MenuItem value={'search_volume'}>Search volume</MenuItem>
                                            <MenuItem value={'competition'}>Competition</MenuItem>
                                            <MenuItem value={'overall_score'}>Overall Score</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classNames(styles.tableHeadCol, styles.firstColumn, styles.tableHeadSort)}>
                            <Button disableElevation className={styles.sortButton} onClick={() => setSort(alwaysShowColKey)}>
                                Keywords
                                <Arrows direction={sortField === alwaysShowColKey ? sortOrder : ''} />
                            </Button>
                        </TableCell>
                        {Object.keys(columnsKeys).map((col) => (
                            <Fragment key={col}>
                                {(!isSmallScreen || shownColumn === col) && showAllColumns && (
                                    <TableCell className={classNames(styles.tableHeadCol, styles.tableHeadSort)}>
                                        <Button disableElevation className={styles.sortButton} onClick={() => setSort(col)}>
                                            {columnsNames[col]}
                                            <Arrows direction={sortField === col ? sortOrder : ''} />
                                        </Button>
                                    </TableCell>
                                )}
                            </Fragment>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((keyword) => (
                        <Fragment key={keyword.id}>
                            <TableRow>
                                <TableCell className={classNames(styles.firstBodyColumn, styles.columnValue)}>
                                    {keyword.keyword} {keywordsTrending.includes(keyword.id) && (
                                        <img src="/images/trend_image.svg" alt="" />
                                    )}
                                </TableCell>

                                {Object.keys(columnsKeys).map((col) => {
                                    const value = keyword[columnsKeys[col]];
                                    return (
                                        <Fragment key={keyword.id + col}>
                                            {(!isSmallScreen || shownColumn === col) && showAllColumns && (
                                                <TableCell className={styles.columnValue}>
                                                    {getCellData(col, value)}
                                                </TableCell>
                                            )}
                                        </Fragment>
                                    )
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={isSmallScreen ? 2 : 4} className={styles.delimiterCell}>
                                    <div className={styles.delimiter}></div>
                                </TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                className={styles.pagination}
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={!tableData.length || tableData.length <= 0 ? 0 : page}
                onPageChange={(e, newPage) => onClickOnChangePage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    container: {
      width: '100%',
      paddingBottom: '52px',
      border: 0,
      boxShadow: 'none',
    },
    title: {
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: 1.5,
    },
    tableHeadCol: {
        borderBottom: 0,
        padding: '14px 16px 12px',
    },
    tableHead: {
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        background: 'white'
    },
    pagination: {
        position: 'fixed',
        bottom: 0,
        height: '52px',
        width: '100%',
        background: 'white',
        zIndex: 2,
        boxShadow: '0 -6px 12px rgba(0, 0, 0, 0.08)',
    },
    firstColumn: {
        width: '490px',
        textAlign: 'left',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            width: '70%',
        },
    },
    score: {
        display: 'inline-block',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '15px',
        color: 'white',
        padding: '3px 4px',
        minWidth: '30px',
        textAlign: 'center',
        borderRadius: '20px',
    },
    tableHeadSort: {
        color: '#7A7A7A',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '16px',
    },
    sortButton: {
        padding: 0,
        color: '#7A7A7A',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '16px',
        textTransform: 'none',
        background: 'none !important',
        display: 'inline-flex',
        alignItems: 'center',
    },
    columnValue: {
        fontWeight: 700,
        fontSize: '12px',
        lineHeight: '21px',
        textTransform: 'capitalize',
        border: 0
    },
    delimiterCell: {
      padding: '0 16px;',
      border: 0
    },
    delimiter: {
        borderBottom: '1px solid #F0F0F0',
    },
    select: {
        borderRadius: '100px',
        borderColor: '#E8E8E8',
        fontSize: '14px',
        fontWeight: '700',
        color: '#252626',
    },
    firstBodyColumn: {
        textTransform: 'lowercase',
    },
}));

export default KeywordsTable;