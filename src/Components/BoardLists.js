import Section from './UI/Section'
import Button from './UI/Button'
import React from 'react';
import ModalWindow from './UI/ModalWindow'
import BoardItem from './BoardItem'
import Row from './UI/Row'
import Column from './UI/Column'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

class BoardLists extends React.Component{

    shouldComponentUpdate(nextProps, nextState){
        console.log("should component update start in board lists")
        console.log(nextProps.board)
        console.log(this.props.board)
        console.log(!_.isEqual(this.props.board, nextProps.board));
        return !_.isEqual(this.props.board, nextProps.board) || this.props.Modal.show !== nextProps.Modal.show || this.props.showCardModalPopup !== nextProps.showCardModalPopup;
    }

    componentDidUpdate(prevProps, prevState){
        console.log("------in comp did update----------")
        console.log(prevProps)
        console.log(prevState)
    }

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
                                        key={index} 
                                        list={list}
                                        onToggleEdit={(listId, evt) => this.props.onToggleEdit(board,listId,evt) } 
                                        onListNameEdit={(listId, evt) => this.props.onListNameEdit(board,listId,evt)}
                                        onListNameSave={(listId, evt) => this.props.onListNameSave(board,listId,evt)}
                                        onAddCard={(listId, evt) => this.props.onAddCard(board,listId,evt)} 
                                        onChange ={(listId, evt) => this.props.onChange(board,listId,evt)} 
                                        closeForm={(listId,evt) => this.props.closeForm(board,listId,evt)} 
                                        onClick={(listId,evt) => this.props.onClick(board,listId,evt)}
                                        onRemoveCard = {(listId,cardId,evt) => this.props.onRemoveCard(board,listId,cardId,evt)}
                                        onCardNameEdit = {(listId,cardId,evt) => this.props.onCardNameEdit(board,listId,cardId,evt)} 
                                        onToggleCardNameEdit={(listId,cardId,evt) => this.props.onToggleCardNameEdit(board,listId,cardId,evt)} 
                                        onSaveEditedCardName={(listId,cardId,evt) => this.props.onSaveEditedCardName(board,listId,cardId,evt)} />
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
        console.log(this.props)
        let Modal = this.props.Modal

        return (
            <Section>
                <Row>
                    <Column>
                        {this.renderExistingLists(this.props.board)}
                        {
                            Modal.show && 
                            <ModalWindow modalHeader="Add New List" onClose={this.props.onModalClose}>
                                <div style={{alignSelf:"center"}}>
                                    <input type="text" className="textbox" value={this.props.boardItemTextBoxVal} onChange={this.props.onChangeListName} />
                                    <Button styleName="add-new-board" onClick={(evt)=>this.props.onAddBoardItemClickHandler(this.props.board,evt)} style={{ margin: "0 20px"}}> Add </Button>
                                </div>
                            </ModalWindow>
                        }
                        <Button styleName="add-new-board" onClick={this.props.onShowModal}>
                            Add New List
                        </Button>
                        {
                            this.props.showCardModalPopup &&
                            <ModalWindow modalHeader="Card Details" onClose={this.props.history.goBack}>
                                <div style={{alignSelf:"center", width:"100%"}}>
                                    <h1>Card - {this.props.card.title}</h1>
                                    <h4>Description</h4>
                                    { this.props.card.editDescription ?
                                        <div>
                                            <textarea className="card-edit-desc" onChange={(evt)=>this.props.onCardDescChange(this.props.board.id,this.props.list.id,this.props.card.id,evt)} value={this.props.card.textArea ? this.props.card.textArea : ""} />

                                            <div style={{display:"flex"}}>
                                                <Button styleName="add-new-board" onClick={(evt) => this.props.onSaveCardDesc(this.props.board.id,this.props.list.id,this.props.card.id,evt)} style={{margin : "10px 20px 0 0"}}> Save </Button>
                                                <span onClick={(evt)=>this.props.onToggleCardDescriptionEdit(this.props.board.id,this.props.list.id,this.props.card.id,evt)} style={{alignSelf : "center"}} className="close-button">&times;</span>
                                            </div>
                                        </div>
                                        :
                                        <div className="card-description" onClick={(evt)=>this.props.onToggleCardDescriptionEdit(this.props.board.id,this.props.list.id,this.props.card.id,evt)} >{this.props.card.desc && this.props.card.desc !== "" ? this.props.card.desc : "Add detailed description..."}</div>
                                    }
                                </div>
                            </ModalWindow>
                        }
                    </Column>
                </Row>
            </Section>
        )
    }
}


export default withRouter(BoardLists);