import React from 'react';
import Board from './Board';
import Section from './UI/Section';
import Row from './UI/Row';
import Button from './UI/Button';
import {Link} from 'react-router-dom';
import ModalWindow from './UI/ModalWindow'
import AddNewItemForm from './AddNewItemForm'
import Utils from './Helpers/Utils'


export default class HomePage extends React.Component{
    
    constructor(props){
        console.log("Utils",Utils)
        console.log(Utils.test1())
        super(props);
        this.state = {
            
            boards : [],
            Modal : {
              show : false,
              content : null,
            },
            textBoxVal:""
                       
        };
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
                <Link className="Link" key={index} to={{pathname : `/board/${board.name}`, state:{lists: board.lists}}}>
                    <Board data={board} />
                </Link>
            )
        });
    }

    addBoardClickHandler(evt){

        let boardName = this.state.textBoxVal;
        this.setState({boards : [...this.state.boards, {name: boardName}],
            textBoxVal : "",
            Modal : { show : false, content : null}
        })
        
        let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
        console.log(localDB);
        localDB.push({name : boardName, lists : []});
        console.log(localDB);
        localStorage.setItem("boards",JSON.stringify(localDB))

    }

    render(){
        
        let boards = this.renderExistingBoards();
        let Modal = this.state.Modal

        return(
            <Section>
                {boards.length > 0 ? <Row>{boards}</Row> : <h1>No Boards to display !!!!</h1>}
                <Button styleName="add-new-board" onClick={Utils.showModal.bind(this)}>
                    Add New Board
                </Button>
                {Modal.show && <ModalWindow modalHeader="Add New Board" onClose={Utils.modalCloseHandler.bind(this)}>
                                <AddNewItemForm boardName={this.state.textBoxVal} onSubmit={this.addBoardClickHandler.bind(this)} onChange={Utils.changeTextBoxValHandler.bind(this)} />
                            </ModalWindow>}
            </Section>
        )
    }
}