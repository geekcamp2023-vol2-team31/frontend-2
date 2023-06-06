import { Meta, StoryObj } from '@storybook/react';
import IdeaListItem from './IdeaListItem';

const meta: Meta<typeof IdeaListItem> = {
  component: IdeaListItem,
  decorators: [
    (Story) => (
      <div style={{ background: 'gray', padding: '100px' }}>
        <div style={{ background: 'gray', margin: '3em' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}
export default meta;

export const Default: StoryObj<typeof IdeaListItem> = {};
Default.args = {
  id: '1',
  value: 'test',
  onChangeCheckbox: undefined,
};

export const Emphasized: StoryObj<typeof IdeaListItem> = {};
Emphasized.args = {
  id: '1',
  value: 'test',
  emphasized: true,
};

export const WithCheckbox: StoryObj<typeof IdeaListItem> = {};
WithCheckbox.args = {
  id: '1',
  value: 'test',
  checkboxValue: true,
};
