import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { selectLangState } from 'apps/crm-front/store/langSlice';

import { useSelector } from "react-redux";

const SideMenu = ({lang = 'ru'}) => {
    const langs = useSelector(selectLangState);

    return (
        <>
            <SideNav
                onSelect={(selected) => {
                    // Add your code here
                }}
                className="bg-dark-blue"
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="chart">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="bi bi-speedometer" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.dashboard}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="sales">
                        <NavIcon>
                            <i className="bi bi-currency-dollar" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.contracts}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="customers">
                        <NavIcon>
                            <i className="bi bi-people" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.customers}
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
                    <NavItem eventKey="list">
                        <NavIcon>
                            <i className="bi bi-list-columns-reverse" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {langs[lang].params.lists}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="posts">
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