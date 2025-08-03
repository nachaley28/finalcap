import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

export function TestDatatable() {
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);

    return (
        // Data Grid will fill the size of the parent container
        <div style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}


const rd = [
    {
        name: 'Michael Phelps',
        person: {
            age: 23,
            country: 'United States',
        },
        medals: {
            gold: 8,
            silver: 0,
            bronze: 0,
        },
    },
    {
        name: 'Michael Phelps',
        person: {
            age: 19,
            country: 'United States',
        },
        medals: {
            gold: 6,
            silver: 0,
            bronze: 2,
        },
    },
    {
        name: 'Michael Phelps',
        person: {
            age: 27,
            country: 'United States',
        },
        medals: {
            gold: 4,
            silver: 2,
            bronze: 0,
        },
    },
    {
        name: 'Natalie Coughlin',
        person: {
            age: 25,
            country: 'United States',
        },
        medals: {
            gold: 1,
            silver: 2,
            bronze: 3,
        },
    },
    {
        name: 'Aleksey Nemov',
        person: {
            age: 24,
            country: 'Russia',
        },
        medals: {
            gold: 2,
            silver: 1,
            bronze: 3,
        },
    },
    {
        name: 'Alicia Coutts',
        person: {
            age: 24,
            country: 'Australia',
        },
        medals: {
            gold: 1,
            silver: 3,
            bronze: 1,
        },
    },
    {
        name: 'Missy Franklin',
        person: {
            age: 17,
            country: 'United States',
        },
        medals: {
            gold: 4,
            silver: 0,
            bronze: 1,
        },
    },
    {
        name: 'Ryan Lochte',
        person: {
            age: 27,
            country: 'United States',
        },
        medals: {
            gold: 2,
            silver: 2,
            bronze: 1,
        },
    },
    {
        name: 'Allison Schmitt',
        person: {
            age: 22,
            country: 'United States',
        },
        medals: {
            gold: 3,
            silver: 1,
            bronze: 1,
        },
    },
    {
        name: 'Natalie Coughlin',
        person: {
            age: 21,
            country: 'United States',
        },
        medals: {
            gold: 2,
            silver: 2,
            bronze: 1,
        },
    },
    {
        name: 'Ian Thorpe',
        person: {
            age: 17,
            country: 'Australia',
        },
        medals: {
            gold: 3,
            silver: 2,
            bronze: 0,
        },
    },
    {
        name: 'Dara Torres',
        person: {
            age: 33,
            country: 'United States',
        },
        medals: {
            gold: 2,
            silver: 0,
            bronze: 3,
        },
    },
    {
        name: 'Cindy Klassen',
        person: {
            age: 26,
            country: 'Canada',
        },
        medals: {
            gold: 1,
            silver: 2,
            bronze: 2,
        },
    },
    {
        name: 'Nastia Liukin',
        person: {
            age: 18,
            country: 'United States',
        },
        medals: {
            gold: 1,
            silver: 3,
            bronze: 1,
        },
    },
    {
        name: 'Marit Bjørgen',
        person: {
            age: 29,
            country: 'Norway',
        },
        medals: {
            gold: 3,
            silver: 1,
            bronze: 1,
        },
    },
    {
        name: 'Sun Yang',
        person: {
            age: 20,
            country: 'China',
        },
        medals: {
            gold: 2,
            silver: 1,
            bronze: 1,
        },
    },
    {
        name: 'Kirsty Coventry',
        person: {
            age: 24,
            country: 'Zimbabwe',
        },
        medals: {
            gold: 1,
            silver: 3,
            bronze: 0,
        },
    },
    {
        name: 'Libby Lenton-Trickett',
        person: {
            age: 23,
            country: 'Australia',
        },
        medals: {
            gold: 2,
            silver: 1,
            bronze: 1,
        },
    },
    {
        name: 'Ryan Lochte',
        person: {
            age: 24,
            country: 'United States',
        },
        medals: {
            gold: 2,
            silver: 0,
            bronze: 2,
        },
    },
    {
        name: 'Inge de Bruijn',
        person: {
            age: 30,
            country: 'Netherlands',
        },
        medals: {
            gold: 1,
            silver: 1,
            bronze: 2,
        },
    },
];

import React, { useMemo } from "react";
import {
    ClientSideRowModelModule,
    ModuleRegistry,
    ValidationModule,
} from "ag-grid-community";
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

export const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

    const [rowData, setRowData] = useState(rd);
    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Name (field)", field: "name" },
        { headerName: "Country (field & dot notation)", field: "person.country" },
        {
            headerName: "Total Medals (valueGetter)",
            valueGetter: (p) =>
                p.data.medals.gold + p.data.medals.silver + p.data.medals.bronze,
        },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
        };
    }, []);

    return (
        <>
            <div className="h4">Hello</div>
            <div style={containerStyle}>
                <div style={{ height: "100%", boxSizing: "border-box" }}>
                    <div style={gridStyle}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export function DataCounter({ title, value, variant }) {
    return (
        <div className="col-6 col-sm-4 col-lg-3 col-xxl-2 p-2">
            <div className={`rounded p-2 text-center shadow-sm bg-${variant}-subtle`}>
                <div className="h2 mb-0">{value}</div>
                <div className="text-muted">{title}</div>
            </div>
        </div>
    )
}
