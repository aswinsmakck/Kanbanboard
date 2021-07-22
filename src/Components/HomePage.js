import React from 'react';
import Section from './UI/Section';
import Row from './UI/Row';
import Column from './UI/Column'
import Button from './UI/Button';
import ModalWindow from './UI/ModalWindow'

export default class HomePage extends React.Component{
    
    shouldComponentUpdate(nextProps, nextState){
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    render(){
        
        let boards = this.props.renderExistingBoards();
        let Modal = this.props.Modal

        return(
            <Section>
                <Row>
                    <Column>
                        {boards.length > 0 ? <Row>{boards}</Row> : <h1>No Boards to display !!!!</h1>}
                        <Button styleName="add-new-board" onClick={this.props.onShowModal}>
                            Add New Board
                        </Button>
                        {
                            Modal.show && 
                            
                            <ModalWindow modalHeader="Add New Board" onClose={this.props.onModalClose}>
                                <div style={{alignSelf:"center"}}>
                                    <input type="text" className="textbox" value={this.props.textBoxVal} onChange={this.props.onChangeBoardName} />
                                    <Button styleName="add-new-board" onClick={this.props.addBoardClickHandler} style={{ margin: "0 20px"}}> Add </Button>
                                </div>
                            </ModalWindow>
                        }
                    </Column>
                </Row>
            </Section>
        )
    }
}