import React, { Component } from 'react';
import allPlayers from '../common/data';
import './Table.css';
import Select from 'react-select';


class Scoreboard extends Component {

    constructor(props){
        super(props);
        const players = allPlayers.players.sort((a, b) => b.score - a.score);
        console.warn('Players data ', players);
        this.state = {
            players,
            editedScore: null,
            name: '',
            score: '',
            selectedOption: null,
            newarray: []
        }; 
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleNameChange = selectedOption => {
        this.setState({selectedOption});
      }
    
      handleScoreChange = (event) => {
        this.setState({score: event.target.value});
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        const { selectedOption, score, players } = this.state
        selectedOption.score = score;
        console.log(`Option selected:`, selectedOption,
        `score:`, score);
        const resultArray = players.map(player => {
            if(player.id === selectedOption.id) {
                return selectedOption;
            } 
            return player;
        }).sort((a, b) => b.score - a.score);

        this.setState({selectedOption: "", score: "", players: resultArray});
      }

    renderTableHeader() {
        let header = Object.keys(this.state.players[0])
        return header.map((key, id)=> {
            if(key === 'label' || key === 'value') {
               return ''; 
            }
           return <th key={id}>{key.toUpperCase()}</th>
        })
     }

    renderTableData() {
        return (
        this.state.players.map((player, id) => {
            
                const { name, score } = player //destructuring

                return (
                       <tr key={id}>

                           <td>{id}</td>
                           <td>{name}</td>
                           <td>{score}</td>
                       </tr>
                   )
                
            }
        ))}

    
     
    render() {
        const { selectedOption } = this.state;
        const options = this.state.players;
        
        return(
        <div>
            <h1 id='title'>Score Board</h1>
               
            <table id='players' align= 'center' >
               <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                         {this.renderTableData()}
               </tbody>
            </table>
            <div id="addQuestion">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Player: </label>
                        <Select value={selectedOption} 
                        onChange={this.handleNameChange} 
                        options={ options }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="score">Score: </label>
                        <input type= "number" name="score" className="form-control" id="score" 
                        placeholder="Type the score" 
                        value={this.state.score} onChange={this.handleScoreChange} />
                    </div>
                     <button type="submit" className="btn btn-success btn-block">Submit</button>
                </form>   
             </div>              
         </div>
        );
    }
 }

 


 export default Scoreboard;