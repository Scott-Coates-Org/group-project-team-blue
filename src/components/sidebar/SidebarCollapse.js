import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';

export default function SidebarCollapse(props) {
    const history= useHistory();

    const {url, item, mouseover, onMouseOut } = props;
    return (
        <ListGroup className="text-white">
            {item.collapse.map((item, index) => {
                return (
                    <NavLink key={index} to={item.path}><ListGroupItem  onMouseOver={mouseover} onMouseOut={onMouseOut} className="bgdark border-0">
                        {item.text}
                    </ListGroupItem></NavLink>
                )
            })}
        </ListGroup>
    )
}
