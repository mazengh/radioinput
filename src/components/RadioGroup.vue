<template>
  <div role="radiogroup" :aria-labelledby="radioLabelId" @click="handleInput">
    <h3 :id="radioLabelId">{{radioLabelText}}</h3>
    <Radio
      v-for="(radio, index) in radios"
      v-bind="radio"
      :key="`radio_${index}`"
      :checked="currentRadioIndex"
      @check="setChecked"
      @previous="setCheckedToPreviousItem"
      @next="setCheckedToNextItem"
    />
  </div>
</template>

<script>
import Radio from "./Radio.vue";

export default {
  props: {
    labelId: String,
    labelText: String,
    value: {
      type: null
    },
    checkedIndex: {
      type: Number,
      default: -1,
      validator: function(value) {
        return value >= -1;
      }
    },
    radios: {
      type: Array
    }
  },
  model: {
    prop: "value",
    event: "click"
  },
  name: "RadioGroup",
  components: {
    Radio
  },
  data: function() {
    return {
      currentRadioIndex: this.checkedIndex >= 0 ? this.checkedIndex : -1,
      currentRadioValue: this.value ? this.value : null,
      totalRadios: 0,
      radioLabelId: this.labelId,
      radioLabelText: this.labelText
    };
  },
  methods: {
    setChecked: function(payload) {
      this.currentRadioIndex = payload.index;
      this.currentRadioValue = payload.value;
      this.handleInput();
    },
    setCheckedToPreviousItem: function() {
      if (this.currentRadioIndex <= 0) {
        this.currentRadioIndex = this.totalRadios - 1;
      } else {
        this.currentRadioIndex -= 1;
      }
    },
    setCheckedToNextItem: function() {
      const startIndex =
        this.currentRadioIndex === -1 ? 0 : this.currentRadioIndex;

      this.currentRadioIndex = (startIndex + 1) % this.totalRadios;
    },
    handleInput: function() {
      this.$emit("click", this.currentRadioValue);
    }
  },
  mounted() {
    // get all non disabled radios and set the index for each
    this.$children
      .filter(radioBtn => !radioBtn.isAriaDisabled)
      .forEach((radioBtn, index) => {
        radioBtn.setRadioIndex(index);
        //initialize two way binding if value is set initially
        if (this.value === radioBtn.value) {
          this.$children[index].initialCheck = true;
          this.currentRadioIndex = index;
        }
      });

    // set value of radiogroup to default checked radio value
    if (this.checkedIndex >= 0) {
      this.currentRadioValue = this.$children[this.checkedIndex].value;
      this.handleInput();
    }

    // set the total number of radios in group
    this.totalRadios = this.$children.filter(
      radioBtn => !radioBtn.isAriaDisabled
    ).length;
  }
};
</script>

<style lang="scss" scoped>
$green-1: rgb(96, 161, 96);

[role="radiogroup"] {
  padding: 0;
  margin: 0;
  list-style: none;

  &:focus {
    outline: none;
  }

  h3 {
    color: $green-1;
    margin: 0.5em;
  }
}
</style>