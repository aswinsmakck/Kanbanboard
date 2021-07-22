import './App.css';
import React from 'react';
import HomePage from './Components/HomePage';
import {Switch, Route} from  'react-router-dom';
import {Link} from 'react-router-dom';
import Board from './Components/Board';
import BoardLists from './Components/BoardLists';
import Header from './Components/Header';
import _ from 'lodash';
import {nanoid} from 'nanoid';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        
        boards : [],
        Modal : {
          show : false,
        },
        textBoxVal:"",
        boardItemTextBoxVal : "",
        needStorageSave : false                   
    };
  }

    showModal(evt) {
        let requiredStateModal = true
        this.setState({...this.state, Modal : {...this.state.Modal, show : requiredStateModal}});
    }

    componentDidUpdate(prevProps, prevState){
        console.log("------in APP comp did update----------")
        console.log(prevProps)
        console.log(prevState)
        console.log(this.state)
        console.log(_.isEqual(this.state, prevState))
        if(this.state.needStorageSave){
            let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
            console.log(localDB);

            let ModifiedLocalDB = this.state.boards;
            console.log(ModifiedLocalDB);
            localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))
            console.log(JSON.parse(localStorage.getItem("boards") || "[]"))
            this.setState({needStorageSave : false})
        }
    }

    modalCloseHandler(){
        console.log(this);
        this.setState({...this.state, textBoxVal:"",boardItemTextBoxVal:"", Modal : { show : false}});
    }

    changeTextBoxValHandler(evt){
        console.log(this)
        console.log(evt.target)
        console.log(evt.target.value)
        let textBoxVal = evt.target.value;
        this.setState({...this.state, textBoxVal : textBoxVal})
    }

    changeboardItemTextBoxValHandler(evt){
        console.log(evt)
        console.log(evt.target)
        console.log(evt.target.value)
        let textBoxVal = evt.target.value;
        this.setState({...this.state, boardItemTextBoxVal : textBoxVal})
    }

  componentDidMount(){        
    //localStorage.setItem("boards",JSON.stringify(brds));
    //localStorage.removeItem("boards");
    let boards = JSON.parse(localStorage.getItem("boards") || "[]");
    console.log(boards)
    if(boards == null) return;
    this.setState({...this.state, boards: boards});
  }

  renderExistingBoards (){
    return this.state.boards.map((board,index) =>{
        console.log(board)
        return (
            <Link className="Link" key={index} to={{pathname : `/board/${board.id}`, state:{lists: board.lists}}}>
                <Board data={board} />
            </Link>
        )
    });
  }

  closeForm(_board,listId,evt){
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            list.isActive = false;
            list.textBoxVal = "";
        }
        return list;
    })
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards})
}

showAddNewCardForm(_board,listId,evt){

    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    console.log("list name",listId)
    console.log("evty",evt)
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
        list.isActive = true;
        }
        else{
            list.isActive = false;
        }
        return list;
    })
    console.log("lists",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards})
}

changeCardTextBoxValHandler(_board,listId,evt){
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            list.textBoxVal = evt.target.value;
        }
        
        return list;
    })
    console.log("lists",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards})
}


addCardtoListHandler(_board,listId,evt){
    let needSave = false;
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let textBoxVal = "";
    let id = nanoid();
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId && list.textBoxVal !== ""){
            needSave = true;
            textBoxVal = list.textBoxVal;
            list.textBoxVal = "";
            list.isActive = false;
            list.toggleTextBox = false;
            list.listNameTextBoxVal = "";
            if(!('cards' in list)){
                list.cards = []
            }
            list.cards.push({id : id, title : textBoxVal , desc : ""});
        }
        
        return list;
    })
    console.log("lists",lists)
    
    boards[boardIndex] = {...boards[boardIndex], lists:lists}
    let board = boards[boardIndex]
    this.setState({boards : boards,needStorageSave : true})
    
    /*let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
    console.log(localDB);
    
    if(localDB.length === 0) return;

    if(!needSave) return;

    let ModifiedLocalDB = localDB.map((boardLS)=> {
        let retVal = boardLS;
        if(boardLS.id === _board.id){
            retVal = board
        }  
        return retVal
    })

    localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))*/

}

listNameChange(_board,listId, evt) {
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            list.listNameTextBoxVal = evt.target.value;
        }
        
        return list;
    })
    console.log("lists",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards})
}

