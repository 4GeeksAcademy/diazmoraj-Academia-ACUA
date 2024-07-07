import React, { useContext, useEffect } from "react";
import { MultiButton } from '../MultiButton'
import { Link } from 'react-router-dom'
import { Context } from '../../store/appContext'

export const ListProfPayReg = ({ professor, id, method, iban, phone }) => {
    const { store, actions } = useContext(Context);

    return (
        <tr className="table-row">
            <th className="text-center" scope="row">{id}</th>
            <td className="text-center">{professor}</td>
            <td className="text-center">{method}</td>
            <td className="text-center">{phone}</td>
            <td className="text-center">{iban}</td>
        </tr>
    )
}