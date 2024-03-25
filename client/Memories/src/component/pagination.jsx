import React from "react";
import { Pagination, PaginationItem } from '@material-ui/lab'

import styles from './style'
import { Link } from "react-router-dom";

const Paginate = () => {
    const classes = styles()

    return <>
        <Pagination
            classes={{ ul: classes.ul }}
            count={10}
            page={1}
            renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />}
            color="primary"
        />
    </>

}

export default Paginate