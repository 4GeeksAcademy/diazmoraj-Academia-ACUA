import React, { useContext, useEffect } from "react";
import { MultiButton } from '../MultiButton'
import { Link } from 'react-router-dom'
import { Context } from '../../store/appContext'

export const ListProfRegCourses = ({ course, id, student }) => {
    const { store, actions } = useContext(Context);

    return (
        <tr className="table-row">
            <th className="text-center" scope="row">{id}</th>
            <td className="text-center">{course}</td>
            <td className="text-center">{student}</td>
        </tr>
    )
}