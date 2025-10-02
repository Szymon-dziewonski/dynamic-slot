import type { HeadingPair } from '@/components/atoms/PTable.vue';

type DynamicColumnItem = HeadingPair & { previous?: string; first?: boolean };

const findPreviousItem = (
  currentItem: DynamicColumnItem,
  allDynamicColumnsItems: DynamicColumnItem[],
  index: number,
  tableHeadings: HeadingPair[],
) => {
  if (index < 0) return allDynamicColumnsItems[0];
  const previousItem = tableHeadings.find(headingItem => headingItem.key === currentItem.previous);
  if (previousItem) return previousItem;
  return findPreviousItem(allDynamicColumnsItems[index - 1], allDynamicColumnsItems, index - 1, tableHeadings);
};

const createHeadingPair = ({ heading, key, tdClass, thClass }: DynamicColumnItem): HeadingPair => {
  return {
    heading,
    key,
    tdClass,
    thClass,
  };
};

export const placeDynamicColumns = (
  selectedItemKeys: DynamicColumnItem[],
  dynamicColumnsItems: DynamicColumnItem[],
  tableHeadings: HeadingPair[],
) => {
  dynamicColumnsItems.forEach(item => {
    const itemIndexInDynamiColumns = dynamicColumnsItems.findIndex(
      dynamicColumnItem => dynamicColumnItem.key === item.key,
    );

    const selectedItem = selectedItemKeys.find(selectedItemKey => selectedItemKey.key === item.key);
    const itemIndexInTableHeadings = tableHeadings.findIndex(headingItem => headingItem.key === item.key);
    if (itemIndexInTableHeadings >= 0) {
      tableHeadings.splice(itemIndexInTableHeadings, 1);
    }

    if (selectedItem) {
      if (selectedItem.first) {
        tableHeadings.unshift(createHeadingPair(item));
      } else if (selectedItem.previous) {
        const previousItem = findPreviousItem(
          selectedItem,
          dynamicColumnsItems,
          itemIndexInDynamiColumns,
          tableHeadings,
        );
        const previousItemIndex = tableHeadings.findIndex(headingItem => headingItem.key === previousItem?.key);
        tableHeadings.splice(previousItemIndex + 1, 0, createHeadingPair(item));
      } else {
        tableHeadings.push(createHeadingPair(item));
      }
    }
  });
};
