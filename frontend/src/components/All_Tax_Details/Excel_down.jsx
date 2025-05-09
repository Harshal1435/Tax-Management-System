import React, { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

const Excel_down = ({ storeTax }) => {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'TaxTable',
        sheet: 'TaxSheet'
    });

    return (
        <>
            <button onClick={onDownload} className="btn btn-success">
                Download as Excel
            </button>

            <table ref={tableRef} className='adj-block-table'>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Remainder Date</th>
                        <th>TotalTax</th>
                        <th>User Id</th>
                        <th>bas</th>
                        <th>lta</th>
                        <th>hra</th>
                        <th>fa</th>
                        <th>med</th>
                        <th>rent</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        storeTax.map((ele, idx) => (
                            <tr key={idx}>
                                <td>{ele.userNameTax || "No Remainder Assigned"}</td>
                                <td>{ele.remainderDate || "No Remainder Assigned"}</td>
                                <td>{ele.TotalTax}</td>
                                <td>{ele.user}</td>
                                <td>{ele.bas}</td>
                                <td>{ele.lta}</td>
                                <td>{ele.hra}</td>
                                <td>{ele.fa}</td>
                                <td>{ele.med}</td>
                                <td>{ele.rent}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
};

export default Excel_down;
