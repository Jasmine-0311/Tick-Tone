import { useSearchParams } from 'react-router-dom';

const Category = ({ categories }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get('category');
   
  const handleCategory = (name) => {
    if(!name){setSearchParams({});}else{
    setSearchParams({ category: name, page: 1 });}
  };

  return (
    <>
      {/* 行動裝置 */}
      <div className="d-block d-md-none mb-3">
        <select 
          className="form-select body3" 
          value={currentCategory || ''} 
          onChange={(e) => handleCategory(e.target.value)}
        >
          <option value="">全部商品</option>
          {categories.map(catName => (
            <option key={catName} value={catName}>{catName}</option>
          ))}
        </select>
      </div>

      {/* 桌面 */}
      <section className="category-card shadow-sm d-none d-md-block" 
               style={{ width: '100%', maxWidth: '280px', borderRadius: '12px', overflow: 'hidden' }}>
        <div className="bg-secondary text-white text-center py-3 body2">
          商品分類
        </div>
        <ul className="list-unstyled mb-0">
          <li className={`px-4 py-3 border-bottom 
           ${!currentCategory ? 'text-secondary fw-bold' : ''}`} 
           onClick={() => handleCategory('')} >
      全部商品
    </li>

        {categories.map((catName) => (
          <li key={catName}
              className={`px-4 py-3 border-bottom cursor-pointer
                 ${currentCategory === catName ? 'text-secondary fw-bold' : ''}`}
              onClick={() => handleCategory(catName)}>
            {catName}
          </li>
        ))}
        </ul>
      </section>
    </>
  );
};

export default Category;