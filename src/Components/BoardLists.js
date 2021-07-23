import Section from './UI/Section'
import Button from './UI/Button'
import React from 'react';
import ModalWindow from './UI/ModalWindow'
import BoardItem from './BoardItem'
import Row from './UI/Row'
import Column from './UI/Column'


class BoardLists extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Modal : {
                show : false,
            },
            boardItemTextBoxVal : "",
        };
    }

    modalCloseHandler(){
        console.log(this);
        this.setState({...this.state, boardItemTextBoxVal:"", Modal : { show : false}});
    }

    showModal(evt) {
        let requiredStateModal = true
        this.setState({...this.state, Modal : {...this.state.Modal, show : requiredStateModal}});
    }

    changeboardItemTextBoxValHandler(evt){
        let textBoxVal = evt.target.value;
        this.setState({...this.state, boardItemTextBoxVal : textBoxVal})
    }

    addBoardItemHandler(evt){
        if(this.state.boardItemTextBoxVal.trim() === "") return;
        this.props.onAddBoardItemClickHandler(this.state.boardItemTextBoxVal, this.props.board,evt);
        this.setState({
            boardItemTextBoxVal : "",
            Modal : { show : false},
        })
    }

    /*shouldComponentUpdate(nextProps, nextState){
        console.log("should component update start in board lists")
        console.log(nextProps.board)
        console.log(this.props.board)
        console.log(!_.isEqual(this.props.board, nextProps.board));
        return !_.isEqual(this.props.board, nextProps.board) || _.isEqual(this.state,nextState) || this.props.showCardModalPopup !== nextProps.showCardModalPopup;
    }*/

    renderExistingLists (board){
        console.log(board)
        let lists = board.lists;
        console.log("lists",lists)


        return ( 
            ( typeof lists != undefined && lists != null && lists.length  > 0)  
                
                        ?

                        <Row rowInnerStyle={{flexWrap:"nowrap",overflowX:"auto"}}>
                            
                            {
                                this.props.board.lists.map( (list, index) => {
                                    return (
                                        <BoardItem
                                        board={board} 
                                        showCardModalPopup = {this.props.showCardModalPopup}
                                        card = {this.props.card}
                                        key={index} 
                                        list={list}
                                        onSaveCardDesc ={this.props.onSaveCardDesc}
                                        onListNameSave={(editedListName, listId, evt) => this.props.onListNameSave(editedListName, board,listId,evt)}
                                        onAddCard={(cardName,listId, evt) => this.props.onAddCard(cardName,board,listId,evt)} 
                                        onRemoveCard = {(listId,cardId,evt) => this.props.onRemoveCard(board,listId,cardId,evt)} 
                                        onSaveEditedCardName={(editedCardName,listId,cardId,evt) => this.props.onSaveEditedCardName(editedCardName,board,listId,cardId,evt)} />
                                    )
                                    
                                })
                            }
                            
                        </Row>
                        
                        :

                        <div>
                            <h1>No Lists !!!!</h1> 
                        </div>
        )
    }

    render(){

        let Modal = this.state.Modal

        return (
            <Section>
                <Row>
                    <Column>
                        {this.renderExistingLists(this.props.board)}
                        {
                            Modal.show && 
                            <ModalWindow modalHeader="Add New List" onClose={this.modalCloseHandler.bind(this)}>
                                <div style={{alignSelf:"center"}}>
                                    <input type="text" className="textbox" value={this.state.boardItemTextBoxVal} onChange={this.changeboardItemTextBoxValHandler.bind(this)} />
                                    <Button styleName="add-new-board" onClick={this.addBoardItemHandler.bind(this)} style={{ margin: "0 20px"}}> Add </Button>
                                </div>
                            </ModalWindow>
                        }
                        <Button styleName="add-new-board" onClick={this.showModal.bind(this)}>
                            Add New List
                        </Button>
                    </Column>
                </Row>
            </Section>
        )
    }
}


export default BoardLists;