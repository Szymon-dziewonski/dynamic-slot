<template>
  <div :class="['overflow-x-auto', wrapperClass]" v-bind="attrsWithoutClass">
    <table :class="twMergeVue('w-full border-gray-200 border-b', $attrs.class)">
      <thead v-if="headingPairs?.length" class="bg-gray-100">
        <tr class="text-sm text-left [&>th]:py-2 [&>th]:px-3">
          <th v-if="counter" scope="col" class="!px-0 w-[36px]">
            <span class="block w-[24px]"></span>
          </th>
          <!-- variant for object table -->
          <template v-for="(headingPair, index) in headingPairs" :key="index">
            <!-- user can target via named slot with heading.key  -->
            <slot
              :name="`th-${headingPair.key}`"
              v-bind="{
                headingPair,
                index,
                bindings: thBindings(headingPair),
              }"
            >
              <!-- general access and then user can filter data -->
              <slot
                name="th"
                v-bind="{
                  headingPair,
                  index,
                  bindings: thBindings(headingPair),
                }"
              >
                <th v-bind="thBindings(headingPair)">
                  {{ headingPair.heading }}
                </th>
              </slot>
            </slot>
          </template>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 text-xs">
        <template v-for="(item, itemIndex) in items" :key="itemIndex">
          <tr class="[&>td]:px-3">
            <td v-if="counter" class="!pr-0 text-right w-[24px]">
              {{ itemIndex + 1 }}.
            </td>
            <!-- variant for object table -->
            <template v-if="typeof item === 'object'">
              <template
                v-for="(headingPair, headingIndex) in headingPairs"
                :key="headingIndex"
              >
                <!-- user can target via named slot with heading.key  -->
                <slot
                  :name="`td-${headingPair.key}`"
                  v-bind="{
                    headingPair,
                    item,
                    itemIndex,
                    bindings: tdBindings(headingPair),
                  }"
                >
                  <!-- general access and then user can filter data -->
                  <slot
                    name="td-object"
                    v-bind="{
                      headingPair,
                      item,
                      itemIndex,
                      bindings: tdBindings(headingPair),
                    }"
                  >
                    <td v-bind="tdBindings(headingPair)">
                      {{ !!headingPair.key && item[headingPair.key] }}
                    </td>
                  </slot>
                </slot>
              </template>
              <slot
                name="td-action"
                v-bind="{
                  item,
                  index: itemIndex,
                  bindings: tdBindings(),
                }"
              />
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup generic="TItems extends Record<string, unknown>[]">
import {
  twMergeVue,
  useTwMergeRoot,
} from "@/composables/useTwMergeRoot/useTwMergeRoot";

export type HeadingPair = {
  heading?: string; // heading name displayed in the table header
  key: string; // item key property assigned to the column
  thClass?: string; // optional class for the th column
  tdClass?: string; // optional class for the td element
};

type ObjectItemsProps = {
  headingPairs?: HeadingPair[]; //pair heading name and item property assigned to its column
  items?: TItems;
  counter?: boolean; // if true, adds a counter column to the table
  // In order to enable sticky headers:
  // 1. Set stickyHeaders to true
  // 2. Set max-height via wrapperClass prop, e.g. 'max-h-[calc(100vh-400px)]'.
  // This is required to ensure that the table is scrollable. It won't work without it as we're using overflow-x-auto on the wrapper in order to enable horizontal scrolling.
  stickyHeaders?: boolean;
  wrapperClass?: string;
};

defineOptions({ inheritAttrs: false });
const { items, stickyHeaders = false } = defineProps<ObjectItemsProps>();
const { attrsWithoutClass } = useTwMergeRoot();

const thBindings = (headingPair?: HeadingPair) => {
  // bindings with defaults
  return {
    scope: "col",
    class: twMergeVue(
      "font-semibold whitespace-nowrap",
      stickyHeaders ? "sticky top-0 bg-gray-100" : "",
      headingPair?.thClass
    ),
  };
};

const tdBindings = (headingPair?: HeadingPair) => {
  // bindings with defaults
  return {
    class: twMergeVue(
      "whitespace-nowrap text-left font-normal",
      headingPair?.tdClass
    ),
  };
};
</script>
