import { useEffect, useState } from "react";
import { fetchCategories } from "../services/categories";

function HeaderHomePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await fetchCategories()
        setCategories(categories)
        console.log(categories)
      } catch (error) {
        console.error(error)
      }
    }

    getCategories()
  }, [])

  return (
    <header className="header-home-page">
      <h1>Restaurants</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque cupiditate dignissimos maiores nihil beatae. In, sequi eum incidunt eligendi corporis voluptatibus, iusto harum tempora accusantium rerum deleniti, officia enim sapiente.
      Excepturi culpa impedit distinctio soluta consectetur rerum quidem? Hic sed eos nihil, illum quisquam modi? Perspiciatis beatae, fugit quos ullam cupiditate deserunt quam. Ipsa cum, iste dignissimos beatae animi rem?</p>

      <div className="header-filter">
        <div className="header-filter-input">
            <span>Filter By:</span>
            <div className="input-group outlined">
                <input type="radio" id="status" name="status" checked={isOpen} onClick={() => setIsOpen(!isOpen)} />
                <label htmlFor="status">Open Now</label>
            </div>
            <select className="outlined" name="price" id="price">
                <option value="">Price</option>
                <option value="min">Min</option>
                <option value="max">Max</option>
            </select>
            <select className="outlined" name="categories" id="categories">
                <option value="">Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>{category}</option>
                ))}
            </select>
        </div>
        <div>
            <button className="outlined">Clear All</button>
        </div>
      </div>
    </header>
  );
}

export default HeaderHomePage