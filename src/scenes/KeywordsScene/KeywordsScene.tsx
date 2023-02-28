import React, { FC, useEffect, useState, useMemo } from 'react';
import KeywordsTable from './components/keywordsTable/keywordsTable';
// Material UI
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
// Types
import KeywordData from '../../@types/keyword.type';

interface KeywordsSceneProps {
    keywords: KeywordData[];
    title: string;
    isLoading: boolean;
    keywordsTrending: number[];
}

const KeywordsScene: FC<KeywordsSceneProps> = ({ keywords, title, isLoading, keywordsTrending }) => {
    /* #region  Hooks */
    const [tableData, setTableData] = useState<KeywordData[]>(keywords);
    const [page, setPage] = useState<number>(Number(localStorage.getItem('page')) || 0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(Number(localStorage.getItem('rowsPerPage')) || 25);
    const [sortField, setSortField] = useState<string>(localStorage.getItem('sortField') || '');
    const [order, setOrder] = useState<string>(localStorage.getItem('order') || 'asc');
    /* #endregion */

    /* #region  Handlers */
    const handleChangePage = (newPage: number) => {
        localStorage.setItem('page', newPage.toString());
        setPage(newPage);
    };

    const changeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        localStorage.setItem('rowsPerPage', event.target.value);
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const setSort = (field: string) => {
        setPage(0);
        const sortOrder = field === sortField && order === 'asc' ? 'desc' : 'asc';
        localStorage.setItem('sortField', field);
        localStorage.setItem('order', sortOrder);
        setSortField(field);
        setOrder(sortOrder);
    };
    /* #endregion */

    const sortData = useMemo(
        () => {
            return !sortField ? keywords : [...keywords].sort((a, b) => {
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (order === 'asc' ? 1 : -1)
                );
            });
        },
        [order, keywords, sortField],
    );

    useEffect(() => {
        const data = sortData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setTableData(data);
    }, [sortData, page, rowsPerPage])

    return (
        <>
            {isLoading ? (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="50vh"
                    width="100%"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <KeywordsTable
                    title={title}
                    count={keywords.length}
                    tableData={tableData}
                    setSort={setSort}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onClickOnChangePage={handleChangePage}
                    handleChangeRowsPerPage={changeRowsPerPage}
                    keywordsTrending={keywordsTrending}
                    sortField={sortField}
                    sortOrder={order}
                />
            )}
        </>
    );
};

export default KeywordsScene;