import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
const [userInput, setUserInput] = useState ('');

const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
}

const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  return (
    <div className="root">
      <Head>
        <title>Talk to Steve Jobs | Innovator AI</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Talk to Steve Jobs</h1>
          </div>
          <div className="header-subtitle">
            <h2>Chat with the most brilliant innovator of our time.</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea 
          placeholder="Ask Steve Anything.." 
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
          />
 <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Ask</p>}
    </div>
  </a>
</div>
            {/* New code I added here */}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Reply</h3>
      </div>
    </div>
    <div className="output-header-container prompt-container-output">
      <textarea
      className="prompt-box"
      value={apiOutput}
      />
    </div>
  </div>
)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          {/* <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div> */}
        </a>
      </div>
    </div>
  );
};

export default Home;
