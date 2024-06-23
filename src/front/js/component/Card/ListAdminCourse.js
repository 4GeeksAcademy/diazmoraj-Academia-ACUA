import React, { useContext } from "react";
import { MultiButton } from '../MultiButton'
import { Link } from 'react-router-dom'
import { Context } from "../../store/appContext";

export const ListAdminCourse = (name, id) => {
    const { store, actions } = useContext(Context);

    return (
        <tr className="table-row">
            <th scope="row">{id}</th>
            <td>{name}</td>
        </tr>
    )
}

