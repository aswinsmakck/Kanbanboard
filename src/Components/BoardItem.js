import Column from './UI/Column'
export default function BoardItems(props) {

    let cards = props.list.cards;
    let cardElements
    if(cards){
        cardElements = cards.map((card, index)=> {
        
            return (
                <div className="card" key={index}>
                    <h4 className="card-details tempClass">
                        {card.toggleTextBox ? 
                        <input 
                        autoFocus 
                        style={{margin: "7px 0", width:"80%"}} 
                        type="text" 
                        value={card.textBoxVal ? card.textBoxVal : ""}
                        onChange = {evt => props.onCardNameEdit(card.title, evt)}
                        onBlur={evt => props.onSaveEditedCardName(card.title, evt)}
                         /> 
                         : 
                         card.title} 

                        {card.toggleTextBox ?
                        <span style={{alignSelf:"center"}}><i onClick={evt => props.onSaveEditedCardName(card.title, evt)} style={{color:"green"}} className="fas fa-check"></i></span>
                        :
                        <span>
                            <i onClick={evt => props.onToggleCardNameEdit(card.title, evt)} style={{fontWeight : "normal"}} className="fas fa-edit"></i>
                            <i onClick={(evt) => props.onRemoveCard(card.title, evt)} style={{fontWeight : "normal", marginLeft:"5px"}} className="far fa-trash-alt"></i>
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
                    { props.list.toggleTextBox ? 
                        <input 
                            autoFocus 
                            style={{margin: "7px 0"}} 
                            type="text" 
                            value={props.list.listNameTextBoxVal ? props.list.listNameTextBoxVal : "" } 
                            onChange={props.onListNameEdit} 
                            onBlur={props.onListNameSave} /> 
                        :
                        <h3 style={{margin : "5px 0"}} onClick={props.onToggleEdit}>{props.list.name}</h3>}
                </div>
                <div className="cards" style={{border : "1px solid grey", borderTop:0,padding : "10px 5px"}}>
                    {
                        cardElements
                    }
                    {   
                        props.list.isActive ? 
                            <div style={{marginTop : "8px"}}>
                                <input type="text" value={props.list.textBoxVal ? props.list.textBoxVal : "" } onChange={props.onChange} style={{padding : "5px 0"}} /> 
                                <button className="add-new-board" onClick={props.onAddCard} style={{marginTop : "10px", padding : "6px 20px",backgroundColor : "black"}}>Add</button>
                                <span className="close-button" onClick={props.closeForm}>&times;</span>
                            </div>

                            :
                            
                            <button className="Add-Card" style={{marginTop : "8px"}} onClick={props.onClick}>Add Card</button> 
                    }
                </div>
            </div>
        </Column>
    )    
}