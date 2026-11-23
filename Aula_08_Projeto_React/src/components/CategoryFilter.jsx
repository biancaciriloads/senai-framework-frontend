export default function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="category-list" role="group" aria-label="Filtrar por categoria">
      {categories.map((category) => (
        <button
          className={`category-button${activeCategory === category ? ' is-active' : ''}`}
          type="button"
          key={category}
          aria-pressed={activeCategory === category}
          onClick={() => onChange(category)}
        >
          {category === 'Favoritos' && <span aria-hidden="true">♡</span>}
          {category}
        </button>
      ))}
    </div>
  );
}
