import React from 'react';
import Column from './UI/Column'
import Card from './Card'

export default class BoardItem extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            isActive : false,
            textBoxVal : "",
            toggleTextBox : false,
            listNameTextBoxVal : "",
        }
    }

    showAddNewCardForm(evt){
        this.setState({isActive : true});
    }

    changeCardTextBoxValHandler(evt){
        this.setState({textBoxVal : evt.target.value});
    }

    closeForm(evt){
        this.setState({textBoxVal : "",isActive : false});
    }

    addNewCard(evt){
        this.props.onAddCard(this.state.textBoxVal,this.props.list.id, evt)
        this.setState({
            isActive : false,
            textBoxVal : "",
        })
    }

    listNameChange(evt) {
        this.setState({listNameTextBoxVal : evt.target.value})
    }

    toggleListNameEdit(evt){
        
        this.setState({toggleTextBox : true})
    }

    saveEditedListName(evt){
        //if(this.state.listNameTextBoxVal.trim() === "") return;
        this.props.onListNameSave(this.state.listNameTextBoxVal,this.props.list.id, evt)
        this.setState({toggleTextBox : false, listNameTextBoxVal : ""})
    }
    

    /*shouldComponentUpdate(nextProps, nextState){
        console.log("should component update start in board item")
        console.log("nextProps", nextProps.list)
        console.log("props",this.props.list)
        return !_.isEqual(this.props.list, nextProps.list);
    }*/

    render(){
    let cards = this.props.list.cards;
    let cardElements
    if(cards){
        cardElements = cards.map((card, index)=> {
            
            return (
                <Card
                    showCardModalPopup = {this.props.showCardModalPopup}
                    onSaveCardDesc ={this.props.onSaveCardDesc}
                    onRemoveCard = {this.props.onRemoveCard} 
                    onSaveEditedCardName={this.props.onSaveEditedCardName} 
                    listId ={this.props.list.id} 
                    boardId = {this.props.board.id} 
                    card={card} 
                    key={index} 
                />
            );

        })
    }
    return (
        <Column>
            <div className="board-item">
                <div className="board-item-header" style={{textAlign : "center", border : "1px solid grey"}}>
                    { this.state.toggleTextBox ? 
                        <input 
                            autoFocus 
                            style={{margin: "7px 0"}} 
                            type="text" 
                            value={this.state.listNameTextBoxVal ? this.state.listNameTextBoxVal : "" } 
                            onChange={this.listNameChange.bind(this)} 
                            onBlur={this.saveEditedListName.bind(this)} /> 
                        :
                        <h3 style={{margin : "5px 0"}} onClick={this.toggleListNameEdit.bind(this)}>{this.props.list.name}</h3>}
                </div>
                <div className="cards" style={{border : "1px solid grey", borderTop:0,padding : "10px 5px"}}>
                    {
                        cardElements
                    }
                    {   
                        this.state.isActive ? 
                            <div style={{marginTop : "8px"}}>
                                <input type="text" value={this.state.textBoxVal ? this.state.textBoxVal : "" } onChange={this.changeCardTextBoxValHandler.bind(this)} style={{padding : "5px 0"}} /> 
                                <button className="add-new-board" onClick={this.addNewCard.bind(this)} style={{marginTop : "10px", padding : "6px 20px",backgroundColor : "black"}}>Add</button>
                                <span className="close-button" onClick={this.closeForm.bind(this)}>&times;</span>
                            </div>

                            :
                            
                            <button className="Add-Card" style={{marginTop : "8px"}} onClick={this.showAddNewCardForm.bind(this)}>Add Card</button> 
                    }
                </div>
            </div>
        </Column>
    )    
}
}