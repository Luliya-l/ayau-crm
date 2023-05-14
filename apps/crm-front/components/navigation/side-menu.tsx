import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Langs } from 'apps/crm-front/specs/custom-types';
import { selectLangState } from 'apps/crm-front/store/langSlice';

import { useSelector } from "react-redux";

const SideMenu = ({setExpanded, setContent, setLang}) => {
    const localization = useSelector(selectLangState) as Langs;

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    return (
        <>
            <SideNav
                onSelect={(selected) => {
                    if (selected === 'localize/kz') {
                        setLang('kz');
                    } else if (selected === 'localize/ru') {
                        setLang('ru');
                    } else if (selected === 'localize/en') {
                        setLang('en');
                    } else {
                        setContent(selected);
                    }
                }}
                onToggle={(expanded) => {
                    setExpanded({ expanded });
                }}
                className="bg-dark-blue"
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="chart">
                    <NavItem eventKey="localize">
                        <NavIcon>
                            <i className="bi bi-translate" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {getParams('language')}
                        </NavText>
                        <NavItem eventKey="localize/kz">
                            <NavText>
                                {'Қазақша'}
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="localize/ru">
                            <NavText>
                                {'Русский'}
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="localize/en">
                            <NavText>
                                {'English'}
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="dashboard">
                        <NavIcon>
                            <i className="bi bi-speedometer" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {getParams('dashboard')}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="contracts">
                        <NavIcon>
                            <i className="bi bi-currency-dollar" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {getParams('contracts')}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="tasks">
                        <NavIcon>
                            <i className="bi bi-list-task" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {getParams('tasks')}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="contacts">
                        <NavIcon>
                            <i className="bi bi-people" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {getParams('contacts')}
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="list">
                        <NavIcon>
                            <i className="bi bi-list-columns-reverse" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {getParams('lists')}
                        </NavText>
                        <NavItem eventKey="list/contacts">
                            <NavText>
                                {getParams('contacts')}
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="list/customers">
                            <NavText>
                                {getParams('company_id')}
                            </NavText>
                        </NavItem>
                        {/* <NavItem eventKey="list/files">
                            <NavText>
                                {'Файлы'}
                            </NavText>
                        </NavItem> */}
                    </NavItem>
                    <NavItem eventKey="email">
                        <NavIcon>
                            <i className="bi bi-postcard" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {getParams('mail')}
                        </NavText>
                    </NavItem>
                    {/* <NavItem eventKey="bi">
                        <NavIcon>
                            <i className="bi bi-graph-down-arrow" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {getParams('bi')}
                        </NavText>
                    </NavItem> */}
                    <NavItem eventKey="settings">
                        <NavIcon>
                            <i className="bi bi-sliders2-vertical" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {getParams('settings')}
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </>
    )
}

export default SideMenu;