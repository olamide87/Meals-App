import { useGlobalContext } from '../context'

const Favorites = () => {
  const {favorites, selectMeal, removeFromFavorties} = useGlobalContext()
  
  return <section className='favorites'>
    <div className="favorites-content">
      <h5>Favorties</h5>
      <div className="favorites-container">
        {favorites.map((item)=>{
    const {idMeal, strMealThumb:image} = item;

    return <div key={idMeal} className="favorite-item">
      <img src={image} className="favories-img img"/>
      <button className="remove-btn" onClick={()=>removeFromFavorites(idMeal)}>
        remove
      </button>
      
      
      </div>
        })}
        </div>
      </div>
      
  </section>
}

export default Favorites