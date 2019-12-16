import * as React from 'react';


interface PageInterface {
    color: string,
    state: string[],
    showSnackbar: (payload: {message: string, variant: string})=>{}
}

class App extends React.Component<PageInterface> {
    ref= React.createRef<HTMLInputElement>();
    componentDidMount(){
        this.props.showSnackbar({message: 'Test gjkv kjv  vkkhv hv h  vvv kv v vkhv khvkhjvhkjv hvjhkj vhv kvjhvhv kjh v  vhvkh h vhv khjv v h jv v', variant: 'info'});

    }
    render() {
        const { state, showSnackbar} = this.props;
        return (<div>
            <h1>Welcome to React with Typescript</h1>
            <p>The color of this page is: {this.props.color}</p>
            <p>All text: {...state}</p>
            <input type="text" ref={this.ref}/>
            <input type="button" value="Teest!" onClick={()=>( showSnackbar({message: 'Added', variant: 'info'}))}/>
        </div>);
    }
}

export default App;