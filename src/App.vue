<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="test">
      <h1>Radio Input</h1>
      <RadioGroup
        v-model="radioVal"
        :checkedIndex="-1"
        :labelId="radioGroupLabel.id"
        :labelText="radioGroupLabel.text"
        :radios="radioInputAry"
      />
    </div>
  </div>
</template>

<script>
import RadioGroup from "./components/RadioGroup.vue";

export default {
  name: "app",
  components: {
    RadioGroup
  },
  data: function() {
    return {
      radioVal: String,
      radioGroupLabel: {
        id: "group_label",
        text: "Pizza Crust"
      },
      radioInputAry: [
        {
          position: "afterLabel",
          value: "r0",
          label: "Regular crust",
          disabled: true
        },
        {
          position: "afterLabel",
          value: "r1",
          label: "Deep dish"
        },
        {
          position: "beforeLabel",
          value: "r2",
          label: "Thin crust"
        },
        {
          position: "belowLabel",
          value: "r3",
          label: "Stuffed crust"
        },
        {
          position: "aboveLabel",
          value: "r4",
          label: "No crust"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
div.test {
  margin: auto;
  border: 1px solid blue;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
