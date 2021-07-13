export default function Button(props){
    return (
        <button onClick = {props.onClick} style={props.style} className={props.styleName}>{props.children}</button>
    )
}