import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, Setlength] = useState(6)
  const [numberAllowed, Setnumber] = useState(false);
  const [charecterallowed, Setcharecter] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass = " "
    let str = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) str += "0123456789"
    if (charecterallowed) str += "@#$%^&*()_+"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }


    setpassword(pass)

  }, [length, numberAllowed, charecterallowed, setpassword])


  const copypassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
   },
    [password])

  useEffect(() => {
    passwordgenerator()

  }, [length, numberAllowed, charecterallowed, passwordgenerator]);
  return (
    <>

      <div className='w-full max-w-md  mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            placeholder="password"
            className=' outline-none w-full py-1 px-3 bg-white text-gray-700'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copypassword}
            className='outline-none bg-blue-700 cursor-pointer px-3 py-0.9 shrink-0 text-white'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer bg-gray-700 text-white'
              onChange={(e) => {
                Setlength(e.target.value)
              }} />
            <label className='text-white '>Length:{length}</label>
          </div>
          <div className=' flex items-center gap-x-1 text-white' >
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberAllowed'
              onChange={() => { Setnumber((prev) => !prev) }}

            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex item-center gap-x-1 text-white'>
            <input type="checkbox"
              defaultChecked={charecterallowed}
              id='charecterallowed'
              onChange={() => { Setcharecter((prev) => !prev) }}
            />
            <label htmlFor="charecterallowed">Charecter</label>
          </div>
        </div>

      </div>


    </>
  )
}

export default App
