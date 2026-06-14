import type { UICategory } from '../api/categoryApi';

interface CategoryProps {
  categories: UICategory[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
}

export function CategoryCards({ categories, activeTab, setActiveTab, loading }: CategoryProps) {
  if (loading) {
    return (
      <div className="h-[140px] flex justify-center items-center text-forest font-bold">
        Loading categories from admin...
      </div>
    );
  }

  return (
    <div className="flex gap-[1rem] lg:gap-[1.5rem] overflow-x-auto pb-4 snap-x hide-scrollbar mb-[1.5rem]">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveTab(category.name)}
          className={`snap-center shrink-0 flex flex-col items-center justify-center p-[1rem] w-[130px] lg:w-[150px] h-[150px] lg:h-[180px] rounded-[24px] border transition-all duration-300 group ${
            activeTab === category.name
              ? 'bg-forest text-white border-forest shadow-[0_10px_25px_rgba(45,80,22,0.25)] -translate-y-2'
              : 'bg-white text-forest border-[#eee] hover:border-[#487c2f55] hover:shadow-lg hover:-translate-y-1'
          }`}
        >
          <span className="text-[3rem] lg:text-[3.5rem] mb-[0.8rem] transition-transform duration-300 group-hover:scale-110 drop-shadow-sm">
            {category.icon}
          </span>
          <span className="text-[0.75rem] lg:text-[0.85rem] font-black text-center uppercase tracking-[0.08em] leading-tight px-1">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}
