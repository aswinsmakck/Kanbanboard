import React from 'react';
import Section from './UI/Section';
import Row from './UI/Row';
import Column from './UI/Column'
import Button from './UI/Button';
import ModalWindow from './UI/ModalWindow'

export default class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Modal : {
                show : false,
            },
            textBoxVal:"",
        }
    }

    /*shouldComponentUpdate(nextProps, nextState){
        return !_.isEqual(this.state, nextState)
    }*/

    modalCloseHandler(){
        console.log(this);
        this.setState({...this.state, textBoxVal:"", Modal : { show : false}});
    }

    showModal(evt) {
        let requiredStateModal = true
        this.setState({...this.state, Modal : {...this.state.Modal, show : requiredStateModal}});
    }

    changeTextBoxValHandler(evt){
        let textBoxVal = evt.target.value;
        this.setState({...this.state, textBoxVal : textBoxVal})
    }

    addBoardClickHandler(evt){
        if(this.state.textBoxVal.trim() === "") return;
        this.props.addBoardClickHandler(this.state.textBoxVal , evt);
        this.setState({
            textBoxVal : "",
            Modal : { show : false},
        });
        
    }

    render(){
        
        let boards = this.props.renderExistingBoards();
        let Modal = this.state.Modal

        return(
            <Section>
                <Row>
                    <Column>
                        {boards.length > 0 ? <Row>{boards}</Row> : <h1>No Boards to display !!!!</h1>}
                        <Button styleName="add-new-board" onClick={this.showModal.bind(this)}>
                            Add New Board
                        </Button>
                        {
                            Modal.show && 
                            
                            <ModalWindow modalHeader="Add New Board" onClose={this.modalCloseHandler.bind(this)}>
                                <div style={{alignSelf:"center"}}>
                                    <input type="text" className="textbox" value={this.state.textBoxVal} onChange={this.changeTextBoxValHandler.bind(this)} />
                                    <Button styleName="add-new-board" onClick={this.addBoardClickHandler.bind(this)} style={{ margin: "0 20px"}}> Add </Button>
                                </div>
                            </ModalWindow>
                        }
                    </Column>
                </Row>
            </Section>
        )
    }
}