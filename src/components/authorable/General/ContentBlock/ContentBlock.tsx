// import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

// Local
import RichTextA11yWrapper from 'components/helpers/RichTextA11yWrapper/RichTextA11yWrapper';

// Iideally, all this is from generated Typescript code from Sitecore and we're
// not manually defining types.
interface Fields {
  text: Field<string>;
}

export type ContentBlockProps = {
  rendering: { componentName: string };
  params: { [key: string]: string };
  fields: Fields;
};

const ContentBlock = ({ fields }: ContentBlockProps): JSX.Element => {
  // Fail out if fields aren't present
  if (fields === null || fields === undefined) {
    return <></>;
  }
  return (
    <div
      className="p-2 border border-b-4 border-gray-dark bg-gray-light rounded max-w-lg"
      data-component="authorable/general/contentblock"
      data-testid="contentblock"
    >
      <p className="font-bold">ContentBlock</p>
      <RichTextA11yWrapper data-testid="contentblock" field={fields.text} editable />
    </div>
  );
};

// @todo: Figure out how to mock isPageEditing, or if it even matters, in Storybook.
// export default withDatasourceCheck()<ContentBlockProps>(ContentBlock);
export default ContentBlock;