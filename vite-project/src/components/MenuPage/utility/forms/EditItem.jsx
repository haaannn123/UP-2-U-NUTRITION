import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../../../context/Modal';
import { editMenuItemThunk, getAllMenuItemThunk } from '../../../../store/menus';
import './AddItem.css'

const EditItem = ({ menu_item }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()
    const menuItemObj = useSelector(state => state.menuReducer)
    const user = useSelector(state => state.session.user)


    const [name, setName] = useState(menu_item?.name || "");
    const [category, setCategory] = useState(menu_item?.category || "");
    const [price, setPrice] = useState(menu_item?.price || "");
    const [image, setImage] = useState(menu_item?.image || "")
    const [ingredients, setIngredients] = useState(
        menu_item?.ingredients.map(ingredient => ingredient.ingredient_name).join(',') || ''
    );
    const [nutrientEntries, setNutrientEntries] = useState(
        menu_item?.nutritions || [{ nutrient: '', weight: '', percentage: '' }]
    );

    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState('');

    useEffect(() => {
        const error = {}

        if (!name) error.name = "Name is required"
        if (!category) error.category = "Category is required"
        if (!price) error.price = "Price is required"
        if (!image) error.image = "Image is required"

        if (!ingredients) error.ingredients = "Ingredient is required"
        nutrientEntries.forEach((entry, index) => {
            if (!entry.nutrient) error[`nutrient${index}`] = `Nutrient #${index + 1} is required`;
            if (!entry.weight) error[`weight${index}`] = `Weight #${index + 1} is required`;
            // if (!entry.percentage) error[`percentage${index}`] = `Percentage #${index + 1} is required`;
        });


        setErrors(error);

    }, [name, category, price, image, nutrientEntries, ingredients])


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

    // const handlePercentageChange = (e, index) => {
    //     const updatedEntries = [...nutrientEntries];
    //     updatedEntries[index].percentage = e.target.value;
    //     setNutrientEntries(updatedEntries);
    // };

    // console.log("________---------", menu_item)

    async function handleSubmit(e) {
        e.preventDefault();
        const updatedMenuItem = new FormData()
        updatedMenuItem.append("name", name)
        updatedMenuItem.append('image', image)
        updatedMenuItem.append('category', category)
        // console.log(typeof price)
        updatedMenuItem.append('price', price)
        updatedMenuItem.append('ingredient_name', ingredients)



        // console.log("========", nutrientEntries)
        const nutrientArray = [];
        const weightArray = [];
        // const percentageArray = [];

        nutrientEntries.forEach((entry) => {
            nutrientArray.push(entry.nutrient);
            weightArray.push(entry.weight);
            // percentageArray.push(entry.percentage);
        });


        updatedMenuItem.append(`nutrient`, nutrientArray);
        updatedMenuItem.append(`weight`, weightArray);
        // updatedMenuItem.append(`percentage`, percentageArray);

        // console.log("=========", errors)
        if (!Object.keys(errors).length) {
            const result = await dispatch(editMenuItemThunk(menu_item.id, updatedMenuItem));


            if (!result.errors) {
                closeModal();
                navigate('/menu');
            }
        }
    }

    return (

        <div className="edit-item-form">
            <form class="w-full max-w-lg" onSubmit={handleSubmit}>
                <h1 id="form-title">EDIT FORM</h1>
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
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Ingredient
                        </label>
                        <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="ingredients"
                            placeholder="Separated by ',' without spacing"
                            type="text"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
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
                                <option value="Calories">Calories</option>
                                <option value="Fat">Fat</option>
                                <option value="Carb">Carb</option>
                                <option value="Fiber">Fiber</option>
                                <option value="Protein">Protein</option>
                                <option value="Vitamins & Minerals">Vitamins & Minerals</option>
                                <option value="Caffeine">Caffeine</option>
                                <option value="Sugar">Sugar</option>

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

                                    {/* <input
                                     class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        placeholder="Percentage..."
                                        type="text"
                                        value={entry.percentage}
                                        onChange={(e) => handlePercentageChange(e, index)}

                                    /> */}

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
    );
};

export default EditItem

{/* <div>
    <form onSubmit={handleSubmit}>
        <div className="txt_field">
            <label>
                <div>Name <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
                <input
                    id="routine-description"
                    placeholder="Name..."
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                {errors.name && <span className="error">{errors.name}</span>}
            </label>
        </div>
        <div className="txt_field">
            <label>
                <div>Image <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
                <input
                    id="routine-description"
                    placeholder="Image..."
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                ></input>
                {errors.image && <span className="error">{errors.image}</span>}
            </label>
        </div>
        <div className="txt_field">
            <label>
                <div>Category <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
                <input
                    id="routine-description"
                    placeholder="Category..."
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                ></input>
                {errors.category && <span className="error">{errors.category}</span>}
            </label>
        </div>
        <div className="txt_field">
            <label>
                <div>Price <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
                <input
                    id="routine-description"
                    placeholder="Price..."
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                ></input>
                {errors.price && <span className="error">{errors.price}</span>}
            </label>
        </div>
        <div className="txt_field">
            <label>
                <div>Ingredients <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
                {ingredients.map((ingredient, index) => (
                    <input
                        key={index}
                        id={`ingredient-${index}`}
                        placeholder="Ingredient..."
                        type="text"
                        value={ingredient}
                        onChange={(e) => {
                            const updatedIngredients = [...ingredients];
                            updatedIngredients[index] = e.target.value;
                            setIngredients(updatedIngredients);
                        }}
                    />
                ))}
            </label>
        </div>
        <div className="txt_field">
            <label>
                <div>Nutrient Fields</div>
                {nutrientEntries.map((entry, index) => (
                    <div key={index}>
                        <select
                            value={entry.nutrient}
                            onChange={(e) => handleNutrientChange(e, index)}
                        >
                            <option value="">Select Nutrient</option>
                            <option value="Fat">Fat</option>
                            <option value="Carb">Carb</option>
                            <option value="Protein">Protein</option>
                        </select>
                        {entry.nutrient && (
                            <div>
                                <input
                                    id="routine-description"
                                    placeholder="Weight..."
                                    type="text"
                                    value={entry.weight}
                                    onChange={(e) => handleWeightChange(e, index)}
                                />
                                <input
                                    id="routine-description"
                                    placeholder="Percentage..."
                                    type="text" // Change to type "number" for integer input
                                    value={entry.percentage}
                                    onChange={(e) => handlePercentageChange(e, index)}
                                />
                            </div>
                        )}
                        <button type="button" onClick={() => removeNutrientEntry(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addNutrientEntry}>Add Nutrient Field</button>
            </label>
        </div>
        <button type="submit">Submit</button>
    </form>
</div> */}
