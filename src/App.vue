<script setup lang="ts">
import { ref } from "vue";
import PTable from "./Table.vue";
import PTooltip from "./PTooltip.vue";

const headings = ref([
  {
    heading: "Fastly",
    key: "instanceFastly",
    tdClass: "py-2 border-t border-t-gray-200",
    thClass: "z-1",
  },
  {
    heading: "Logs limit",
    key: "instanceLogsLimit",
    tdClass: "py-2 border-t border-t-gray-200",
    thClass: "z-1",
  },
]);

const itemsa = [
  {
    cxVisible: false,
    fastlyEnabled: true,
    logsRetentionDays: 11,
  },
  {
    cxVisible: true,
    fastlyEnabled: false,
    logsRetentionDays: 2,
  },
  {
    cxVisible: false,
    fastlyEnabled: true,
    logsRetentionDays: 3,
  },
];
const newColumn = {
  heading: "CI Visibility",
  key: "instanceCiVisibility",
  tdClass: "py-2 border-t border-t-gray-200",
  thClass: "z-1",
};

const addItem = () => {
  headings.value.unshift(newColumn);
};
</script>

<template>
  <div>
    <PTable :heading-pairs="headings" :items="itemsa">
      <!-- This is not working -->
      <template #td-instanceFastly="{ item, bindings }">
        <td v-bind="bindings">
          <PTooltip
            class="flex justify-center"
            :text="`Fastly ${item.fastlyEnabled ? 'enabled' : 'disabled'}`"
          >
            {{ item.fastlyEnabled }}
          </PTooltip>
        </td>
      </template>
      <template #td-instanceCiVisibility="{ item, bindings }">
        <td v-bind="bindings">
          <PTooltip
            class="flex justify-center"
            :text="`CI visibility ${item.cxVisible ? 'enabled' : 'disabled'}`"
          >
            {{ item.cxVisible }}
          </PTooltip>
        </td>
      </template>

      <template #td-instanceLogsLimit="{ item, bindings }">
        <td v-bind="bindings">
          {{ item.logsRetentionDays }}
        </td>
      </template>

      <!-- THIS works, when I build here all new columns -->
      <!-- <template #td-object="{ item, bindings, headingPair }">
        <td v-bind="bindings" v-if="headingPair.key === 'instanceFastly'">
          <PTooltip
            class="flex justify-center"
            :text="`Fastly ${item.fastlyEnabled ? 'enabled' : 'disabled'}`"
          >
            {{ item.fastlyEnabled }}
          </PTooltip>
        </td>
        <td v-bind="bindings" v-if="headingPair.key === 'instanceCiVisibility'">
          <PTooltip
            class="flex justify-center"
            :text="`CI visibility ${item.cxVisible ? 'enabled' : 'disabled'}`"
          >
            {{ item.cxVisible }}
          </PTooltip>
        </td>

        <td v-bind="bindings" v-if="headingPair.key === 'instanceLogsLimit'">
          {{ item.logsRetentionDays }}
        </td>
      </template> -->
    </PTable>

    <button class="border" @click="addItem">Add Item</button>
  </div>
</template>
