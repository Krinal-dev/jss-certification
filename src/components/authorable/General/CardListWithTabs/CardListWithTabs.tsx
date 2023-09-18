// import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Field, ImageField, LinkField, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect, useState } from 'react';
import Cards from './Cards';

// Ideally, all this is from generated Typescript code from Sitecore and we're not manually defining types.
interface tabListFields {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    category: Field<string>;
  };
}
export type cardFields = {
  cards: cardList[];
};
export interface cardList {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: cardsFields;
}

export interface cardsFields {
  categories: {
    id: string;
    url: string;
    name: string;
    displayName: string;
    fields: {
      category: Field<string>;
    };
  }[];
  cta: LinkField;
  date: Field<string>;
  description: Field<string>;
  image: ImageField;
  link: LinkField;
  subTitle: Field<string>;
  title: Field<string>;
}

export type Fields = {
  title: Field<string>;
  variant: Field<string>;
  description: Field<string>;
  tabList: tabListFields[];
  cards: cardList[];
};

export type PrimaryCardListWithTabsProps = {
  rendering: { componentName: string };
  params: { [key: string]: string };
  fields: Fields;
};

const CardListWithTabs = ({ fields }: PrimaryCardListWithTabsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(fields?.tabList[0]?.name);
  const [filterdCards, setFilterCards] = useState(fields.cards);

  useEffect(() => {
    setCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Fail out if fields aren't present
  if (fields === null || fields === undefined) return <></>;

  const setCards = () => {
    const filteredCardArr: cardList[] = [];

    fields.cards.forEach((card) => {
      card.fields.categories.forEach((category) => {
        if (category.fields.category.value === activeTab) {
          filteredCardArr.push(card);
        }
      });
    });
    setFilterCards(filteredCardArr);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderTabs = () => {
    return fields?.tabList?.map((tab: tabListFields) => (
      <button
        key={tab.id}
        className={`p-4 rounded-md m-4 hover:bg-[#296860] ${
          activeTab === tab.name ? 'bg-[#244540]' : 'bg-[#71c7bb]'
        }`}
        onClick={() => handleTabClick(tab.name)}
      >
        {tab?.displayName}
      </button>
    ));
  };

  const tabsVariant = () => {
    if (fields.variant.value === 'primary') {
      return (
        <div className="p-4 ">
          <div className="flex flex-row justify-center">{renderTabs()}</div>
          <div className="mt-4">
            <Cards cards={filterdCards} />
          </div>
        </div>
      );
    } else if (fields.variant.value === 'secondary') {
      return (
        <div className="flex">
          <div className="flex flex-col">{renderTabs()}</div>
          <div className="mt-4">
            <Cards cards={filterdCards} />
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="mb-3">
        <Text
          field={fields.title}
          tag="h1"
          editable={true}
          className="text-center font-bold text-3xl pt-4 text-sky-400"
        />
        <RichText
          field={fields.description}
          tag="p"
          className="text-center font-bold p-4 text-sky-400"
        />
      </div>

      {tabsVariant()}
    </>
  );
};

// @todo: Figure out how to mock isPageEditing, or if it even matters, in Storybook.
// export default withDatasourceCheck()<ContentBlockProps>(ContentBlock);
export default CardListWithTabs;
