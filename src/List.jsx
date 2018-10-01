import React, { Component } from 'react';
class List extends Component{
    constructor(props){
        super(props);

        this.state = {
            title:"List",
            valueSearchInput: '',
            valueAddInput: '',
            INITIAL_DATA: []
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeAddItemValue = this.onChangeAddItemValue.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.onDelete = this.onDelete.bind(this)
    }

    onChange(event){
        this.setState({
            valueSearchInput:event.target.value
        })
    }

    onChangeAddItemValue(event){
        this.setState({
            valueAddInput:event.target.value
        })
    }

    onDelete(index){
        const cloneArr = this.state.INITIAL_DATA.slice(0);
        const newArr = cloneArr.filter((item,i)=>{
            return i !== index;
        });
        console.log(this);
        this.setState({
            INITIAL_DATA:newArr,
        })
    }

    keyPress(event){
        if (event.key === 'Enter'){
            event.preventDefault();
            this.setState({
                INITIAL_DATA: [...this.state.INITIAL_DATA, this.state.valueAddInput],
                valueAddInput: ''
            })
        }
    }

    render(){
        return(
            <div className='list__container'>
                <header className='header'>
                    <h1>{this.state.title}</h1>
                    <Search
                        onChange ={ this.onChange }
                        value ={ this.state.valueSearchInput }
                    >
                        Search
                    </Search>
                </header>
                <AddItem
                    onChange={this.onChangeAddItemValue}
                    value={this.state.valueAddInput}
                    onKeyPress={this.keyPress}
                >
                    Add task
                </AddItem>
                <RenderItem
                value={this.state.INITIAL_DATA}
                onDelete={this.onDelete}
                >

                </RenderItem>
            </div>
        )
    }
}

const Delete = ({className,children,onClick}) =>{
    return <button className={className}
                onClick={onClick}
        >{children}</button>

};

const Complete = ({classN,children}) =>
    <button className={classN}
    >{children}</button>;

const Search = ({value, onChange,children }) =>
    <form action="search">
        <input type="text"
               value={value}
               onChange={onChange}
               placeholder={children} />
    </form>


const AddItem = ({ value, onChange, children, onKeyPress }) => {
    return(
        <form action="add" className='add__item'>
            <input type="text" value={value}
                   onChange={onChange}
                   placeholder={children}
                   onKeyPress={onKeyPress}
            />
        </form>
    )
};

const RenderItem = ({value, onDelete})=>{
    return(
        <div className='todos__box'>
            <div className="todos__header">
                <h3 className='todos__name'>Todos</h3>
                <h3 className='todos__action'>action</h3>
            </div>
            {
                value.map((item,index)=>{

                    const deleteItem = () => onDelete(index);
                    return(
                        <div className="todos__box-item" key={index}>
                            <h3>
                                {item}
                            </h3>
                            <span>{index}</span>
                            <div className="box_action">
                                <Delete className='delete' onClick={deleteItem}>-</Delete>
                                <Complete classN='complete'>+</Complete>
                            </div>
                        </div>
                    )
            })
            }
        </div>
    )
}


export default List;