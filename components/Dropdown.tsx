import React, { useState } from 'react';

interface Props {
    darkMode: boolean;
    items: string[];
    selected: string;
    updateSelected: (selected: string) => void;
}

const Dropdown: React.FC <Props> = (props) => {
    const { darkMode, items, selected, updateSelected } = props;

    const [open, updateOpen] = useState<boolean>(false);

    return (
        <>
            <div className="container">
                <button className="dropdown-btn" onClick={() => updateOpen(!open)}>{ selected.toUpperCase() }</button>
                {open ? 
                    <div className="dropdown-container">
                            {items.map(item =>(
                                <li 
                                    key={items.indexOf(item)}
                                    className="list-item"
                                    onClick={() => {
                                        updateSelected(item);
                                        updateOpen(!open);
                                    }}                                
                                >
                                    {item.toUpperCase()}
                                </li>
                            ))}

                    </div>
                : null}
            </div>
            <style jsx>
                {`  
                    .dropdown-btn,
                    .list-item
                    {
                        background-color: #${!darkMode ? '555555': 'DDDDDD'};
                        color: #${!darkMode ?'FFFFFF'  :'333333'};
                        border: none;
                        border-radius: .25em;
                        height: 2.5em;
                        font-size: .75em;
                        cursor: pointer;
                    }
                    .dropdown-btn {
                        padding: 0 1em;
                    }

                    .dropdown-btn:hover,
                    .list-item:hover
                    {
                        background-color: #${!darkMode ? '666666': 'CCCCCC'};
                    }

                    .dropdown-container {
                        width: 8em;
                        padding: .5em;
                        color: #${!darkMode ?'FFFFFF'  :'333333'};
                        background-color: #${!darkMode ? '333333': 'EEEEEE'};
                        border-radius: .25em;
                        display: flex;
                        flex-direction: column;
                        gap: .5em;
                        align-items: flex-start;
                        position: absolute;
                        bottom: 3.5em;
                    }
                    
                    .list-item {
                        width: 100%;
                        padding: .75em;
                        list-style-type: none;
                    }
                `}
            </style>
        </>
    )
}
export default Dropdown;