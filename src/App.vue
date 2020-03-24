<template>
  <div id="app">
    <header>
      <h1>Vue.js Radio Group Example Using Roving tabindex</h1>
    </header>
    <main>
      <section>
        <h2>Radio group with label positioning</h2>
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
        <h2>Radio group with default checked radio</h2>
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
        <h2>Radio group with v-model support</h2>
        <div>
          <div>
            <RadioGroup
              v-model="colorVal"
              :labelId="sampleData.colors.groupLabel.id"
              :labelText="sampleData.colors.groupLabel.text"
              :radios="sampleData.colors.radios"
            />
          </div>
          <div :style="{ color: colorVal }">
            Selected color is {{ colorVal }}
          </div>
        </div>
      </section>

      <section>
        <h2>Radio group for radios with no labels</h2>
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
    </main>
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

main {
  display: grid;
  grid-gap: 1rem;
}
section {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: calc(10rem + 50vmin);
  overflow: hidden;
  margin: auto;
  padding: 0 1rem 2rem;
  box-sizing: border-box;
  margin-top: 2rem;

  &:last-child {
    margin-bottom: 3rem;
  }

  background-color: ivory;
  border: 0.25rem solid midnightblue;
  border-radius: 1rem;

  h2 {
    font-size: calc(0.75rem + 0.5vmin);
    text-align: center;
    background-color: midnightblue;
    color: white;
    padding: 1rem;
    margin-top: 0;
    width: 100%;
    min-height: 3rem;
    display: flex;
    align-items: center;
  }
}

div.labelPositioning {
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: row;

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
  font-family: "Verdana", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

header {
  background: ivory;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
  margin: 0;
  box-shadow: 0 2px 2px #ccc;
  font-weight: bold;
  text-align: center;
  color: midnightblue;
}

header > h1 {
  font-size: calc(1rem + 1vmin);
}

@media screen and (max-width: 500px) {
  body {
    font-size: 0.9rem;
  }
}
</style>
