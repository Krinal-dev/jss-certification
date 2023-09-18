// Lib
import { snapshot, hasDataComponent, renderComponent } from 'lib/testing/utils';

// Local
import CardListWithTabs from './CardListWithTabs';
import defaultData, { noData } from './CardListWithTabs.mock-data';

it('renders correctly', () => {
  const component = snapshot(CardListWithTabs, { componentProps: defaultData });
  hasDataComponent(component, 'authorable/general/CardListWithTabs');
});

it('does not render without data', () => {
  const component = renderComponent(CardListWithTabs, { componentProps: noData });
  const text = component.queryByTestId('CardListWithTabs');
  expect(text).toBe(null);
});
