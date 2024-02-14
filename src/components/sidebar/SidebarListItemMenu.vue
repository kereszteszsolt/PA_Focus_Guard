<script lang="ts">
export default {
  name: 'SidebarListItemMenu',
  props: {
    listId: String,
    editItem: { type: Function, required: true },
    deleteItem: { type: Function, required: true },
    moveUp: { type: Function, required: true },
    moveDown: { type: Function, required: true }
  },
  setup() {
    return {
      //
    };
  }
};
</script>

<template>
  <v-btn icon size="small" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu location="end" activator="parent" open-on-hover>
      <v-list density="compact" class="list">
        <v-row>
          <v-col>
            <v-list-item @click="moveUp(listId)">
              <template v-slot:append>
                <v-btn icon size="small" variant="text">
                  <v-icon>mdi-arrow-up</v-icon>
                  <v-tooltip activator="parent" location="top">Move Up</v-tooltip>
                </v-btn>
              </template>
            </v-list-item>
          </v-col>
          <v-col>
            <v-list-item @click="moveDown(listId)">
              <template v-slot:append>
                <v-btn icon size="small" variant="text">
                  <v-icon>mdi-arrow-down</v-icon>
                  <v-tooltip activator="parent" location="top">Move Down</v-tooltip>
                </v-btn>
              </template>
            </v-list-item>
          </v-col>
          <v-col>
            <v-list-item @click="editItem(listId)">
              <template v-slot:append>
                <v-btn icon size="small" variant="text">
                  <v-icon>mdi-pencil</v-icon>
                  <v-tooltip activator="parent" location="top">Edit</v-tooltip>
                </v-btn>
              </template>
            </v-list-item>
          </v-col>
          <v-col>
            <v-list-item @click="deleteItem(listId)">
              <template v-slot:append>
                <v-btn icon size="small" variant="text">
                  <v-icon>mdi-delete</v-icon>
                  <v-tooltip activator="parent" location="top">Delete</v-tooltip>
                </v-btn>
              </template>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<style scoped lang="scss">
.list {

  > * {
    //row
    background-color: #0d47a1;
    padding: 4px 4px 4px 4px !important;
    > * {
      //col
      background-color: #ffeb3b;
      padding: 0px !important;

      > * {
        //list-item
        padding: 4px 4px 4px 4px !important;
        background-color: #00b0ff;
      }
    }

    > *:first-child {
      //col
    //  background-color: #ff3b93;
      padding-left: 8px !important;
    }

    > *:last-child {
      //col
      //  background-color: #ff3b93;
      padding-right: 8px !important;
    }
  }
}
</style>
