import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../../../context/Modal';
import { editMenuItemThunk, getAllMenuItemThunk } from '../../../../store/menus';


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
    const [ingredients, setIngredients] = useState(menu_item?.ingredients.map(ingredient => ingredient.ingredient_name) || ['']);
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
            if (!entry.percentage) error[`percentage${index}`] = `Percentage #${index + 1} is required`;
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

    const handlePercentageChange = (e, index) => {
        const updatedEntries = [...nutrientEntries];
        updatedEntries[index].percentage = e.target.value;
        setNutrientEntries(updatedEntries);
    };

    // console.log("________---------", ingredients)

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
        const percentageArray = [];

        nutrientEntries.forEach((entry) => {
            nutrientArray.push(entry.nutrient);
            weightArray.push(entry.weight);
            percentageArray.push(entry.percentage);
        });


        updatedMenuItem.append(`nutrient`, nutrientArray);
        updatedMenuItem.append(`weight`, weightArray);
        updatedMenuItem.append(`percentage`, percentageArray);

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
        <div>
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
        </div>
    );
};

export default EditItem
