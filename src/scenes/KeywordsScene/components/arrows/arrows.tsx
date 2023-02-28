import React, { FC } from 'react';
import classNames from 'classnames';
// Material UI
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

type ArrowsProps = {
    direction: string
};

const Arrows: FC<ArrowsProps> = ({ direction }) => {
    const styles = useStyles();

    return (
        <Typography component="span" className={classNames(styles.arrows, direction)}>
            <span className={classNames(styles.arrow, styles.arrowTop)} />
            <span className={classNames(styles.arrow, styles.arrowDown)} />
        </Typography>
    );
};

const useStyles = makeStyles(() => ({
    arrows: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 7px',
        '&.asc span:first-child': {
            opacity: 1,
        },
        '&.desc span:last-child': {
            opacity: 1,
        }
    },
    arrow: {
        opacity: '0.5',
        border: 'solid black',
        borderWidth: '0 1px 1px 0',
        padding: '3px',
        display: 'block',
    },
    arrowTop: {
        transform: 'rotate(-135deg)',
        marginBottom: '-1px',
    },
    arrowDown: {
        transform: 'rotate(45deg)',
        marginTop: '-1px',
    },
}));

export default Arrows;
