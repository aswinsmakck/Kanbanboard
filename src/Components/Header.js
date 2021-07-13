import Section from './UI/Section'

export default function Header(props){
    return (
        <Section sectionStyle={{padding : "20px", backgroundColor : "#ff4d4d"}} columnStyle={{width : "100%"}}>
            <div className="tempClass">
                <h1 className="header-elements">Logo</h1>
                <h1 className="header-elements">West Dragon Kanbanboard</h1>
                <h1 className="header-elements">Restore to defaults</h1>
            </div>
        </Section>
    )
}