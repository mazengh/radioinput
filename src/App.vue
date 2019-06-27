<template>
  <div id="app">
    <header class="header">
      <h2>Vue.js Radio Group Example Using Roving tabindex</h2>
    </header>
    <section>
      <h4>Radio group with label positioning</h4>
      <div class="labelPositioning">
        <div>
          <RadioGroup
            v-model="pizzaCrustVal"
            :labelId="sampleData.pizzaCrust.groupLabel.id"
            :labelText="sampleData.pizzaCrust.groupLabel.text"
            :radios="sampleData.pizzaCrust.radios"
          />
        </div>
        <div>
          <RadioGroup
            :labelId="sampleData.paymentMethod.groupLabel.id"
            :labelText="sampleData.paymentMethod.groupLabel.text"
            :radios="sampleData.paymentMethod.radios"
          />
        </div>
      </div>
    </section>

    <section>
      <h4>Radio group with default checked radio</h4>
      <div>
        <RadioGroup
          v-model="fruitsVal"
          :checkedIndex="2"
          :labelId="sampleData.fruits.groupLabel.id"
          :labelText="sampleData.fruits.groupLabel.text"
          :radios="sampleData.fruits.radios"
        />
      </div>
    </section>

    <section>
      <h4>Radio group for radios with no labels</h4>
      <div>
        <div>
          <RadioGroup
            :labelId="sampleData.position.groupLabel.id"
            :labelText="sampleData.position.groupLabel.text"
            :radios="sampleData.position.radios"
          />
        </div>
      </div>
    </section>

    <section>
      <h4>Radio group with v-model support</h4>
      <div>
        <div>
          <RadioGroup
            v-model="colorVal"
            :labelId="sampleData.colors.groupLabel.id"
            :labelText="sampleData.colors.groupLabel.text"
            :radios="sampleData.colors.radios"
          />
        </div>
        <div :style="{color: colorVal}">Selected color is {{colorVal}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import RadioGroup from "./components/RadioGroup.vue";
import * as sampleData from "./samples.js";

export default {
  name: "app",
  components: {
    RadioGroup
  },
  data: function() {
    return {
      pizzaCrustVal: "",
      colorVal: "blue",
      fruitsVal: "",
      sampleData
    };
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:not(:first-of-type) {
    margin-top: 1em;
  }

  &:last-child {
    margin-bottom: 1.5em;
  }

  h4 {
    text-align: center;
    border: 5px solid #1c6ea4;
    border-radius: 5px;
    padding: 5px;
  }
}

div.labelPositioning {
  display: flex;
  flex-direction: row;
  min-width: 385px;

  div {
    display: flex;
    flex-direction: row;
    margin: 0 20px;

    &:nth-child(1) {
      [role="radiogroup"] {
        align-items: flex-end;
      }
    }

    &:nth-child(2) {
      [role="radiogroup"] {
        align-items: flex-start;
      }
    }

    [role="radiogroup"] {
      display: flex;
      flex-direction: column;
    }
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  background: #232b2b;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #eee;
  box-shadow: 0 2px 2px #ccc;
  font-weight: bold;
  text-align: center;
  color: #4caf50;
}

@media screen and (max-width: 650px) {
  .header h2 {
    font-size: 1.2em;
  }
}

@media screen and (max-width: 500px) {
  body {
    font-size: 0.9rem;
  }
  .header h2 {
    font-size: 1em;
  }

  div.labelDemo {
    width: 98%;
    min-width: 0;

    div {
      margin: 10px;
    }
  }
}
</style>
