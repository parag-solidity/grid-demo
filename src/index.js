import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject } from '@syncfusion/ej2-react-grids';

import {
    DataManager,
    ODataV4Adaptor,
    WebApiAdaptor,
    Query
} from '@syncfusion/ej2-data';

import { newData } from './data';
import { updateSampleSection } from './sample-base';

import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from './property-pane';

function Filtering() {
    // const [data, setData] = React.useState([])
     let initialGridLoad = true;
    React.useEffect(() => {
        updateSampleSection();
    }, []);

    // React.useEffect(() => {
    //     getLmsData().then((response) => {
    //         if (response.ok) {
    //             response.json().then(json => {
    //                 setData( json )
    //             })
    //         }
    //     })
    // }, [])

    const hostUrl = 'http://localhost:3000/';
    const data = new DataManager({
        url: hostUrl + 'leads',
        adaptor: new WebApiAdaptor
    });

    // const renderComplete = () => {
    //     debugger
    //     if (grid && (grid.dataSource instanceof Array &&
    //             !(grid.dataSource).length)) {
    //         const state = {
    //             skip: 0,
    //             take: 10
    //         };
    //         dataStateChange(state);
    //     }
    // }

    let gridInstance;
    let checkboxObj;
    const filData = [
        { id: '1', category: 'All' },
        { id: '2', category: 'appointment' },
        { id: '3', category: 'make' },
        { id: '4', category: 'model' },
        { id: '5', category: 'variant' }
    ];
    const fields = { text: 'category', value: 'id' };

    function onChange(sel) {
        if (sel.itemData.category === 'All') {
            gridInstance.clearFiltering();
        }
        else {
            gridInstance.filterByColumn('appointment', 'equal', sel.itemData.category);
        }
    }

    function onChanged(args) {
        debugger
        if (args.checked) {
            gridInstance.filterSettings.showFilterBarOperator = true;
            console.log({
                gridInstance
            })
        }
        else {
            gridInstance.filterSettings.showFilterBarOperator = false;
        }
    }

    function actionBegin(args) {
        console.log(args)
    }

    const dataBound = () => {
        if (initialGridLoad && gridInstance) {
            initialGridLoad = false;
            const pager = document.getElementsByClassName('e-gridpager');
            let topElement;
            if (gridInstance.allowGrouping || gridInstance.toolbar) {
                topElement = gridInstance.allowGrouping ? document.getElementsByClassName('e-groupdroparea') :
                    document.getElementsByClassName('e-toolbar');
            } else {
                topElement = document.getElementsByClassName('e-gridheader');
            }
            gridInstance.element.insertBefore(pager[0], topElement[0]);
        }
    };

    console.log({gridInstance})
    const handleOnChange = (e) =>{
        console.log(e)
    }
    const query = new Query().addParams('pageSize');

    return (
        <div className='control-pane'>
            <div className='col-lg-9 control-section'>
                <div style={{ padding: '14px 0' }}>
                    <div className="select-wrap">
                        <DropDownListComponent id="ddlelement" dataSource={filData} fields={fields} change={onChange.bind(this)} placeholder="Select category to filter" width="200px" />
                    </div>
                </div>
                <GridComponent
                    dataSource={data}
                    allowPaging={true}
                    ref={grid => gridInstance = grid}
                    pageSettings={{ pageSize: 5, pageCount: 5 }}
                    allowFiltering={true}
                    actionBegin={actionBegin}
                    onChange={handleOnChange}
                    dataBound={dataBound}
                    query={query}
                >
                    <ColumnsDirective>
                        <ColumnDirective lockColumn={true} field='appointment' headerText='App ID' width='100'></ColumnDirective>
                        <ColumnDirective field='make' headerText='Make Name' width='100'></ColumnDirective>
                        <ColumnDirective field='model' headerText='Model Name' width='100' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='variant' headerText='Variant Name' width='100' textAlign='Right'></ColumnDirective>

                        <ColumnDirective field='customer_name' headerText='Customer Name' width='100'></ColumnDirective>
                        <ColumnDirective field='state_name' headerText='State Name' width='100'></ColumnDirective>
                        <ColumnDirective field='year' headerText='Year' width='100' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='odometer' headerText='Odometer' width='100' textAlign='Right'></ColumnDirective>

                        <ColumnDirective field='customer_name' headerText='Updated Web Quote' width='100'></ColumnDirective>
                        <ColumnDirective field='state_name' headerText='State Name' width='100'></ColumnDirective>
                        <ColumnDirective field='year' headerText='Year' width='100' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='odometer' headerText='Odometer' width='100' textAlign='Right'></ColumnDirective>

                        {/* <ColumnDirective field='variant' headerText='Variant' width='150' textAlign='Center' displayAsCheckBox={true} type='boolean'></ColumnDirective> */}
                    </ColumnsDirective>
                    <Inject services={[Filter, Page]} />
                </GridComponent>
            </div>

            <div className='col-lg-3 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '70%' }}>
                                    <div>Enable Filterbar operator </div>
                                </td>
                                <td style={{ width: '30%', padding: '10px 10px 10px 0px' }}>
                                    <CheckBoxComponent ref={(scope) => { checkboxObj = scope; }} change={onChanged.bind(this)}></CheckBoxComponent>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </div>);
}
import { getLmsData } from './imsService';

export default Filtering;

const root = createRoot(document.getElementById('sample'));
root.render(<Filtering />);