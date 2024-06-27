import { useState } from "react";

/**
 * Renders a category selector component.
 *
 * @component
 * @param {Object[]} categories - The list of categories.
 * @param {Function} onCategorySelect - The function to handle category selection.
 * @returns {JSX.Element} The category selector component.
 */
const CategorySelector = ({ categories, onCategorySelect }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedParent, setExpandedParent] = useState(null);

  const generateCategoryId = (parentCategory, section, category) => {
    return `${parentCategory.id}_${section.id}_${category.name}`;
  };

  const handleCategorySelect = (parentCategory, section, category) => {
    const newSelectedCategories = [parentCategory.name, section.name, category.name];
    const categoryId = generateCategoryId(parentCategory, section, category);
    setSelectedCategories([categoryId]);
    onCategorySelect(newSelectedCategories);
  };

  const toggleParentCategory = (parentId) => {
    setExpandedParent(expandedParent === parentId ? null : parentId);
  };

  const getCategoryDisplayNames = (categoryId) => {
    const [parentId, sectionId, itemName] = categoryId.split('_');
    const parentCategory = categories.find(cat => cat.id === parentId);
    const section = parentCategory.sections.find(sec => sec.id === sectionId);
    return [parentCategory.name, section.name, itemName];
  };

  return (
    <div>
      <div className="flex space-x-2">
        {selectedCategories.map((categoryId, index) => {
          const displayNames = getCategoryDisplayNames(categoryId);
          return (
            <div key={index} className="p-2 border rounded">
              {displayNames.join(' > ')}
            </div>
          );
        })}
      </div>
      <div>
        {categories.map((parentCategory) => (
          <div key={parentCategory.id}>
            <button
              onClick={() => toggleParentCategory(parentCategory.id)}
              className="p-2 border rounded mb-2 w-full text-left"
            >
              {parentCategory.name}
            </button>
            {expandedParent === parentCategory.id && (
              <div className="pl-4">
                {parentCategory.sections.map((section) => (
                  <div key={section.id}>
                    <h4 className="font-bold">{section.name}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {section.items.map((item, index) => {
                        const categoryId = generateCategoryId(parentCategory, section, item);
                        return (
                          <button
                            key={index}
                            onClick={() => handleCategorySelect(parentCategory, section, item)}
                            className={`p-2 border rounded ${
                              selectedCategories.includes(categoryId) ? "bg-black text-white" : ""
                            }`}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;