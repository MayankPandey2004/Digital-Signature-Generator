import { useState } from 'react';
import './App.css';
import SignatureCanvas from 'react-signature-canvas';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 50px;
  justify-content: center;
  align-items: center;
`;

const CanvasArea = styled.div`
  width: 900px;
  height: 400px;
  border: 1px solid black;
  margin-top: 40px;
`;

const Selector = styled.div`
  display: flex;
  flex-direction: row;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  margin: 5px;
  padding: 15px;
  border-width: 0;
  border-radius: 5px;
  width: 100px;

  &:hover {
    background-color: gray;
    color: white;
    transition: background-color 0.3s ease-in;
}
`

function App() {
  const [signature, setSignature] = useState();
  const [result, setResult] = useState();
  const [penColor, setPenColor] = useState('Black');

  const clearHandler = () => {
    signature.clear();
    setResult(null);
  }

  const saveHandler = () => {
    const res = signature.getTrimmedCanvas().toDataURL('signature/png');
    setResult(res);
  }

  return (
    <AppContainer>
      <div>
        <h1>Create Your Own Digital Signature</h1>
      </div>
      <CanvasArea>
        <SignatureCanvas ref={(ref) => setSignature(ref)} backgroundColor='rgba(255,255,255,1)' penColor={penColor} canvasProps={{ width: 900, height: 400, className: 'sigCanvas' }} />
      </CanvasArea>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '900px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '225px' }}>
          <Button onClick={clearHandler}>
            Clear
          </Button>
          <Button onClick={saveHandler}>
            Save
          </Button>
        </div>
        <div>
          <Selector>
            <div style={{ borderRadius: '50%', backgroundColor: `${penColor}`, width: 20, height: '20px', marginRight: '5px' }} />
            <select value={penColor} onChange={(e) => setPenColor(e.target.value)}>
              <option value="Green">Green</option>
              <option value="Black">Black</option>
              <option value="Red">Red</option>
            </select>

          </Selector>
        </div>
      </div>
      <div>
        {
          result && (
            <div>
              <h2>Result</h2>
              <div style={{border: '1px dashed black', marginBottom: '40px'}}>
              <img src={result} alt='Result-Image' />
              </div>
            </div>
          )
        }
      </div>
    </AppContainer>
  );
}

export default App;
