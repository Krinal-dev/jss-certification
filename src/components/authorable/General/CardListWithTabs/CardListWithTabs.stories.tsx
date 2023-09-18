// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import CardListWithTabs, { PrimaryCardListWithTabsProps } from './CardListWithTabs';
import defaultData from './CardListWithTabs.mock-data';

const meta: Meta<typeof CardListWithTabs> = {
  title: 'Authorable/General/CardListWithTabs',
  component: CardListWithTabs,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CardListWithTabs>;

export const Default: Story = {
  render: (args) => {
    return <CardListWithTabs {...(expandObj({ ...args }) as PrimaryCardListWithTabsProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};
