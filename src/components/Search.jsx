import {useState} from 'react'
import {useGlobalContext} from '../context'

const Search = () => {
  return <header className="search-container">
    <form>
      <input type="text" placeholder='type favorite meal' className='form-input'/>
      <button type="submit" className='btn'>search</button>
      <button type="submit" className='btn btn-hipster'>surprise me</button>
    </form>
    </header>
}

export default Search