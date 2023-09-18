// import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Link, NextImage, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { cardFields, cardList } from './CardListWithTabs';
// Local

const Cards = ({ cards }: cardFields): JSX.Element => {
  const sortedCardData = [...cards].sort(
    (a, b) => new Date(b.fields.date.value).getTime() - new Date(a.fields.date.value).getTime()
  );

  const formateDate = (date: string) => {
    const formatedDate = new Date(date).toLocaleDateString('en-us', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

    return formatedDate;
  };

  return (
    <div className="flex flex-row flex-wrap">
      {sortedCardData.map((item: cardList) => (
        <div key={item.id} className="p-5">
          <div className="rounded overflow-hidden shadow-lg flex bg-gray-200">
            <div className="px-6 py-4 h-5/6 w-96">
              <NextImage field={item.fields.image} className="h-40 w-60" />
              <div className="flex flex-row flex-wrap">
                {item.fields.categories.map((category) => (
                  <Text
                    key={category.id}
                    className="mt-4 bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                    field={category.fields.category}
                    tag="span"
                  />
                ))}
              </div>

              <div className="text-gray-700 mt-4">
                <span> {formateDate(item?.fields?.date?.value)} </span>
              </div>

              <Text field={item.fields.title} tag="h1" className="text-2xl text-gray-700 mt-4" />
              <RichText field={item.fields.subTitle} tag="div" className=" text-gray-500 mb-4" />
              <RichText
                field={item.fields.description}
                tag="div"
                className="text-gray-500 mb-4 text-xs"
              />

              <Link
                field={item.fields.cta}
                className=" text-blue-500 rounded-2xl hover:text-blue-700"
              />
              <div className="mt-6 flex justify-between">
                <Link
                  field={item.fields.link}
                  className="bg-sky-700 p-2 text-center rounded-2xl hover:bg-sky-800"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
