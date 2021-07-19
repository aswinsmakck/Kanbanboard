import Section from './UI/Section'
import Button from './UI/Button'
import React from 'react';
import ModalWindow from './UI/ModalWindow'
import AddNewItemForm from './AddNewItemForm'
import Utils from './Helpers/Utils'
import BoardItem from './BoardItem'
import Row from './UI/Row'

export default class BoardLists extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            board:
                {
                    name:"", 
                    lists:[]
                }
                ,
            Modal : {
              show : false,
              content : null,
            },
            textBoxVal : "",
                        
        };
    }

    componentDidMount(){        
        //localStorage.setItem("boards",JSON.stringify(brds));
        let boards = JSON.parse(localStorage.getItem("boards") || "[]");
        console.log(boards)
        let board = boards.find((board)=> board.name === this.props.match.params.id)
        this.setState({...this.state, board: board});
    }


    closeForm(listName,evt){
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
            list.isActive = false;
            }
            return list;
        })
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})
    }

    showAddNewCardForm(listName,evt){
        console.log("list name",listName)
        console.log("evty",evt)
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
            list.isActive = true;
            }
            else{
                list.isActive = false;
            }
            return list;
        })
        console.log("lists",lists)
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})
    }

    changeCardTextBoxValHandler(listName,evt){
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
                list.textBoxVal = evt.target.value;
            }
            
            return list;
        })
        console.log("lists",lists)
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})
    }


    addCardtoListHandler(listName,evt){
        let textBoxVal = "";
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
                textBoxVal = list.textBoxVal;
                list.textBoxVal = "";
                list.isActive = false;
                if(!('cards' in list)){
                    list.cards = []
                }
                list.cards.push({title : textBoxVal , desc : ""});
            }
            
            return list;
        })
        console.log("lists",lists)
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})

        let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
        console.log(localDB);
        
        if(localDB.length === 0) return;

        let ModifiedLocalDB = localDB.map((boardLS)=> {
            let retVal = boardLS;
            if(boardLS.name === this.props.match.params.id){
                retVal = board
            }  
            return retVal
        })

        localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))

    }

    listNameChange(listName, evt) {
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
                list.listNameTextBoxVal = evt.target.value;
            }
            
            return list;
        })
        console.log("lists",lists)
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})
    }

    listNameSave(listName, evt){ 
        let needLSSave = false;
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
                console.log("in", ('listNameTextBoxVal' in list))
                console.log("in", (list.listNameTextBoxVal.trim() !== ""))
                if(('listNameTextBoxVal' in list) && list.listNameTextBoxVal.trim() !== "")
                {
                    needLSSave = true;
                    list.name = list.listNameTextBoxVal;
                }
                list.listNameTextBoxVal = "";
                list.toggleTextBox = false;
            }
            
            return list;
        })
        console.log("lists on blur",lists)
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})


        if(!needLSSave) return;
        
        let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
        console.log(localDB);
        
        if(localDB.length === 0) return;

        let ModifiedLocalDB = localDB.map((boardLS)=> {
            let retVal = boardLS;
            if(boardLS.name === this.props.match.params.id){
                retVal = board
            }  
            return retVal
        })

        localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))
    }

    toggleListNameEdit(listName, evt){
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
                list.toggleTextBox = true;
            }
            
            return list;
        })
        console.log("lists",lists)
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})
    }

    removeCard(listName, cardName, evt){

        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
                let cards = list.cards;
                cards.splice(cards.findIndex(card => card.title === cardName) , 1)
            }
            
            return list;
        })

        console.log("lists",lists)
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})


        let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
        console.log(localDB);
        
        if(localDB.length === 0) return;

        let ModifiedLocalDB = localDB.map((boardLS)=> {
            let retVal = boardLS;
            if(boardLS.name === this.props.match.params.id){
                retVal = board
            }  
            return retVal
        })

        localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))
    }

    cardNameEdit(listName, cardName, evt){
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
                list.cards.map(card => {
                    if(card.title === cardName){
                        card.textBoxVal = evt.target.value;
                    }
                    return card;
                })
            }
            
            return list;
        })
        console.log("lists card edited ",lists)
        let board = {...this.state.board, lists}
        console.log(board);
        this.setState({board : board})
    }

    saveEditedCardName(listName, cardName, evt){
        let needLSSave = false;
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
                list.cards.map(card => {
                    if(card.title === cardName){
                        if(('textBoxVal' in card) && card.textBoxVal.trim() !== "")
                        {
                            needLSSave = true;
                            card.title = card.textBoxVal;
                        }

                        card.textBoxVal = "";
                        card.toggleTextBox = false;
                    }
                    return card;
                })
            }
            
            return list;
        })

        console.log("saving... card name", lists)
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})

        if(!needLSSave) return;

        let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
        console.log(localDB);
        
        if(localDB.length === 0) return;

        let ModifiedLocalDB = localDB.map((boardLS)=> {
            let retVal = boardLS;
            if(boardLS.name === this.props.match.params.id){
                retVal = board
            }  
            return retVal
        })

        localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))
    }

    toggleCardNameEdit(listName, cardName, evt){
        let lists = this.state.board.lists.map((list) => {
            if(list.name === listName){
                list.cards.map(card => {
                    if(card.title === cardName){
                        card.toggleTextBox = true;
                    }
                    return card;
                })
            }
            
            return list;
        })
        console.log("lists toggle ",lists)
        let board = {...this.state.board, lists}
        console.log(board)
        this.setState({board : board})
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
                                this.state.board.lists.map( (list, index) => {
                                    return (
                                        <BoardItem 
                                        key={index} 
                                        list={list}
                                        onToggleEdit={this.toggleListNameEdit.bind(this,list.name)} 
                                        onListNameEdit={this.listNameChange.bind(this,list.name)}
                                        onListNameSave={this.listNameSave.bind(this,list.name)}
                                        onAddCard={this.addCardtoListHandler.bind(this,list.name)} 
                                        onChange ={this.changeCardTextBoxValHandler.bind(this,list.name)} 
                                        closeForm={this.closeForm.bind(this,list.name)} 
                                        onClick={this.showAddNewCardForm.bind(this,list.name)}
                                        onRemoveCard = {this.removeCard.bind(this,list.name)}
                                        onCardNameEdit = {this.cardNameEdit.bind(this, list.name)} 
                                        onToggleCardNameEdit={this.toggleCardNameEdit.bind(this,list.name)} 
                                        onSaveEditedCardName={this.saveEditedCardName.bind(this, list.name)} />
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

    addBoardItemClickHandler(evt){

        let boardItemName = this.state.textBoxVal;
        let lists = [...this.state.board.lists];
        console.log("click lists",lists)
        lists.push({name : boardItemName})
        console.log("modifiedlists",lists)
        console.log("state lists",this.state.board.lists)
        this.setState({board : {...this.state.board, lists : lists},
            textBoxVal : "",
            Modal : { show : false, content : null}
        })
        
        let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
        console.log(localDB);
        
        if(localDB.length === 0) return;

        let ModifiedLocalDB = localDB.map((board)=> {
            let retVal = board;
            if(board.name === this.props.match.params.id){
                if(!('lists' in board)){
                    board.lists = []
                }
                board.lists.push({name : boardItemName})
                retVal = board
            }  
            return retVal
        })

        localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))
    }

    render(){
        console.log(this.props)
        let boards = JSON.parse(localStorage.getItem("boards") || "[]");
        console.log(boards);
        let Modal = this.state.Modal
        let board = boards.find((board) => board.name === this.props.match.params.id )
        
        if(!board) return <h1>Invalid Board !!!</h1>


        return (
            <Section>
                {this.renderExistingLists(this.state.board)}
                {
                    Modal.show && 
                    <ModalWindow modalHeader="Add New List" onClose={Utils.modalCloseHandler.bind(this)}>
                        <AddNewItemForm boardName={this.state.textBoxVal} onSubmit={this.addBoardItemClickHandler.bind(this)} onChange={Utils.changeTextBoxValHandler.bind(this)} />
                    </ModalWindow>
                }
                <Button styleName="add-new-board" onClick={Utils.showModal.bind(this)}>
                    Add New List
                </Button>
            </Section>
        )
    }
}