import React, { Component } from 'react';

const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 2,
    },
];
function isSearched(searchTerm) {
    return function (item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }
}

class Hello extends Component{
    constructor(props){
        super(props);

        this.state = {
            list,
            searchTerm:"",
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    onDismiss(id){
        const isNotId =  item => item.objectID !==id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({
            list: updatedList
        })
    }
    onSearchChange(event){
        this.setState({
            searchTerm: event.target.value
        })
    }
    render(){
        const {searchTerm, list } = this.state;
        return(
            <div className='page'>
                <div className='interactions'>
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                >
                    search
                </Search>
                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
                </div>
            </div>
        )
    }
}

const Button = ({onClick, className = '', children}) =>
    <button
        onClick={onClick}
        className={className}
        type="button"
    >
        {children}
    </button>

const Search = ({value, onChange, children })=>
    <form action="">
        {children}
        <input type="text"
               onChange={onChange}
               value={value}
        />
    </form>


const Table = ({onDismiss, list, pattern })=>
    <div className='table'>
        {
            list.filter(isSearched(pattern)).map((item, index) => {
                return (
                    <div className='table-row' key={item.objectID}>
                        <div>title: {item.title}</div>
                        <div>autor: {item.author}</div>
                        <div>{item.num_comments}</div>
                        <div>{item.points}</div>
                        <div>
                            <Button
                                onClick={()=> onDismiss(item.objectID)}
                                className='button-inline'
                            >
                                Dismiss
                            </Button>
                        </div>
                    </div>
                )
            })
        }
    </div>

export default Hello;