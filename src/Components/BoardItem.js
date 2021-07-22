import React from 'react';
import Column from './UI/Column'
import _ from 'lodash';
import {Link} from 'react-router-dom';

export default class BoardItem extends React.Component{

    shouldComponentUpdate(nextProps, nextState){
        console.log("should component update start in board item")
        console.log("nextProps", nextProps.list)
        console.log("props",this.props.list)
        return !_.isEqual(this.props.list, nextProps.list);
    }

    render(){
    let cards = this.props.list.cards;
    let cardElements
    if(cards){
        cardElements = cards.map((card, index)=> {
        
            return (
                <div className="card" key={index}>
                    <h4 className="card-details tempClass">
                        {
                            card.toggleTextBox ? 

                            <input 
                            autoFocus 
                            style={{margin: "7px 0", width:"80%"}} 
                            type="text" 
                            value={card.textBoxVal ? card.textBoxVal : ""}
                            onChange = {evt => this.props.onCardNameEdit(this.props.list.id, card.id, evt)}
                            onBlur={evt => this.props.onSaveEditedCardName(this.props.list.id, card.id, evt)}
                            /> 

                            : 

                            <Link className="Link" style={{flex : "1 0 auto"}} key={index} to={{pathname : `/board/${this.props.board.id}/${this.props.list.id}/${card.id}`}}>
                                <span>{card.title}</span>
                            </Link>
                         } 

                        {
                        card.toggleTextBox ?
                            <span style={{alignSelf:"center"}}>
                                <i onClick={evt => this.props.onSaveEditedCardName(this.props.list.id, card.id, evt)} style={{color:"green"}} className="fas fa-check"></i>
                            </span>

                        :

                            <span>
                                <i onClick={evt => this.props.onToggleCardNameEdit(this.props.list.id, card.id, evt)} style={{fontWeight : "normal"}} className="fas fa-edit"></i>
                                <i onClick={(evt) => this.props.onRemoveCard(this.props.list.id, card.id, evt)} style={{fontWeight : "normal", marginLeft:"5px"}} className="far fa-trash-alt"></i>
                            </span>

                        }
                    </h4>
                </div>)

        })
    }
    return (
        <Column>
            <div className="board-item">
                <div className="board-item-header" style={{textAlign : "center", border : "1px solid grey"}}>
                    { this.props.list.toggleTextBox ? 
                        <input 
                            autoFocus 
                            style={{margin: "7px 0"}} 
                            type="text" 
                            value={this.props.list.listNameTextBoxVal ? this.props.list.listNameTextBoxVal : "" } 
                            onChange={(evt)=> this.props.onListNameEdit(this.props.list.id, evt)} 
                            onBlur={(evt)=>this.props.onListNameSave(this.props.list.id, evt)} /> 
                        :
                        <h3 style={{margin : "5px 0"}} onClick={(evt)=>this.props.onToggleEdit(this.props.list.id, evt)}>{this.props.list.name}</h3>}
                </div>
                <div className="cards" style={{border : "1px solid grey", borderTop:0,padding : "10px 5px"}}>
                    {
                        cardElements
                    }
                    {   
                        this.props.list.isActive ? 
                            <div style={{marginTop : "8px"}}>
                                <input type="text" value={this.props.list.textBoxVal ? this.props.list.textBoxVal : "" } onChange={(evt)=>this.props.onChange(this.props.list.id, evt)} style={{padding : "5px 0"}} /> 
                                <button className="add-new-board" onClick={(evt)=>this.props.onAddCard(this.props.list.id, evt)} style={{marginTop : "10px", padding : "6px 20px",backgroundColor : "black"}}>Add</button>
                                <span className="close-button" onClick={(evt)=>this.props.closeForm(this.props.list.id, evt)}>&times;</span>
                            </div>

                            :
                            
                            <button className="Add-Card" style={{marginTop : "8px"}} onClick={(evt)=> this.props.onClick(this.props.list.id, evt)}>Add Card</button> 
                    }
                </div>
            </div>
        </Column>
    )    
}
}