import './App.css'
import {Component} from "react";
import {Input} from "./ui/Input";
import Api from "./Api/Api";
import {Character} from "./Api/types";
import {Card} from "./components/Card";
import {Loader} from "./components/Loader";


class App extends Component<{}, { text: string, cards: Character[], isLoading: boolean, next: boolean, previous: boolean }> {
    debounceTimeout:number = 0;
    currentPage = 1;
    state = {
        text: '',
        cards: [],
        isLoading: false,
        next: true,
        previous: false,
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
    componentDidUpdate(_prevProps: Readonly<{}>, prevState: Readonly<{ text: string; cards: Character[]; isLoading: boolean; next: boolean; previous: boolean }>) {
        if (this.state.text !== prevState.text) {
            this.updateData()
        }
    }
    debounce = (func: () => void, delay: number) => {
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
                            this.state.cards.map((card:Character) => <Card key={card.name} {...card}/>)
                    }
                </div>
            </div>)
    }
}

export default App
