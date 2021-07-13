const Utils = {

    showModal : function(evt) {
        let requiredStateModal = true
        this.setState({...this.state, Modal : {...this.state.Modal, show : requiredStateModal}});
    },

    modalCloseHandler : function(){

        this.setState({...this.state, textbox : {NewBoard : ""}, Modal : { show : false, content : null}});
    },
    changeTextBoxValHandler : function (evt){
        console.log(evt)
        console.log(evt.target)
        console.log(evt.target.value)
        let textBoxVal = evt.target.value;
        this.setState({...this.state, textBoxVal : textBoxVal})
    },
    test1 : function(){
        Utils.test2()
    },
    test2 : function(){
        console.log("test2")
    }
}

export default Utils;