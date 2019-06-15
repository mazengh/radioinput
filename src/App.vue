<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="test">
      <h1>Radio Input</h1>
      <RadioGroup v-model="radioVal" :checkedIndex="3">
        <Radio position="afterLabel" value="r0" label="Regular crust" :disabled="true"></Radio>
        <Radio position="afterLabel" value="r1" label="Deep dish"></Radio>
        <br>
        <Radio position="beforeLabel" value="r2" label="Regular crust"></Radio>
        <Radio position="beforeLabel" value="r3" label="Deep dish"></Radio>
        <br>
        <Radio position="aboveLabel" value="r4" label="Regular crust"></Radio>
        <br>
        <Radio position="belowLabel" value="r5"></Radio>
      </RadioGroup>
    </div>
  </div>
</template>

<script>
import RadioGroup from "./components/RadioGroup.vue";
import Radio from "./components/Radio.vue";

export default {
  name: "app",
  components: {
    RadioGroup,
    Radio
  },
  data: function() {
    return {
      radioVal: String
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
