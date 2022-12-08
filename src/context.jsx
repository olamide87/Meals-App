import React, { useContext, useEffect, useState } from 'react'
const AppContext = React.createContext()

import axios from 'axios'

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'




const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [meals, setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState([])
  const [favorites, setFavorites] = useState([]);



  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios(url)

      if(data.meals){
      
      setMeals(data.meals)
      }
      else {
        setMeals([])
      }


    } catch (error) {
      console.log(error.response)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])


  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavorites = (idMeal) => {
    console.log(idMeal)
    const meal = meals.find((meal)=>meal.idMeal === idMeal)
    const alreadyFavorite = favorites.find((meal)=>meal.idMeal === idMeal)
    if(alreadyFavorite) return
    const updatedFavorites =  [...favorites, meal];
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    
  }

    const removeFromFavorites = (idMeal) =>{
      const updatedFavorites = favorites.filter((meal)=> meal.idMeal !==idMeal);
      setFavorites(updatedFavorites)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }


  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

   const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

  const selectMeal = (idMeal, favoriteMeal) => {

    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal)
    }
    else {
      meal = meals.find((meal) => meal.idMeal === idMeal)
    }
    setSelectedMeal(meal);
    setShowModal(true);
  }

  useEffect(() => {
    fetchMeals(`${allMealsUrl}${searchTerm}`)
    
  }, [searchTerm])

  return ( 
    <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal, closeModal, showModal, addToFavorites,selectMeal, selectedMeal, removeFromFavorites, favorites }}>
    {children}
  </AppContext.Provider>
)
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}



export { AppContext, AppProvider }
