import Column from './UI/Column'
export default function BoardItems(props) {

    let cards = props.list.cards;
    let cardElements
    if(cards){
        cardElements = cards.map((card, index)=><div key={index}>{card.title}</div>)
    }
    return (
        <Column>
            <div className="board-item">
                <div className="board-item-header" style={{textAlign : "center", border : "1px solid grey"}}>
                    <h3 style={{margin : "5px 0"}}>{props.list.name}</h3>
                </div>
                <div className="cards" style={{border : "1px solid grey", borderTop:0,padding : "10px 5px"}}>
                    {
                        cardElements
                    }
                    {   
                        props.list.isActive ? 
                            <div>
                                <input type="text" value={props.list.textBoxVal ? props.list.textBoxVal : "" } onChange={props.onChange} style={{padding : "5px 0"}} /> 
                                <button className="add-new-board" onClick={props.onAddCard} style={{marginTop : "10px", padding : "6px 20px",backgroundColor : "black"}}>Add</button>
                                <span className="close-button" onClick={props.closeForm}>&times;</span>
                            </div>

                            :
                            
                            <button className="Add-Card" onClick={props.onClick}>Add Card</button> 
                    }
                </div>
            </div>
        </Column>
    )    
}