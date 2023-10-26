import { useState, useEffect } from "react";
import { menuCategories } from "../menu/menu-categories";

export function AddItem() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("")
  const [currentIngredients, setCurrentIngredients] = useState("")
  const [ingredients, setIngrediants] = useState([""]);
  const [nutrition, setNutrition] = useState([]);
  const [price, setPrice] = useState(4);
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors([]);
    const newMenuItem = {
      name,
      category,
      file,
      ingredients,
      nutrition,
      price,
    };
    //make database call here
    //handle errors here
    if (errors.length) {
      //do the thing
    }
    //do something on success
    console.log(newMenuItem);
  }

  const onImageChange = (e) => {
    // const file = e.target.files[0];

    setPreview(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.value)

    // setPreview(URL.createObjectURL(e.target.value))
  }

 const handleIngredients = () => {
   if(!currentIngredients) return
    const tempIngredients = [...ingredients, ...currentIngredients.split(", ")]
    setCurrentIngredients("")
    setIngrediants(tempIngredients)

    // setIngrediants(tempIngredients)
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
            { preview && <img className="h-40 w-32 object-cover" src={preview} alt="preview" /> }
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
            <div className="">Current Ingrediants:</div>
            <div></div>
            {ingredients && ingredients.map(ingredient => <div key={`ing-${ingredient}`}>{ingredient}</div>)}
        </div>
      </form>
    </div>
  );
}
