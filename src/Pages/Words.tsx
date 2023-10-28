import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Data = {
    id:number,
    word:string,
    pos:string
}

const Words = () => {
    // defining the States
        // state for all questions from the server
    const [allQuestions,setAllQuestions] = useState<Data[]>([]);
        // state indicating the current question the user answering
    const [currentQuestion,setCurrentQuestion] = useState<number>(0);
        // state indicating the current score of the user
    const [userScore,setUserScore] = useState<number>(0);
        // array used to render pos using array.map in the return of the Words function
    const POS:string[] = ["noun","verb","adjective","adverb"];
        // empty array that every question the user answer will push its number here (to check if he answered)
    const answeredQuestions:number[] = [];

    // getting the data from the backend and setting the state of allQuestions
    useEffect(()=>{
        axios.get("https://english-practicing-test.onrender.com/words")
        .then(response=>{setAllQuestions(response.data)})
        .catch(()=>alert("sorry can't connect to the server, please check your connection and try again"));
    },[]);

    // function executed when the user clicks on an answer
    const handleClick = (pos:string,e:any)=>{
        // using self pattern to catch and assign the event of click to the variable
        let self = e.currentTarget.classList;
        // checking if the user already answered the question
        if(!answeredQuestions.includes(currentQuestion)){
            // pushing the current question to the array of answeredQuestions
            answeredQuestions.push(currentQuestion);
            // case the answer is correct
            if(pos == allQuestions[currentQuestion].pos){
                // replacing className and increase score by one
                self.replace("border-primary","border-success")
                setUserScore(userScore+1);
            }
            else{
            // case the answer is wrong
                // replacing className only
                self.replace("border-primary","border-danger");
            }
            // executing setTimeout only if there's still questions in the allQuestions array
            if(currentQuestion < allQuestions.length)
            {
            setTimeout(()=>{
                // setting the state of currentQuestion
                setCurrentQuestion(currentQuestion+1);
                // return back to the default color (not answered)
                self.replace("border-success","border-primary")
                self.replace("border-danger","border-primary")
            },1000);
            }
        }
    }

    return ( 
        <>
        <div className="container">
            <div className="row">
                {/* progress bar indicating the status of the test */}
                <div className="progress px-0 my-3">
                    <div className="progress-bar bg-success" role="progressbar" style={{width: `${((currentQuestion)/allQuestions.length)*100}%`}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
                {/* showing the current score to the user */}
                <span className="badge bg-info w-25 m-auto fs-6">Score : <br/>{userScore}</span>
            </div>
            <div className="row">
                {/* showing the word no. of how many words */}
                <div className="col-12 fs-4 text-center">{`Word No. ${currentQuestion == allQuestions.length? currentQuestion:currentQuestion+1} of ${allQuestions.length}`}</div>
                <div className="col-12 px-0 alert alert-dismissible alert-secondary fs-3 text-center">
                    {/* showing the word to the user (the question) */}
                    <strong>{allQuestions[currentQuestion]?.word}</strong>
                </div>
                <div className='row justify-content-center gap-2 mb-2'>
                    {/* answers using the POS array we declared above */}
                    {POS.map((pos,idx)=>
                        <div key={idx} onClick={(e)=>handleClick(pos,e)} className="card border-4 border-primary col-12 col-md-5" style={{cursor:"pointer"}}>
                            <div className="card-body d-flex justify-content-center align-items-center" style={{height:"10rem"}}>
                                <h4 className="card-title font-monospace fw-bold fs-2">{pos}</h4>
                            </div>
                        </div>
                    )}
                </div>
                <div className="row mb-2">
                    {/* a button appears when the user finishes all the questions (conditional rendering) */}
                    {currentQuestion==allQuestions.length && <Link to='/rank' state={(userScore/allQuestions.length)*100}><div className="btn btn-success w-100">View my rank</div></Link>}
                </div>
            </div>
        </div>
        
        </>
    );
}
 
export default Words;