listNameSave(_board,listId, evt){ 
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let needLSSave = false;
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){

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
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    let board = boards[boardIndex]

    this.setState({boards : boards,needStorageSave : true})


    if(!needLSSave) return;
    
    /*let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
    console.log(localDB);
    
    if(localDB.length === 0) return;

    let ModifiedLocalDB = localDB.map((boardLS)=> {
        let retVal = boardLS;
        if(boardLS.id === _board.id){
            retVal = board
        }  
        return retVal
    })

    localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))*/
}

toggleListNameEdit(_board, listId, evt){
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            list.toggleTextBox = true;
        }
        
        return list;
    })
    console.log("lists",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards})
}

removeCard(_board, listId, cardId, evt){

    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            let cards = list.cards;
            cards.splice(cards.findIndex(card => card.id === cardId) , 1)
        }
        
        return list;
    })

    console.log("lists",lists)
    
    boards[boardIndex] = {...boards[boardIndex], lists:lists}
    let board = boards[boardIndex]
    this.setState({boards : boards,needStorageSave : true})


    /*let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
    console.log(localDB);
    console.log("board",board)
    
    if(localDB.length === 0) return;

    let ModifiedLocalDB = localDB.map((boardLS)=> {
        let retVal = boardLS;
        if(boardLS.id === _board.id){
            retVal = board
        }  
        return retVal
    })
    console.log("mod l db",ModifiedLocalDB)
    localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))*/
}

cardNameEdit(_board,listId, cardId, evt){
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            list.cards.map(card => {
                if(card.id === cardId){
                    card.textBoxVal = evt.target.value;
                }
                return card;
            })
        }
        
        return list;
    })
    console.log("lists card edited ",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}
    this.setState({boards : boards})
}

