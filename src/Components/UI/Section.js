import Row from './Row';
import Column from './Column'

export default function Section(props){
    return(
        <section className="App-Section" style={props.sectionStyle}>
            <Row>
                <Column columnStyle={props.columnStyle}>
                    {props.children}
                </Column>
            </Row>
        </section>
    )
}