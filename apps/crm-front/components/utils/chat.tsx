import { Langs, Question } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postGetChatHistory, postSetQuestions } from "apps/crm-front/data/fetch/integration";

const Chat = () => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const listObj = useRef(null);

    const [msgs, setMsgs] = useState([] as Question[]);
    const [msg, setMsg] = useState("");

    const listTemplate = (data) => {
        const sendertemplate = 
        (
            <li 
                className="e-list-item e-level-1" 
                role="listitem" 
            >
                <div>
                    <div>
                        <div className="settings w-100 text-end">
                            <div id="content">
                                <div className="name w-100 text-end">
                                    {'Ваше сообщение'}
                                </div>
                                <br />
                                <div id="info">{data.msg}</div>
                            </div>
                            {data.u_icon !== "" ? (
                                <div id="image">
                                    <span className="e-avatar img1 e-avatar-circle">&nbsp;</span>
                                </div>
                            ) : (
                                <div id="image">
                                    <span className={`${data.u_icon} img1 e-avatar e-avatar-circle`}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </li>
        );
        const receivertemplate = 
        (
            <li 
                className="e-list-item e-level-1" 
                role="listitem" 
            >
                <div>
                    <div>
                        <div className="settings">
                            {
                                data.avatar !== "" ? 
                                (
                                    <div id="image2">
                                        <span className="e-avatar img2 e-avatar-circle">&nbsp;</span>
                                    </div>
                                ) : (
                                    <div id="image2">
                                        <span className={`${data.a_icon} img2 e-avatar e-avatar-circle`}/>
                                    </div>
                                )
                            }
                            <div id="content1">
                                <div className="name1">{'Ассистент'}</div>
                                <div id="info1">{data.msg}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
        return <div>{!data.assistant ? sendertemplate : receivertemplate}</div>;
    }

    const btnClick = async () => {
        setMsg("");
        await postSetQuestions({msg:msg} as Question, auth.authToken).then((res) => {
            setMsgs([...msgs, 
                ...[{ from_id: "Я", msg: msg, id: "2", a_icon:"a_icon", u_icon: "u_icon", assistant: false } as Question,   
                res.data as Question]]);
        }).catch((err) => {
            console.log(err);
        });
    }

    const onChange = (e) => {
        setMsg(e.target.value);
    }

    useEffect(() => {
        postGetChatHistory(auth.authToken).then((res) => {
            setMsgs(res.data as Question[]);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        listObj.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [msgs]);

    return (
        <>
            <Button 
                variant="back-on-top" 
                className='rounded-circle btn-floating btn-lg m-0 p-0 position-fixed' 
                style={{
                    background:'transparent', 
                    border:'none',
                    width:'64px', 
                    height:'64px', 
                    zIndex:'1099', 
                    bottom:'2%',
                    right:'2%'
                }}
                onClick={() => handleShow()}
            >
                <i className="bi bi-chat-dots py-2" style={{ fontSize: '1.75em', color:'rgba(235, 94, 69, 1)' }} />
            </Button>
            <Container 
                className={`${show ? '' : 'd-none'} position-fixed bg-light p-2 rounded`}
                style={{bottom:'1%', right:'1%', zIndex:'99999', maxWidth:'390px', height:'70%'}}
            >
                <i 
                    role="button" 
                    className="bi bi-x text-black fs-3"
                    onClick={() => handleClose()}
                ></i>
                <div>
                    {/* ListView element
                    <ListViewComponent 
                        id="List" 
                        dataSource={chatContent} 
                        template={listTemplate} 
                        ref={listObj}
                        className="List"
                    /> */}
                    <Container className="p-0">
                        <div id="List" className="List e-control e-listview e-lib e-touch">
                            <div className="e-content" ref={listObj} style={{overflow:'visible'}}>
                                <ul className="e-list-parent e-ul" role="group">
                                    {
                                        (msgs ?? []).map((msg, index) => {
                                            return (
                                                <div key={index}>
                                                    {listTemplate(msg)}
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </Container>
                    <InputGroup className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Type your message"
                            aria-describedby="basic-addon2"
                            value={msg}
                            onChange={(e) => onChange(e)}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={btnClick.bind(this)}>
                            <i className="bi bi-chat-dots" />
                        </Button>
                    </InputGroup>
                </div>
            </Container>
        </>
    )
}

export default Chat;