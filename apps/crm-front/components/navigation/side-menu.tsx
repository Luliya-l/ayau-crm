import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { selectLangState } from 'apps/crm-front/store/langSlice';

import { useSelector } from "react-redux";
import TopBar from './top-bar';

const SideMenu = ({setExpanded, setContent, lang = 'ru'}) => {
    const langs = useSelector(selectLangState);

    return (
        <>
            <SideNav
                onSelect={(selected) => {
                    setContent(selected);
                }}
                onToggle={(expanded) => {
                    setExpanded({ expanded });
                }}
                className="bg-dark-blue"
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="chart">
                    <NavItem eventKey="dashboard">
                        <NavIcon>
                            <i className="bi bi-speedometer" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.dashboard}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="contracts">
                        <NavIcon>
                            <i className="bi bi-currency-dollar" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.contracts}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="tasks">
                        <NavIcon>
                            <i className="bi bi-list-task" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.tasks}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="contacts">
                        <NavIcon>
                            <i className="bi bi-people" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.contacts}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="list">
                        <NavIcon>
                            <i className="bi bi-list-columns-reverse" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.lists}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="email">
                        <NavIcon>
                            <i className="bi bi-postcard" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.mail}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="bi">
                        <NavIcon>
                            <i className="bi bi-graph-down-arrow" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.bi}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="sliders">
                        <NavIcon>
                            <i className="bi bi-sliders2-vertical" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.settings}
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </>
    )
}

export default SideMenu;