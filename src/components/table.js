import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import data from "../data";
import { Button } from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";

class Table extends React.Component {
    constructor() {
        super();
        this.state = {first: 0}
        this.imageTemplate = this.imageTemplate.bind(this);
        this.ratingTemplate = this.ratingTemplate.bind(this);
        this.ratingTemplate = this.ratingTemplate.bind(this);
        this.actionsTemplate = this.actionsTemplate.bind(this);
        this.addItem = this.addItem.bind(this);
        this.descriptionTemplate = this.descriptionTemplate.bind(this);
        this.nameTemplate = this.nameTemplate.bind(this);
    }

    inputStyles = {
        width: '100%',
    }

    componentDidMount() {
        console.log('componentDidMount')
        let freeId = 0
        this.setState({...this.state,
            data: data.map((value, index) => {
            const extended = {...value}
            extended.id = index;
            extended.editable = false;
            freeId++;
            return extended;
        })})
        this.setState({...this.state,
        freeId})
        console.log(this.state)
    }

    nameTemplate(rowData) {
        if (rowData.editable) {
            return (
                <InputText style={this.inputStyles} data={this.state.data.find(value => value.id === rowData.id).name} onChange={(e) => {
                    const newState = {...this.state}
                    newState.data.find(value => value.id === rowData.id).name = e.target.value
                    this.setState(newState)
                }}/>
            )
        } else {
            return (
                <label>{this.state.data.find(value => value.id === rowData.id).name}</label>
            )
        }
    }

    descriptionTemplate(rowData) {
        if (rowData.editable) {
            return (
                <InputTextarea rows={3} style={this.inputStyles} value={this.state.data.find(value => value.id === rowData.id).description} onChange={(e) => {
                    const newState = {...this.state}
                    newState.data.find(value => value.id === rowData.id).description = e.target.value
                    this.setState(newState)
                }}/>
            )
        } else {
            return (
                <label>{this.state.data.find(value => value.id === rowData.id).description}</label>
            )
        }
    }

    imageTemplate(rowData) {
        console.log('imageTemplate')
        console.log(this.state)
        if (rowData.editable) {
            return (
                <InputText style={this.inputStyles} data={this.state.data.find(value => value.id === rowData.id).image} onChange={(e) => {
                    const newState = {...this.state}
                    newState.data.find(value => value.id === rowData.id).image = e.target.value
                    this.setState(newState)
                }}/>
            )
        } else {
            return (
                <img style={{width: '100%'}} src={rowData.image} alt={rowData}/>
            )
        }
    }

    actionsTemplate(rowData) {
        console.log('actionsTemplate')
        console.log(this.state)
        const deleteButton = <Button onClick={ () => {
                const copy = {...this.state}
            copy.data.splice(copy.data.findIndex(value => value.id === rowData.id), 1)
                this.setState(copy);
            }
        } className="p-button-danger" label="" icon="pi pi-times" />

        const addButton =
            <Button onClick={ () => {
                const copy = {...this.state}
                console.log(copy)
                const row = copy.data.find(value => value.id === rowData.id);
                row.editable = false;
                this.setState(copy);
            }
        } className="p-button-success" label="" icon="pi pi-plus" />

        return (
            <div>
                {rowData.editable && addButton}
                {deleteButton}
            </div>
        )
    }

    ratingTemplate(rowData) {
        console.log('ratingTemplate')
        console.log(this.state)
        return (
            <span>
                <label style={{marginRight: 10}}>{this.state.data.find(value => value.id === rowData.id).rating}</label>
                <Button onClick={() => this.changeRating(rowData,1)} label="" icon="pi pi-chevron-up" />
                <Button onClick={() => this.changeRating(rowData,-1)} label="" icon="pi pi-chevron-down" />
            </span>
        )
    }

    changeRating(rowData, change) {
        const newState = {...this.state}
        const element = newState.data.find(value => value.id === rowData.id)
        if (element.rating + change > 0 && element.rating + change <= 10) {
            element.rating += change
            this.setState(newState)
        }
    }

    addItem() {
        const newState = {...this.state}
        newState.data.splice(this.state.first, 0, {id: this.state.freeId, editable: true, rating: 5})
        newState.freeId++;
        this.setState(newState)
    }

    render() {
        const header = (
            <div style={{'textAlign':'center'}}>
                <i className="pi pi-search" style={{margin: '4px 4px 0 0'}}/>
                <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="20"/>
                <Button onClick={this.addItem} style={{margin: 10}} label="Add new item" icon="pi pi-plus" />
            </div>
        )

        return (
            <DataTable style={{width:'60%', marginLeft: '20%'}} value={this.state.data} paginator={true} rows={4} sortMode="multiple" header={header}
                       first={this.state.first} onPage={(e) => this.setState({first: e.first})} globalFilter={this.state.globalFilter} emptyMessage="No records found">
                <Column field="name" header="name" body={this.nameTemplate} sortable={true} />
                <Column field="description" body={this.descriptionTemplate} header="description" />
                <Column field="image" header="image" body={this.imageTemplate} style={{textAlign:'center'}} />
                <Column field="rating" header="rating" body={this.ratingTemplate} sortable={true}/>
                <Column header="actions" body={this.actionsTemplate}/>
            </DataTable>
        );
    }

}

export default Table;