saveEditedCardName(_board, listId, cardId, evt){
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id)
    let needLSSave = false;
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            list.cards.map(card => {
                if(card.id === cardId){
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

    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    let board = boards[boardIndex]

    this.setState({boards : boards,needStorageSave : true})

    if(!needLSSave) return;

    /*let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
    console.log(localDB);
    
    if(localDB.length === 0) return;

    let ModifiedLocalDB = localDB.map((boardLS)=> {
        let retVal = boardLS;
        if(boardLS.id === _board.id){
            retVal = board
        }  
        return retVal
    })

    localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))*/
}

  toggleCardNameEdit(_board, listId, cardId, evt){
    
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
      let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
          if(list.id === listId){
              let cards = [...list.cards]
              cards.map(card => {
                  if(card.id === cardId){
                      card.toggleTextBox = true;
                  }
                  return card;
              })
          }
          
          return list;
      })

      boards[boardIndex] = {...boards[boardIndex], lists:lists}
      this.setState({boards : boards})
  }

  addBoardClickHandler(evt){

      let boardName = this.state.textBoxVal;
      let id = nanoid();
      if(boardName.trim() === "") return;
      this.setState({boards : [...this.state.boards, {id : id,name: boardName, lists : []}],
          textBoxVal : "",
          Modal : { show : false, content : null},
          needStorageSave : true,
      })
      
      /*let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
      console.log(localDB);
      localDB.push({id : id, name : boardName, lists : []});
      console.log("add Board",localDB);
      localStorage.setItem("boards",JSON.stringify(localDB))*/

  }

  addBoardItemClickHandler(board,evt){
    console.log(arguments)
    
    let boardItemName = this.state.boardItemTextBoxVal;
    let boardIndex = this.state.boards.findIndex(boardInState => boardInState.id === board.id)

    let boards = [...this.state.boards]

    console.log("err board", boards)
    console.log("err board", boards[boardIndex])
    let lists = [...boards[boardIndex].lists];
    console.log("click lists",lists)
    console.log("click lists boards",boards)
    let id = nanoid()
    lists.push({ id: id, name : boardItemName})

    boards[boardIndex] = {...boards[boardIndex], lists : lists}

    console.log("click lists boards",boards)
    console.log("click state boards",this.state.boards)

    this.setState({boards : boards,
        boardItemTextBoxVal : "",
        Modal : { show : false},
        needStorageSave : true,
    })
    
    /*let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
    console.log(localDB);
    
    if(localDB.length === 0) return;

    let ModifiedLocalDB = localDB.map((boardLS)=> {
        let retVal = boardLS;
          if(boardLS.id === board.id){
            if(!('lists' in boardLS)){
              boardLS.lists = []
            }
            boardLS.lists.push({id: id, name : boardItemName})
            retVal = boardLS
          }
        
        return retVal
    })
    localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))*/
  }

  toggleCardDescriptionEdit(boardId,listId,cardId,evt){

    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === boardId) 
    let lists = _.cloneDeep(boards[boardIndex]).lists
    
    let list = lists[lists.findIndex(list => list.id === listId)]

    let card = list.cards[list.cards.findIndex(card => card.id === cardId)]

    if(card.editDescription){
        card.editDescription = false;
    }
    else{
        card.editDescription = true;
    }

    console.log("lists in card modal",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards})

  }

  cardDescChange(boardId,listId,cardId,evt){
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === boardId) 
    let lists = _.cloneDeep(boards[boardIndex]).lists
    
    let list = lists[lists.findIndex(list => list.id === listId)]

    let card = list.cards[list.cards.findIndex(card => card.id === cardId)]

    card.textArea = evt.target.value;

    console.log("lists in card modal",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards})
  }

  saveCardDesc(boardId,listId,cardId,evt){
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === boardId) 
    let lists = _.cloneDeep(boards[boardIndex]).lists
    
    let list = lists[lists.findIndex(list => list.id === listId)]

    let card = list.cards[list.cards.findIndex(card => card.id === cardId)]
    if(card.textArea.trim() === "") return;
    card.desc = card.textArea;
    card.textArea = "";
    card.editDescription = false;
    console.log("lists in card modal",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards,needStorageSave : true})


    /*let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
    console.log(localDB);
    
    if(localDB.length === 0) return;

    let ModifiedLocalDB = boards;
    localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))*/
  }

  renderBoardLists (props){
    console.log("In APP",props);
    let board = this.state.boards.find((board) => board.id === props.match.params.id)

    console.log("board",board)
    if(!board) return <h1>Invalid Board !!!</h1>

    let showCardModalPopup = false;
    let card;
    let list;
    if(props.match.params.listid && props.match.params.cardid){
        list = board.lists.find((list) => list.id === props.match.params.listid)
        card = list.cards.find((card) => card.id === props.match.params.cardid)
        console.log("card", card)
        if(card){
            showCardModalPopup = true;
        }
    }

    return (
      <BoardLists
        showCardModalPopup = {showCardModalPopup}
        card = {card}
        match={props.match}
        Modal={this.state.Modal}
        board={board}
        list={list}
        onSaveCardDesc = {this.saveCardDesc.bind(this)}
        onCardDescChange = {this.cardDescChange.bind(this)}
        onToggleCardDescriptionEdit = {this.toggleCardDescriptionEdit.bind(this)}
        onToggleEdit={this.toggleListNameEdit.bind(this)} 
        onListNameEdit={this.listNameChange.bind(this)}
        onListNameSave={this.listNameSave.bind(this)}
        onAddCard={this.addCardtoListHandler.bind(this)} 
        onChange ={this.changeCardTextBoxValHandler.bind(this)} 
        closeForm={this.closeForm.bind(this)} 
        onClick={this.showAddNewCardForm.bind(this)}
        onRemoveCard = {this.removeCard.bind(this)}
        onCardNameEdit = {this.cardNameEdit.bind(this)} 
        onToggleCardNameEdit={this.toggleCardNameEdit.bind(this)} 
        onSaveEditedCardName={this.saveEditedCardName.bind(this)} 
        onAddBoardItemClickHandler={this.addBoardItemClickHandler.bind(this)}
        onModalClose = {this.modalCloseHandler.bind(this)}
        onShowModal={this.showModal.bind(this)} 
        onChangeListName={this.changeboardItemTextBoxValHandler.bind(this)}
        />

    )
  }

  renderHomePage(props){
    return ( 
      <HomePage 
        {...this.state} 
        onModalClose={this.modalCloseHandler.bind(this)} 
        onChangeBoardName = {this.changeTextBoxValHandler.bind(this)} 
        onShowModal={this.showModal.bind(this)} 
        renderExistingBoards = {this.renderExistingBoards.bind(this)} 
        addBoardClickHandler = {this.addBoardClickHandler.bind(this)} 
      />
    )
  }

  renderCardModal(props){
      console.log("modal props",props)
  }

  render (){
    return(
      //conditional rendering Login or Homepage
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact render={ this.renderHomePage.bind(this) } />
          <Route path="/board/:id/:listid?/:cardid?" render={this.renderBoardLists.bind(this)} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;