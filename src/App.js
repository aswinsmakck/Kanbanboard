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
    };
  }

    componentDidUpdate(prevProps, prevState){
        console.log("------in APP comp did update----------")
        console.log(prevProps)
        console.log(prevState)
        console.log(this.state)
        console.log(_.isEqual(this.state, prevState))
        if(!_.isEqual(this.state, prevState)){
            let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
            console.log(localDB);

            let ModifiedLocalDB = this.state.boards;
            console.log(ModifiedLocalDB);
            localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))
            console.log(JSON.parse(localStorage.getItem("boards") || "[]"))
        }
    }

    changeTextBoxValHandler(evt){
        console.log(this)
        console.log(evt.target)
        console.log(evt.target.value)
        let textBoxVal = evt.target.value;
        this.setState({...this.state, textBoxVal : textBoxVal})
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
        console.log("In render existing boards",board)
        return (
            <Link className="Link" key={index} to={{pathname : `/board/${board.id}`}}>
                <Board data={board} />
            </Link>
        )
    });
  }

 
addCardtoListHandler(cardName,_board,listId,evt){
    if(cardName.trim() === "") return;
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let id = nanoid();
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            if(!('cards' in list)){
                list.cards = []
            }
            list.cards.push({id : id, title : cardName , desc : ""});
        }
        
        return list;
    })
    
    boards[boardIndex] = {...boards[boardIndex], lists:lists}
    this.setState({boards : boards})

}

listNameSave(editedListName, _board,listId, evt){ 
    if(editedListName.trim() === "") return;
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id) 
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            list.name = editedListName;
        }
        
        return list;
    })
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
    this.setState({boards : boards})

}

saveEditedCardName(editedCardName, _board, listId, cardId, evt){
    if(editedCardName.trim() === "") return;
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === _board.id)
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            list.cards.map(card => {
                if(card.id === cardId){
                    card.title = editedCardName;
                }
                return card;
            })
        }
        
        return list;
    })

    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards})

}

  addBoardClickHandler(boardName, evt){

      let id = nanoid();
      if(boardName.trim() === "") return;
      this.setState({boards : [...this.state.boards, {id : id,name: boardName, lists : []}],})

  }

  addBoardItemClickHandler(boardItemName, board, evt){

    let boards = [...this.state.boards]
    console.log("In add list ")
    console.log(boards)
    console.log(board)

    let boardIndex = this.state.boards.findIndex(boardInState => boardInState.id === board.id)

    console.log("boardindex",boardIndex);


    let lists = [...boards[boardIndex].lists];
    
    let id = nanoid()
    lists.push({ id: id, name : boardItemName})

    boards[boardIndex] = {...boards[boardIndex], lists : lists}

    this.setState({boards : boards,})
    
  }

  saveCardDesc(editedCardDesc,boardId,listId,cardId,evt){
      console.log("i am executing")
    let boards = [...this.state.boards]
    let boardIndex = boards.findIndex(boardObj => boardObj.id === boardId) 
    let lists = _.cloneDeep(boards[boardIndex]).lists
    
    let list = lists[lists.findIndex(list => list.id === listId)]

    let card = list.cards[list.cards.findIndex(card => card.id === cardId)]
    card.desc = editedCardDesc;

    console.log("lists in card modal",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    this.setState({boards : boards})

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
        board={board}
        list={list}
        onSaveCardDesc = {this.saveCardDesc.bind(this)}
        onListNameSave={this.listNameSave.bind(this)}
        onAddCard={this.addCardtoListHandler.bind(this)} 
        onRemoveCard = {this.removeCard.bind(this)}
        onSaveEditedCardName={this.saveEditedCardName.bind(this)} 
        onAddBoardItemClickHandler={this.addBoardItemClickHandler.bind(this)}
        />

    )
  }

  renderHomePage(props){
    return ( 
      <HomePage  
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