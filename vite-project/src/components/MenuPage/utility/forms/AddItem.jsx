import { useState, useEffect } from "react";
import { menuCategories } from "../menu/menu-categories";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItemThunk } from "../../../../store/menus";


export function AddItem() {
  const dispatch = useDispatch()

  // const user = useSelector(state => state.session.user)

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

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors([]);
    // const newMenuItem = {
    //   name,
    //   category,
    //   file,
    //   ingredients,
    //   nutrition,
    //   price,
    // };

    const newMenuItem = new FormData()
    newMenuItem.append("name", name)
    newMenuItem.append('image', image)
    newMenuItem.append('category', category)
    newMenuItem.append('price', price)
    newMenuItem.append('ingredient_name', currentIngredients)
    newMenuItem.append('nutrient', nutrient)
    newMenuItem.append('weight', weight)
    newMenuItem.append('percentage', percentage)


    //make database call here
    //handle errors here
    if (!errors.length) {
      const data = await dispatch(createMenuItemThunk(newMenuItem))

    }
    //do something on success
    // console.log(newMenuItem);
  }

  const onImageChange = (e) => {
    // const file = e.target.files[0];

    setPreview(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.value)

    // setPreview(URL.createObjectURL(e.target.value))
  }

  const handleIngredients = () => {
    if (!currentIngredients) return
    const tempIngredients = [...ingredients, ...currentIngredients.split(", ")]
    setCurrentIngredients("")
    setIngrediants(tempIngredients)
  }

  const deleteIngredients = (e) => {
    const tempIngredients = [...ingredients]
    console.log(tempIngredients[e.target.id])
    tempIngredients.splice(e.target.id, 1)
    setIngrediants(tempIngredients)
  }

  return (
    <div className="w-full max-w-lg m-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col m-auto space-y-6 mb-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-3">
          <label htmlFor="item-name">Item Name:</label>
          <input
            className="bg-gray-100 rounded text-center h-10 txt-lg"
            id="item-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name must be between 3 and 25 charaters"
            minLength="3"
            maxLength="25"
            required
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label htmlFor="category">Category:</label>
          <select
            className="bg-gray-100 rounded text-center h-10 txt-lg first:text-green-400"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option
              value=""
              disabled
              hidden
            >
              Choose items category
            </option>
            {menuCategories.map(category => {
              return (
                <option key={`add-${category}`} value={category}>{category}</option>
              )
            })}
          </select>
        </div>
        <div className="flex flex-col space-y-3">
          <label htmlFor="image">Upload an Image:</label>
          <input
            className="bg-gray-100 rounded text-center h-10 txt-lg"
            id="image"
            type="file"
            value={file}
            onChange={onImageChange}
            accept="image/*"
            required
          />
        </div>
        <div className="rounded-lg overflow-hidden m-auto">
          {preview && <img className="h-40 w-32 object-cover" src={preview} alt="preview" />}
        </div>
        <div className="flex flex-col space-y-3">
          <label htmlFor="image">Enter Ingredients:</label>
          <input
            className="bg-gray-100 rounded text-center h-10 txt-lg"
            id="item-name"
            type="text"
            value={currentIngredients}
            onChange={(e) => setCurrentIngredients(e.target.value)}
            onBlur={handleIngredients}
            placeholder="Enter your ingredients seperated by a comma"
            required
          />
        </div>

        <div className="grid grid-cols-3 align-between" >
          <div className="text-lg">Current Ingredients:</div>
          <div></div>
          <div></div>
          {ingredients.length !== 0 && ingredients.map((ingredient, i) => {
            return (
              <div className="flex space-x-1" key={`ing-${ingredient}`}>
                <div className="text-lg" id={i}>{ingredient}</div>
                <div className="overflow-hidden" onClick={deleteIngredients} id={i}>
                  <img id={i} className="h-3 w-3" src="/images/x.png"></img>
                </div>
              </div>)
          })}

        </div>
      </form>
    </div>
  );
}
