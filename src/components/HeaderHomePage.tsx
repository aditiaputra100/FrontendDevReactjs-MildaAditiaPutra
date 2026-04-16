import { useEffect, useState } from "react";
import { fetchCategories } from "../services/categories";

interface HeaderHomePageProps {
  isOpenFilter: boolean;
  onIsOpenFilterChange: (value: boolean | null) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (priceRange: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function HeaderHomePage({
  isOpenFilter,
  onIsOpenFilterChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedCategory,
  onCategoryChange
}: HeaderHomePageProps) {
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

  const isAnyFilterActive = isOpenFilter || selectedPriceRange !== "" || selectedCategory !== ""

  return (
    <header className="header-home-page">
      <h1>Restaurants</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque cupiditate dignissimos maiores nihil beatae. In, sequi eum incidunt eligendi corporis voluptatibus, iusto harum tempora accusantium rerum deleniti, officia enim sapiente.
      Excepturi culpa impedit distinctio soluta consectetur rerum quidem? Hic sed eos nihil, illum quisquam modi? Perspiciatis beatae, fugit quos ullam cupiditate deserunt quam. Ipsa cum, iste dignissimos beatae animi rem?</p>

      <div className="header-filter">
        <div className="header-filter-input">
            <span>Filter By:</span>
            <div className="input-group outlined">
                <input type="radio" id="status" name="status" checked={isOpenFilter} onClick={() => onIsOpenFilterChange(!isOpenFilter)} onChange={() => {}} />
                <label htmlFor="status">Open Now</label>
            </div>
            <select className="outlined" name="price" id="price" value={selectedPriceRange} onChange={(e) => onPriceRangeChange(e.target.value)}>
                <option value="">Price</option>
                <option value="min">Min</option>
                <option value="max">Max</option>
            </select>
            <select className="outlined" name="categories" id="categories" value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
                <option value="">Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>{category}</option>
                ))}
            </select>
        </div>
        <div>
            <button 
              className={`outlined ${!isAnyFilterActive ? "disabled" : ""}`}
              disabled={!isAnyFilterActive}
              onClick={() => {
                onIsOpenFilterChange(null)
                onPriceRangeChange("")
                onCategoryChange("")
              }}
            >
              Clear All
            </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderHomePage