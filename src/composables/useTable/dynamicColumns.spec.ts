import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { placeDynamicColumns } from './dynamicColumns';

describe('placeDynamicColumns', () => {
  describe('when add one column at the beginning', () => {
    it('should correctly place the column at the beginning', () => {
      const dynamicColumnsItems = [{ key: 'column1', heading: 'Column 1', first: true }];
      const tableHeadings = [{ key: 'column2', heading: 'Column 2' }];

      placeDynamicColumns(dynamicColumnsItems, dynamicColumnsItems, tableHeadings);
      expect(tableHeadings).toEqual([
        { key: 'column1', heading: 'Column 1' },
        { key: 'column2', heading: 'Column 2' },
      ]);
    });
  });

  describe('when add one column at the end', () => {
    it('should correctly place the column at the end of the table', () => {
      const dynamicColumnsItems = [{ key: 'column1', heading: 'Column 1' }];
      const tableHeadings = [{ key: 'column2', heading: 'Column 2' }];

      placeDynamicColumns(dynamicColumnsItems, dynamicColumnsItems, tableHeadings);
      expect(tableHeadings).toEqual([
        { key: 'column2', heading: 'Column 2' },
        { key: 'column1', heading: 'Column 1' },
      ]);
    });
  });

  describe('when add one column in the middle', () => {
    it('should correctly place the column in the middle of the table', () => {
      const dynamicColumnsItems = [{ key: 'new', heading: 'new column', previous: 'column1' }];
      const tableHeadings = [
        { key: 'column1', heading: 'Column 1' },
        { key: 'column2', heading: 'Column 2' },
      ];

      placeDynamicColumns(dynamicColumnsItems, dynamicColumnsItems, tableHeadings);
      expect(tableHeadings).toEqual([
        { key: 'column1', heading: 'Column 1' },
        { key: 'new', heading: 'new column' },
        { key: 'column2', heading: 'Column 2' },
      ]);
    });
  });

  describe('when add 2 items from selected list', () => {
    it('should iterate through the items and place them in the correct order', () => {
      const dynamicColumnsItems = [
        { key: 'new', heading: 'new column', previous: 'column1' },
        {
          key: 'new2',
          heading: 'new column 2',
          previous: 'new',
        },
        {
          key: 'new3',
          heading: 'new column 3',
          previous: 'new2',
        },
      ];
      const tableHeadings = [
        { key: 'column1', heading: 'Column 1' },
        { key: 'column2', heading: 'Column 2' },
      ];

      placeDynamicColumns([dynamicColumnsItems[0], dynamicColumnsItems[2]], dynamicColumnsItems, tableHeadings);
      expect(tableHeadings).toEqual([
        { key: 'column1', heading: 'Column 1' },
        { key: 'new', heading: 'new column' },
        { key: 'new3', heading: 'new column 3' },
        { key: 'column2', heading: 'Column 2' },
      ]);
    });
  });

  describe('when removing some element already existing and adding new one', () => {
    it('should clear table and then add new one', () => {
      const dynamicColumnsItems = [
        { key: 'new', heading: 'new column', previous: 'column1' },
        {
          key: 'new2',
          heading: 'new column 2',
          previous: 'new',
        },
        {
          key: 'new3',
          heading: 'new column 3',
          previous: 'new2',
        },
      ];
      const tableHeadings = [
        { key: 'column1', heading: 'Column 1' },
        {
          key: 'new3',
          heading: 'new column 3',
          previous: 'new2',
        },
        { key: 'column2', heading: 'Column 2' },
      ];

      placeDynamicColumns([dynamicColumnsItems[1]], dynamicColumnsItems, tableHeadings);
      expect(tableHeadings).toEqual([
        { key: 'column1', heading: 'Column 1' },
        { key: 'new2', heading: 'new column 2' },
        { key: 'column2', heading: 'Column 2' },
      ]);
    });
  });
});
