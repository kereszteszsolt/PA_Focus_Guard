<script>
export default {
  props: {
    funcTitle: {
      type: String,
      required: true
    },
    funcName: {
      type: String,
      required: true
    },
    storageName: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<template>
  {{ funcName }} <br/>
  {{ funcTitle }} <br/>
  {{ storageName }} <br/>
  <div class="urlList">
    <table>
      <thead>
      <tr>
        <th>URL</th>
        <th>Enabled</th>
        <th>Permanent</th>
        <th>Remove</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in data" v-bind:key="item.url">
        <td>{{ item.url }}</td>
        <td>
          <label class="checkbox">
            <input type="checkbox" :id="item.url" :checked="item.isEnabled"/>
          </label>
        </td>
        <td>
          <label class="checkbox">
            <input type="checkbox" :id="item.url" :checked="item.isPermanent"/>
          </label>
        </td>
        <td>
          <button>X</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

.urlList {
  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background-color: lighten($fg-primary-color, 10%);
      color: floralwhite;
    }

    th, td {
      //border: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 5px;

      &:first-child {
        font-weight: bold;
        font-size: 14px;
        width: 100%;
      }

      &:nth-child(2) {
        text-align: center;
        width: 24px;
      }

      &:nth-child(3) {
        text-align: center;
        width: 24px;
      }

      &:last-child {
         text-align: center;
          width: 48px;
      }
    }
  }
}

input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 2px;
  cursor: pointer;
  margin: 2px auto -2px auto;
  transition: background-color 0.3s ease;

  &:checked {
    background-color: $fg-primary-color;
  }

  &:checked:hover {
    background-color: darken($fg-primary-color, 10%);
  }

  &:checked:before {
    content: '';
    display: block;
    width: 4px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin: 3px auto -3px auto;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
}

button {
  background-color: $fg-danger-color;
  color: floralwhite;
  font-weight: bolder;
  border: none;
  padding: 8px 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($fg-danger-color, 10%);
  }
}
</style>
