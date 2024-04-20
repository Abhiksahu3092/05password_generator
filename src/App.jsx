import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numallowed, setnumallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password, setpassword] = useState('')


  //a function is also called a method in js
  const setpasswordfunction = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numallowed) {
      str += '0123456789'
    }
    if (charallowed) {
      str += '!@#$%^&*()_+'
    }

    for (let i = 0; i < length; i++) {
      let temp = Math.floor(Math.random() * str.length);
      pass += str[temp];
    }

    setpassword(pass);

  }, [length, numallowed, charallowed, setpassword]);

  const passref = useRef(null);

  useEffect(() => {
    setpasswordfunction();
  }, [length, numallowed, charallowed, setpasswordfunction])

  const copypasswordref = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className='fixed flex flex-col justify-center items-center bottom-1/2 w-full inset-x-0  px-2'>
        <h1 className='text-5xl text-center text-blue-600'>Password Generator</h1>
        <br></br>
        <div className='flex flex-wrap justify-center gap-4 shadow-xl px-4 py-4 rounded-xl bg-gray-400 w-6/12'>
          <div className='flex shadow-md rounded-md overflow-hidden mb-3 w-full'>
            <input type='text' value={password} className='outline-none py-1 px-3 w-full' placeholder='password' readOnly ref={passref} ></input>
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copypasswordref}>Copy</button>
          </div>

          <div className='flex-row flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type='range' min={8} max={20} value={length} onChange={(e) => setlength(e.target.value)} className='cursor-pointer'></input>
              <label>Length: {length}</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input type='checkbox' defaultChecked={numallowed} onClick={() => setnumallowed(prev => !prev)}></input>
              <label>Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input type='checkbox' defaultChecked={charallowed} onClick={() => setcharallowed(prev => !prev)}></input>
              <label>Characters</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <button className='outline-none bg-blue-700 text-white p-2 shrink-0 rounded-md' onClick={setpasswordfunction}>Regenerate</button>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default App
