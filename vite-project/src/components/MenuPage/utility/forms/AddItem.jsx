import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItemThunk } from "../../../../store/menus";
import { useNavigate } from "react-router-dom";
import './AddItem.css'

export function AddItem() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("")
  const [currentIngredients, setCurrentIngredients] = useState("")
  const [ingredients, setIngrediants] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false)
  const [image, setImage] = useState("")
  const [nutrient, setNutrient] = useState("")
  const [weight, setWeight] = useState("")
  const [percentage, setPercentage] = useState("")
  const [nutrientEntries, setNutrientEntries] = useState([{ nutrient: '', weight: '', percentage: '' }]);


  const addNutrientEntry = () => {
    setNutrientEntries([...nutrientEntries, { nutrient: '', weight: '', percentage: '' }]);
  };

  const removeNutrientEntry = (index) => {
    const updatedEntries = [...nutrientEntries];
    updatedEntries.splice(index, 1);
    setNutrientEntries(updatedEntries);
  };

  const handleNutrientChange = (e, index) => {
    const updatedEntries = [...nutrientEntries];
    updatedEntries[index].nutrient = e.target.value;
    setNutrientEntries(updatedEntries);
  };

  const handleWeightChange = (e, index) => {
    const updatedEntries = [...nutrientEntries];
    updatedEntries[index].weight = e.target.value;
    setNutrientEntries(updatedEntries);
  };

  const handlePercentageChange = (e, index) => {
    const updatedEntries = [...nutrientEntries];
    updatedEntries[index].percentage = e.target.value;
    setNutrientEntries(updatedEntries);
  };

  async function handleSubmit(e) {
    e.preventDefault();



    const newMenuItem = new FormData()
    newMenuItem.append("name", name)
    newMenuItem.append('image', image)
    newMenuItem.append('category', category)
    newMenuItem.append('price', price)
    newMenuItem.append('ingredient_name', currentIngredients)



    const nutrientArray = [];
    const weightArray = [];
    const percentageArray = [];

    nutrientEntries.forEach((entry) => {
      nutrientArray.push(entry.nutrient);
      weightArray.push(entry.weight);
      percentageArray.push(entry.percentage);
    });

    newMenuItem.append(`nutrient`, nutrientArray);
    newMenuItem.append(`weight`, weightArray);
    newMenuItem.append(`percentage`, percentageArray);



    if (!errors.length) {
      const data = await dispatch(createMenuItemThunk(newMenuItem))
      navigate("/menu")
    }
  }

  return (
    <div className="add-item-form">
      <form class="w-full max-w-lg" onSubmit={handleSubmit}>
        <h1 id="form-title">ADD MENU ITEM FORM</h1>
        <div class="flex-col flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
            {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Image
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Image..." value={image}
              onChange={(e) => setImage(e.target.value)} />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Category
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Category..." value={category}
              onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Price
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Price..." value={price}
              onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Ingredient
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Separated by ',' without spacing" value={currentIngredients}
              onChange={(e) => setCurrentIngredients(e.target.value)} />
            <p class="text-gray-600 text-xs italic">For example: Milk,Egg,Sugar</p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Nutritient Fields
            </label>
            {nutrientEntries.map((entry, index) => (<div key={index} class="relative">
              <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={entry.nutrient} onChange={(e) => handleNutrientChange(e, index)}>
                <option value="">Select Nutrient</option>
                <option value="Fat">Fat</option>
                <option value="Carb">Carb</option>
                <option value="Protein">Protein</option>
              </select>
              <div class={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ${entry.nutrient ? 'hide-svg' : ''}`}>
                <svg class="fill-current w-4 w-6 mb-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
              {entry.nutrient && (
                <div>
                  <input
                    class="appearance-none mt-4 block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    placeholder="Weight..."
                    type="text"
                    value={entry.weight}
                    onChange={(e) => handleWeightChange(e, index)}
                  />
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    placeholder="Percentage..."
                    type="text"
                    value={entry.percentage}
                    onChange={(e) => handlePercentageChange(e, index)}
                  />
                </div>
              )}
              <button className="red-btn-add" type="button" onClick={() => removeNutrientEntry(index)}>Remove</button>
            </div>))}
            <button className="green-btn-add" type="button" onClick={addNutrientEntry}>Add Nutrient Field</button>
          </div>
        </div>
        <button className="blue-btn-add" type="submit">Submit</button>
      </form >
    </div >
  )
}
