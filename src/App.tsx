import './App.css'
import {Component} from "react";
import {Input} from "./ui/Input";
import Api from "./Api/Api";
import {Character} from "./Api/types";
import {Card} from "./components/Card";
import {Loader} from "./components/Loader";


class App extends Component<any, { text: string, cards: Character[], isLoading: boolean, next: boolean, previous: boolean }> {
    debounceTimeout = null;
    currentPage = 1;

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            cards: [],
            isLoading: false,
            next: true,
            previous: false,
        }
    }

    componentDidMount() {
        this.updateData()
    }

    updateData = () => {
        this.setState({...this.state, isLoading: true})
        const response = Api.getData({text: this.state.text, currentPage: this.currentPage})
        response.then(data => {
            this.setState({
                ...this.state,
                next: !!data.next,
                previous: !!data.previous,
                cards: data.results,
                isLoading: false
            })
        })
        return
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{ text: string; cards: Character[]; isLoading: boolean }>, snapshot?: any) {
        if (this.state.text !== prevState.text) {
            this.updateData()
        }
    }

    debounce = (func, delay) => {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(func, delay);
    }

    render() {
        return (
            <div className={'app'}>
                <div className={'buttons'}>
                    <button
                        disabled={!this.state.previous}
                            onClick={() => {
                        this.currentPage -= 1
                        this.updateData()
                    }}>
                        Prev
                    </button>
                    <Input
                        onChange={(e) => this.debounce(() => {
                        this.currentPage = 1;
                        this.setState({...this.state, text: e.target.value})
                    }, 1000)}
                           type={'text'} placeholder={'Search...'}
                    />
                    <button
                        disabled={!this.state.next}
                            onClick={() => {
                        this.currentPage += 1
                        this.updateData()
                    }}>
                        Next
                    </button>
                </div>
                <div className={'cards'}>
                    {
                        this.state.isLoading ? <Loader/> :
                            this.state.cards.map((card) => <Card key={card.name} {...card}/>)
                    }
                </div>
            </div>)
    }
}

export default App
